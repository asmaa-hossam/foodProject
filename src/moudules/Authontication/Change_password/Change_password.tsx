import { useForm } from 'react-hook-form'
import logo from '../../../assets/images/logo.webp'
import { Eye, EyeOff, PasswordIcon } from '../../../assets/svgIcons'
import CustomInputForm from '../components/CustomInputForm'
import type { ChangePassword, ChangePasswordRes } from '../../../interfaces'
import { PasswordValidation } from '../../../validation/validation'
import { axiosInstanse, USERS_URL } from '../../../services/ulrs'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Change_password() {
    const navigate=useNavigate()
  const [ShowPassword,setShowPassword]=useState(false)
  const [ShowPasswordd,setShowPasswordd]=useState(false)
  const [ShowPassworddd,setShowPassworddd]=useState(false)

    const {register,handleSubmit,formState:{isSubmitting,errors},watch,trigger}=useForm<ChangePassword>()
     const onSubmit=async(data:ChangePassword)=>{
       try{
    let res=await axiosInstanse.put<ChangePasswordRes>(USERS_URL.CHANGE_PASSWORD,data)
    toast.success(res?.data?.message||"check your Password")
    navigate("/login")
       }
       catch(error: any){
        console.log(error);
        toast.error(error?.response?.data?.message||"Something went wrong")
       }
      }
  useEffect(()=>{
   if(watch("confirmNewPassword")){
      trigger("confirmNewPassword")
   }
  },[watch("newPassword")])
      
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
      StartIcon={<PasswordIcon/>}
      type={ShowPassword?"text":"password"}
      placeholder='Old password'
      {...register("oldPassword",PasswordValidation)}
      IsError={!!errors?.oldPassword}
      ErrorMessage={errors?.oldPassword?.message || ""}
      EndIcon={<button type='button'
        className=' border-0'
      onClick={()=>setShowPassword(!ShowPassword)}
      onMouseUp={(e)=>e.preventDefault}
      onMouseDown={(e)=>e.preventDefault}
      >
          {ShowPassword?<Eye/>:<EyeOff/>}</button>}
          autoComplete='current-password'
      />
     
      <CustomInputForm
      StartIcon={<PasswordIcon/>}
      type={ShowPasswordd?"text":"password"}
      placeholder='newPassword'
      {...register("newPassword",PasswordValidation)}
      IsError={!!errors?.newPassword}
      ErrorMessage={errors?.newPassword?.message || ""}
      EndIcon={<button type='button'
        className=' border-0'
      onClick={()=>setShowPasswordd(!ShowPasswordd)}
      onMouseUp={(e)=>e.preventDefault}
      onMouseDown={(e)=>e.preventDefault}
      >
          {ShowPasswordd?<Eye/>:<EyeOff/>}</button>}
          autoComplete='new-password'
      />

   <CustomInputForm
      StartIcon={<PasswordIcon/>}
      type={ShowPassworddd?"text":"password"}
      placeholder='confirmNewPassword'
      {...register("confirmNewPassword",{
      required:"confirm password is required",
      validate:(value)=>value===watch("newPassword")||"passwords do not match"
      })}
      IsError={!!errors?.confirmNewPassword}
      ErrorMessage={errors?.confirmNewPassword?.message || ""}
      EndIcon={<button type='button'
        className=' border-0'
      onClick={()=>setShowPassworddd(!ShowPassworddd)}
      onMouseUp={(e)=>e.preventDefault}
      onMouseDown={(e)=>e.preventDefault}
      >
          {ShowPassworddd?<Eye/>:<EyeOff/>}</button>}
          autoComplete='new-password'
      />
<button type='submit' 
aria-label='submit'
disabled={isSubmitting}
  className="btn py-2 text-light   w-100" style={{backgroundColor:"#4AA35A",border:"none",fontSize:"20px",fontWeight:"bold",marginTop:"70px"}}>
    {isSubmitting?"Loading...":"Change Password"}
</button>
     </form>

    </>
  )
}
