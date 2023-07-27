import React, { useState } from 'react';
import styled from 'styled-components';

import Title from '../../components/Title';
import BoardList from '../../components/board/BoardList';
import WriteButton from '../../components/board/WriteButton'


const SimpleFeedBack = () => {

    return (
      <>
        <Title title='고객의 소리함' />

        <BoardList />

        <WriteButton text='글 작성' to='/write'/>
  

        
      </>
    );
  };
  
  export default SimpleFeedBack;
