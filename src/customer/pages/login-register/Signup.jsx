import React from 'react';
import { Formik, useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { registerUser } from '../../../api/ApiAuthService';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../components/loading-spinner/LoadingSpinner';
import Navbar from '../../navbar/Navbar';

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .matches(/^[a-zA-Z\sÀ-ỹ]+$/, 'Name must contain only letters and spaces')
    .matches(/^(?!.*\s{2})/, 'Name must not contain consecutive spaces')
    .required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(10, 'Password must be at least 10 characters')
    .test('no-full-spaces', 'Password must not contain only spaces', value => value.trim() !== '')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  agreement: Yup.boolean().oneOf([true], 'You must agree to the Terms of Service'),
});

const Signup = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    if (formik.isValid) {
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
      <div><Navbar /></div>
      <div className="bg-light h-24"></div>

      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <div>
          {loading && <LoadingSpinner />}
          <section className="min-h-screen bg-white">
            <div className="mask flex items-center justify-center h-full">
              <div className="container mx-auto h-full">
                <div className="flex justify-center items-center h-full">
                  <div className="w-full md:w-2/3 lg:w-1/2 xl:w-5/12">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                      <h2 className="text-2xl text-center mb-6">Create an account</h2>
                      {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                      {successMessage && (
                        <>
                          <p className="text-green-500 text-center mb-4">Vui lòng kiểm tra email đăng ký của bạn để kích hoạt tài khoản</p>
                          <div className="flex justify-center">
                            <button
                              onClick={() => navigate("/login")}
                              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                            >
                              Chuyển hướng tới đăng nhập
                            </button>
                          </div>
                        </>
                      )}

                      {!successMessage && (
                        <form onSubmit={formik.handleSubmit}>
                          <div className="mb-4">
                            <label htmlFor="fullName" className="block text-sm font-bold text-gray-700">
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="fullName"
                              name="fullName"
                              className={`w-full p-3 border border-gray-300 rounded-lg ${formik.touched.fullName && formik.errors.fullName ? 'border-red-500' : ''}`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.fullName}
                            />
                            {formik.touched.fullName && formik.errors.fullName && (
                              <div className="text-red-500 text-sm">{formik.errors.fullName}</div>
                            )}
                          </div>

                          {/* Your Email Input */}
                          <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                              Your Email <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className={`w-full p-3 border border-gray-300 rounded-lg ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email && (
                              <div className="text-red-500 text-sm">{formik.errors.email}</div>
                            )}
                          </div>

                          {/* Your Password Input */}
                          <div className="mb-4 relative">
                            <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                              Password <span className="text-red-500">*</span>
                            </label>
                            <input
                              type={showPassword ? 'text' : 'password'}
                              id="password"
                              name="password"
                              className={`w-full p-3 border border-gray-300 rounded-lg ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.password}
                            />
                            <button
                              type="button"
                              className="absolute right-2 top-1/2 transform -translate-y-1/2"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>

                            {formik.touched.password && formik.errors.password && (
                              <div className="text-red-500 text-sm">{formik.errors.password}</div>
                            )}
                          </div>

                          {/* Confirm Password Input */}
                          <div className="mb-4 relative">
                            <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700">
                              Repeat Password <span className="text-red-500">*</span>
                            </label>
                            <input
                              type={showConfirmPassword ? 'text' : 'password'}
                              id="confirmPassword"
                              name="confirmPassword"
                              className={`w-full p-3 border border-gray-300 rounded-lg ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''}`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.confirmPassword}
                            />
                            <button
                              type="button"
                              className="absolute right-2 top-1/2 transform -translate-y-1/2"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                            </button>

                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                              <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                            )}
                          </div>

                          {/* Agreement Checkbox */}
                          <div className="mb-4 flex justify-center items-center">
                            <input
                              type="checkbox"
                              id="form2Example3cg"
                              className="mr-2"
                            />
                            <label htmlFor="form2Example3g" className="text-sm">
                              I agree to all statements in{' '}
                              <a href="#!" className="text-blue-500 underline">
                                Terms of Service
                              </a>
                            </label>
                          </div>

                          {/* Submit Button */}
                          <div className="flex justify-center">
                            <button
                              type="submit"
                              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                              disabled={!formik.isValid}
                            >
                              Register
                            </button>
                          </div>

                          {/* Login Link */}
                          <p className="text-center text-sm text-gray-500 mt-6">
                            Have already an account?{' '}
                            <Link to="/login" className="font-bold text-blue-500 underline">
                              Login here
                            </Link>
                          </p>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Formik>
      <div className="bg-light h-24"></div>
    </div>
  );
};

export default Signup;
