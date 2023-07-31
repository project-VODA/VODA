import React from 'react';

import Title from '../../components/Title';
import FaceExpressionsComponent from '../../components/VideoAnalyzer'

const DetailPage = () => {
  return (
    <>
      <Title title='Homepage' />
      {/* Add other content for the home page */}
      <FaceExpressionsComponent />
    </>
  );
};

export default DetailPage;
