import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { destinations } from '../../../../data/destinationData';
import { IoCaretBackCircleOutline, IoCaretForwardCircleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Explore = () => {
    const slidesPerView = 4;

    return (
        <div className="flex justify-center w-full">
            <div className="w-full max-w-[1200px] relative">
                <Swiper
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    modules={[Navigation]}
                    slidesPerView={slidesPerView}
                    spaceBetween={16}
                    loop={true}
                    className="swiper-container"
                >
                    {destinations.map((destinations, i) => (
                        <SwiperSlide key={i} className="swiper-slide">
                            <Link to={`/hotels/search?type=${destinations.name}&page=0`} className="overflow-hidden cursor-pointer flex flex-col items-center">
                                <img
                                    src={destinations.image}
                                    alt={destinations.label}
                                    className="rounded-lg w-full h-[140px] object-cover md:h-[130px]"
                                    style={{ height: '140px' }}
                                />
                                <div className="text-center mt-2">
                                    <h5 className="text-lg font-bold">{destinations.name}</h5>
                                    <h5 className="text-gray-700 font-normal mt-1 text-sm">0 chỗ nghỉ</h5>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                    <div className="absolute top-1/2 transform -translate-y-1/2 swiper-button-prev">
                    </div>
                    <div className="absolute top-1/2 transform -translate-y-1/2 swiper-button-next">
                    </div>
                </Swiper>
            </div>
        </div>
    );
};

export default Explore;
