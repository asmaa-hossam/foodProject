import { type ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../../Context/AuthContext"
interface Props{
    children:ReactNode
}
export default function ProtectedRoute({children}:Props) {
   const {LoginData}=useAuth()
    const token=localStorage.getItem("token")
    if(token||LoginData){
        return children
    }
    else{
        return <Navigate to="/login"/>
    }
}
