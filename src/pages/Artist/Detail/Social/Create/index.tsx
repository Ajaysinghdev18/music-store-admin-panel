import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IFile, ISocial } from '../../../../../shared/types';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import { CircularProgress, FormControl, FormHelperText, Grid, InputLabel, Stack, Switch, Tooltip, Typography } from '@mui/material';
import { Dropzone } from '../../../../../components';
import { TextInput } from '../../../../../components/TextInput';
import _ from 'lodash';
import * as S from '../style';
import { SocialApi } from '../../../../../apis';
import { getObjectUrl, videoObjectUrl } from '../../../../../utils';
import { ROUTES } from '../../../../../constants';
import { WarningAmberOutlined } from '@mui/icons-material';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required!'),
    thumbnail: Yup.mixed().required('File is required'),
    statement: Yup.string().required('Statement is required!'),
});
const videoSchemaObject = Yup.object({
    video: Yup.mixed().required('File is required'),
});
const attachmentSchemaObject = Yup.object({
    attachment: Yup.mixed().required('File is required'),
});
export const NewSocialContent = () => {
    const [social, setSocial] = useState<ISocial | any>({
        title: '',
        thumbnail: null as unknown as IFile,
        video: null as unknown as IFile,
        attachment: null as unknown as IFile,
        statement: '',
        publishOnSocialMedia: false,
    });

    const { id, type, artistId } = useParams<{ id: string, type: string, artistId: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            SocialApi.read(id).then(res => setSocial(res.SocialContent));
        }
    }, [id]);
    const handleUpload = (files, field: string, setFieldValue: any) => {
        if (files && files.length > 0) {
            setFieldValue(field, files[0]);
        }
    };
    const handleSubmit = (values: ISocial, { setSubmitting }: FormikHelpers<any>) => {
        const newSocial = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            newSocial.append(key, value);
        });
        if (artistId) {
            newSocial.set('artistId', artistId);
        }
        if (type === 'video') {
            newSocial.append('contentType', 'video');
        } else {
            newSocial.append('contentType', 'announcement');
        }

        if (id && social) {
            if (_.isEqual(social?.thumbnail, values.thumbnail)) {
                newSocial.delete('thumbnail');
            }
            if (_.isEqual(social?.video, values.video)) {
                newSocial.delete('video');
            }

            if (_.isEqual(social?.attachement, values.attachment)) {
                newSocial.delete('attachement');
            }
            SocialApi.update(id, newSocial as unknown as ISocial)
                .then(() => {
                    setSubmitting(false);
                    navigate(`${ROUTES.ARTIST.DETAIL.replace(':id', artistId as string)}?type=Social`);
                })
                .catch((err) => {
                    console.log(err);
                    setSubmitting(false);
                });
        } else {
            SocialApi.create(newSocial as unknown as ISocial)
                .then(() => {
                    setSubmitting(false);
                    navigate(`${ROUTES.ARTIST.DETAIL.replace(':id', artistId as string)}?type=Social`);
                })
                .catch((err) => {
                    console.log(err);
                    setSubmitting(false);
                });
        }
    };
    return (
        <>
            <Typography mb={30} color="text.black" textTransform={'capitalize'} fontWeight={'600'} variant="title">
                {id && artistId ? 'Edit' : 'Add new'} {type}
            </Typography>
            <Formik
                enableReinitialize
                initialValues={social}
                validationSchema={type === 'video' ? validationSchema.concat(videoSchemaObject) : validationSchema.concat(attachmentSchemaObject)}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, handleBlur, setFieldValue, values, errors, touched, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <Stack width={'100%'} justifyContent={'space-between'} display={'flex'} flexDirection={{ sm: 'column', xs: 'column', md: 'row', bs: 'row' }}>
                            <Grid container width={'40%'} spacing={16}>
                                <Grid item xs={12} md={12} >
                                    <TextInput
                                        name="title"
                                        label="Title"
                                        value={values.title}
                                        error={!!(errors.title && touched.title)}
                                        helperText={errors.title && touched.title && String(errors.title)}
                                        disabled={isSubmitting}
                                        onChange={(e) => {
                                            setFieldValue('title', e.target.value);
                                        }} onBlur={handleBlur}
                                    />
                                    <Stack mt={30}>
                                        <TextInput
                                            multiline
                                            minRows={6}
                                            name="statement"
                                            label="Statement"
                                            value={values.statement}
                                            error={!!(errors.statement && touched.statement)}
                                            helperText={errors.statement && touched.statement && String(errors.statement)}
                                            disabled={isSubmitting}
                                            onChange={(e) => {
                                                setFieldValue('statement', e.target.value);
                                            }} onBlur={handleBlur}
                                        />
                                    </Stack>
                                </Grid>


                            </Grid>
                            <Grid container width={'50%'} spacing={16}>
                                <Grid item xs={6}>
                                    {type === 'video' && <FormControl fullWidth error={!!(errors.thumbnail && touched.thumbnail)} disabled={isSubmitting}>
                                        <InputLabel >Video</InputLabel>
                                        <Dropzone
                                            disabled={isSubmitting}
                                            label="Drag video here to upload"
                                            accept={['.mp4']}
                                            onDrop={(files) => handleUpload(files, 'video', setFieldValue)}
                                            videoSrc={
                                                typeof values?.video?.url == 'string' ? values.video?.url : videoObjectUrl(values?.video)
                                            }
                                        />
                                        <FormHelperText>
                                            {errors.video && touched.video && String(errors.video)}
                                        </FormHelperText>
                                    </FormControl>}{type === 'announcement' && <FormControl fullWidth error={!!(errors.thumbnail && touched.thumbnail)} disabled={isSubmitting}>
                                        <InputLabel >Attachement</InputLabel>
                                        <Dropzone
                                            disabled={isSubmitting}
                                            label="Drag image here to upload"
                                            accept={['.png', '.jpg', '.svg']}
                                            onDrop={(files) => handleUpload(files, 'attachment', setFieldValue)}
                                            preview={
                                                typeof values?.attachment?.url == 'string' ? values?.attachment?.url : getObjectUrl(values?.attachment)
                                            }
                                        />

                                        <FormHelperText>
                                            {errors.attachment && touched.attachment && String(errors.attachment)}
                                        </FormHelperText>
                                    </FormControl>}
                                </Grid>
                                <Grid item xs={6} >
                                    <FormControl fullWidth error={!!(errors.thumbnail && touched.thumbnail)} disabled={isSubmitting}>

                                        <InputLabel >Thumbnail</InputLabel>
                                        <Dropzone
                                            disabled={isSubmitting}
                                            label="Drag image here to upload"
                                            accept={['.png', '.jpg', '.svg']}
                                            onDrop={(files) => handleUpload(files, 'thumbnail', setFieldValue)}
                                            preview={
                                                typeof values?.thumbnail?.url == 'string' ? values?.thumbnail?.url : getObjectUrl(values.thumbnail)
                                            }
                                        />
                                        <FormHelperText>
                                            {errors.thumbnail && touched.thumbnail && String(errors.thumbnail)}
                                        </FormHelperText>
                                    </FormControl>

                                </Grid>
                                <Stack display={'flex'} flexDirection={'row'} mt={30} width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                                    <FormControl fullWidth>
                                        <Stack display={'flex'} flexDirection={'row'}>
                                            <Tooltip title="This feature is not enabled yet."><WarningAmberOutlined color='error' /></Tooltip>
                                            <Typography fontSize={18} marginRight={10} color="text.black" fontWeight={'600'} variant="title">
                                                {type === 'video' ? 'Publish on Youtube' : 'Publish on Instagram'}
                                            </Typography>

                                            <Switch
                                                disabled={true}
                                                onChange={(e) => {
                                                    setFieldValue('publishOnSocialMedia', (e as React.ChangeEvent<HTMLInputElement>).target.checked);
                                                }} checked={values.publishOnSocialMedia}
                                                value={values.publishOnSocialMedia} />
                                        </Stack>
                                    </FormControl>
                                    <S.SaveButton
                                        type="submit"
                                        disabled={isSubmitting}
                                        startIcon={isSubmitting && <CircularProgress size={20} />}
                                    >
                                        {id && artistId ? 'Republish' : 'Publish'}
                                    </S.SaveButton>
                                </Stack>
                            </Grid>

                        </Stack>
                    </Form>
                )}
            </Formik>

        </>
    );
};