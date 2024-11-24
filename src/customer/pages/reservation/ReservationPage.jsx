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
      <h4 className="font-medium text-[28px] mb-2"> Good to know </h4>
      <div className='no credit'>
        <p className="mb-3"><FontAwesomeIcon icon={faCheckCircle} /> No credit card needed! </p>
        <p className="mb-3"><FontAwesomeIcon icon={faCheckCircle} /> Stay flexible: You can cancel for free at any time, so lock in   this great price today .</p>
        <p className="mb-3"><FontAwesomeIcon icon={faCheckCircle} /> No payment needed today. You'll pay when you stay. </p>
      </div>
    </div>
  );
};

const SecurePage = ({ hotelId, location }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);

  // const formik = useFormikContext();
  const navigate = useNavigate();
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
    setLoading(true);
    try {
      await api.post(`/bookings/hotels/${hotelId}`, requestData);
      setLoading(false);
      alert("Thông tin đặt phòng đã được gửi đi. Mọi thông tin về thông tin đặt phòng sẽ được gửi về email ngay khi khách sạn xác nhận. Vui lòng thường xuyên kiểm tra email của bạn!");
      navigate("/");
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
      errors.firstname = 'First name is required';
    }

    if (!values.lastname) {
      errors.lastname = 'Last name is required';
    }

    if (!values.telephone) {
      errors.telephone = 'Telephone is required';
    } else if (!/^\d+$/.test(values.telephone)) {
      errors.telephone = 'Invalid telephone number';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    return errors;
  };

  const cardTypes = ['Visa', 'MasterCard', 'American Express', 'Discover'];

  return (
    <div>
      {loading && <LoadingSpinner />}
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
                    <h3 className='text-left font-medium text-[28px] mb-2'>Enter your details</h3>
                    <div className=' name form-group d-flex w-100 mb-3 '>
                      <div className=' m-right' style={{ width: '349px' }}>
                        <label htmlFor='firstname' className='form-label' style={{ fontWeight: 'bold' }}>
                          First Name <span className="required text-danger">*</span>
                        </label>
                        <Field
                          id='firstname'
                          type="text"
                          name="firstname"
                          placeholder='Enter first name'
                          className='form-control'
                        />
                        <ErrorMessage name="firstname" component="span" className='form-message' style={{ color: 'red' }} />
                      </div>
                      <div className='m-lef ' style={{ marginLeft: '2rem', width: '315px' }}>
                        <label htmlFor='lastname' className='form-label' style={{ fontWeight: 'bold' }}>
                          Last Name <span className="required text-danger">*</span>
                        </label>
                        <Field
                          id="lastname"
                          type="text"
                          name="lastname"
                          placeholder='Enter last name'
                          className='form-control'
                        />
                        <ErrorMessage name="lastname" component="span" className='form-message' style={{ color: 'red' }} />
                      </div>
                    </div>

                    <div className='mb-3 w-50'>
                      <label htmlFor='telephone' className='form-label ' style={{ fontWeight: 'bold' }}>
                        Telephone <span className="required text-danger">*</span>
                      </label>
                      <Field
                        id="telephone"
                        type="text"
                        name="telephone"
                        placeholder='Enter telephone'
                        className='form-control'
                      />
                      <ErrorMessage name="telephone" component="span" className='form-message' style={{ color: 'red' }} />
                    </div>
                    <div className='mb-3 w-50'>
                      <label htmlFor='email' className='form-label' style={{ fontWeight: 'bold' }}>
                        Email <span className="required text-danger">*</span>
                      </label>
                      <Field
                        id="email"
                        type="email"
                        name="email"
                        readOnly={user !== null}
                        placeholder='Enter email'
                        className='form-control'
                      />
                      <ErrorMessage name="email" component="span" className='form-message' style={{ color: 'red' }} />
                    </div>
                    <div className="booking-for-section mt-3">
                      <p className="mb-2" style={{ fontWeight: 'bold' }}>Who are you booking for?</p>
                      <div className="form-check mb-2">
                        <input type="radio" id="mainGuest" name="bookingFor" className="form-check-input" />
                        <label htmlFor="mainGuest" className="form-check-label">I'm the main guest</label>
                      </div>
                      <div className="form-check mb-2">
                        <input type="radio" id="someoneElse" name="bookingFor" className="form-check-input" />
                        <label htmlFor="someoneElse" className="form-check-label">I'm booking for someone else</label>
                      </div>
                    </div>
                    <div className="traveling-for-work mt-3">
                      <p className="mb-2" style={{ fontWeight: 'bold' }}>Are you traveling for work?</p>
                      <div className="form-check form-check-inline mb-2">
                        <input type="radio" id="yes" name="travelingForWork" className="form-check-input" />
                        <label htmlFor="Ayes" className="form-check-label">Yes</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input type="radio" id="no" name="travelingForWork" className="form-check-input" />
                        <label htmlFor="Ano" className="form-check-label">No</label>
                      </div>
                    </div>
                  </div>
                  <GoodToKnow />
                  <div className=" mt-3">
                    <button type="submit" className="btn btn-primary">
                      Complete Booking
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
                <div className='d-flex'  > Rating:
                  <div className="ml-[15px] mb-2">
                    <button>{hotel.rating?.toFixed(1)}</button>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="flex items-center mr-5 mb-2">
                    <FontAwesomeIcon icon={faWifi} />
                    <span className='ml-2'> Free WiFi</span>
                  </div>
                  <div className="flex items-center mr-5 mb-2">
                    <FontAwesomeIcon icon={faShuttleVan} />
                    <span className='ml-2'> Shuttle Service</span>
                  </div>
                </div>
                <div className="flex items-center mr-5 mb-2">
                  <FontAwesomeIcon icon={faParking} />
                  <span className='ml-2'> Parking</span>
                </div>
              </div>
            </div>

            <div className="border border-gray-300 rounded-lg p-[20px] mb-3 ml-10" >
              <h5 className='font-medium text-[20px] mb-2'>Your booking details</h5>
              <p className='font-bold mb-2'> Check-in: <span className='float-right'>{format(checkInDate, "EEE, dd/MM/yyyy", { locale: vi })}</span> </p>
              <p className='font-bold mb-2'> Check-out: <span className='float-right'> {format(checkOutDate, "EEE, dd/MM/yyyy", { locale: vi })} </span></p>
              <p className='font-bold mb-2'> Total length of stay: <span className='float-right'> {state?.stayLength} đêm </span> </p>
              <span className="text-success"> Change your selection </span>
            </div>

            <div className='border border-gray-300 rounded-lg p-[20px] mb-3 ml-10'>
              <h4 className='font-medium text-[24px] mb-2'>Your price summary <span className='unit'> (VND)</span></h4>

              <div className=' p-3 mb-3' style={{ backgroundColor: '#ADD8E6' }}>
                <h2 className='text-left m-0 font-medium text-[32px]'>
                  Total: <span className="float-right font-bold">{state?.totalPrice.toLocaleString('vi-VN')}</span>
                </h2>
              </div>

              <div className="priceInfor bg-light p-3">
                <h5 className='font-medium text-[20px] mb-2'>Price Information</h5>
                <p className='mb-2'>
                  <FontAwesomeIcon icon={faMoneyBill} className="mr-5" />
                  Include VND <span className='vat'>{Math.round(state?.totalPrice / 11).toLocaleString('vi-VN')}</span> in taxes <br /> and charges
                </p>
                <p>
                  10% VAT <span className='float-right'>VND {Math.round(state?.totalPrice / 11).toLocaleString('vi-VN')}</span>
                </p>
              </div>
            </div>

            <div className="border border-gray-300 rounded-lg p-[20px] mb-3 ml-10">
              <h5 className='font-medium text-[20px] mb-2'> Your payment schedule </h5>
              <p> You 'll be charge a payment of the total <br /> price at any time </p>
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

