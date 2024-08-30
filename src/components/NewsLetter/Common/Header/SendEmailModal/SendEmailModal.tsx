// Dependencies
import { Mail } from '@mui/icons-material';
import {
  Grid,
  Modal,
  Typography
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { ActiveSendIcon, SendIcon } from '../../../../../assets/icons';
import CustomButton from '../../../../CustomButton/CustomButton';
import {
  ModalContainer,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from './style';
import { IAccount } from '../../../../../shared/types';
import { useSelector } from 'react-redux';
import { getAccount } from '../../../../../store/selectors';
import { NewsLetterApi } from '../../../../../apis';
import TemplateCard from '../../TemplateCard';

interface ISendEmailModal {
  showTemplateModal: boolean;
  handleClose: () => void;
  handleSend: (val: any) => void;
}


export const SendNewsLetterModal: FC<ISendEmailModal> = ({ showTemplateModal, handleClose, handleSend }) => {
  const [templateList, setTemplateList] = useState<any>([]);
  const [selectedValue, setSelectedValue] = useState(0);
  const account: IAccount = useSelector(getAccount);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    await NewsLetterApi.getAllNewsLetter({
      query: {
        artistId: account.artistId
      }
    }).then((res) => {
      setTemplateList(res.newsLetters);
    });
  };

  // Return products page
  return (
    <Modal open={showTemplateModal} onClose={handleClose}>
      <ModalContainer>
        <ModalHeader>
          <Mail />
          <Typography>Send News Letter to all Subscribers</Typography>
        </ModalHeader>
        <ModalContent>
          {templateList?.length === 0 ?
            <Typography>Please Add Templates</Typography> :
            <Grid container spacing={16}>
              {templateList?.map((template, index) => (
                  <Grid item xs={6} key={index} onClick={()=>setSelectedValue(index)}>
                     <input type='radio' checked={selectedValue === index}/>
                    <TemplateCard template={template} onItemClicked={() => { console.log(''); }} showEdit={false} />
                  </Grid>
              ))}
            </Grid>}
        </ModalContent>
        <ModalFooter>
          <CustomButton variant="outlined" width={115} onClick={handleClose} title="Discard" />
          {templateList.length !== 0 && <CustomButton
            variant="contained"
            width={115}
            start
            onClick={()=>{handleSend(templateList[selectedValue]);}}
            activeIcon={<ActiveSendIcon />}
            icon={<SendIcon />}
            title="Send"
          />}
        </ModalFooter>
      </ModalContainer>
    </Modal>
  );
};
