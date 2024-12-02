import { Routes, Route } from "react-router-dom";
import React, { useEffect } from 'react';
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import Email from "../../email/Email";
import { RatingComponent } from "../list/SearchItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../../api/AxiosConfig";
import Badges from "./Badge";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Table from "./Table";
import CardSlick from "./CardSlick";
import { useLocation, useParams } from "react-router-dom";
import SearchBar from "./SearchBar";

const Hotel = () => {
  const { hotelId } = useParams();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [hotel, setHotel] = useState({});
  const [showRooms, setShowRooms] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    async function loadHotelData() {
      try {
        if (!searchParams.get('checkIn')) setShowRooms(false);
        const response = await api.get(`/business/hotels/${hotelId}`);
        setHotel(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    loadHotelData();
  }, [])
  const rStars = (value) => {
    const stars = [];
    if (value > 0) {
      for (let i = 0; i < value; i++) {
        stars.push(
          <span key={i} style={{ color: '#FFD700' }}>
            &#9733;
          </span>
        );
      }
    }
    return stars;
  };

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? hotel.photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === hotel.photos.length - 1 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber)
  };

  return (

    <div className="hotel">
      <div className='fixed w-full z-50'><Navbar /></div>
      <div className="flex flex-col items-center w-full max-w-[1100px] mx-auto">
        {open && (
          <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.613)] z-50 flex items-center">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="absolute top-5 right-5 text-[30px] text-[#d4d4d4] cursor-pointer"
              onClick={() => setOpen(false)} />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="m-5 text-[50px] text-[#d4d4d4] cursor-pointer"
              onClick={() => handleMove("l")} />
            <div className="w-full flex justify-center items-center">
              <img src={hotel.photos[slideNumber]} alt="" className="h-[500px] object-cover" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="m-5 text-[50px] text-[#d4d4d4] cursor-pointer"
              onClick={() => handleMove("r")} />
          </div>
        )}
        <div className="w-full flex flex-col gap-2 relative mt-[90px]">
          <div className="absolute top-[60px] right-0 py-[10px] px-[20px] border-none text-black font-bold rounded-[5px] cursor-pointer">
            <span className="font-medium text-sm mr-[10px]"><RatingComponent rating={hotel.rating}></RatingComponent></span>
            <button className="bg-[#0a4fb0] text-white px-2 py-1 font-bold border-none rounded-[7px] shadow-[2px_2px_5px_#000b80]">{hotel.rating?.toFixed(1)}</button>
          </div>
          <h1 className="text-[24px] my-3 font-medium">{hotel.name} {rStars(hotel.star)}</h1>
          <div className="flex items-center gap-2.5">
            <FontAwesomeIcon icon={faLocationDot} style={{ color: "#0071C2" }} />
            <span>{hotel.address}</span>
          </div>
          <span className="text-[#0071c2] font-medium">
            Vị trí xuất sắc - Nằm ngay trên bản đồ
          </span>
          <span className="text-[#008009] font-medium">
            Chúng tôi luôn tận tâm
          </span>
          <div className="grid grid-cols-3 gap-x-1 gap-y-2">
            {hotel.photos?.map((photoSrc, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photoSrc}
                  alt=""
                  className="w-[360px] h-[200px] object-cover cursor-pointer" />
              </div>
            ))}
          </div>
          <div className="flex justify-between gap-[20px] mt-[20px] h-auto">
            <div className="flex-3">
              <h3 className="text-[24px] my-[12px] font-medium">Những tiện nghi được ưa chuộng nhất</h3>
              <Badges hotelFacilites={hotel.facilities} />
              <h3 className="text-[24px] my-[12px] font-medium">Mô tả về chỗ nghỉ</h3>
              <p className="text-[20px]">
                {hotel.description}
              </p>
            </div>
            <div>
              <div className="flex-1 bg-[#ebf3ff] p-[20px] flex flex-col gap-[20px] w-[330px]">
                <h1 className="text-[20px] text-[rgba(0,0,0,0.613)] font-medium">Điểm nổi bật của chỗ nghỉ</h1>
                <span className="text-[14px]">
                  Nằm ở {hotel.dest}, {hotel.type?.label} này có vị trí tuyệt vời
                </span>
                <h1 className="text-[20px] text-[rgba(0,0,0,0.613)] font-medium">Thông tin về bữa sáng</h1>
                <div className="text-[15px] flex items-center gap-2.5">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span className="text-[14px]">Tự chọn, bữa sáng mang đi</span>
                </div>
                <button className="border-none px-5 py-2.5 bg-[#0071c2] text-white font-bold cursor-pointer rounded-[5px]">Đặt ngay</button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[1100px] w-full">
          <SearchBar setShowRooms={setShowRooms} />
          {showRooms ?
            <div className="max-w-[1100px] w-full"><Table /></div> : <h3 className="mt-5 text-center text-[28px] font-medium">Vui lòng chọn ngày để đặt phòng</h3>}
        </div>
        {hotel.reviews?.length > 0 &&
          <div className="max-w-[1100px] w-full">
            <h3 className="text-[24px] my-[12px] font-medium">Đánh giá của khách</h3>
            <div className="slick">
              <CardSlick reviews={hotel.reviews} />
            </div>
          </div>}
      </div>
      <Email />
      <Footer />
    </div>

  );
};

export default Hotel;