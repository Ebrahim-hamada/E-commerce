import { useFormik } from "formik";
import * as Yup from "yup";
import Scroll from "../Scroll/Scroll";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import creditCardImg from "./../../assets/creditCard.png";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CheckOut() {
  const { checkOut, cashPayment, isLoading, ClearAllProduct } =
    useContext(CartContext);
  const navigate = useNavigate();

  Scroll();

  const validationSchema = Yup.object().shape({
    street: Yup.string().required("Street is Required"),
    city: Yup.string().required("City is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Phone Number")
      .required("Phone is required"),
  });

  const formik = useFormik({
    initialValues: {
      street: "",
      city: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const shippingAddress = {
        street: values.street,
        city: values.city,
        phone: values.phone,
      };
      try {
        const response = await cashPayment(shippingAddress);

        if (response?.status === "success") {
          navigate("/allorders");
          ClearAllProduct();
        } else {
          toast.error(response?.message || "Failed to place cash order.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Cash payment failed");
      } finally {
      }
    },
  });

  return (
    <div className="w-full flex flex-row-reverse items-center md:flex-row">
     
      <div className="w-[40%] hidden md:block justify-center mt-20">
        <img src={creditCardImg} alt="Checkout" className="w-[60%] ms-auto" />
      </div>

      <div className="w-full sm:w-3/4 md:w-[50%] rounded-md mx-auto px-10 mt-10">
        <h1 className="text-center text-3xl text-emerald-500 font-semibold my-5">
          CheckOut Now
        </h1>
        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="my-7">
            <input
              type="text"
              name="street"
              placeholder="Enter Your Street Name"
              className="w-full border-b-2 border-emerald-500 py-2 outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.street}
            />
            {formik.errors.street && formik.touched.street && (
              <div className="p-2 bg-red-100 text-red-800 rounded-md my-2">
                {formik.errors.street}
              </div>
            )}
          </div>

          <div className="mt-7">
            <input
              type="text"
              name="city"
              placeholder="Enter Your City Name"
              className="w-full border-b-2 border-emerald-500 py-2 outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
            {formik.errors.city && formik.touched.city && (
              <div className="p-2 bg-red-100 text-red-800 rounded-md my-2">
                {formik.errors.city}
              </div>
            )}
          </div>

          <div className="mt-7">
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

          <div className="flex flex-col md:flex-row justify-between gap-4 mt-5">
          <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-300 w-full cursor-pointer p-2 rounded-md text-white"
            >
              {isLoading ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                <div>
                  <i className="fa-solid fa-money-bills pe-1"></i>
                  <span> Cash on Delivery</span>
                </div>
              )}
            </button>
            <button
              type="button"
              className="bg-emerald-500 hover:bg-emerald-300 w-full cursor-pointer p-2 rounded-md text-white"
              onClick={() => {
                checkOut({
                  street: formik.values.street,
                  city: formik.values.city,
                  phone: formik.values.phone,
                });
              }}
            >
              {isLoading ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                <div>
                  <i className="fa-brands fa-cc-visa pe-1"></i>
                  <span>Pay Online</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckOut;
