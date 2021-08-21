import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'
import {NavLink} from 'react-router-dom'
import SwiperCore, { Navigation, Pagination, Scrollbar,Autoplay,Lazy } from 'swiper/core';
SwiperCore.use([Navigation, Pagination, Scrollbar,Autoplay,Lazy]);


function Caro(props) {
    
    return (
        <div className="carosel">
            <div className="container">
            <h2>{props.title}</h2>
             <Swiper
      slidesPerView={'auto'} centeredSlides={true} spaceBetween={30} pagination={{
        "clickable": true
      }}
      navigation
      
      loop={true}
    > { props.pdata?
        props.pdata.map((val)=>{
            return <SwiperSlide>
            <div className="carddiv">
                <div className="img">
                    <img src={val.pic} alt="img1" className="img-fluid"/>
                </div>
                <div className="carddetails">
                    <h3>{val.name}</h3>
                    <h4>28.00 wax <span>($3.73)</span></h4>
                    <div className="card_btn">
                        <NavLink to={`/detail/${val.id}`} ><button className="detailbtn">Detail</button></NavLink> 
                        <button className="buybtn">Buy Now</button>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        }):null
    }
      
  
      
    </Swiper>
            
        </div>
        </div>
    )
}

export default Caro
