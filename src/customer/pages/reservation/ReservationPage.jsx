import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faShuttleVan, faParking, faCheckCircle, faLock, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Formik, Field, Form, ErrorMessage, useFormikContext } from 'formik';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import * as Yup from 'yup';
import api from '../../../api/AxiosConfig';
import Navbar from '../../navbar/Navbar';
import LoadingSpinner from '../../../components/loading-spinner/LoadingSpinner';

const GoodToKnow = () => {
  return (
    <div className="border border-gray-300 rounded-lg p-[15px] mb-3">
      <h4 className="font-medium text-[28px] mb-2"> Mách nhỏ: </h4>
      <div className='no credit'>
        <p className="mb-3"><FontAwesomeIcon icon={faCheckCircle} /> Hỗ trợ nhiều phương thức thanh toán. </p>
        <p className="mb-3"><FontAwesomeIcon icon={faCheckCircle} /> Bạn có thể hủy miễn phí bất kỳ lúc nào, vậy nên hãy chốt mức giá tốt hôm nay. </p>
        <p className="mb-3"><FontAwesomeIcon icon={faCheckCircle} /> Không cần thanh toán hôm nay. Bạn sẽ trả khi đến nghỉ. </p>
      </div>
    </div>
  );
};

const SecurePage = ({ hotelId, location }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const searchParams = new URLSearchParams(location.search);

  const completeBooking = async (values) => {
    const requestData = {
      fullName: values.firstname + ' ' + values.lastname,
      phoneNumber: values.telephone,
      email: values.email,
      roomIds: location.state?.roomList,
      totalPrice: location.state?.totalPrice,
      adults: searchParams.get('adults'),
      children: searchParams.get('children'),
      checkInDate: searchParams.get('checkIn'),
      checkOutDate: searchParams.get('checkOut')
    };
    try {
      const bookingResponse = await api.post(`/bookings/hotels/${hotelId}`, requestData);
      const bookingId = bookingResponse.data.id;
      const response = await api.post(`/payment/create?amount=${requestData.totalPrice}&orderInfo=${bookingId}`);

      const { paymentUrl } = response.data;
      window.location.href = paymentUrl;
    } catch (err) {
      console.log(err);
    }
  };
  const initialValues = {
    firstname: '',
    lastname: '',
    telephone: '',
    email: user?.userEmail || '',
  };

  const validate = (values) => {
    const errors = {};
    if (!values.firstname) {
      errors.firstname = 'Vui lòng điền họ của bạn';
    }

    if (!values.lastname) {
      errors.lastname = 'Vui lòng điền tên của bạn';
    }

    if (!values.telephone) {
      errors.telephone = 'Vui lòng điền số điện thoại của bạn';
    } else if (!/^\d+$/.test(values.telephone)) {
      errors.telephone = 'Số điện thoại không hợp lệ';
    }

    if (!values.email) {
      errors.email = 'Vui lòng điền địa chỉ email của bạn';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Địa chỉ email không hợp lệ';
    }

    return errors;
  };


  return (
    <div>
      <div className='dad'>
        <div className='Login template'>
          <div className='form_container px-9 py-5 rounded bg-white'>
            <Formik
              initialValues={initialValues}
              onSubmit={completeBooking}
              validate={validate}
            >
              <Form className=''>
                <div className='mb-2 d-grid'>
                  <div className='border border-gray-400 rounded-[10px] p-[15px] mb-2' >
                    <h3 className='text-left font-medium text-[28px] mb-2'>Nhập thông tin chi tiết của bạn</h3>
                    <div className=' name form-group d-flex w-100 mb-3 '>
                      <div className=' m-right' style={{ width: '349px' }}>
                        <label htmlFor='firstname' className='form-label' style={{ fontWeight: 'bold' }}>
                          Họ <span className="required text-danger">*</span>
                        </label>
                        <Field
                          id='firstname'
                          type="text"
                          name="firstname"
                          placeholder='Nhập họ của bạn'
                          className='form-control'
                        />
                        <ErrorMessage name="firstname" component="span" className='form-message' style={{ color: 'red' }} />
                      </div>
                      <div className='m-lef ' style={{ marginLeft: '2rem', width: '315px' }}>
                        <label htmlFor='lastname' className='form-label' style={{ fontWeight: 'bold' }}>
                          Tên <span className="required text-danger">*</span>
                        </label>
                        <Field
                          id="lastname"
                          type="text"
                          name="lastname"
                          placeholder='Nhập tên của bạn'
                          className='form-control'
                        />
                        <ErrorMessage name="lastname" component="span" className='form-message' style={{ color: 'red' }} />
                      </div>
                    </div>

                    <div className='mb-3 w-50'>
                      <label htmlFor='telephone' className='form-label ' style={{ fontWeight: 'bold' }}>
                        Số điện thoại <span className="required text-danger">*</span>
                      </label>
                      <Field
                        id="telephone"
                        type="text"
                        name="telephone"
                        placeholder='Nhập số điện thoại'
                        className='form-control'
                      />
                      <ErrorMessage name="telephone" component="span" className='form-message' style={{ color: 'red' }} />
                    </div>
                    <div className='mb-3 w-50'>
                      <label htmlFor='email' className='form-label' style={{ fontWeight: 'bold' }}>
                        Địa chỉ email <span className="required text-danger">*</span>
                      </label>
                      <Field
                        id="email"
                        type="email"
                        name="email"
                        readOnly={user !== null}
                        placeholder='Nhập email'
                        className='form-control'
                      />
                      <ErrorMessage name="email" component="span" className='form-message' style={{ color: 'red' }} />
                    </div>
                    <div className="booking-for-section mt-3">
                      <p className="mb-2" style={{ fontWeight: 'bold' }}>Bạn đặt phòng cho ai?</p>
                      <div className="form-check mb-2">
                        <input type="radio" id="mainGuest" name="bookingFor" className="form-check-input" />
                        <label htmlFor="mainGuest" className="form-check-label">Tôi là khách lưu trú chính</label>
                      </div>
                      <div className="form-check mb-2">
                        <input type="radio" id="someoneElse" name="bookingFor" className="form-check-input" />
                        <label htmlFor="someoneElse" className="form-check-label">Tôi đặt phòng cho người khác</label>
                      </div>
                    </div>
                    <div className="traveling-for-work mt-3">
                      <p className="mb-2" style={{ fontWeight: 'bold' }}>Bạn đang đi công tác?</p>
                      <div className="form-check form-check-inline mb-2">
                        <input type="radio" id="yes" name="travelingForWork" className="form-check-input" />
                        <label htmlFor="Ayes" className="form-check-label">Đúng</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input type="radio" id="no" name="travelingForWork" className="form-check-input" />
                        <label htmlFor="Ano" className="form-check-label">Sai</label>
                      </div>
                    </div>
                  </div>
                  <GoodToKnow />
                  <div className=" mt-3">
                    <button type="submit" className="btn btn-primary">
                      Hoàn tất đặt phòng
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div >
  );
};



const ReservationPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const checkInDate = new Date(queryParams.get('checkIn'));
  const checkOutDate = new Date(queryParams.get('checkOut'));
  const state = location.state;
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState({});

  useEffect(() => {
    async function loadHotelData() {
      try {
        const response = await api.get(`/business/hotels/${hotelId}`);
        setHotel(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    loadHotelData();
  }, [])


  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="flex justify-between items-start" >
          <div className='mt-5'>
            <div className="w-[333px] ml-10">
              <div className="border border-gray-300 rounded-lg p-[20px] mb-3">
                <h5 className='font-medium text-[20px] mb-2'>{hotel.name}</h5>
                <p className='mb-2'>Địa chỉ: {hotel.address}</p>
                <div className='d-flex'> Đánh giá:
                  <div className="ml-2 mb-2">
                    <button className='bg-[#0a4fb0] text-white px-1 font-bold border-none rounded-[7px] shadow-[2px_2px_5px_#000b80]'>{hotel.rating?.toFixed(1)}</button>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="flex items-center mr-5 mb-2">
                    <FontAwesomeIcon icon={faWifi} />
                    <span className='ml-2'> Free WiFi</span>
                  </div>
                  <div className="flex items-center mr-5 mb-2">
                    <FontAwesomeIcon icon={faShuttleVan} />
                    <span className='ml-2'> Dịch vụ đưa đón </span>
                  </div>
                </div>
                <div className="flex items-center mr-5 mb-2">
                  <FontAwesomeIcon icon={faParking} />
                  <span className='ml-2'> Có chỗ để xe</span>
                </div>
              </div>
            </div>

            <div className="border border-gray-300 rounded-lg p-[20px] mb-3 ml-10" >
              <h5 className='font-medium text-[20px] mb-2'>Chi tiết đặt phòng </h5>
              <p className='font-bold mb-2'> Nhận phòng: <span className='float-right'>{format(checkInDate, "EEE, dd/MM/yyyy", { locale: vi })}</span> </p>
              <p className='font-bold mb-2'> Trả phòng: <span className='float-right'> {format(checkOutDate, "EEE, dd/MM/yyyy", { locale: vi })} </span></p>
              <p className='font-bold mb-2'> Tổng thời gian lưu trú: <span className='float-right'> {state?.stayLength} đêm </span> </p>
              <span className="text-success cursor-pointer"> Thay đổi lựa chọn của bạn </span>
            </div>

            <div className='border border-gray-300 rounded-lg p-[20px] mb-3 ml-10'>
              <h4 className='font-medium text-[24px] mb-2'>Tóm tắt giá <span className='unit'> (VND)</span></h4>

              <div className=' p-3 mb-3' style={{ backgroundColor: '#ADD8E6' }}>
                <h2 className='text-left m-0 font-medium text-[32px]'>
                  Total: <span className="float-right font-bold">{state?.totalPrice.toLocaleString('vi-VN')}</span>
                </h2>
              </div>

              <div className="priceInfor bg-light p-3">
                <h5 className='font-medium text-[20px] mb-2'>Thông tin giá</h5>
                <p className='mb-2'>
                  <FontAwesomeIcon icon={faMoneyBill} className="mr-5" />
                  Bao gồm VND <span className='vat'>{Math.round(state?.totalPrice / 11).toLocaleString('vi-VN')}</span> phí <br /> và thuế
                </p>
                <p>
                  10% VAT <span className='float-right'>VND {Math.round(state?.totalPrice / 11).toLocaleString('vi-VN')}</span>
                </p>
              </div>
            </div>

            <div className="border border-gray-300 rounded-lg p-[20px] mb-3 ml-10">
              <h5 className='font-medium text-[20px] mb-2'> Lịch trình thanh toán </h5>
              <p> Không cần thanh toán hôm nay. Bạn sẽ <br /> trả khi đến nghỉ. </p>
            </div>
          </div>
          <div>
            <SecurePage hotelId={hotelId} location={location} />
            <div style={{ height: '200px' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReservationPage;

