import { useNavigate } from "react-router-dom";

import Button from "../../components/SettingButton"
import Carousel from "../../components/carousel/carousel";

const DetailPage = () => {
  
  const navigate = useNavigate();

  const redirectAbout = () => {
    navigate('/about')
  };

  const redirectVideo = () => {
    navigate('/waiting')
  };

  const redirectFeedback = () => {
    navigate('/feedback')
  };



  const slides = [
    {
      src: "https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2545.jpg",
      alt: "Image 1",
      caption: (
        <>
          <p className='caption-title'>
            서비스 소개 <br/>
          </p>
          <p className="caption-one-line-text">
            VODA는 시각 장애인에게 비언어적 소통을 지원하기 위해 탄생했습니다.<br/>
            서비스에 대한 소개와 사용방법 등 VODA에 대해서 자세히 알아보세요.
          </p>
          <Button 
            className='caption-button'
            text="바로가기"
            onClick={redirectAbout}
          />
        </>     
      ),
    },
    {
      src: "https://img.freepik.com/premium-vector/abstract-pastel-color-background-with-pink-purple-gradient-effect-graphic-design-decoration_120819-463.jpg",
      alt: "Image 2",
      caption: (
        <>
          <p className='caption-title'>
            영상통화 중 <br/>
            표정 알림 서비스
          </p>
          <p className="caption-two-line-text">
            VODA는 웹 브라우저에서 시각 장애인에게 비언어적 소통을 지원합니다.<br/>
            지인과 가족을 친구로 등록하여 손쉽게 영상 통화를 시작해보세요.
          </p>
          <Button 
            className='caption-button'
            text="바로가기"
            onClick={redirectVideo}
          />
        </>
      )
    },
    {
      src: "https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2545.jpg",
      alt: "Image 3",
      caption: (
        <>
          <p className='caption-title'>
            색상 음성 안내 서비스
          </p>
          <p className="caption-one-line-text">
            VODA의 색상 인식을 통해 외출 전이나 영상통화 전<br/>
            화장품이나 옷의 색상을 음성으로 확인하세요.
          </p>
          <Button 
            className='caption-button'  
            text="바로가기"
            onClick={(e) => navigate('/color')}
          />
        </>
      )
    },
    {
      src: "https://img.freepik.com/free-vector/coloured-blurred-background_1112-511.jpg?w=740&t=st=1691379411~exp=1691380011~hmac=50f2c93b217feaae65ff72b5fcbca32f3725b3e62171843fb96a1a2d15f1441d",
      alt: "Image 4",
      caption: (
        <>
          <p className='caption-title'>
            고객의 소리함
          </p>
          <p className="caption-one-line-text">
            VODA를 이용하면서 불편했던 부분에 대해서 의견을 남겨주세요.<br/>
            귀담아 듣겠습니다.
          </p>
          <Button 
            className='caption-button'  
            text="바로가기"
            onClick={redirectFeedback}
          />
        </>
      )
    },
  ];
  return (
    <>
      <Carousel slides={slides} />
    </>
  );
};

export default DetailPage;
