import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Image from './Image';
import '../../sliderDots.css';

const CustomSlider = ({ items = [] }) => {
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
        <div className='sticky top-0'>
            <div className="slider-container relative">
                <Slider {...settings}>
                    {items.filter(Boolean).map((item, index) => (
                        <div key={index}>
                            <Image className="w-full" img={item} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default CustomSlider;
