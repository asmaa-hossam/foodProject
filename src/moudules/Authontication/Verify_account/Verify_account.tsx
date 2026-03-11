import CustomInputForm from "../components/CustomInputForm";
import logo from '../../../assets/images/logo.webp'
import { EmailIcon, PasswordIcon } from "../../../assets/svgIcons";
import { EmailValidation } from "../../../validation/validation";
import { useForm } from "react-hook-form";
import type { virify } from "../../../interfaces";
import { axiosInstanse, USERS_URL } from "../../../services/ulrs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Verify_account() {
  const{register,formState:{errors,isSubmitting},handleSubmit}=useForm<virify>()
    const navigate=useNavigate()

  const onSubmit=async(data:any)=>{
   try{
  let response= await axiosInstanse.put(USERS_URL.VIRIFY_ACCOUNT,data)
  navigate("/login")
  toast.success("virivication Successfuly")
  
  console.log(response);
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
     <h2 style={{color:"#575656",fontWeight:"bold"}}> Verify Account  </h2>
     <p style={{color:"#494949"}}>Please Enter Your Otp  or Check Your Inbox</p>
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
           type='text'
           placeholder='Enter your code'
           {...register("code",{
            required:"this field is required"
           })}
           IsError={!!errors?.code}
           ErrorMessage={errors?.code?.message || ""}
            />
 <button type='submit' 
 aria-label='submit'
    disabled={isSubmitting}
      className="btn py-2 text-light   w-100" style={{backgroundColor:"#4AA35A",border:"none",fontSize:"20px",fontWeight:"bold",marginTop:"70px"}}>
        {isSubmitting?"sending...":"send"}
    </button>
           </form>
     
    </>
  )
}
