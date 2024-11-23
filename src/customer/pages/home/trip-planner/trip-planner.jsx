import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { destinations } from '../../../../data/destinationData';
import {
    faUmbrellaBeach,
    faMountainSun,
    faCity,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from 'react';
import { IoCaretBackCircleOutline, IoCaretForwardCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const CustomTab = ({ label, isActive, onClick }) => (
    <div className={`p-2 text-sm border border-transparent rounded-full cursor-pointer ${isActive ? 'text-blue-500 bg-gray-200 border-blue-500' : 'hover:bg-gray-200'}`} onClick={onClick}>
        {label}
    </div>
);

const TripPlanner = () => {
    const [activeTab, setActiveTab] = useState('Beach');
    const [slidesPerView, setSlidesPerView] = useState(6);

    const handleTabSelect = (key) => {
        setActiveTab(key);
    };

    useEffect(() => {
        const updateSlidesPerView = () => {
            if (window.innerWidth <= 46.1875 * 16) {  // Convert em to px
                setSlidesPerView(4);
            } else {
                setSlidesPerView(6);
            }
        };

        window.addEventListener('resize', updateSlidesPerView);
        updateSlidesPerView();  // Set initial value when the page loads

        return () => {
            window.removeEventListener('resize', updateSlidesPerView);
        };
    }, []);

    return (
        <div className="flex flex-col justify-center w-full">
            <div className="flex space-x-4 mb-2 overflow-x-auto">
                <CustomTab
                    label={
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faUmbrellaBeach} />
                            <div>Bãi biển</div>
                        </div>
                    }
                    isActive={activeTab === 'Beach'}
                    onClick={() => handleTabSelect('Beach')}
                />
                <CustomTab
                    label={
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faMountainSun} />
                            <div>Thiên nhiên</div>
                        </div>
                    }
                    isActive={activeTab === 'Outdoors'}
                    onClick={() => handleTabSelect('Outdoors')}
                />
                <CustomTab
                    label={
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faCity} />
                            <div>Thành phố</div>
                        </div>
                    }
                    isActive={activeTab === 'City'}
                    onClick={() => handleTabSelect('City')}
                />
            </div>

            <div className={`${activeTab === 'Beach' ? 'block' : 'hidden'} w-full max-w-[1200px] relative`}>
                <Swiper
                    navigation={{
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next',
                    }}
                    modules={[Navigation]}
                    slidesPerView={slidesPerView}
                    spaceBetween={16}
                    loop={false}
                    className="swiper-container"
                >
                    {destinations.map((destination, index) => {
                        if (destination.type === 'Beach')
                            return (
                                <SwiperSlide key={index} className="swiper-slide">
                                    <Link to={`/hotels/search?type=${destination.name}&page=0`} className="overflow-hidden cursor-pointer flex flex-col items-center">
                                        <img src={destination.image} alt="" className="rounded-lg w-full h-[136px] object-cover md:h-[100px]" />
                                        <div>
                                            <h5 className="text-lg md:text-base font-bold">{destination.name}</h5>
                                            <h5 className="text-gray-700 font-normal mt-1 text-sm md:text-xs">Cách đây {Math.floor(Math.random() * 500) + 1} km</h5>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            )
                    })}
                    <div className="absolute top-1/2 transform -translate-y-1/2 swiper-button-prev">
                    </div>
                    <div className="absolute top-1/2 transform -translate-y-1/2 swiper-button-next">
                    </div>
                </Swiper>
            </div>

            <div className={`${activeTab === 'Outdoors' ? 'block' : 'hidden'} w-full max-w-[1200px] relative`}>
                <Swiper
                    navigation={{
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next',
                    }}
                    modules={[Navigation]}
                    slidesPerView={slidesPerView}
                    spaceBetween={16}
                    loop={false}
                    className="swiper-container"
                >
                    {destinations.map((destination, index) => {
                        if (destination.type === 'Outdoors')
                            return (
                                <SwiperSlide key={index} className="swiper-slide">
                                    <Link to={`/hotels/search?type=${destination.name}&page=0`} className="overflow-hidden cursor-pointer flex flex-col items-center">
                                        <img src={destination.image} alt="" className="rounded-lg w-full h-[136px] object-cover md:h-[100px]" />
                                        <div>
                                            <h5 className="text-lg md:text-base font-bold">{destination.name}</h5>
                                            <h5 className="text-gray-700 font-normal mt-1 text-sm md:text-xs">Cách đây {Math.floor(Math.random() * 500) + 1} km</h5>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            )
                    })}
                    <div className="absolute top-1/2 transform -translate-y-1/2 swiper-button-prev">
                    </div>
                    <div className="absolute top-1/2 transform -translate-y-1/2 swiper-button-next">
                    </div>
                </Swiper>
            </div>

            <div className={`${activeTab === 'City' ? 'block' : 'hidden'} w-full max-w-[1200px] relative`}>
                <Swiper
                    navigation={{
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next',
                    }}
                    modules={[Navigation]}
                    slidesPerView={slidesPerView}
                    spaceBetween={16}
                    loop={false}
                    className="swiper-container"
                >
                    {destinations.map((destination, index) => {
                        if (destination.type === 'City')
                            return (
                                <SwiperSlide key={index} className="swiper-slide">
                                    <Link to={`/hotels/search?type=${destination.name}&page=0`} className="overflow-hidden cursor-pointer flex flex-col items-center">
                                        <img src={destination.image} alt="" className="rounded-lg w-full h-[136px] object-cover md:h-[100px]" />
                                        <div>
                                            <h5 className="text-lg md:text-base font-bold">{destination.name}</h5>
                                            <h5 className="text-gray-700 font-normal mt-1 text-sm md:text-xs">Cách đây {Math.floor(Math.random() * 500) + 1} km</h5>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            )
                    })}
                    <div className="absolute top-1/2 transform -translate-y-1/2 swiper-button-prev">
                    </div>
                    <div className="absolute top-1/2 transform -translate-y-1/2 swiper-button-next">
                    </div>
                </Swiper>
            </div>
        </div>
    )
}

export default TripPlanner;