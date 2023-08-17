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


const AgreementContent1 = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const dateString = year + '-' + month + '-' + day;

  return (
    <ContextBox>
      <h1>Voda 홈페이지 이용약관 (실시간 영상통화 및 AI 분석 서비스 포함)</h1>
      <p>효력 발생일: <span>[{dateString}]</span></p>
      <br />

      <h2>1. 서문</h2>
      <p>
        <strong>1.1</strong> Voda 홈페이지(이하 "사이트")를 이용해 주셔서 감사합니다. 본 이용약관은 Voda 회사(이하 "회사")와 이용자(이하 "이용자" 또는 "회원") 간의 서비스 이용에 관한 규정을 포함하고 있습니다. 이용자 여러분은 본 약관을 숙독하고 동의 여부를 결정하시기 바랍니다.
        <strong>1.2</strong> 본 약관에 동의하시면, 회사가 제공하는 서비스를 이용할 수 있습니다. 이용자가 본 약관에 동의하지 않을 경우, 회사의 서비스 이용은 제한될 수 있습니다.
      </p>
      <br />

      <h2>2. 정의</h2>
      <p>
        <strong>2.1</strong> "사이트"는 회사가 제공하는 온라인 플랫폼을 의미합니다.
        <strong>2.2</strong> "이용자"는 본 약관에 따라 회사의 서비스를 이용하는 자를 의미합니다.
      </p>
      <br />

      <h2>3. 서비스 제공</h2>
      <p>
        <strong>3.1</strong> 회사는 무료로 제공되는 서비스를 통해 이용자에게 정보와 콘텐츠를 제공합니다.
        <strong>3.2</strong> 회사는 실시간 영상통화 서비스를 제공하며, 이를 통해 이용자의 표정을 AI 기술을 통해 분석합니다.
        <strong>3.3</strong> 회사는 이용자의 표정 분석 결과를 활용하여 서비스의 개선과 개인 맞춤형 콘텐츠 제공에 활용할 수 있습니다.
        <strong>3.4</strong> 회사는 사전 고지 없이 서비스의 내용을 변경하거나 중단할 수 있습니다.
      </p>
      <br />

      <h2>4. 이용자의 의무</h2>
      <p>
        <strong>4.1</strong> 이용자는 회사의 서비스를 이용할 때 아래의 규정을 준수해야 합니다.
        <ul>
          <li>타인의 개인정보 및 저작권을 포함한 지적 재산권을 존중합니다.</li>
          <li>부정한 방법으로 시스템을 해킹하거나 악용하지 않습니다.</li>
          <li>허위 정보를 제공하지 않습니다.</li>
        </ul>
      </p>
      <br />

      <h2>5. 개인정보 처리</h2>
      <p>
        <strong>5.1</strong> 회사는 이용자의 개인정보를 보호하기 위해 노력합니다. 개인정보 처리에 대한 자세한 내용은 개인정보 처리방침을 참고해 주십시오.
      </p>
      <br />

      <h2>6. 책임의 한계</h2>
      <p>
        <strong>6.1</strong> 회사는 무료로 제공하는 서비스와 관련하여 발생한 손해에 대해 어떠한 책임도 부담하지 않습니다.
      </p>
      <br />

      <h2>7. 약관 변경</h2>
      <p>
        <strong>7.1</strong> 회사는 필요한 경우 본 약관을 변경할 수 있으며, 변경된 약관은 "사이트"를 통해 공지됩니다. 변경된 약관에 동의하지 않을 경우, 이용자는 서비스 이용을 중단할 수 있습니다.
      </p>
      <br />

      <h2>8. 분쟁 해결</h2>
      <p>
        <strong>8.1</strong> 본 약관과 관련하여 분쟁이 발생한 경우, 양 당사자는 합의를 통해 해결을 시도해야 합니다.
      </p>
      <br />

      <h2>9. 연락처</h2>
      <p>
        <strong>9.1</strong> 이용자와 회사 간의 연락은 다음의 연락처를 통해 가능합니다:
        회사명: Voda
        이메일: [voda.a707@gmail.com]
      </p>
      <br />

      <h2>10. 준거법 및 관할법원</h2>
      <p>
        <strong>10.1</strong> 본 약관은 한국 법률에 따라 규정되며, 본 약관과 관련된 분쟁에 대해는 서울 중앙지방법원을 관할법원으로 합니다.
      </p>
      <br />

      <p>
        이용자 여러분께서는 본 약관을 숙독하고 동의 여부를 결정하시기 바랍니다. "사이트" 이용으로 인해 발생하는 모든 활동에 대한 책임은 이용자 본인에게 있습니다.
      </p>

    </ContextBox>
  );
};

export default AgreementContent1;
