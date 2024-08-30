// Dependencies
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  Alert,
  Box,
  DialogActions,
  FormControl,
  FormControlLabel,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { FC, useEffect, useState } from 'react';

import { EmailApi } from '../../../../apis';
import { EmailTypes } from '../../../../constants';
import CustomButton from '../../../CustomButton/CustomButton';
import { TEMPLATE_TYPE } from '../MoreActionMenu';
import { ModalContainer, ModalContent, ModalHeader } from './style';

interface IConfigurationModal {
  showTemplateModal: boolean;
  handleClose: () => void;
  template: any;
}

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 300
  }
});

export const ConfigurationModal: FC<IConfigurationModal> = ({ showTemplateModal, handleClose, template }) => {
  const [emailTemplates, setEmailTemplates] = useState<any>([]);
  const [option, setOption] = useState<any>('');
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setOption('');
    fetchTemplates();
  }, []);
  const fetchTemplates = async () => {
    await EmailApi.getAllEmailTemplate().then((res) => {
      setEmailTemplates(res.templates);
    });
  };
  const handleSaveChanges = async () => {
    // check if the string has all the terms
    const filterData = EmailTypes.filter((mail) => mail.value === option);
    const isVariableIncluded = filterData[0].variables.every((term) => template.contentHtml.includes(term));
    if (isVariableIncluded) {
      EmailApi.updateEmailTemplateById(template.id, {
        email_type: filterData[0].value,
        template_type: TEMPLATE_TYPE.PUBLISHED
      }).then((res) => {
        if (res) {
          handleClose();
        }
      });
    } else {
      setError('Please add the Variable according to Templates');
    }
  };

  // Return products page
  // check if the string has all the terms
  return (
    <Modal
      open={showTemplateModal}
      onClose={() => {
        setOption('');
        handleClose();
      }}
    >
      <ModalContainer>
        <ModalHeader>
          <Typography>Configure settings for Email Templates</Typography>
        </ModalHeader>
        <ModalContent>
          <Box>
            <FormControl>
              <RadioGroup
                onChange={(e) => {
                  setError(null);
                  setOption(e.target.value);
                }}
              >
                {EmailTypes.map((type) => {
                  let isEnabled = true;
                  emailTemplates.map((template) => {
                    return (isEnabled = template.email_type === type.value);
                  });
                  const tooltipData = `${type.info}
                                    \n${type.variables.map((variable) => `\n${variable}\n`)}`;
                  return (
                    <Box display={'flex'}>
                      <FormControlLabel
                        value={type.value}
                        disabled={isEnabled}
                        control={<Radio />}
                        label={type.displayText}
                      />
                      <CustomWidthTooltip title={tooltipData}>
                        <IconButton>
                          <InfoOutlinedIcon />
                        </IconButton>
                      </CustomWidthTooltip>
                    </Box>
                  );
                })}
              </RadioGroup>
            </FormControl>
            {error && (
              <Alert style={{ marginTop: 30, alignItems: 'center' }} severity="error">
                <Typography fontSize={14} color={'red'}>
                  {error}
                </Typography>
              </Alert>
            )}
          </Box>
        </ModalContent>
        <Box justifyContent={'flex-end'}>
          <DialogActions>
            <CustomButton
              variant="outlined"
              width={115}
              onClick={() => {
                setOption('');
                handleClose();
              }}
              title="Discard"
            />
            <CustomButton
              variant="contained"
              disabled={option === ''}
              onClick={handleSaveChanges}
              width={155}
              start={true}
              title="Save Changes"
            />
          </DialogActions>
        </Box>
      </ModalContainer>
    </Modal>
  );
};
