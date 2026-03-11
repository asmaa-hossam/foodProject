import { useId, type ReactNode } from "react"
import type { FieldErrors } from "react-hook-form"

type CustomInputProps={
StartIcon?:ReactNode,
EndIcon?:ReactNode,
ErrorMessage:string,
IsError:FieldErrors|boolean|undefined,

}&(React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>)
export default function CustomInputForm({StartIcon,EndIcon,IsError,ErrorMessage,...rest}:CustomInputProps) {
    const id =useId()
    const Startid=`${id}-start-icon`
    const Endid=`${id}-end-icon`
  return (
    <div>
      <div className="input-group mb-3 " >
        <span className="input-group-text border-bottom-0 border-top-0 border-start-0" id={Startid}>{StartIcon}</span>
        <input {...rest}
         className="form-control p-3 border-0 " 
         aria-describedby={`${Startid} ${Endid}`} 
         style={{backgroundColor:"#F7F7F7"}}/>
        <span className="input-group-text border-0" id={Endid}>{EndIcon}</span>
       
      </div>
      {IsError? <p className=' text-danger  ' >{ErrorMessage}</p>:null}
    </div>
  )
}
