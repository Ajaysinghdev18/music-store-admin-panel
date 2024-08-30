import {
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { countries } from 'countries-list';
import { KycApi, UsersApi } from '../../../apis';
import { ArrowLeftIcon, ContainedKYCIcon, FilledKYCIcon, KYCIcon, OutlinedKYCIcon } from '../../../assets/icons';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { ROUTES } from '../../../constants';
import { KYCType } from '../../../shared/types/kyc.type';
import { setSearchExp } from '../../../store/actions/header.actions';
import { getUserAvatar } from '../../../utils';
import { STATUS, getStatus, getType } from '../List';
import { ImageViewModal } from './ImageViewModal';
import { RefuseConfirmModal } from './RefuseConfirmModal';
import * as S from './style';
import {
  Card,
  Container,
  KYCDataGroup,
  SectionAction,
  SectionBody,
  SectionButton,
  SectionFiled,
  SectionHead,
  SectionRow,
  SectionTitle,
  TableHeader,
  ToolBox
} from './style';
const itemsPerPage = 5;

const KYCView = () => {
  const navigate = useNavigate();
  const routes = useParams();
  const [kycData, setKycData] = useState<KYCType | null>();
  const [userKycData, setUserKycData] = useState<KYCType[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [imgArr, setImagArr] = useState<Array<any>>([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchExp(''));
  }, []);

  const fetchKYC = () => {
    const id = routes.id;
    KycApi.readById(id as string)
      .then((res) => {
        setKycData(res.kyc);
        // Fetch kycs
        KycApi.readAll({
          query: {
            userId: res.kyc.user.id,
            status: { $in: [STATUS.REJECTED, STATUS.VERIFIED] }
          }
        })
          .then((res) => {
            setUserKycData(res.kycs);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.tsx:53 ~ .then ~ err:', err);
      });
  };

  useEffect(() => {
    fetchKYC();
  }, [location.pathname]);

  const [showRefuseConfirmModal, setShowRefuseConfirmModal] = useState(false);

  const handleClose = () => {
    setShowRefuseConfirmModal(false);
  };

  const handleBack = () => {
    navigate(ROUTES.KYC.List);
  };
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleSubmit = (values: any) => {
    KycApi.updateById(routes?.id as string, { ...values })
      .then((res) => {
        UsersApi.update(values.userId, { KYCStatus: values.status, isKYCVerified: values.verified, verify: values.verified }).then((resposne) => {
          console.log('🚀 ~ file: index.tsx:52 ~ .then ~ res:', resposne);
        }).catch(e => console.log('error', e));
        setShowRefuseConfirmModal(false);
        navigate(ROUTES.KYC.List);
      })
      .catch((err) => {
        console.log('🚀 ~ file: index.tsx:55 ~ handleSubmit ~ err:', err);
      });
  };
  const filteredData = userKycData.filter(kyc => kyc.user.id === kycData?.user.id).sort((a: any, b: any) =>  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const historyData = filteredData.slice(startIndex, endIndex);
  return (
    <Container>
      <Card>
        <ToolBox>
          <Button variant="text" onClick={handleBack}>
            <ArrowLeftIcon height={20} width={20} /> Back
          </Button>
          {(kycData?.status === STATUS.NOT_VERIFIED || kycData?.status === STATUS.UNDER_VERIFICATION) && (
            <Box display="flex">
              <Button variant="outlined" sx={{ mr: '0.5rem' }} onClick={() => setShowRefuseConfirmModal(true)}>
                Refuse
              </Button>
              <CustomButton
                variant="contained"
                icon={<OutlinedKYCIcon />}
                activeIcon={<ContainedKYCIcon />}
                width={146}
                height={40}
                start={true}
                title="Approved"
                onClick={() => handleSubmit({ status: STATUS.VERIFIED, verified: true, userId: kycData?.user.id })}
              />
            </Box>
          )}
          <RefuseConfirmModal
            handleSubmitRefuse={(values) => handleSubmit({ status: STATUS.REJECTED, verified: false, userId: kycData?.user.id, reason: values.reason })}
            showTemplateModal={showRefuseConfirmModal}
            handleClose={handleClose}
          />
        </ToolBox>
        <SectionTitle>Details</SectionTitle>
        <KYCDataGroup>
          <SectionRow>
            <SectionFiled>Request ID:</SectionFiled>
            <SectionBody>{kycData?.id}</SectionBody>
            <SectionAction>
              <SectionButton status={kycData?.status}>{getStatus(kycData?.status)}</SectionButton>
            </SectionAction>
          </SectionRow>
          <SectionRow>
            <SectionFiled>Request Date:</SectionFiled>
            <SectionBody>{moment(kycData?.updatedAt).format('HH:mm - DD MMMM YYYY')}</SectionBody>
          </SectionRow>
        </KYCDataGroup>
        <KYCDataGroup>
          <SectionRow>
            <SectionFiled>User ID:</SectionFiled>
            <SectionBody onClick={() => navigate(ROUTES.USER.DETAIL.replace(':id', kycData?.user.id as string))}>
              <Stack direction="row" spacing={12} alignItems="center">
                <Avatar src={getUserAvatar(kycData?.user)} alt="user-image" />
                <Typography variant="body2">{kycData?.user.name}</Typography>
              </Stack>
            </SectionBody>
          </SectionRow>
          <SectionRow>
            <SectionFiled>Email:</SectionFiled>
            <FilledKYCIcon />
            <SectionBody sx={{ ml: '0.5rem' }}>{kycData?.user.email}</SectionBody>
          </SectionRow>
          <SectionRow>
            <SectionFiled>Mobile:</SectionFiled>
            <FilledKYCIcon />
            <SectionBody sx={{ ml: '0.5rem' }}>{kycData?.user.phoneNumber}</SectionBody>
          </SectionRow>
        </KYCDataGroup>
        <KYCDataGroup>
          <SectionRow>
            <SectionFiled>ID Type:</SectionFiled>
            <SectionBody sx={{ ml: '0.5rem' }}>{getType(kycData?.type)}</SectionBody>
            <SectionAction>
              <SectionButton
                onClick={() => {
                  setImagArr([kycData?.idFront.url, kycData?.idBack.url]), setShowModal(true);
                }}
              >
                {'My ID Card.jpg'}
              </SectionButton>
              <SectionButton
                onClick={() => {
                  setImagArr([kycData?.faceId.url]), setShowModal(true);
                }}
              >
                {'Face Recognition.jpg'}
              </SectionButton>
            </SectionAction>
          </SectionRow>
          <SectionRow>
            <SectionFiled>Nationality:</SectionFiled>
            <SectionBody sx={{ ml: '0.5rem' }}>{kycData?.nationality && countries[kycData?.nationality]?.name}</SectionBody>
          </SectionRow>
          <SectionRow>
            <SectionFiled>Last Name:</SectionFiled>
            <SectionBody sx={{ ml: '0.5rem' }}>{kycData?.lastName}</SectionBody>
          </SectionRow>
          <SectionRow>
            <SectionFiled>First Name:</SectionFiled>
            <SectionBody sx={{ ml: '0.5rem' }}>{kycData?.firstName}</SectionBody>
          </SectionRow>
          <SectionRow>
            <SectionFiled>Gender:</SectionFiled>
            <SectionBody sx={{ ml: '0.5rem' }} style={{ textTransform: 'capitalize' }}>{kycData?.gender}</SectionBody>
          </SectionRow>
          <SectionRow>
            <SectionFiled>Date of Birth:</SectionFiled>
            <SectionBody sx={{ ml: '0.5rem' }}>{moment(kycData?.birthday).format('YYYY M DD')}</SectionBody>
          </SectionRow>
          <SectionRow>
            <SectionFiled>ID Number:</SectionFiled>
            <SectionBody sx={{ ml: '0.5rem' }}>{kycData?.idNumber}</SectionBody>
          </SectionRow>
          <SectionRow>
            <SectionFiled>Date of Expiration:</SectionFiled>
            <SectionBody sx={{ ml: '0.5rem' }}>{moment(kycData?.expiration).format('YYYY M DD')}</SectionBody>
          </SectionRow>
        </KYCDataGroup>
      </Card>

      <Card sx={{ mt: '0.5rem' }}>
        <SectionTitle>History</SectionTitle>
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table>
            <TableHeader>
              <TableCell component="th" sx={{ width: '25%' }}>
                <SectionHead>Request ID</SectionHead>
              </TableCell>
              <TableCell component="th">
                <SectionHead>Request Date</SectionHead>
              </TableCell>
              <TableCell component="th">
                <SectionHead>Documents</SectionHead>
              </TableCell>
              <TableCell component="th" align="right">
                <SectionHead>Status</SectionHead>
              </TableCell>
            </TableHeader>
            <TableBody>
              {historyData?.length > 0 &&
                historyData?.sort((a: any, b: any) =>  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((kyc) => {
                  console.log('kyc?.createdAt', kyc?.createdAt);
                  return (
                    <TableRow>
                      <TableCell component="td" scope="row">
                        <SectionBody>{kyc.id}</SectionBody>
                      </TableCell>
                      <TableCell component="td" scope="row">
                        <SectionBody>{moment(kyc?.createdAt).format('HH:mm - DD MMMM YYYY')}</SectionBody>
                      </TableCell>
                      <TableCell component="td" scope="row">
                        <Stack display={'flex'} flexDirection={'row'}>
                          <SectionBody sx={{ ml: '0.5rem' }}>{getType(kyc?.type)}</SectionBody>
                          <SectionAction>
                            <SectionButton
                              onClick={() => {
                                setImagArr([kyc?.idFront.url, kyc?.idBack.url]), setShowModal(true);
                              }}
                            >
                              {'My ID Card.jpg'}
                            </SectionButton>
                            <SectionButton
                              onClick={() => {
                                setImagArr([kyc?.faceId.url]), setShowModal(true);
                              }}
                            >
                              {'Face Recognition.jpg'}
                            </SectionButton>
                          </SectionAction>
                        </Stack>
                      </TableCell>
                      <TableCell component="td" scope="row" align="right">
                        <SectionButton status={kyc.status}>{getStatus(kyc.status)}</SectionButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <S.Pagination
          count={Math.ceil(filteredData.length / itemsPerPage)}
          page={page}
          onChange={handleChange}
        />

      </Card>
      <ImageViewModal showModal={showModal} handleClose={() => setShowModal(false)} imageArray={imgArr} />
    </Container>
  );
};

export default KYCView;
