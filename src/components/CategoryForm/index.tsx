// Dependencies
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  TextField
} from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import Reorder, { reorder } from 'react-reorder';
import * as Yup from 'yup';

// Apis
import { CategoriesApi } from '../../apis';
import { COLORS } from '../../constants/colors';
// Interfaces
import { ICategory } from '../../shared/types';
import { RoundedButton } from '../Common';
import { TextInput } from '../TextInput';
// styles
import * as S from './styles';

interface ICategoryFormProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  category?: ICategory;
  onSubmitted: () => void;
}

// Constants
const initialValues: ICategory = {
  name: '',
  visibleInNav: false,
  subCategories: []
};

const validationSchema = Yup.object().shape({
  name: Yup.string().max(50, 'Please enter less than 50 characters').required('Name is required!'),
  visibleInNav: Yup.boolean(),
  subCategories: Yup.array().of(Yup.string().required('Category name is  required!'))
});

// Export category-form component
export const CategoryForm: FC<ICategoryFormProps> = ({ visible, setVisible, category, onSubmitted }) => {
  // States
  const [visibleSubCategories, setVisibleSubCategories] = useState<boolean>(false);

  // Submit handler
  const handleSubmit = (values: ICategory, { setSubmitting }: FormikHelpers<any>) => {
    if (category) {
      CategoriesApi.update(category.id as string, values)
        .then(() => {
          onSubmitted();
          setVisible(false);
        })
        .catch((err) => {
          console.log(err);
          setSubmitting(false);
        });
    } else {
      CategoriesApi.create(values)
        .then(() => {
          onSubmitted();
          setVisible(false);
        })
        .catch((err) => {
          console.log(err);
          setSubmitting(false);
        });
    }
  };

  // Cancel handler
  const handleCancel = () => {
    setVisible(false);
  };

  // Sub category visible change handler
  const handleVisibleChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    const checked = e.target.checked;
    setVisibleSubCategories(checked);

    if (checked) {
      if (category) {
        if (category.subCategories && category.subCategories.length == 0) {
          category.subCategories = [''];
        }
      } else {
        setFieldValue('subCategories', ['']);
      }
    } else {
      setFieldValue('subCategories', []);
    }
  };

  // Reorder handler
  const handleReorder = (
    previousIndex: number,
    nextIndex: number,
    list: string[],
    setFieldVale: (fieldName: string, value: string[]) => void
  ) => {
    const newList = reorder(list, previousIndex, nextIndex);

    setFieldVale('subCategories', newList);
  };

  useEffect(() => {
    if (category && category.subCategories) {
      setVisibleSubCategories(category.subCategories.length > 0);
    }
  }, [category]);
  // Return category-form component
  return (
    <S.DialogForm open={visible} fullWidth>
      <S.CloseButton
        onClick={handleCancel}
        sx={{
          position: 'absolute',
          right: '2rem',
          top: '1.5rem'
        }}
      >
        ⨯
      </S.CloseButton>
      {visible && (
        <Formik initialValues={category || initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ handleSubmit, handleBlur, handleChange, setFieldValue, values, errors, touched, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <DialogContent>
                <TextInput
                  id="name"
                  name="name"
                  label="Name"
                  value={values.name}
                  error={!!(errors.name && touched.name)}
                  helperText={errors.name && touched.name && String(errors.name)}
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.visibleInNav}
                        onChange={() => setFieldValue('visibleInNav', !values.visibleInNav)}
                        disabled={isSubmitting}
                      />
                    }
                    label="Can be top nav menu?"
                  />
                </FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={visibleSubCategories}
                      onChange={(e) => handleVisibleChange(e, setFieldValue)}
                      disabled={isSubmitting}
                    />
                  }
                  label="Can have sub categories?"
                />
                <Reorder
                  reorderId="myList2"
                  onReorder={(_: React.MouseEvent, previousIndex: number, nextIndex: number) =>
                    handleReorder(previousIndex, nextIndex, values.subCategories as string[], setFieldValue)
                  }
                  placeholderClassName="placed"
                  draggedClassName="dragged"
                >
                  {visibleSubCategories &&
                    values.subCategories &&
                    values.subCategories.map((name, index) => (
                      <TextField
                        key={`sub-category-${index}`}
                        margin="dense"
                        id={`sub-category-${index}`}
                        name={`subCategories[${index}]`}
                        label={`Sub category ${index + 1}`}
                        fullWidth
                        value={name}
                        error={
                          !!(
                            errors.subCategories &&
                            errors.subCategories[index] &&
                            typeof touched.subCategories === 'object' &&
                            touched.subCategories[index]
                          )
                        }
                        helperText={
                          errors.subCategories &&
                          errors.subCategories[index] &&
                          touched.subCategories &&
                          typeof touched.subCategories === 'object' &&
                          touched.subCategories[index] &&
                          String(errors.subCategories[index])
                        }
                        disabled={isSubmitting}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    ))}
                </Reorder>
                {visibleSubCategories && (
                  <>
                    <Button
                      fullWidth
                      variant="outlined"
                      disabled={isSubmitting}
                      onClick={() => {
                        console.log(values.subCategories);
                        return setFieldValue('subCategories', [...(values?.subCategories as []), '']);
                      }}
                    >
                      Add
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      disabled={isSubmitting || (values?.subCategories as []).length === 0}
                      onClick={() => {
                        const data = values?.subCategories as [];
                        return data.length > 0
                          ? setFieldValue(
                              'subCategories',
                              data?.filter((item, index) => index !== data.length - 1)
                            )
                          : [];
                      }}
                    >
                      Remove
                    </Button>
                  </>
                )}
              </DialogContent>
              <DialogActions>
                <RoundedButton outline={true} background={COLORS.BLACK} label={'Cancel'} onClick={handleCancel} />
                <RoundedButton type={'submit'} background={COLORS.BLACK} label={category ? 'Save' : 'Save'} />
              </DialogActions>
            </Form>
          )}
        </Formik>
      )}
    </S.DialogForm>
  );
};
