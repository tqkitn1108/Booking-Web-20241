import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faPlane,
  faSuitcaseRolling,
  faCar,
  faLandmark,
  faTaxi,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

export default function Header({ showTitle }) {
  return (
    <div className="header flex justify-center bg-[#003580] text-white">
      <div className="header-container w-full max-w-[1100px] mt-5">
        <div className="header-list flex gap-2 mb-12">
          <div className="header-list-item active flex items-center gap-2 p-2 hover:bg-[#0c50b0] rounded-[20px] border border-white">
            <FontAwesomeIcon icon={faBed} />
            <span>Lưu trú</span>
          </div>
          <div className="header-list-item flex items-center gap-2 p-2 hover:bg-[#0c50b0] rounded-[20px]">
            <FontAwesomeIcon icon={faPlane} />
            <span>Chuyến bay</span>
          </div>
          <div className="header-list-item flex items-center gap-2 p-2 hover:bg-[#0c50b0] rounded-[20px]">
            <FontAwesomeIcon icon={faSuitcaseRolling} />
            <span>Chuyến bay + Khách sạn</span>
          </div>
          <div className="header-list-item flex items-center gap-2 p-2 hover:bg-[#0c50b0] rounded-[20px]">
            <FontAwesomeIcon icon={faCar} />
            <span>Thuê xe</span>
          </div>
          <div className="header-list-item flex items-center gap-2 p-2 hover:bg-[#0c50b0] rounded-[20px]">
            <FontAwesomeIcon icon={faLandmark} />
            <span>Địa điểm tham quan</span>
          </div>
          <div className="header-list-item flex items-center gap-2 p-2 hover:bg-[#0c50b0] rounded-[20px]">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Taxi sân bay</span>
          </div>
        </div>
        {showTitle && (
          <div className="title-banner">
            <h1 className="header-title my-20 text-5xl font-bold leading-[62px] mb-0">
              Tìm chỗ nghỉ tiếp theo
            </h1>
            <p className="header-describe text-2xl leading-8 mb-8">
              Tìm ưu đãi khách sạn, chỗ nghỉ dạng nhà và nhiều hơn nữa...
            </p>
          </div>
        )}
        <div>
          <form className="header-search h-[59px] bg-[#ffb700] flex items-center p-1 rounded-md w-full max-w-[1100px] gap-2">
            <div className="relative flex gap-2">
              <div className="bg-white border border-[#ffb700] rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <span className="text-[#474747] w-5 h-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M2.75 12h18.5c.69 0 1.25.56 1.25 1.25V18l.75-.75H.75l.75.75v-4.75c0-.69.56-1.25 1.25-1.25zm0-1.5A2.75 2.75 0 0 0 0 13.25V18c0 .414.336.75.75.75h22.5A.75.75 0 0 0 24 18v-4.75a2.75 2.75 0 0 0-2.75-2.75H2.75zM0 18v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 0 18zm22.5 0v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0zm-.75-6.75V4.5a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 2.25 4.5v6.75a.75.75 0 0 0 1.5 0V4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 0 1.5 0zm-13.25-3h7a.25.25 0 0 1 .25.25v2.75l.75-.75h-9l.75.75V8.5a.25.25 0 0 1 .25-.25zm0-1.5A1.75 1.75 0 0 0 6.75 8.5v2.75c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75V8.5a1.75 1.75 0 0 0-1.75-1.75h-7z"></path>
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Bạn muốn đến đâu?"
                    className="border-none outline-none w-full text-[14px] font-bold"
                  />
                </div>
              </div>

              <div className="bg-white border border-[#ffb700] rounded-lg p-3">
                <div className="flex items-center cursor-pointer">
                  <span className="text-[#474747] w-5 h-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M22.5 13.5v8.25a.75.75 0 0 1-.75.75H2.25a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 .75.75v8.25zm1.5 0V5.25A2.25 2.25 0 0 0 21.75 3H2.25A2.25 2.25 0 0 0 0 5.25v16.5A2.25 2.25 0 0 0 2.25 24h19.5A2.25 2.25 0 0 0 24 21.75V13.5zm-23.25-3h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5zM7.5 6V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0zM18 6V.75a.75.75 0 0 0-1.5 0V6A.75.75 0 0 0 18 6zM5.095 14.03a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm5.845-3.97a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28A1.125 1.125 0 1 0 12 15a1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zM12 18a1.125 1.125 0 1 0 0 2.25A1.125 1.125 0 0 0 12 18a.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm5.845-3.97a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5z"></path>
                    </svg>
                  </span>
                  <span className="text-gray-700">
                    Ngày nhận phòng - Ngày trả phòng
                  </span>
                </div>
              </div>

              <div className="bg-white border border-[#ffb700] rounded-lg p-3">
                <div className="flex items-center gap-2 cursor-pointer">
                  <span className="text-[#474747] w-5 h-5">
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                  <span className="text-gray-700">
                    1 người lớn - 0 trẻ em - 1 phòng
                  </span>
                </div>
              </div>
            </div>
            <button
              className="header-btn bg-[#0071c2] text-white font-medium h-full rounded-md text-lg px-3 hover:bg-[#003580]"
              type="submit"
            >
              Tìm kiếm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
