import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import HeadlessTippy from "@tippyjs/react/headless";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const authContext = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));
  const [userFullName, setUserFullName] = useState(user?.userFullName);

  const getInitials = (name) => {
    const firstWord = name.split(" ")[0];
    return firstWord ? firstWord[0].toUpperCase() : "";
  };
  const getRandomColor = () => {
    const predefinedColors = [
      "#b16e4b",
      "#f24444",
      "#f39c12",
      "#1abc9c",
      "#f35ea3",
    ];

    const randomColorIndex = Math.floor(
      Math.random() * predefinedColors.length
    );
    return predefinedColors[randomColorIndex];
  };
  const avatarBackgroundColor = getRandomColor();

  const renderAvatar = (name, backgroundColor) =>
    user.userImage ? (
      <img className="w-9 h-9 leading-[36px] text-center object-cover rounded-full text-[25px]" src={user.userImage} />
    ) : (
      <div className="w-9 h-9 leading-[36px] text-center object-cover rounded-full text-[25px]" style={{ backgroundColor, color: "#fff" }}>
        {getInitials(name)}
      </div>
    );
  const handleLogoutClick = (logoutType) => {
    if (logoutType === "navigate") {
      // Perform any logout actions if needed
      // For now, let's navigate to the Bookings page
      navigate(`/bookings`);
    } else if (logoutType === "setUserFalse") {
      authContext.handleLogout();
    }
  };
  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <div className="h-16 bg-[#003580] flex justify-center font-sans">
      <div className="w-full max-w-[1100px] text-white flex items-center justify-between">
        <span
          className="text-3xl font-bold cursor-pointer"
          onClick={handleLogoClick}
        >
          TravelBK
        </span>
        {userFullName ? (
          <div className="flex items-center gap-2">
            <div className="flex space-x-2">
              <div className="bg-[#003580] text-white py-2 px-3 rounded hover:bg-[#0c50b0] cursor-pointer">
                VND
              </div>
              <div className="bg-[#003580] text-white py-2 px-3 rounded hover:bg-[#0c50b0] cursor-pointer">
                VN
              </div>
              <div className="bg-[#003580] text-white py-2 px-3 rounded hover:bg-[#0c50b0] cursor-pointer">
                <FontAwesomeIcon icon={faCircleQuestion} />
              </div>
              <div className="bg-[#003580] text-white py-2 px-3 rounded hover:bg-[#0c50b0] cursor-pointer">
                <FontAwesomeIcon icon={faBell} />
              </div>
              <a
                href="/business/register"
                className="bg-[#003580] text-white py-2 px-3 rounded hover:bg-[#0c50b0] no-underline"
                target="_blank"
              >
                Đăng chỗ nghỉ của quý vị
              </a>
            </div>
            <HeadlessTippy
              placement="bottom"
              trigger="click"
              interactive="true"
              appendTo={() => document.body}
              render={(attrs) => (
                <div className="" tabIndex="-1" {...attrs}>
                  <div className="absolute top-[-2px] right-[-88px] bg-white text-black py-[4px] w-[170px] rounded-[6px] shadow-[3px_3px_5px_0px_black]">
                    <div
                      className="flex items-center gap-[10px] p-[10px] cursor-pointer"
                      onClick={() => handleLogoutClick("navigate")}
                    >
                      <div className="flex items-center w-[18px] h-[18px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12.541 21.325l-9.588-10a4.923 4.923 0 1 1 6.95-6.976l1.567 1.566a.75.75 0 0 0 1.06 0l1.566-1.566a4.923 4.923 0 0 1 6.963 6.962l-9.6 10.014h1.082zm-1.082 1.038a.75.75 0 0 0 1.082 0l9.59-10.003a6.418 6.418 0 0 0-.012-9.07 6.423 6.423 0 0 0-9.083-.001L11.47 4.854h1.06l-1.566-1.566a6.423 6.423 0 1 0-9.082 9.086l9.577 9.99z"></path>
                        </svg>
                      </div>
                      <div className="font-light text-[14px]">
                        Lịch sử đặt phòng
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-[10px] p-[10px] cursor-pointer"
                      onClick={() => handleLogoutClick("setUserFalse")}
                    >
                      <div className="flex items-center w-[18px] h-[18px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 128 128"
                        >
                          <path d="M1.19 66.83l20 20a4.002 4.002 0 1 0 5.66-5.66L13.67 68H88a4 4 0 0 0 0-8H13.67l13.18-13.17a4.002 4.002 0 1 0-5.66-5.66l-20 20c-.183.186-.35.387-.5.6 0 0 0 .11-.08.16a3 3 0 0 0-.28.53 2.25 2.25 0 0 0-.08.24 3 3 0 0 0-.15.51 3.94 3.94 0 0 0 0 1.58c.036.174.086.344.15.51.022.081.049.162.08.24.076.182.17.357.28.52 0 .06.05.11.08.16.15.216.317.42.5.61zm31.13 35c20.876 19.722 53.787 18.787 73.509-2.089 14.874-15.743 18.432-39.058 8.931-58.521-10.77-22.12-42-37.41-69.52-24a52 52 0 0 0-12.91 8.93 4.004 4.004 0 0 1-5.49-5.83 60.002 60.002 0 0 1 14.9-10.29C67.26-2.37 106.48 6 122 37.74c14.519 29.787 2.142 65.704-27.645 80.223-22.44 10.938-49.308 6.839-67.465-10.293a4 4 0 0 1 5.48-5.82z"></path>
                        </svg>
                      </div>
                      <div className="font-light text-[14px]">Đăng xuất</div>
                    </div>
                  </div>
                </div>
              )}
            >
              <div className="relative flex justify-center items-center gap-[10px] mt-[8px] py-[4px] px-[12px] text-[14px] cursor-pointer">
                {renderAvatar(userFullName, avatarBackgroundColor)}
                <span className="font-semibold">{userFullName}</span>
              </div>
            </HeadlessTippy>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex space-x-2">
              <div className="bg-[#003580] text-white py-2 px-3 rounded hover:bg-[#0c50b0] cursor-pointer">
                VND
              </div>
              <div className="bg-[#003580] text-white py-2 px-3 rounded hover:bg-[#0c50b0] cursor-pointer">
                VN
              </div>
              <div className="bg-[#003580] text-white py-2 px-3 rounded hover:bg-[#0c50b0] cursor-pointer">
                <FontAwesomeIcon icon={faCircleQuestion} />
              </div>
              <a
                href="/business/register"
                className="bg-[#003580] text-white py-2 px-3 rounded hover:bg-[#0c50b0] no-underline"
                target="_blank"
              >
                Đăng chỗ nghỉ của quý vị
              </a>
            </div>
            <div className="flex gap-2">
              <button className="bg-white text-[#006ce4] border border-transparent rounded px-2 py-2 hover:bg-gray-100" onClick={() => navigate("/signup")}>
                Đăng ký
              </button>
              <button className="bg-white text-[#006ce4] border border-transparent rounded px-2 py-2 hover:bg-gray-100" onClick={() => navigate("/login")}>
                Đăng nhập
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
