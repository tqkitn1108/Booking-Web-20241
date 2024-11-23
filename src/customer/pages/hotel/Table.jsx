import React, { useEffect, useState } from 'react';
import SplitButton from './SplitButton';
import { differenceInDays } from 'date-fns';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import PersonIcon from '@mui/icons-material/Person';
import api from "../../../api/AxiosConfig";
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Table = () => {
  const { hotelId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const stayLength = differenceInDays(new Date(searchParams.get('checkOut')), new Date(searchParams.get('checkIn'))) + 1;
  const [selectedRooms, setSelectedRooms] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [availRoomTypes, setAvailRoomTypes] = useState([]);
  const navigate = useNavigate();

  const handleReservation = () => {
    if (totalPrice === 0) setShowMessage(true);
    else
      navigate(`${location.pathname}/reservation${location.search}`,
        {
          state: {
            roomList: Object.values(selectedRooms).reduce((result, arr) => result.concat(arr), []).map(room => room.id),
            stayLength,
            totalPrice
          }
        });
  };

  useEffect(() => {
    async function loadRooms() {
      try {
        setTotalPrice(0);
        setShowMessage(false);
        if (searchParams.get('checkIn')) {
          const response = await api.get(`/hotels/${hotelId}/roomTypes/available?checkIn=${searchParams.get('checkIn')}&checkOut=${searchParams.get('checkOut')}`);
          setAvailRoomTypes(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    loadRooms();
  }, [location.search]);

  useEffect(() => {
    setTotalPrice(availRoomTypes?.reduce((sum, roomType) => {
      if (selectedRooms[roomType.id] === undefined) selectedRooms[roomType.id] = [];
      return sum + selectedRooms[roomType.id].length * roomType.pricePerNight * stayLength;
    }, 0));
    setShowMessage(false);
  }, [selectedRooms]);

  return (
    <div className="max-w-[1100px] w-full mx-auto flex items-center justify-center text-left">
      {availRoomTypes?.length > 0 ? (
        <div className="w-full">
          <h3 className="hotelTitle mt-5">Phòng trống</h3>
          <table className="border-2 border-[#4b76b2] w-full border-collapse mb-5">
            <thead>
              <tr>
                <th className="bg-[#4c76b2] border-2 border-[#4c76b2] text-left p-2 text-white">Loại phòng</th>
                <th className="bg-[#4c76b2] border-2 border-[#4c76b2] text-left p-2 text-white">Số lượng khách</th>
                <th className="bg-[#4c76b2] border-2 border-[#4c76b2] text-left p-2 text-white">Giá cho {stayLength} đêm</th>
                <th className="bg-[#4c76b2] border-2 border-[#4c76b2] text-left p-2 text-white">Điều kiện hủy bỏ</th>
                <th className="bg-[#4c76b2] border-2 border-[#4c76b2] text-left p-2 text-white">Chọn số lượng</th>
                <th className="bg-[#4c76b2] border-2 border-[#4c76b2] text-left p-2 text-white"></th>
              </tr>
            </thead>
            <tbody>
              {availRoomTypes?.map((roomType, index) => (
                <tr key={roomType.id} className="room-row">
                  <div className="Studio">
                    <h1 className="text-[#0071c2] text-[14px] text-left inline font-bold leading-5">{roomType.title}</h1>
                    {roomType.beds.map((bed, i) => (
                      <p key={i} className="text-[12px] text-[#262626]">{bed}<SingleBedIcon /></p>
                    ))}
                  </div>
                  <td className="border-2 border-[#4c76b2] text-left p-2">
                    {new Array(roomType.capacity).fill(1).map((_, i) => (
                      <PersonIcon key={i} />
                    ))}
                  </td>
                  <td className="border-2 border-[#4c76b2] text-left p-2">
                    VND {(roomType.pricePerNight * stayLength).toLocaleString('vi-VN')}
                  </td>
                  <td className="border-2 border-[#4c76b2] text-left p-2">Hoàn tiền 100% trong vòng 24h sau đặt cọc</td>
                  <td className="border-2 border-[#4c76b2] text-left p-2">
                    <SplitButton id={roomType.id} setSelectedRooms={setSelectedRooms} />
                  </td>
                  {index === 0 && (
                    <td className="text-center">
                      <div className="flex flex-col items-center">
                        {totalPrice > 0 && <span>Tổng giá {stayLength} đêm: VND {totalPrice.toLocaleString('vi-VN')}</span>}
                        {showMessage && !totalPrice && (
                          <span className="text-red-500">Vui lòng chọn ít nhất một phòng!</span>
                        )}
                        <button
                          onClick={handleReservation}
                          className="bg-[#4c76b2] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#4c76b2]"
                        >
                          Đặt ngay
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h3 className="mt-5 text-center">Ngày bạn chọn đã hết phòng!</h3>
      )}
    </div>
  );
};

export default Table;
