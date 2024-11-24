import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useState, useEffect, useRef } from "react";
import 'tippy.js/dist/tippy.css'; // optional
import { useLocation, useNavigate } from "react-router-dom";

function SearchBar({ setShowRooms }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [defaultText, setDefaultText] = useState(true);
  const navigate = useNavigate();
  const handleSearch = (event) => {
    event.preventDefault();
    if (defaultText) {
      setOpenDate(true);
    } else {
      const checkIn = format(date[0].startDate, 'yyyy-MM-dd');
      const checkOut = format(date[0].endDate, 'yyyy-MM-dd');
      searchParams.set('checkIn', checkIn);
      searchParams.set('checkOut', checkOut);
      searchParams.set('adults', options.adult);
      searchParams.set('children', options.children);
      searchParams.set('noRooms', options.room);
      navigate({ search: `?${searchParams.toString()}` });
      setShowRooms(true);
    }
  };
  useEffect(() => {
    if (searchParams.get('checkIn')) {
      setDefaultText(false);
      setDate([{
        startDate: new Date(searchParams.get('checkIn')),
        endDate: new Date(searchParams.get('checkOut')),
        key: 'selection'
      }]);
    }
    setOptions({
      adult: parseInt(searchParams.get('adults')) || 2,
      children: parseInt(searchParams.get('children')) || 0,
      room: parseInt(searchParams.get('noRooms')) || 1,
    })
  }, [])

  const [openDate, setOpenDate] = useState(false)
  const [date, setDate] = useState(
    [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }
    ]
  );
  const handleDateChange = (item) => {
    setDate([item.selection]);
    setDefaultText(false);
  };
  const componentRef = useRef(null);
  const componentRef2 = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (componentRef.current && !componentRef.current.contains(event.target)) {
        setOpenDate(false);
      }
      if (componentRef2.current && !componentRef2.current.contains(event.target)) {
        setOpenOptions(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 2,
    children: 0,
    room: 1,
  });

  const handleOption = (event, name, operation) => {
    event.preventDefault();
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1
      };
    });
  };

  return (
    <form
      className="bg-[#ffb700] flex items-center p-1 rounded-md w-full max-w-fit relative top-7 gap-[3px] h-[49px]"
      action=""
      onSubmit={handleSearch}
    >
      <div
        className="bg-white border border-[#ffb700] rounded-md p-[9px] flex-1"
        ref={componentRef}
      >
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setOpenDate(!openDate)}
        >
          <div className="flex items-center text-black cursor-pointer">
            <span className="text-[#474747] w-[20px] mb-[3px] mr-[8px]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M22.5 13.5v8.25a.75.75 0 0 1-.75.75H2.25a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 .75.75v8.25zm1.5 0V5.25A2.25 2.25 0 0 0 21.75 3H2.25A2.25 2.25 0 0 0 0 5.25v16.5A2.25 2.25 0 0 0 2.25 24h19.5A2.25 2.25 0 0 0 24 21.75V13.5zm-23.25-3h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5zM7.5 6V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0zM18 6V.75a.75.75 0 0 0-1.5 0V6A.75.75 0 0 0 18 6zM5.095 14.03a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm5.845-3.97a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28A1.125 1.125 0 1 0 12 15a1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zM12 18a1.125 1.125 0 1 0 0 2.25A1.125 1.125 0 0 0 12 18a.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm5.845-3.97a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5z"></path>
              </svg>
            </span>
            <span className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap w-full">
              {defaultText
                ? `Ngày nhận phòng - Ngày trả phòng`
                : `${format(date[0].startDate, "EEE, dd/MM/yyyy", {
                  locale: vi,
                })} - ${format(date[0].endDate, "EEE, dd/MM/yyyy", {
                  locale: vi,
                })}`}
            </span>
          </div>
        </div>
        {openDate && (
          <DateRange
            editableDateInputs={true}
            onChange={handleDateChange}
            moveRangeOnFirstSelection={false}
            ranges={date}
            className="absolute top-[58px] left-[335px] z-[6] rounded-bl-[4px] rounded-br-[4px] shadow-[2px_2px_8px_rgba(0,0,0,0.2)]"
            minDate={new Date()}
          />
        )}
      </div>

      <div
        className="bg-white border border-[#ffb700] rounded-md p-[9px] flex-1"
        ref={componentRef2}
      >
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => setOpenOptions(!openOptions)}
        >
          <span className="text-[#474747] w-[20px] mb-[3px]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M16.5 6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zM18 6A6 6 0 1 0 6 6a6 6 0 0 0 12 0zM3 23.25a9 9 0 1 1 18 0 .75.75 0 0 0 1.5 0c0-5.799-4.701-10.5-10.5-10.5S1.5 17.451 1.5 23.25a.75.75 0 0 0 1.5 0z"></path>
            </svg>
          </span>
          <span className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap w-full text-black">
            {`${options.adult} người lớn - ${options.children} trẻ em - ${options.room} phòng`}
          </span>
          <div className="text-black cursor-pointer w-[16px]">
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
        {openOptions && (
          <div className="font-semibold p-[20px] w-[334px] absolute top-[58px] right-[96px] bg-white text-black rounded-[5px] shadow-[0px_0px_10px_-5px_rgba(0,0,0,0.4)] z-[6]">
            <div className="flex justify-between m-[10px]">
              <span className="text-black pt-[10px]">Người lớn</span>
              <div className="flex items-center gap-[10px] text-[16px] text-black border-[1px] border-black rounded-[4px] w-[106px]">
                <button
                  disabled={options.adult <= 1}
                  className="w-[40px] h-[40px] border-0 rounded-[4px] bg-white text-[#006ce4] text-[20px]"
                  onClick={(event) => handleOption(event, "adult", "d")}
                >
                  -
                </button>
                <span>{options.adult}</span>
                <button
                  className="w-[40px] h-[40px] border-0 rounded-[4px] bg-white text-[#006ce4] text-[20px]"
                  onClick={(event) => handleOption(event, "adult", "i")}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex justify-between m-[10px]">
              <span className="pt-[10px]">Trẻ em</span>
              <div className="flex items-center gap-[10px] text-[16px] text-black border-[1px] border-black rounded-[4px] w-[106px]">
                <button
                  disabled={options.children <= 0}
                  className="w-[40px] h-[40px] border-0 rounded-[4px] bg-white text-[#006ce4] text-[20px]"
                  onClick={(event) =>
                    handleOption(event, "children", "d")
                  }
                >
                  -
                </button>
                <span>{options.children}</span>
                <button
                  className="w-[40px] h-[40px] border-0 rounded-[4px] bg-white text-[#006ce4] text-[20px]"
                  onClick={(event) =>
                    handleOption(event, "children", "i")
                  }
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex justify-between m-[10px]">
              <span className="pt-[10px]">Phòng</span>
              <div className="flex items-center gap-[10px] text-[16px] text-black border-[1px] border-black rounded-[4px] w-[106px]">
                <button
                  disabled={options.room <= 1}
                  className="w-[40px] h-[40px] border-0 rounded-[4px] bg-white text-[#006ce4] text-[20px]"
                  onClick={(event) => handleOption(event, "room", "d")}
                >
                  -
                </button>
                <span>{options.room}</span>
                <button
                  className="w-[40px] h-[40px] border-0 rounded-[4px] bg-white text-[#006ce4] text-[20px]"
                  onClick={(event) => handleOption(event, "room", "i")}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="bg-white text-[#006ce4] border border-[#006ce4] items-center mg[10px] rounded-[4px] inline-flex text-[14px] font-medium justify-center leading-[20px] px-[124px] text-center"
              onClick={() => setOpenOptions(!openOptions)}
            >
              Xong
            </button>
          </div>
        )}
      </div>
      <button
        className="bg-[#0071c2] text-white font-medium h-full rounded-md text-lg px-3 hover:bg-[#003580]"
        type="submit"
      >
        Tìm kiếm
      </button>
    </form>
  )
}
export default SearchBar;