import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { propertyTypes } from '../../../../data/propertyTypeSample';
import { IoCaretBackCircleOutline, IoCaretForwardCircleSharp } from "react-icons/io5";

const PropertyType = () => {
    const slidesPerView = 4;

    const properties = [
        {
            imgSrc:
                'https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1',
            name: 'Aparthotel Stare Miasto',
            city: 'Madrid',
            price: 'Starting from $120',
            rating: { value: '8.9', label: 'Excellent' },
        },
        // Thêm các đối tượng khác tương tự
        {
            imgSrc:
                'https://cf2.bstatic.com/xdata/images/hotel/max1024x768/517725999.jpg?k=60ef6e2bc61a99a4f6cd2bc05dad078c9b9ad18331361cd47a1c91a17fe42653&o=&hp=1',
            name: 'Comfort Suites Airport',
            city: 'Austin',
            price: 'Starting from $140',
            rating: { value: '9.3', label: 'Exceptional' },
        },
        {
            imgSrc:
                'https://cf2.bstatic.com/xdata/images/hotel/square600/95058973.webp?k=c4092495705eab3fad626e8e1a43b1daf7c623e4ea41daf26a201b4417a71709&o=',
            name: 'Four Seasons Hotel',
            city: 'Lisbon',
            price: 'Starting from $99',
            rating: { value: '8.8', label: 'Excellent' },
        },
        {
            imgSrc:
                'https://cf2.bstatic.com/xdata/images/hotel/square600/87375132.webp?k=a3eff4ea2475f3a4de01f017463acd719bddada5e63f87f6c0952f8590498865&o=',
            name: 'Hilton Garden Inn',
            city: 'Berlin',
            price: 'Starting from $105',
            rating: { value: '8.9', label: 'Excellent' },
        },
        {
            imgSrc:
                'https://cf2.bstatic.com/xdata/images/hotel/square600/87375132.webp?k=a3eff4ea2475f3a4de01f017463acd719bddada5e63f87f6c0952f8590498865&o=',
            name: 'Hilton Garden Inn',
            city: 'Berlin',
            price: 'Starting from $105',
            rating: { value: '8.9', label: 'Excellent' },
        },
    ];

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
                    {properties.map((property, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-white rounded-lg shadow-lg">
                                <img src={property.imgSrc} alt="" className="w-full h-48 object-cover rounded-t-lg" />
                                <div className="p-4">
                                    <div className="mb-2">
                                        <span className="block text-sm font-semibold">{property.name}</span>
                                        <span className="block text-xs text-gray-500">{property.city}</span>
                                        <div className="flex items-center mt-2">
                                            <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs">{property.rating.value}</button>
                                            <span className="ml-2 text-xs text-gray-600">{property.rating.label}</span>
                                        </div>
                                    </div>
                                    <span className="block text-sm text-gray-700 font-semibold">{property.price}</span>
                                </div>
                            </div>
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

export default PropertyType;
