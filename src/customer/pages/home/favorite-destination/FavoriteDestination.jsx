import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChartArea } from "react-icons/fa";
import { FaTreeCity } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";

function FavoriteDestination() {
    const tabsData = {
        regions: [
            { name: 'Hanoi', rooms: 150 },
            { name: 'Ho Chi Minh City', rooms: 200 },
            { name: 'Danang', rooms: 120 },
            { name: 'Nha Trang', rooms: 180 },
            { name: 'Hue', rooms: 90 },
            { name: 'Paris', rooms: 300 },
            { name: 'New York', rooms: 250 },
            { name: 'Tokyo', rooms: 180 },
            { name: 'Sydney', rooms: 200 },
            { name: 'Barcelona', rooms: 120 },
            { name: 'London', rooms: 220 },
            { name: 'Berlin', rooms: 160 },
            { name: 'Rome', rooms: 130 },
            { name: 'Cairo', rooms: 100 },
            { name: 'Mumbai', rooms: 170 },
            { name: 'Sydney', rooms: 200 },
            { name: 'Beijing', rooms: 240 },
            { name: 'Moscow', rooms: 110 },
        ],
        cities: [
            { name: 'Paris', rooms: 300 },
            { name: 'New York', rooms: 250 },
            { name: 'Tokyo', rooms: 180 },
            { name: 'Sydney', rooms: 200 },
            { name: 'Barcelona', rooms: 120 },
            { name: 'London', rooms: 220 },
            { name: 'Berlin', rooms: 160 },
            { name: 'Rome', rooms: 130 },
            { name: 'Cairo', rooms: 100 },
            { name: 'Mumbai', rooms: 170 },
            { name: 'Sydney', rooms: 200 },
            { name: 'Beijing', rooms: 240 },
            { name: 'Moscow', rooms: 110 },
            { name: 'Los Angeles', rooms: 280 },
            { name: 'Dubai', rooms: 150 },
            { name: 'Istanbul', rooms: 190 },
            { name: 'Toronto', rooms: 210 },
            { name: 'Rio de Janeiro', rooms: 140 },
            { name: 'Bangkok', rooms: 230 },
        ],
        placesOfInterest: [
            { name: 'Eiffel Tower', rooms: 50 },
            { name: 'Statue of Liberty', rooms: 80 },
            { name: 'Mount Fuji', rooms: 30 },
            { name: 'Sydney Opera House', rooms: 40 },
            { name: 'Sagrada Familia', rooms: 20 },
            { name: 'Great Wall of China', rooms: 60 },
            { name: 'Red Square', rooms: 25 },
            { name: 'Colosseum', rooms: 35 },
            { name: 'Giza Pyramids', rooms: 15 },
            { name: 'Gateway of India', rooms: 45 },
            { name: 'Opera House, Sydney', rooms: 55 },
            { name: 'Forbidden City', rooms: 65 },
            { name: 'Kremlin', rooms: 28 },
            { name: 'Hollywood Sign', rooms: 75 },
            { name: 'Burj Khalifa', rooms: 95 },
            { name: 'Blue Mosque', rooms: 22 },
            { name: 'CN Tower', rooms: 85 },
            { name: 'Christ the Redeemer', rooms: 32 },
            { name: 'Wat Arun', rooms: 42 },
        ],
    };

    const [activeTab, setActiveTab] = useState('regions');
    const numRows = 5;

    const handleTabSelect = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="bg-white w-full text-sm ">
            <div className="border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="me-2">
                        <button
                            className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${activeTab === 'regions' ? 'text-blue-600 border-blue-600' : ''}`}
                            onClick={() => handleTabSelect('regions')}
                        >
                            <FaChartArea />
                            Khu vực
                        </button>
                    </li>
                    <li className="me-2">
                        <button
                            className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${activeTab === 'cities' ? 'text-blue-600 border-blue-600' : ''}`}
                            onClick={() => handleTabSelect('cities')}
                        >
                            <FaTreeCity />
                            Thành phố
                        </button>
                    </li>
                    <li className="me-2">
                        <button
                            className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${activeTab === 'placesOfInterest' ? 'text-blue-600 border-blue-600' : ''}`}
                            onClick={() => handleTabSelect('placesOfInterest')}
                        >
                            <FaMapLocationDot />
                            Địa điểm nổi bật
                        </button>
                    </li>
                </ul>
            </div>
            <div className="tab-content border-t border-gray-300 rounded-b-md bg-white">
                {activeTab === 'regions' && (
                    <div id="regions-content">
                        <div className="flex flex-wrap">
                            {Array.from({ length: 5 }, (_, i) => (
                                <div key={i} className="w-full md:w-1/5 p-2">
                                    {tabsData.regions
                                        .slice(i * numRows, i * numRows + numRows)
                                        .map((item, index) => (
                                            <div key={index} className="mb-4">
                                                <Link to="/" className="font-bold text-blue-600">{item.name}</Link>
                                                <div>{`${item.rooms} chỗ nghỉ`}</div>
                                            </div>
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {activeTab === 'cities' && (
                    <div id="cities-content">
                        <div className="flex flex-wrap">
                            {Array.from({ length: 5 }, (_, i) => (
                                <div key={i} className="w-full md:w-1/5 p-2">
                                    {tabsData.cities
                                        .slice(i * numRows, i * numRows + numRows)
                                        .map((item, index) => (
                                            <div key={index} className="mb-4">
                                                <Link to="/" className="font-bold text-blue-600">{item.name}</Link>
                                                <div>{`${item.rooms} chỗ nghỉ`}</div>
                                            </div>
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {activeTab === 'placesOfInterest' && (
                    <div id="placesOfInterest-content">
                        <div className="flex flex-wrap">
                            {Array.from({ length: 5 }, (_, i) => (
                                <div key={i} className="w-full md:w-1/5 p-2">
                                    {tabsData.placesOfInterest
                                        .slice(i * numRows, i * numRows + numRows)
                                        .map((item, index) => (
                                            <div key={index} className="mb-4">
                                                <Link to="/" className="font-bold text-blue-600">{item.name}</Link>
                                                <div>{`${item.rooms} chỗ nghỉ`}</div>
                                            </div>
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoriteDestination;