import { useForm } from 'react-hook-form'
import logo from '../../../assets/images/logo.webp'
import { axiosInstanse, USERS_URL } from '../../../services/ulrs'
import { toast } from 'react-toastify'
import CustomInputForm from '../components/CustomInputForm'
import { EmailIcon, Eye, EyeOff, PasswordIcon } from '../../../assets/svgIcons'
import { EmailValidation, PasswordValidation } from '../../../validation/validation'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { Reset_Password, Reset_Password_Response } from '../../../interfaces'
export default function Reset_Password() {
const location=useLocation()
  const {register,handleSubmit,formState:{errors,isSubmitting},trigger,watch}=useForm<Reset_Password>({defaultValues:{
    email:location.state
  }})
  const[ShowPassword,setShowPassword]=useState(false)
    const[ShowPasswordd,setShowPasswordd]=useState(false)
   const navigate=useNavigate()
  const onSubmit=async(data:Reset_Password)=>{
    try{
    const res=await axiosInstanse.post<Reset_Password_Response>(USERS_URL.RESET_PASSWORD,data)
toast.success(res.data.message||"reset password successfully")
navigate("/login")
}
  catch(error:any){
toast.error(error.response.data.message||"something went wrong")
  }}

  useEffect(()=>{
    if(watch("confirmPassword")){
   trigger("confirmPassword")}
  },[watch("password")])
  return (
    <>
         <div className=' text-center' style={{paddingTop:"50px"}}>
      <img src={logo} alt="login logo" style={{width:"366px",height:"100px"}} />
     </div>
      <div style={{marginTop:"25px",marginLeft:"60px"}}>
     <h2 style={{color:"#575656",fontWeight:"bold"}}> Reset  Password</h2>
     <p style={{color:"#494949"}}>Please Enter Your Otp  or Check Your Inbox</p>
    </div>
    <form style={{marginTop:"33px",marginLeft:"63px",marginRight:"70px"}} onSubmit={handleSubmit(onSubmit)}>
      <CustomInputForm
      StartIcon={<EmailIcon/>}
      type='email'
      placeholder='Enter your E-mail'
      {...register("email",EmailValidation)}
      IsError={!!errors.email}
      ErrorMessage={errors?.email?.message || ""}
      disabled
      />

        <CustomInputForm
      StartIcon={<EmailIcon/>}
      type='text'
      placeholder='OTP'
      {...register("seed",{required:"Otp is required"})}
      IsError={!!errors.seed}
      ErrorMessage={errors?.seed?.message || ""}
     autoComplete='off'
      />

      <CustomInputForm
      StartIcon={<PasswordIcon/>}
      type={ShowPassword?"text":"password"}
      placeholder='Password'
      {...register("password",PasswordValidation)}
      IsError={!!errors.password}
      ErrorMessage={errors?.password?.message || ""}
      EndIcon={<button type='button'
        className=' border-0'
      onClick={()=>setShowPassword(!ShowPassword)}
      >
          {ShowPassword?<Eye/>:<EyeOff/>}</button>}
        autoComplete='new-password'
      />

        <CustomInputForm
      StartIcon={<PasswordIcon/>}
      type={ShowPasswordd?"text":"password"}
      placeholder='confirmPassword'
      {...register("confirmPassword",{
    required:"confirm password is required",
    validate:(value)=>value===watch("password")||"passwords do not match"
      })}
      IsError={!!errors.confirmPassword}
      ErrorMessage={errors?.confirmPassword?.message || ""}
      EndIcon={<button type='button'
        className=' border-0'
      onClick={()=>setShowPasswordd(!ShowPasswordd)}
      >
          {ShowPasswordd?<Eye/>:<EyeOff/>}</button>}
        autoComplete='new-password'
      />

<button
aria-label='submit'
disabled={isSubmitting}  type='submit' className="btn py-2 text-light   w-100" style={{backgroundColor:"#4AA35A",border:"none",fontSize:"20px",fontWeight:"bold"}}>{isSubmitting?"Submitting...":"Reset Password"}</button>
     </form>

    </>
  )
}
