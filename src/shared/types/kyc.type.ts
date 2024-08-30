import { IUser } from './users.type';

interface IFile {
  fieldname: string;
  filename: string;
  url: string;
}
export interface KYCType {
  id: string;
  RequestId: string;
  status: 'Pending' | 'Approved' | 'Refused';
  faceId: IFile;
  idBack: IFile;
  idFront: IFile;
  name: string;
  user: IUser;
  mobile: number;
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  idNumber: string;
  createdAt: string;
  avatar: string | null;
  nationality: string;
  submitDate: Date;
  expiration: Date;
  birthday: Date;
  gender: 'Male' | 'Female';
  updatedAt: Date;
}
