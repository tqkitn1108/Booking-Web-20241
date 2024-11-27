import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ErrorMessage } from "formik";

const MailList = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
      .email("⚠️ Invalid email address")
      .required(""),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="w-full mt-[50px] bg-[#003580] text-white flex flex-col items-center gap-[20px] p-[50px]">
      <h1 className="text-center text-[40px] font-medium">Tiết kiệm thời gian và tiền bạc!</h1>

      <span className="text-center text-[16px]">
        Đăng ký và chúng tôi sẽ gửi cho bạn những ưu đãi tốt nhất
      </span>
      <form onSubmit={formik.handleSubmit}>
        <div className="max-w-[1100px] flex items-center h-[50px] system-font mb-2">
          <input className ="flex-1 h-full w-[400px] p-2 mr-2 rounded-md border-0 box-border text-black"
            type="text"
            placeholder="Email của bạn"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <button className="h-full w-auto bg-[#0071c2] text-white font-medium border-0 rounded-md cursor-pointer px-4 flex justify-center items-center">Đặt ngay</button>          
        </div>
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-[18px] mt-0 font-medium">{formik.errors.email}</div>
        )}
      </form>

    </div>
  );
};

export default MailList;
