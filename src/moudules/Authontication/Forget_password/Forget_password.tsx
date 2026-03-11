import { useForm } from 'react-hook-form'
import logo from '../../../assets/images/logo.webp'
import CustomInputForm from '../components/CustomInputForm'
import { EmailIcon } from '../../../assets/svgIcons'
import { EmailValidation } from '../../../validation/validation'
import { axiosInstanse, USERS_URL } from '../../../services/ulrs'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import type { Forget_Password, Forget_Password_Response } from '../../../interfaces'
export default function Forget_password() {
  const navigate=useNavigate()
  const {register,handleSubmit,formState:{isSubmitting,errors}}=useForm<Forget_Password>()
  const onSubmit=async(data:Forget_Password)=>{
   try{
let res=await axiosInstanse.post<Forget_Password_Response>(USERS_URL.FORGET_PASSWORD,data)
toast.success(res?.data?.message||"check your mail")
navigate("/reset_pass",{state:data.email})
   }
   catch(error: any){
    console.log(error);
    toast.error(error?.response?.data?.message||"Something went wrong")
   }
  }
  return (
    <>
    <div className=' text-center' style={{paddingTop:"50px"}}>
      <img src={logo} alt="login logo" style={{width:"366px",height:"100px"}} />
     </div>
      <div style={{marginTop:"25px",marginLeft:"60px"}}>
     <h2 style={{color:"#575656",fontWeight:"bold"}}>Forgot Your Password?</h2>
     <p style={{color:"#494949"}}>No worries! Please enter your email and we will send a password reset link </p>
    </div>
    <form style={{marginTop:"33px",marginLeft:"63px",marginRight:"70px"}} onSubmit={handleSubmit(onSubmit)}>
      <CustomInputForm
      StartIcon={<EmailIcon/>}
      type='email'
      placeholder='Enter your E-mail'
      {...register("email",EmailValidation)}
      IsError={!!errors?.email}
      ErrorMessage={errors?.email?.message || ""}
      autoComplete='email'
      />

<button type='submit' 
disabled={isSubmitting}
  className="btn py-2 text-light   w-100" style={{backgroundColor:"#4AA35A",border:"none",fontSize:"20px",fontWeight:"bold",marginTop:"70px"}}>
    {isSubmitting?"Loading...":"submit"}
</button>
     </form>

    
    </>
  )
}
