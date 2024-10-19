import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faBell } from '@fortawesome/free-solid-svg-icons';
import 'tippy.js/dist/tippy.css';

const Navbar = ({ userFullName }) => {
    return (
        <div className="h-16 bg-[#003580] flex justify-center font-sans">
            <div className="w-full max-w-[1100px] text-white flex items-center justify-between px-4">
                <span className="text-2xl font-bold cursor-pointer">TravelBK</span>
                {userFullName ? (
                    <div className="flex items-center gap-2">
                        <div className="flex space-x-2">
                            <div className="bg-[#003580] text-white py-2 px-3 rounded hover:bg-[#0c50b0] font-bold cursor-pointer">VND</div>
                            <div className="bg-[#003580] text-white py-2 px-3 rounded hover:bg-[#0c50b0] cursor-pointer">VN</div>
                            <div className="bg-[#003580] text-white py-2 px-3 rounded hover:bg-[#0c50b0] cursor-pointer">
                                <FontAwesomeIcon icon={faCircleQuestion} />
                            </div>
                            <div className="bg-[#003580] text-white py-2 px-3 rounded hover:bg-[#0c50b0] cursor-pointer">
                                <FontAwesomeIcon icon={faBell} />
                            </div>
                            <a href="/business/register" className="bg-[#003580] text-white py-2 px-3 rounded hover:bg-[#0c50b0]">
                                Đăng chỗ nghỉ của quý vị
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <div className="flex space-x-2">
                            <div className="bg-[#003580] text-white py-2 px-3 rounded hover:bg-[#0c50b0] cursor-pointer">VND</div>
                            <div className="bg-[#003580] text-white py-2 px-3 rounded hover:bg-[#0c50b0] cursor-pointer">VN</div>
                            <div className="bg-[#003580] text-white py-2 px-3 rounded hover:bg-[#0c50b0] cursor-pointer">
                                <FontAwesomeIcon icon={faCircleQuestion} />
                            </div>
                            <a href="/business/register" className="bg-[#003580] text-white py-2 px-3 rounded hover:bg-[#0c50b0]" target="_blank" rel="noopener noreferrer">
                                Đăng chỗ nghỉ của quý vị
                            </a>
                        </div>
                        <div className="flex gap-2">
                            <button className="bg-white text-[#006ce4] border border-transparent rounded px-4 py-1 hover:bg-gray-100" >Đăng ký</button>
                            <button className="bg-white text-[#006ce4] border border-transparent rounded px-4 py-1 hover:bg-gray-100" >Đăng nhập</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
