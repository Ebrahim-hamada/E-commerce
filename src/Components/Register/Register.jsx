import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Scroll from "../Scroll/Scroll";
import RegisterImg from "./../../assets/signup.svg";
import toast from "react-hot-toast";

function Register() {
  const [isLoading, setLoading] = useState(false);
  const [errorApi, setApiError] = useState(null);
  const navigate = useNavigate();

  Scroll();

  async function register(values) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      setApiError(null);
      localStorage.setItem("userData", data.token);
      toast.success("Register successfully!", {
        duration: 2000,
        className: "px-4",
      });
      navigate("/login");
      setLoading(false);
    } catch (err) {
      setApiError(err.response.data.message);
      setLoading(false);
    }
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "min length is 3 characters")
      .max(20, "max length is 20")
      .required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is Required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "invalid Phone Number")
      .required("Phone is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "Password must be at least 6 characters and contain both uppercase and lowercase letters."
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "RePassword must match Password")
      .required("RePassword is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: register,
  });

  return (
    <div className="w-full flex flex-row-reverse items-center md:flex-row px-10 mt-10">
      <div className="w-[40%] hidden md:block">
        <img src={RegisterImg} alt="Register" className="ms-auto" />
      </div>
      <div className="w-full sm:w-3/4 md:w-[45%] rounded-md mx-auto">
        <h1 className="text-center text-3xl text-emerald-500 font-semibold my-5">
          Register
        </h1>
        {errorApi && (
          <div className="p-2 bg-red-100 text-red-800 rounded-md my-2">
            {errorApi}
          </div>
        )}
        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="my-7">
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              className="w-full border-b-2 border-emerald-500 py-2 outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name && (
              <div className="p-2 bg-red-100 text-red-800 rounded-md my-2">
                {formik.errors.name}
              </div>
            )}
          </div>

          <div className="my-7">
            <input
              type="text"
              name="email"
              placeholder="Enter Your Email"
              className="w-full border-b-2 border-emerald-500 py-2 outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="p-2 bg-red-100 text-red-800 rounded-md my-2">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="mt-7">
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              className="w-full border-b-2 border-emerald-500 py-2 outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="p-2 bg-red-100 text-red-800 rounded-md my-2">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="mt-7">
            <input
              type="password"
              name="rePassword"
              placeholder="Enter Your RePassword"
              className="w-full border-b-2 border-emerald-500 py-2 outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
            />
            {formik.errors.rePassword && formik.touched.rePassword && (
              <div className="p-2 bg-red-100 text-red-800 rounded-md my-2">
                {formik.errors.rePassword}
              </div>
            )}
          </div>

          <div className="my-7">
            <input
              type="text"
              name="phone"
              placeholder="Enter Your Phone"
              className="w-full border-b-2 border-emerald-500 py-2 outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.errors.phone && formik.touched.phone && (
              <div className="p-2 bg-red-100 text-red-800 rounded-md my-2">
                {formik.errors.phone}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-300 w-full cursor-pointer p-2 mt-4 rounded-md text-white"
          >
            {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Register"}
          </button>
        </form>

        <div className="flex justify-center items-center">
          <hr className="border-gray-300 border-2 w-1/3" />
          <p className="font-semibold p-3 text-lg text-gray-500">or</p>
          <hr className="border-gray-300 border-2 w-1/3" />
        </div>

        <div className="flex justify-center items-center">
          <p className="font-semibold p-3 text-sm text-gray-500">
            Already have an account?
          </p>
          <p className="text-emerald-500 hover:underline flex justify-end py-4">
            <Link to="/login">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
