import React, { useEffect, useState } from 'react';
import api from "../../api/AxiosConfig";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import ModalBootstrap from '../../components/modal/ModalBootstrap';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';
import { bookingSampleData } from '../../data/bookingSampleData.js';
import { usePDF } from 'react-to-pdf';
import { useRef } from 'react';

function Bookings() {
    const [showReviewPopup, setShowReviewPopup] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));
    const [bookingInfo, setBookingInfo] = useState({});
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const { toPDF, targetRef } = usePDF({
        filename: 'simple-receipt.pdf',
    });


    const bookingRefs = useRef({});

    const generatePDF = (bookingId) => {
        const elementRef = bookingRefs.current[bookingId];
        if (elementRef) {
            toPDF({ targetRef: elementRef });
        }
    };


    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const response = await api.get(`/bookings/users/${user?.userId}`);
            const data = await Promise.all(response.data.map(async (booking) => {
                const hotelRes = await api.get(`/business/hotels/${booking.hotelId}`);
                return {
                    ...booking,
                    hotelName: hotelRes.data.name
                }
            }))
            setList(data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }


    const handleRateReviewClick = (id, hotelId) => {
        setBookingInfo({ id, hotelId });
        setShowReviewPopup(true);
    };

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleReviewTextChange = (event) => {
        setReviewText(event.target.value);
    };

    const handleSubmitReview = async () => {
        try {
            await api.post(`/hotels/${bookingInfo.hotelId}/reviews`,
                {
                    bookingId: bookingInfo.id,
                    fullName: user.userFullName,
                    rating: rating,
                    content: reviewText,
                });
            setModalMessage('Gửi đánh giá thành công!');
        } catch (err) {
            setModalMessage(err.response);
        }
        setShowModal(true);
    };

    const handleClosePopup = () => {
        setShowReviewPopup(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        window.location.reload();
    };

    return (
        <div>
            <ModalBootstrap body={modalMessage} showModal={showModal} handleCloseModal={handleCloseModal} />
            {loading && <LoadingSpinner />}
            <Navbar />
            <div className="flex justify-center w-full font-sans bg-[#f0ffff87]">
                <div className="w-full max-w-[1100px]">
                    <div className="my-8">
                        <div className="text-2xl font-semibold">BOOKINGS</div>
                        <div className="text-xs">HOME {'>'} BOOKINGS</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {list?.map(booking => (
                            <div ref={targetRef} className="border border-white p-3 mb-6 bg-white shadow-md rounded-lg text-sm" key={booking.id}>
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
                                    <span className={`status ${booking.bookingStatus} px-2 py-1 rounded text-white ${['ACCEPTED', 'PAID', 'COMPLETED', 'CHECKED_IN'].includes(booking.bookingStatus) ? 'bg-green-500' : booking.bookingStatus === 'PENDING' ? 'bg-yellow-500' : 'bg-red-500'}`}>{booking.bookingStatus}</span>
                                </div>
                                <div className="mt-3">
                                    <button onClick={() => toPDF()} className="bg-black text-white border border-black rounded px-2 py-1 mr-2 mt-3">Download PDF</button>
                                    {booking.isRated ? (
                                        <button className="bg-black text-white border border-black rounded px-2 py-1 mt-3">
                                            &#10004; Đã đánh giá
                                        </button>
                                    ) : booking.bookingStatus === 'COMPLETED' &&
                                    <button
                                        className="bg-black text-white border border-black rounded px-2 py-1 mt-3"
                                        onClick={() => handleRateReviewClick(booking.id, booking.hotelId)}>
                                        Đánh giá về khách sạn
                                    </button>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Popup form đánh giá */}
                {showReviewPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-5 rounded shadow-lg w-[400px]">
                            <h2 className="text-xl font-semibold mb-4">Đánh giá khách sạn</h2>
                            <div className="mb-3">
                                <label className="block mb-1">Điểm đánh giá (1-5):</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={rating}
                                    onChange={handleRatingChange}
                                    className="w-full px-2 py-1 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Nhận xét:</label>
                                <textarea
                                    value={reviewText}
                                    onChange={handleReviewTextChange}
                                    className="w-full px-2 py-1 border rounded"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    className="bg-gray-500 text-white rounded px-4 py-2 mr-2"
                                    onClick={handleClosePopup}
                                >
                                    Hủy
                                </button>
                                <button
                                    className="bg-blue-500 text-white rounded px-4 py-2"
                                    onClick={handleSubmitReview}
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

export default Bookings;