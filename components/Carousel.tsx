"use client";

import React, { useState } from "react";
import Image from "next/image";
import img1 from "@public/assets/images/em1.png";
import img2 from "@public/assets/images/em2.png";
import img3 from "@public/assets/images/em3.png";
import img5 from "@public/assets/images/em5.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  return (
    <div className="w-full mx-auto slider-container">
      <Slider
        className="center"
        infinite={true}
        autoplay={true}
        speed={500}
        centerMode={true}
        centerPadding={"100px"}
        ease={"ease"}
        slidesToShow={3}
        slidesToScroll={1}
        responsive={[
          {
            breakpoint: 1024, // medium-sized screens (md)
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 768, // small screens
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      >
        <div>
          <Image src={img1} width={300} height={300} alt="" />
        </div>
        <div>
          <Image src={img2} width={300} height={300} alt="" />
        </div>
        <div>
          <Image src={img3} width={300} height={300} alt="" />
        </div>
        <div>
          <Image src={img5} width={300} height={300} alt="" />
        </div>
        <div>
          <Image src={img5} width={300} height={300} alt="" />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
