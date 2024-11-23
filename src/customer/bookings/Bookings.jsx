import React, { useState } from 'react';
import { bookingSampleData } from '../../data/bookingSampleData.js';
import Footer from '../footer/Footer.jsx';

export default function Bookings() {
    const [isRatingOpen, setIsRatingOpen] = useState(false); // State để mở popup form
    const [currentRating, setCurrentRating] = useState({ rating: '', comment: '' }); // State lưu dữ liệu đánh giá
    const [selectedBooking, setSelectedBooking] = useState(null); // State lưu booking hiện tại

    const handleOpenRatingForm = (bookingId) => {
        setSelectedBooking(bookingId);
        setIsRatingOpen(true);
    };

    const handleCloseRatingForm = () => {
        setIsRatingOpen(false);
        setCurrentRating({ rating: '', comment: '' });
    };

    const handleSubmitRating = () => {
        console.log("Đánh giá:", currentRating);
        console.log("Booking ID:", selectedBooking);


        handleCloseRatingForm();
    };

    return (
        <div>
            <div className="flex justify-center w-full font-sans bg-[#f0ffff87]">
                <div className="w-full max-w-[1100px]">
                    <div className="my-8">
                        <div className="text-2xl font-semibold">BOOKINGS</div>
                        <div className="text-xs">HOME {'>'} BOOKINGS</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {bookingSampleData?.map(booking => (
                            <div className="border border-white p-3 mb-6 bg-white shadow-md rounded-lg text-sm" key={booking.id}>
                                <div className="font-bold mb-2">{booking?.hotelName}</div>
                                <div className="mb-4">{`Tổng giá đặt phòng: ${booking.totalPrice.toLocaleString('vi-VN')} VND`}</div>
                                <div className="flex flex-col mb-4">
                                    <div><span className="font-bold">Check in: </span>{booking.checkInDate}</div>
                                    <div><span className="font-bold">Check out: </span>{booking.checkOutDate}</div>
                                    <div><span className="font-bold">Người lớn: </span>{booking.adults}</div>
                                    <div><span className="font-bold">Trẻ em: </span>{booking.children}</div>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <div><span className="font-bold">Danh sách phòng: </span>{booking.rooms.map(room => room.roomNumber).join(', ')}</div>
                                    <div><span className="font-bold">Order ID: </span>{booking.id}</div>
                                </div>
                                <div>
                                    <span className={`status ${booking.bookingStatus} px-2 py-1 rounded text-white ${booking.bookingStatus === 'ACCEPTED' ? 'bg-green-500' : booking.bookingStatus === 'PENDING' ? 'bg-yellow-500' : 'bg-red-500'}`}>{booking.bookingStatus}</span>
                                </div>
                                <div className="mt-3">
                                    <button className="bg-black text-white border border-black rounded px-2 py-1 mr-2 mt-3">Download PDF</button>
                                    {booking.isRated ? (
                                        <button className="bg-black text-white border border-black rounded px-2 py-1 mt-3">
                                            &#10004; Đã đánh giá
                                        </button>
                                    ) : (
                                        <button
                                            className="bg-black text-white border border-black rounded px-2 py-1 mt-3"
                                            onClick={() => handleOpenRatingForm(booking.id)}
                                        >
                                            Đánh giá về khách sạn
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Popup form đánh giá */}
                {isRatingOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-5 rounded shadow-lg w-[400px]">
                            <h2 className="text-xl font-semibold mb-4">Đánh giá khách sạn</h2>
                            <div className="mb-3">
                                <label className="block mb-1">Điểm đánh giá (1-5):</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={currentRating.rating}
                                    onChange={(e) => setCurrentRating({ ...currentRating, rating: e.target.value })}
                                    className="w-full px-2 py-1 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Nhận xét:</label>
                                <textarea
                                    value={currentRating.comment}
                                    onChange={(e) => setCurrentRating({ ...currentRating, comment: e.target.value })}
                                    className="w-full px-2 py-1 border rounded"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    className="bg-gray-500 text-white rounded px-4 py-2 mr-2"
                                    onClick={handleCloseRatingForm}
                                >
                                    Hủy
                                </button>
                                <button
                                    className="bg-blue-500 text-white rounded px-4 py-2"
                                    onClick={handleSubmitRating}
                                >
                                    Gửi đánh giá
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
