import React from 'react';
import PropertyType from './property-type/PropertyType';
import Trending from './trending/Trending';
import Explore from './explore/Explore';
import TripPlanner from './trip-planner/trip-planner';
import FeaturedHome from './feature-home/FeatureHome';
import FavoriteDestination from './favorite-destination/FavoriteDestination';
import Navbar from '../../navbar/Navbar';
import Header from '../../header/Header';
import Email from "../../email/Email";
import Footer from "../../footer/Footer";
import "./home.css";

const Homepage = () => {
    return (
        <div>
            <Navbar />
            <Header showTitle={true} />
            <br />
            <div className="home-container">
                <div className="content-container">
                    <h1 className="home-title">Tìm theo loại chỗ nghỉ ở Hà Nội</h1>
                    <PropertyType />
                </div>
                <div className="content-container">
                    <h1 className="home-title">Điểm đến đang thịnh hành</h1>
                    <h3 className="home-describe">Du khách tìm kiếm về Việt Nam cũng đặt chỗ ở những nơi này</h3>
                    <Trending />
                </div>
                <div className="content-container">
                    <h1 className="home-title">Khám phá Việt Nam</h1>
                    <h3 className="home-describe">Các điểm đến phổ biến này có nhiều điều chờ đón bạn</h3>
                    <Explore />
                </div>
                <div className="content-container">
                    <h1 className="home-title">Lên kế hoạch dễ dàng và nhanh chóng</h1>
                    <h3 className="home-describe">Khám phá các điểm đến hàng đầu theo cách bạn thích ở Việt Nam</h3>
                    <TripPlanner />
                </div>
                <div className="content-container">
                    <h1 className="home-title">Địa điểm yêu thích</h1>
                    <h3 className="home-describe">Khám phá các địa điểm được yêu thích</h3>
                    <FavoriteDestination />
                </div>
            </div>
            <Email />
            <Footer />
        </div>
    );
}

export default Homepage;
