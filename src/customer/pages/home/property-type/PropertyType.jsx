import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { propertyTypes } from '../../../../data/propertyTypeSample';
import { IoCaretBackCircleOutline, IoCaretForwardCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const PropertyType = () => {
    const navigate = useNavigate();

    const slidesPerView = 4;



    function handleSearch(typeName) {
        navigate(`/hotels/search?type=${typeName}&page=0`);
    }
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
                    {propertyTypes.map((propertyType, i) => (
                        <SwiperSlide key={i} className="swiper-slide" onClick={() => handleSearch(propertyType.type)}>
                            <div className="overflow-hidden cursor-pointer flex flex-col items-center">
                                <img
                                    src={propertyType.image}
                                    alt={propertyType.label}
                                    className="rounded-lg w-full h-[210px] object-cover md:h-[130px]"
                                    style={{ height: '210px' }}
                                />
                                <div className="text-center mt-2">
                                    <h5 className="text-lg font-bold">{propertyType.label}</h5>
                                    <h5 className="text-gray-700 font-normal mt-1 text-sm">0 chỗ nghỉ</h5>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className="absolute top-1/2  transform -translate-y-1/2 swiper-button-prev">
                    </div>
                    <div className="absolute top-1/2  transform -translate-y-1/2 swiper-button-next">
                    </div>
                </Swiper>
            </div>
        </div>
    );
};

export default PropertyType;
