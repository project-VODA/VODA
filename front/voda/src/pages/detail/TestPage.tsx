import React from "react";

import Title from '../../components/Title';

import { getHello, getColor } from "../../apis/color";


const TestPage = () => {
  const handleHello = () => {
    getHello()
      .then((res) => { console.log(res)} )
      .catch((err)=>{ console.log(err)} )
  }

  const handleColor = () => {
    getColor()
      .then((res) => { console.log(res)} )
      .catch((err)=>{ console.log(err)} )
  }

  return (
    <>
      <Title title="테스트 페이지" />

      <button onClick={handleHello}>안녕!!</button>
      <button onClick={handleColor}>색깔!!</button>
    </>
  );
};

export default TestPage;