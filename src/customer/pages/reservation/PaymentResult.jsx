import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from '../../../api/AxiosConfig';
import dayjs from "dayjs";

const removeQueryParams = () => {
  const url = new URL(window.location);
  url.search = ''; // Xóa tất cả query parameters
  window.history.pushState({}, '', url);
};

const PaymentResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchPaymentResult = async () => {
      try {
        if (location.search) {
          const response = await api.get(`/payment/vnpay-payment-return${location.search}`);
          await api.patch(`/bookings/${response.data.orderId}`, { status: "PAID" });
          removeQueryParams();
          setResult(response.data);
        } else navigate("/");
      } catch (error) {
        console.error("Lỗi khi lấy kết quả thanh toán: ", error);
      }
    };
    fetchPaymentResult();
  }, []);

  if (!result) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-80 rounded-lg shadow-lg p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-blue-100 text-blue-500 animate-spin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-8 h-8 animate-spin"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v4m0 4v4m4-8h4m-4 4h4m-8 4h4m-4-8H8m4 0H8m4-4H8"
              />
            </svg>
          </div>
          <h1 className="text-lg font-semibold">Đang xử lý...</h1>
          <p className="text-gray-600 mt-2">Xin vui lòng chờ trong giây lát.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-96 rounded-lg shadow-lg p-6 text-center">
        <div
          className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${result.paymentStatus === 1 ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
            }`}
        >
          {result.paymentStatus === 1 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>
        {result.paymentStatus === 1 ?
          <>
            <h1 className="text-xl font-semibold">
              Thanh toán thành công
            </h1>
            <p className="text-gray-600 mt-2">Mã giao dịch: {result.transactionId}</p>
            <p className="text-gray-600">Số tiền: {result.totalPrice / 100} VNĐ</p>
            <p className="text-gray-600">Thời gian thanh toán: {dayjs(result.paymentTime).format('HH:mm:ss DD/MM/YYYY')}</p>
          </> :
          <h1 className="text-xl font-semibold">
            Thanh toán thất bại
          </h1>}
        <button
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => window.location.href = "/"}
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default PaymentResult;