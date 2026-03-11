import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthContextType, User } from "../interfaces";
 export const AuthContext=createContext<AuthContextType|null>(null)
interface Props{
    children:ReactNode
}
export const useAuth=()=>{
const context=useContext(AuthContext)
 if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}

 export default function AuthContextProvider({children}:Props){
    const [LoginData, setLoginData] = useState<User|null>(null)
 const token=localStorage.getItem("token")

 
 const getLoginData=()=>{
    const enCodeToken=token
    if(enCodeToken){
       try {
        const decodedToken = jwtDecode<User>(token);
        setLoginData(decodedToken);
      } catch (error) {
        console.error("Invalid Token", error);
        setLoginData(null);
      }
    }
 }
useEffect(()=>{
    if(token){
getLoginData()}
},[token])
   return(
    <AuthContext.Provider value={{LoginData,setLoginData,getLoginData}}>
        {children}
    </AuthContext.Provider>
       
   )
}