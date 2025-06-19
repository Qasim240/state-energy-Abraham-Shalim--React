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
        autoplaySpeed: 2000,
        adaptiveHeight: true // Ensures proper height for single slide
    };

    // If no items, return null or placeholder
    if (items.length === 0) return null;

    return (
        <div className='sticky top-0'>
            <div className="slider-container relative">
                <Slider {...settings}>
                    {items.map((item, index) => (
                        <div key={index} className="w-full">
                            <Image className="w-full h-auto" img={item} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default CustomSlider;