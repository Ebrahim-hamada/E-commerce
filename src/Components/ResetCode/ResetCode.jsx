import { useFormik } from 'formik';
import {useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Scroll from '../Scroll/Scroll';



function ResetCode() {


    const [isLoading,setLoading]=useState(false);
    const [errorApi,setApiError]=useState(null);
    const navigate=useNavigate();
    Scroll();



    async function resetCode(values) {
        setLoading(true)
        try{
            const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',values);
            console.log(data);
            setApiError(null);

            toast.success("The Reset Code Entered Successfully")

            setTimeout(() => {
                navigate('/newpassword');
            }, 1500);
        }
        catch(err){
            setApiError(err.response.data.message)
            toast.error(err.response?.data?.message||"Something went wrong, please try again.")
        }
        finally{
            setLoading(false)
        }
    }

    let formik = useFormik({
        initialValues:{
            resetCode:''
        },
        onSubmit:resetCode
    })


    
        
        
        return (
            <div className="w-full sm:w-3/4 lg:w-1/3 rounded-md mx-auto px-10 mt-10 ">
                <h1 className='text-center text-3xl text-emerald-500 font-semibold my-5'>Enter Verification Code</h1>
                <h3 className='text-gray-500 text-center'>we have Sent a Code to Your Email</h3>
                {errorApi&&<div className='p-2 bg-red-100 text-red-800 rounded-md my-2'>{errorApi}</div>}
    
            <form onSubmit={formik.handleSubmit} className="w-full">
            <div className="my-7">
            <input type="text" name="resetCode" placeholder='Enter your Reset Code'  className="w-full border-b-2 border-emerald-500 py-2 outline-none"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.resetCode}
            />
            {formik.errors.resetCode &&formik.touched.resetCode&&<div className='p-2 bg-red-100 text-red-800 rounded-md my-2'>{formik.errors.resetCode}</div>}
                </div>
                <button type="submit" className="bg-emerald-500 hover:bg-emerald-300 w-full cursor-pointer p-2  rounded-md text-white">{isLoading?<i className='fa fa-spinner fa-spin'></i>:'Verify'}</button>
                </form>
        </div>
        )
    }
    
    

export default ResetCode
