import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import { Navigation } from 'swiper/modules';

const CardSlick = ({ reviews }) => {
    const getRandomColor = () => {
        const colors = ['#E23A3A', '#2F46E5', 'green', 'purple', 'orange', '#1BAAAF'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    return (
        <div className="flex w-full max-w-[1100px] justify-between relative gap-[18px]">
            <Swiper
                navigation={true}
                modules={[Navigation]}
                slidesPerView={3}
                spaceBetween={16}
                className="mySwiper"
            >
                {reviews?.map((review, index) => (
                    <SwiperSlide key={index} className="border border-[#e7e7e7]">
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: getRandomColor() }} aria-label="recipe">
                                    {review.fullName[0]}
                                </Avatar>
                            }
                            title={review.fullName}
                            subheader={review.reviewDate}
                        />
                        <div className="px-4 pb-4">
                            <h5 className="text-[#474747] font-normal mt-1 text-sm tracking-[0.3px]">
                                {review.content}
                            </h5>
                            <Button size="small">Đọc thêm</Button>
                        </div>
                        <span className="absolute top-4 right-4 bg-[#003B95] text-white h-8 w-8 text-center leading-8 font-bold rounded-tl-lg rounded-br-lg">
                            {review.rating}
                        </span>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CardSlick;
