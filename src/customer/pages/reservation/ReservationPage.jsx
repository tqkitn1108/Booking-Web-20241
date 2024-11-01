import React, { useContext, useEffect, useState } from 'react';
import './reservation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faShuttleVan, faParking, faCheckCircle, faLock, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Formik, Field, Form, ErrorMessage, useFormikContext } from 'formik';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import * as Yup from 'yup';
import cvcCodeImage from './cvcCodeImage.png';
import api from '../../../api/AxiosConfig';
import Navbar from '../../navbar/Navbar';
import LoadingSpinner from '../../../components/loading-spinner/LoadingSpinner';

const GoodToKnow = () => {
  return (
    <div className="Good">
      <h4>Good to know</h4>
      <div className='no-credit'>
        <p><FontAwesomeIcon icon={faCheckCircle} /> No credit card needed!</p>
        <p><FontAwesomeIcon icon={faCheckCircle} /> Stay flexible: Cancel for free at any time.</p>
        <p><FontAwesomeIcon icon={faCheckCircle} /> Pay when you stay.</p>
      </div>
    </div>
  );
};

const SecurePage = ({ hotelId, location }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);
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
      alert("Booking details have been sent.");
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
    if (!values.firstname) errors.firstname = 'First name is required';
    if (!values.lastname) errors.lastname = 'Last name is required';
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

  return (
    <div>
      {loading && <LoadingSpinner />}
      <div className='dad'>
        <div className='Login-template'>
          <div className='form_container p-9 rounded bg-white'>
            <Formik
              initialValues={initialValues}
              onSubmit={completeBooking}
              validate={validate}
            >
              <Form className='form-secure'>
                <div className='mb-2 d-grid'>
                  <div className='ad1 mb-2'>
                    <h3>Enter your details</h3>
                    <div className='name form-group d-flex w-100 mb-3'>
                      <div className='m-right' style={{ width: '349px' }}>
                        <label htmlFor='firstname'>First Name <span className="required text-danger">*</span></label>
                        <Field id='firstname' type="text" name="firstname" placeholder='Enter first name' className='form-control' />
                        <ErrorMessage name="firstname" component="span" style={{ color: 'red' }} />
                      </div>
                      <div className='m-left' style={{ marginLeft: '2rem', width: '315px' }}>
                        <label htmlFor='lastname'>Last Name <span className="required text-danger">*</span></label>
                        <Field id="lastname" type="text" name="lastname" placeholder='Enter last name' className='form-control' />
                        <ErrorMessage name="lastname" component="span" style={{ color: 'red' }} />
                      </div>
                    </div>
                  </div>
                  <GoodToKnow />
                  <div className="mt-3">
                    <button type="submit" className="btn btn-primary">Complete Booking</button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
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
  }, []);

  return (
    <div>
      <Navbar />
      <div className="content-container">
        <div className="reservation-container">
          <div className='check'>
            <div className="hotel-information">
              <div className="hotel-info-border">
                <h5>{hotel.name}</h5>
                <p>Address: {hotel.address}</p>
                <div> Rating:
                  <div className="siRating">
                    <button>{hotel.rating?.toFixed(1)}</button>
                  </div>
                </div>
                <div className="amenities">
                  <div className="wifi"><FontAwesomeIcon icon={faWifi} /> <span> Free WiFi</span></div>
                  <div className="shuttle"><FontAwesomeIcon icon={faShuttleVan} /> <span> Shuttle Service</span></div>
                </div>
              </div>
            </div>

            <div className="hotel-detail-border">
              <h5>Your booking details</h5>
              <p>Check-in: <span>{format(checkInDate, "EEE, dd/MM/yyyy", { locale: vi })}</span></p>
              <p>Check-out: <span>{format(checkOutDate, "EEE, dd/MM/yyyy", { locale: vi })}</span></p>
              <p>Total length of stay: <span>{state?.stayLength} nights</span></p>
              <span className="text-success">Change your selection</span>
            </div>

            <div className='total-summary'>
              <h4>Your price summary (VND)</h4>
              <div className='p-3 mb-3' style={{ backgroundColor: '#ADD8E6' }}>
                <h2>Total: <span>{state?.totalPrice?.toLocaleString('vi-VN')}</span></h2>
              </div>
            </div>

            <SecurePage hotelId={hotelId} location={location} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
