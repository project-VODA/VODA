import React, { useState } from 'react';
import styled from 'styled-components';

import Title from '../../../components/Title';


const SimpleWriteArticle = () => {

    return (
      <>
        <Title title='문의글 작성' />

        <div className="board-create">

      <form>
        <div>
          <label htmlFor="title">Title</label>
          {/* <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력해주세요."/> */}
        </div>

        <div>
          <label htmlFor="content">Content</label>
          {/* <textarea name="content" id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용을 입력해주세요."/> */}
        </div>
      </form>

      <div className="grid-2">
        {/* <Button children="Confirm" variant="primary" onClick={formSubmit}/> */}
        {/* <Button children="Cancel" variant="secondary" onClick={formCancel}/> */}
      </div>
    </div>

        

        
      </>
    );
  };
  
  export default SimpleWriteArticle;
