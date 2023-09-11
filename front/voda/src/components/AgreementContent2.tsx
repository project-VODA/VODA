// AgreementContent.tsx
import React from 'react';
import styled from 'styled-components';

const ContextBox = styled.div`
  overflow: scroll;
  height: 35vh;
  overflow-x: hidden;

  h1 {
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 0.7em;
    margin-top: 0.7em;
    font-weight: bolder;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  ul, ol {
    margin-left: 1.5em; 
  }

  li {
    margin-bottom: 0.5em;
  }

`

const AgreementContent2 = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const dateString = year + '-' + month + '-' + day;

  return (
    <ContextBox>
      <h1>개인정보 취급 방침 및 약관 동의서</h1>
      <br />

      <h2>1. 개인정보 수집 및 이용목적</h2>
      <p>
        VODA(이하 "회사")은 [서비스 또는 앱 이름]을 운영하며, 이에 따른 정보 수집 및 이용을 위하여 아래와 같이 개인정보를 처리합니다.
      </p>
      <br />

      <h2>2. 수집하는 개인정보의 항목 및 수집방법</h2>
      <ul>
        <li>수집하는 개인정보 항목: [수집하는 개인정보의 종류, 예: 이름, 연락처, 이메일 주소]</li>
        <li>개인정보 수집방법: [회원가입, 서비스 이용 과정에서 수집]</li>
      </ul>
      <br />

      <h2>3. 개인정보의 이용목적</h2>
      <p>
        회사는 수집한 개인정보를 다음 목적을 위해 활용합니다.
      </p>
      <ul>
        <li>[회원 관리, 서비스 제공, 고객문의 응답, 마케팅 등]</li>
      </ul>
      <br />

      <h2>4. 개인정보의 제공 및 공유</h2>
      <p>
        회사는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 법령에 따라 제출 의무가 발생한 경우에는 예외로 합니다.
      </p>
      <br />

      <h2>5. 개인정보의 보유 및 파기</h2>
      <p>
        개인정보 보유기간은 [보유기간 설정, 예: 서비스 탈퇴 후 1년]로 정하며, 보유기간이 경과한 개인정보는 지체 없이 파기됩니다.
      </p>
      <br />

      <h2>6. 이용자의 권리와 행사 방법</h2>
      <p>
        이용자는 개인정보 열람, 정정, 삭제, 처리정지 요구 등 개인정보 보호법에서 정한 권리를 행사할 수 있습니다. 이에 따른 문의나 요청은 [문의처 또는 이메일 주소]로 연락하시기 바랍니다.
      </p>
      <br />

      <h2>7. 개인정보 보호책임자</h2>
      <ul>
        <li>성명: [개인정보 보호책임자 이름]</li>
        <li>연락처: [연락처 또는 이메일 주소]</li>
      </ul>
      <br />

      <h2>8. 개인정보 취급 방침의 변경</h2>
      <p>
        본 개인정보 취급 방침은 법령 및 정부 지침 변경, 회사의 정책 변경 등에 따라 내용이 변경될 수 있습니다. 변경 시 본 페이지를 통해 사전 고지합니다.
      </p>
      <br />

      <p>위의 개인정보 취급 방침을 확인하였으며, 이에 동의합니다.</p>

      <p>[{dateString}]</p>

    </ContextBox>
  );
};

export default AgreementContent2;
