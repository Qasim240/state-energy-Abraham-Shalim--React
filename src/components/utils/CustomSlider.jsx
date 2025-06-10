import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { hvac } from '../../../imagesPath';
import Image from './Image';
import '../../sliderDots.css';

const CustomSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000 
  };

  return (
    <div className="slider-container relative">
      <Slider {...settings}>
        {[...Array(4)].map((_, index) => (
          <div key={index}>
            <Image className="w-full" img={hvac} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomSlider;
