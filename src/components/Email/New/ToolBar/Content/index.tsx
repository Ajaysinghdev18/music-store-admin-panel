import { FC } from 'react';

import { Container } from '../../../Common/styles';
import ElementsTools from '../ElementsTools';
import FrameTools from '../FrameTools';
import ImagesTools from '../ImagesTools';
import TextTools from '../TextTools';
import UploadTools from '../UploadTools';

export interface IContentProps {
  field: number;
}

const Content: FC<IContentProps> = ({ field }) => {
  if (field < 0) {
    return null;
  }

  return (
    <Container>
      {field === 1 && <FrameTools />}
      {field === 2 && <TextTools />}
      {field === 3 && <ElementsTools />}
      {field === 4 && <ImagesTools />}
      {field === 5 && <UploadTools />}
    </Container>
  );
};

export default Content;
