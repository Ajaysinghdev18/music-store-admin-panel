import { Box } from '@mui/material';
import { useState } from 'react';

import { ActiveLockIcon, LockIcon } from '../../../assets/icons';
import { Col, CustomPropsInput, Row, SectionBody } from './styles';

const SizeSettingBox = () => {
  const [isLocked, setLocked] = useState<boolean>(false);

  return (
    <Row alignItems="right">
      <Col justifyContent="space-between">
        <Row height=" 1.5rem">
          <SectionBody>W</SectionBody>
          <Row width="60px" ml="0.3125rem">
            <CustomPropsInput value={600} />
          </Row>
        </Row>
        <Row height=" 1.5rem">
          <SectionBody>H</SectionBody>
          <Row width="60px" ml="0.3125rem">
            <CustomPropsInput value={800} />
          </Row>
        </Row>
      </Col>
      <Col ml="8px" justifyContent="center">
        <Box
          mb="8px"
          width="0.75rem"
          height="1.125rem"
          borderTop="0.0675rem solid gray"
          borderRight="0.0675rem solid gray"
        />
        {!isLocked ? (
          <LockIcon onClick={() => setLocked(!isLocked)} />
        ) : (
          <ActiveLockIcon onClick={() => setLocked(!isLocked)} />
        )}
        <Box
          mt="8px"
          width="0.75rem"
          height="1.125rem"
          borderBottom="0.0675rem solid #707070"
          borderRight="0.0675rem solid #707070"
        />
      </Col>
    </Row>
  );
};

export default SizeSettingBox;
