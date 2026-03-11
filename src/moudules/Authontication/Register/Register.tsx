import { useForm } from "react-hook-form"
import type { Register } from "../../../interfaces"
import CustomInputForm from "../components/CustomInputForm"
import { axiosInstanse, USERS_URL } from "../../../services/ulrs"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import { EmailIcon, Eye, EyeOff, House, PasswordIcon, Phone, User, User2 } from "../../../assets/svgIcons"
import { EmailValidation } from "../../../validation/validation"
import { useEffect, useRef, useState } from "react"

export default function Register() {
    const [imgPreview, setImgPreview] = useState(null);

const navigate=useNavigate()
 const[ShowPassword,setShowPassword]=useState(false)
    const[ShowPasswordd,setShowPasswordd]=useState(false)
  const {register,formState:{errors,isSubmitting},handleSubmit,watch,trigger}=useForm<Register>()
  const imgRef=useRef<HTMLInputElement|null>(null)
  const handleClick=()=>{
    imgRef?.current?.click()
  }
   const handleFileChange=(event:any)=>{
const file = event.target?.files[0];  
setImgPreview(file && URL.createObjectURL(file));

}
  const appendFormData=(data:Register)=>{
const formData=new FormData()
 formData.append("userName",data.userName),
 formData.append("email",data.email),
 formData.append("country",data.country),
 formData.append("phoneNumber",data.phoneNumber),
 formData.append("password",data.password),
 formData.append("confirmPassword",data.confirmPassword)
 if(data?.profileImage instanceof FileList && data.profileImage.length > 0){
formData.append("profileImage",data.profileImage[0])

 }
 return formData
  }
const onSubmit=async(data:Register)=>{
let formData=appendFormData(data)
 try{
let res=await axiosInstanse.post(USERS_URL.REGISTER,formData)
toast.success(res?.data?.message||"some thing went wrong")
navigate("/verify_account")
console.log(res)
   }
   catch(error: any){
    console.log(error);
    toast.error(error?.response?.data?.message||"Something went wrong")
   }
}
useEffect(()=>{
if(watch("confirmPassword")){
  trigger("confirmPassword")
}
},[watch("password")])
  return (
    <>
      <div style={{marginTop:"25px",marginLeft:"60px"}}>
     <h2 style={{color:"#575656",fontWeight:"bold"}}>Register</h2>
     <p style={{color:"#494949"}}>Welcome Back! Please enter your details </p>
    </div>
   
    <form style={{marginTop:"33px",marginLeft:"63px",marginRight:"70px",width:"80%"}} onSubmit={handleSubmit(onSubmit)}>
      <div className=" d-flex justify-content-center align-items-center mb-4">
       <div className="" 
       style={{width:"80px",height:"70px",borderRadius:"80%",cursor:"pointer"}}
       onClick={handleClick}
       >
        {imgPreview?(
      <img src={imgPreview} alt="Preview" style={{width:"70px",height:"70px",borderRadius:"50%"}}  />
    ): (
          <User size={70}/>
        )}
       <input 
  type="file" 
  accept="image/*"
  hidden
  {...register("profileImage", {
    onChange: handleFileChange 
  })}
  ref={(e) => {
    register("profileImage").ref(e); 
    imgRef.current = e;
  }}
/>
        </div> 
      </div>
      <div className=" row">
        <div className="col-md-6">
          <CustomInputForm
          StartIcon={<User2/>}
          type='text'
          placeholder='UserName'
          {...register("userName",{
            required:"this field is required"
          })}
          IsError={!!errors?.userName}
          ErrorMessage={errors?.userName?.message || ""}
          />
          </div>
          <div className="col-md-6">
          <CustomInputForm
          StartIcon={<EmailIcon/>}
          type='email'
          placeholder='Enter your E-mail'
          {...register("email",EmailValidation)}
          IsError={!!errors?.email}
          ErrorMessage={errors?.email?.message || ""}
          />
          </div>
    </div>
    <div className=" row mb-3">
        <div className="col-md-6">
          <CustomInputForm
          StartIcon={<House/>}
          type='text'
          placeholder='Country'
          {...register("country",{
            required:"this feild is required"
          })}
          IsError={!!errors?.country}
          ErrorMessage={errors?.country?.message || ""}
          />
          </div>
          <div className="col-md-6">
          <CustomInputForm
          StartIcon={<Phone/>}
          type='text'
          placeholder='PhoneNumber'
          {...register("phoneNumber",{
            required:"this feild is required"
          })}
          IsError={!!errors?.phoneNumber}
          ErrorMessage={errors?.phoneNumber?.message || ""}
          />
          </div>
    </div>

    <div className=" row mb-3">
        <div className="col-md-6">
          <CustomInputForm
          StartIcon={<PasswordIcon/>}
          type={ShowPassword?"text":"password"}
          placeholder='password'
          {...register("password",{
            required:"this feild is required"
          })}
          IsError={!!errors?.password}
          ErrorMessage={errors?.password?.message || ""}
          EndIcon={<button type="button" 
             onClick={()=>setShowPassword(!ShowPassword)}
            className=" border-0" >{ShowPassword?<Eye/>:<EyeOff/>}</button>}
          />
          </div>
          <div className="col-md-6">
          <CustomInputForm
          StartIcon={<PasswordIcon/>}
          type={ShowPasswordd?"text":"password"}
          placeholder='Confirm Password'
          {...register("confirmPassword",{
            required:"this feild is required",
            validate:(confirmPassword)=>confirmPassword===watch("password")||"passwords do not match"
          })}
          IsError={!!errors?.confirmPassword}
          ErrorMessage={errors?.confirmPassword?.message || ""}
            EndIcon={<button type="button" 
             onClick={()=>setShowPasswordd(!ShowPasswordd)}
            className=" border-0" >{ShowPasswordd?<Eye/>:<EyeOff/>}</button>}
          
          />
          </div>
    </div>
     <div className=' d-flex justify-content-end' >
      <Link style={{color:"#4AA35A",fontSize:"16px",textDecoration:"none"}} to='/login'>Login Now?</Link>
            
    </div>
    <button type='submit' 
    aria-label='submit'
    disabled={isSubmitting}
      className="btn py-2 text-light   w-100" style={{backgroundColor:"#4AA35A",border:"none",fontSize:"20px",fontWeight:"bold",marginTop:"50px"}}>
        {isSubmitting?"Loading...":"Register"}
    </button>
         </form>
    
    </>
  )
}
