import React, { useEffect, useState, useRef } from "react"
import { styled } from "styled-components"
import weather from "../../apis/weather";
import { BsFillBrightnessHighFill, BsFillCloudFill, BsFillCloudLightningFill, BsCloudDrizzleFill, BsFillCloudRainFill, BsFillCloudSnowFill, BsFillCloudHaze2Fill, BsEmojiAngry, BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"

interface WeatherOption {
  icon: React.ComponentType;
  title: string;
};

interface weatherInfo {
  weather: string;
  icon: React.ComponentType | null;
  temp: number;
};

const weatherOptions: Record<string, WeatherOption> = {
  Clear: {
    icon: BsFillBrightnessHighFill,
    title: '맑음',
  },
  Clouds: {
    icon: BsFillCloudFill,
    title: "흐림",
  },
  Thunderstorm: {
    icon: BsFillCloudLightningFill,
    title: "천둥번개",
  },
  Drizzle: {
    icon: BsCloudDrizzleFill,
    title: "이슬비",
  },
  Rain: {
    icon: BsFillCloudRainFill,
    title: "비",
  },
  Snow: {
    icon: BsFillCloudSnowFill,
    title: "눈",
  },
  Haze: {
    icon: BsFillCloudHaze2Fill,
    title: "안개",
  },
  Mist: {
    icon: BsFillCloudHaze2Fill,
    title: "안개",
  },
  Fog: {
    icon: BsFillCloudHaze2Fill,
    title: "안개",
  },
  Dust: {
    icon: BsEmojiAngry,
    title: "미세먼지",
  },
  Sand: {
    icon: BsEmojiAngry,
    title: "황사",
  },
};

const WeatherContainer = styled.div`
  align-items: center;
  justify-content: center;
  // text-align: center;
`;

const IconContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconContainer = styled.p`
  font-size: 3vw;
  font-weight: bolder;
  display: inline-flex;
  align-items: center;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
`;

const cities = ["Seoul", "Daejeon", "Gwangju", "Gumi", "Busan"];

const WeatherCurrentSimple = () => {

  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const currentCity = cities[currentCityIndex];
  const [currentCityKorean, setCurrentCityKorean] = useState(currentCity);
  const [autoRotate, setAutoRotate] = useState(true); // 기본값 true로 설정
  const autoRotateInterval = 5000; // 5초
  const intervalId = useRef<NodeJS.Timer | undefined>(); // useRef로 intervalId 선언

  useEffect(() => {
    if (autoRotate) {
      intervalId.current = setInterval(() => {
        nextCity();
      }, autoRotateInterval);
    }

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [autoRotate]);

  const nextCity = () => {
    setCurrentCityIndex((prevIndex) => (prevIndex + 1) % cities.length);
  };

  const prevCity = () => {
    setCurrentCityIndex((prevIndex) => (prevIndex - 1 + cities.length) % cities.length);
  };

  const [weatherInfo, setWeatherInfo] = useState({
    weather: "",
    icon: null,
    temp: 0,
  });

  const getWeatherInfo = () => {
    weather.get(`/weather?q=${currentCity}&appid=7e666eba846dc3ddbbdc7b55dd6f19a1&units=metric`)
      .then((res) => {
        const currentWeather = res.data.weather[0].main;
        const currentWeatherOption = weatherOptions[currentWeather];
        
        setWeatherInfo({
          weather: currentWeatherOption.title,
          icon: currentWeatherOption.icon,
          temp: res.data.main.temp,
        });
      })
      .catch(err => {
        console.log(err);
    })
  }

  useEffect(() => {
    getWeatherInfo();
    if(currentCity === 'Seoul'){
      setCurrentCityKorean("서울");
    } else if(currentCity === 'Daejeon'){
      setCurrentCityKorean("대전");
    } else if(currentCity === 'Gwangju'){
      setCurrentCityKorean("광주");
    } else if(currentCity === 'Gumi'){
      setCurrentCityKorean("구미");
    } else if(currentCity === 'Busan'){
      setCurrentCityKorean("부산");
    }
  }, [currentCity]);

  const WeatherIcon = weatherInfo.icon ? styled(weatherInfo.icon)`
    color: ${props => {
      if (props.weather === "맑음") return "#FFA500";
      else if (props.weather === "비" || props.weather === "이슬비") return "#16537e";
      else if (props.weather === "황사") return "#FFA500";
      else if (props.weather === "미세먼지") return "#5b5b5b";
      
      return "#003d3d"; // Default color
    }};
  ` : null;

  return (
    <WeatherContainer>
      {weatherInfo.icon && (
        <div>
          <IconContainerWrapper>
            <MdKeyboardArrowLeft onClick={prevCity} size={72}/>
            <IconContainer tabIndex={8}>
              {currentCityKorean} <WeatherIcon weather={weatherInfo.weather} size={72} aria-label={`현재 ${currentCityKorean}의 날씨는 ${Math.round(weatherInfo.temp)}도 로 ${weatherInfo.weather} 입니다.`}/> {Math.round(weatherInfo.temp)}°C {weatherInfo.weather}
            </IconContainer>
            <MdKeyboardArrowRight onClick={nextCity} size={72}/>
          </IconContainerWrapper>
        </div>
      )}
    </WeatherContainer>
  );
}

export default WeatherCurrentSimple;