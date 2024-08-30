import { useState } from 'react';

import DetailedView from './DetailedView';
import Stage from './Stage/Stage';
import { Container } from './styles';

const Body = () => {
  const [isDetailedView, setDetailedView] = useState(false);
  return (
    <Container>
      <Stage />
      <DetailedView isDetailedView={isDetailedView} setDetailedView={setDetailedView} />
    </Container>
  );
};

export default Body;
