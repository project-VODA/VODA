import React from "react";

import Title from '../../components/Title';

import { getHello } from "../../apis/color";


const TestPage = () => {
  const connectFlask = () => {
    getHello()
      .then((res) => { console.log(res)} )
      .catch((err)=>{ console.log(err)} )
  }

  return (
    <>
      <Title title="테스트 페이지" />

      <button onClick={connectFlask}>버튼</button>
    </>
  );
};

export default TestPage;