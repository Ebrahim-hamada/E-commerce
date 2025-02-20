import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import toast from 'react-hot-toast';
import Scroll from '../Scroll/Scroll';


function NewPassword() {
    const [isLoading,setLoading]=useState(false);
    const [errorApi,setApiError]=useState(null);
    const {setUserData}=useContext(UserContext);
    const navigate=useNavigate();

    Scroll();
    
    
  
    async function newPassword(values) {
    setLoading(true)
      try{
            const {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values);
            localStorage.setItem('userData',data.token);
            setUserData(data.token)
            console.log(data);
            toast.success("The New Password has been set successfully")
            setTimeout(() => {
              navigate("/login");
            }, 1500);
            
            navigate('/login');
      }
      catch(err){
        setApiError(err.response.data.message);
        toast.error(err.response?.data?.message||"Something went wrong, please try again.")

      }
      finally{
        setLoading(false);
        setApiError(null);
      }
    }
  
    const validationSchema = Yup.object().shape({
      email: Yup.string().email("Invalid Email").required('email is Required'),
      newPassword:Yup.string().required('Password is required'),
    });
    let formik = useFormik({
      initialValues:{
        email:'',
        newPassword:'',
      },
      validationSchema: validationSchema,
      onSubmit:newPassword
    })
      
      
      return (
          <div className="w-full sm:w-3/4 lg:w-1/3 rounded-md mx-auto px-10 mt-10 ">
            <h1 className='text-center text-3xl text-emerald-500 font-semibold my-5'>Set New Password</h1>
            {errorApi&&<div className='p-2 bg-red-100 text-red-800 rounded-md my-2'>{errorApi}</div>}
  
          <form onSubmit={formik.handleSubmit} className="w-full">
            <div className="my-7">
            <input type="text" name="email" placeholder='Enter Your Email'  className="w-full border-b-2 border-emerald-500 py-2 outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email &&formik.touched.email&&<div className='p-2 bg-red-100 text-red-800 rounded-md my-2'>{formik.errors.email}</div>}
  
            </div>
            <div className="mt-7">
            <input type="password" name="newPassword" placeholder='Enter Your newPassword'  className="w-full border-b-2 border-emerald-500 py-2 outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} 
              value={formik.values.newPassword}
            />
              {formik.errors.newPassword &&formik.touched.newPassword&&<div className='p-2 bg-red-100 text-red-800 rounded-md my-2'>{formik.errors.newPassword}</div>}
              </div>
              <button type="submit" className="bg-emerald-500 hover:bg-emerald-300 w-full cursor-pointer p-2 mt-4 rounded-md text-white">{isLoading?<i className='fa fa-spinner fa-spin'></i>:'Reset Password'}</button>
              </form>
      </div>
      )
    }
    


export default NewPassword
