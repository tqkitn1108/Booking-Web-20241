import React from 'react';
import { Formik, useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { registerUser } from '../../../api/ApiAuthService';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../components/loading-spinner/LoadingSpinner';
import Navbar from '../../../customer/navbar/Navbar';

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .matches(/^[a-zA-Z\sÀ-ỹ]+$/, 'Họ và tên chỉ được chứa chữ cái và khoảng trắng')
    .matches(/^(?!.*\s{2})/, 'Họ và tên không được chứa khoảng trắng liền nhau')
    .required('Vui lòng điền họ và tên của bạn'),
  email: Yup.string().email('Địa chỉ email không hợp lệ').required('Vui lòng điền email của bạn'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .test('no-full-spaces', 'Mật khẩu không được chỉ toàn khoảng trắng', value => value.trim() !== '')
    .required('Vui lòng điền mật khẩu của bạn'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận không khớp')
    .required('Vui lòng xác nhận lại mật khẩu'),
  agreement: Yup.boolean().oneOf([true], 'Bạn phải đồng ý với Điều khoản dịch vụ'),
});
const BusinessSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const customStyle = {
    input: {
      fontSize: '1rem',
      padding: '0.5rem 1rem',
    },
    label: {
      fontSize: '1rem',
    },
    button: {
      fontSize: '1rem',
    },
    formGroup: {
      marginBottom: '1rem',
    },

  };

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    if (formik.isValid) {
      values.role = "HOTEL";
      setLoading(true);
      try {
        const response = await registerUser(values);
        setSuccessMessage(response.data);
        setErrorMessage("");
      } catch (error) {
        setSuccessMessage("");
        setErrorMessage(`${error.response.data.detail}`);
      }
      setLoading(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <div className='fixed w-full z-50'><Navbar /></div>
      <div className="bg-white " style={{ height: '100px' }}></div>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit} // Pass the handleSubmit function directly
      >
        <div>
          {loading && <LoadingSpinner />}
          <section className="vh-100 bg-white">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
              <div className="container h-30">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-8 col-lg-6 col-xl-5"> {/* Adjusted column width */}
                    <div className="">
                      <div className="rounded-lg p-8 shadow-lg bg-white">
                        <h3 className="text-2xl text-center mb-6 font-bold">Tạo tài khoản đối tác</h3>
                        {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
                        {successMessage &&
                          <>
                            <p className="alert alert-success">{successMessage}</p>
                            <div className="d-flex justify-content-center">
                              <button
                                onClick={() => navigate("/login")}
                                className="btn btn-primary btn-block btn-lg gradient-custom-4 w-100 text-white"
                                style={customStyle.button}
                              >
                                Chuyển hướng đến trang đăng nhập
                              </button>
                            </div>
                          </>}
                        {!successMessage && <form onSubmit={formik.handleSubmit}>
                          <div className="form-outline mb-3" style={{ ...customStyle.label, fontWeight: 'bold' }}>
                            <label htmlFor="fullName" className="block text-sm font-bold text-gray-700 mb-2">
                              Họ và tên <span className="required text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="fullName"
                              name="fullName"
                              className={`form-control form-control-lg ${formik.touched.fullName && formik.errors.fullName ? 'is-invalid' : ''}`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.fullName}
                              style={customStyle.input}
                            />
                            {formik.touched.fullName && formik.errors.fullName && (
                              <div className="invalid-feedback">{formik.errors.fullName}</div>
                            )}
                          </div>

                          {/* Your Email Input */}
                          <div className="form-outline mb-4" style={{ ...customStyle.label, fontWeight: 'bold' }}>
                            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                              Địa chỉ email <span className="required text-danger">*</span>
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className={`form-control  ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.email}
                              style={customStyle.input}
                            />
                            {formik.touched.email && formik.errors.email && (
                              <div className="invalid-feedback">{formik.errors.email}</div>
                            )}
                          </div>

                          {/* Your Password Input */}
                          <div className="form-outline mb-4" style={{ ...customStyle.label, fontWeight: 'bold', position: 'relative' }}>
                            <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                              Mật khẩu <span className="required text-danger">*</span>
                            </label>
                            <input
                              type={showPassword ? 'text' : 'password'}  // Toggle between 'text' and 'password' based on showPassword state
                              id="password"
                              name="password"
                              className={`form-control form-control-lg ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.password}
                              style={customStyle.input}
                            />
                            <div className=''>
                              <button
                                type="button"
                                className="btn btn-light"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ position: 'absolute', right: '-2px', transform: 'translateY(-110%)', border: 'none', background: 'transparent', }}
                              >
                                <box className='lmao'> </box>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}
                                  className='eye ' />
                              </button>
                            </div>

                            {formik.touched.password && formik.errors.password && (
                              <div className="invalid-feedback">{formik.errors.password}</div>
                            )}
                          </div>

                          {/* Your Password Input */}
                          {/* Repeat Password Input */}
                          <div className="form-outline mb-4" style={{ ...customStyle.label, fontWeight: 'bold', position: 'relative' }}>
                            <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-2">
                              Xác nhận lại mật khẩu <span className="required text-danger">*</span>
                            </label>
                            <input
                              type={showConfirmPassword ? 'text' : 'password'}  // Toggle between 'text' and 'password' based on showConfirmPassword state
                              id="confirmPassword"
                              name="confirmPassword"
                              className={`form-control form-control-lg ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.confirmPassword}
                              style={customStyle.input}
                            />
                            <button
                              type="button"
                              className="btn btn-light"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              style={{ position: 'absolute', right: '-2px', transform: 'translateY(-110%)', border: 'none', background: 'transparent' }}
                            >
                              <box className='lmao'> </box>
                              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                            </button>

                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                              <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
                            )}
                          </div>


                          <div className="form-check d-flex justify-content-center mb-5">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              value=""
                              id="form2Example3cg"
                            />
                            <label htmlFor="form2Example3g" className="text-sm">
                              Tôi đồng ý với{' '}
                              <a href="#!" className="text-blue-500 hover:underline">
                                Điều khoản dịch vụ
                              </a>
                            </label>
                          </div>

                          <div className="d-flex justify-content-center">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block btn-lg gradient-custom-4 w-100 text-white"
                              style={customStyle.button}
                              disabled={!formik.isValid} // Disable the button if the form is not valid
                            >
                              Đăng ký
                            </button>
                          </div>
                          <p className="text-center text-sm text-gray-500 mt-6">
                            Đã có tài khoản?{' '}
                            <Link to="/login" className="font-bold text-blue-500 hover:underline">
                              Đăng nhập
                            </Link>
                          </p>
                        </form>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section >
        </div >
      </Formik >
      <div className="bg-white " style={{ height: '100px' }}></div>
    </div>
  );
}

export default BusinessSignup;
