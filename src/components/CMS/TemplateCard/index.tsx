import { Box, Button, Typography } from '@mui/material';
import { CMSApi } from '../../../apis';
import {
    SectionBody,
    Template,
    TemplateActions,
    TemplateBody,
    TemplateFooter,
    TemplateHeader
} from './styles';
import { TEMPLATE_TYPE } from '../../Email/Common/MoreActionMenu';
import { DeleteIcon, PencilIcon } from '../../../assets/icons';
import moment from 'moment';

export interface ITemplateCard {
    onItemClicked: (number) => void;
    template: any;
    index: number;
}

const TemplateCard = ({ onItemClicked, template }) => {

    const handleDelete = async () => {
        try {
            await CMSApi.deleteCMSTemplateById(template._id);
        } catch (e) {
            console.log('error', e);
        }
    };

    return (
        <Template >
            <TemplateHeader>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} width={'100%'} justifyContent={'space-between'}>
                    <Box>
                        <Typography fontSize={20} sx={{ fontWeight: 500 }}>
                            {template.title}
                        </Typography>
                    <SectionBody mt="0.0675rem">{moment(template.updatedAt).format('MMMM Do YYYY')}</SectionBody>

                    </Box>
                    {template.template_type === TEMPLATE_TYPE.DRAFT &&
                        <Box width={80} justifyContent={'center'} display={'flex'} p={4} bgcolor={'#2659ed'} borderRadius={3}>
                            <SectionBody color={'white'} mt="0.0675rem">DRAFT</SectionBody>
                        </Box>
                    }

                </Box>
            </TemplateHeader>
            <TemplateBody>
                {/* {template.thumbnail ? <img src={template.thumbnail} height={'100%'} width={'100%'} /> : null} */}
            </TemplateBody>

            <TemplateFooter>
                <TemplateActions>
                    <Button
                        onClick={() => onItemClicked(template.id)}
                        variant="outlined" sx={{ marginRight: '1rem' }}>
                        <PencilIcon />
                    </Button>
                    <Button variant="outlined" sx={{ marginRight: '1rem' }} onClick={handleDelete}>
                        <DeleteIcon />
                    </Button>
                </TemplateActions>
            </TemplateFooter>
        </Template>
    );
};

export default TemplateCard;
