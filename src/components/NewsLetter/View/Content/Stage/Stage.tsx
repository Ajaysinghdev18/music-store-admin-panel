import { Box } from '@mui/material';

import { Col } from '../styles';

const Stage = () => {
  return (
    <Col
      marginLeft={'8px'}
      alignItems={'center'}
      flexGrow={1}
      width={0}
      bgcolor={'white'}
      borderRadius={'1rem'}
      justifyContent={'center'}
    >
      <Box width={'600px'} height="800px" boxShadow={'0.0675rem 0.125rem 0.3125rem rgb(10, 10, 10 , 0.4)'} />
    </Col>
  );
};

export default Stage;
