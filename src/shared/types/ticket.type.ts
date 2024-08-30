import { TICKET_STATUS } from '../enums';
import { IFile } from './product.type';

export interface ITicket {
  id?: string;
  answer?: string;
  name: string;
  email: string;
  username?: string;
  phoneNumber?: string;
  country?: string;
  subject: string;
  description: string;
  category: string;
  files?: IFile[];
  status?: TICKET_STATUS;
  createdAt?: string;
  updatedAt?: string;
}
