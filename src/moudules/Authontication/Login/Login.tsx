import { useForm } from 'react-hook-form'
import logo from '../../../assets/images/logo.webp'
import { EmailIcon, Eye, EyeOff, PasswordIcon } from '../../../assets/svgIcons'
import { axiosInstanse, USERS_URL } from '../../../services/ulrs'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { EmailValidation, PasswordValidation } from '../../../validation/validation'
import CustomInputForm from '../components/CustomInputForm'
import { useState } from 'react'
import type { LOGIN, LOGIN_RESPONSE } from '../../../interfaces'
import { useAuth } from '../../../Context/AuthContext'

export default function Login() {
 const {getLoginData}= useAuth()
  const navigate=useNavigate()
  const [ShowPassword,setShowPassword]=useState(false)
const{register,formState:{errors,isSubmitting},handleSubmit}=useForm<LOGIN>()
const onSubmit=async(data:any)=>{
 try{
let response= await axiosInstanse.post<LOGIN_RESPONSE>(USERS_URL.LOGIN,data)
localStorage.setItem("token",response.data.token)
getLoginData()
navigate("/dashboard")
toast.success("Login Successful")

 }
 catch(error: any){
 toast.error(error?.response?.data?.message||"Something went wrong")
  
 }
}
  return (
    <>
     <div className=' text-center' style={{paddingTop:"50px"}}>
      <img src={logo} alt="login logo" style={{width:"366px",height:"100px"}} />
     </div>
      <div style={{marginTop:"25px",marginLeft:"60px"}}>
     <h2 style={{color:"#575656",fontWeight:"bold"}}>Log In</h2>
     <p style={{color:"#494949"}}>Welcome Back! Please enter your details</p>
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
      onMouseUp={(e)=>e.preventDefault}
      onMouseDown={(e)=>e.preventDefault}
      >
          {ShowPassword?<Eye/>:<EyeOff/>}</button>}
          autoComplete='current-password'
      />
    <div className=' d-flex justify-content-between' style={{marginTop:"10px",marginBottom:"30px"}}>
      <Link style={{color:"#3A3A3D",fontSize:"16px",textDecoration:"none"}} to='/register'>Register Now?</Link>
            <Link style={{color:"#4AA35A",fontSize:"16px",textDecoration:"none"}} to='/Forget_pass'>Forgot Password?
</Link>
    </div>

<button
aria-label='submit'
type='submit' disabled={isSubmitting} className="btn py-2 text-light   w-100" style={{backgroundColor:"#4AA35A",border:"none",fontSize:"20px",fontWeight:"bold"}}>{isSubmitting?"Logging in...":"Login"}</button>
     </form>

    </>
  )
}
