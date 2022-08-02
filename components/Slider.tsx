import React from 'react'
import Link from 'next/link'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { IPropsSlider } from '../interface/interface'

const Slider = (props: IPropsSlider) => {
  return (
    <>
      <div className="mt-2 pl-12 pr-20" >
        <div className="relative w-full mt-20 pr-4 pt-12 slide" style={{background: 'radial-gradient(50% 849.33% at 50% 50%, rgba(248, 249, 250, 0) 58.33%, #F8F9FA 100%)'}}>
          <div
            className={`px-12 py-4 text-2xl font-bold underline mb-5 z-10 absolute top-1 ${
              props.title === '' ? 'mt-10' : ''
            }`}
          >
            {props.title}
          </div>
          <div className="absolute fade-left top-0"></div>
          <div className="absolute mx-auto fade-right top-0"></div>
          <div className="mt-6 px-12 py-4">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={5}
              centeredSlides={false}
              navigation
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
            >
              {props.images.map((item, index) => (
                <SwiperSlide key={index} virtualIndex={index}>
                  {item}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  )
}

export default Slider
