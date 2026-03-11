import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteUser, getAllUsers } from "../Apis/Apis"
import { toast } from "react-toastify"

export const UseGetAllUsers=(pageSize:number,pageNumber:number,userName:string)=>{
    return useQuery({
        queryKey:["Users",pageSize,pageNumber,userName],
        queryFn:()=>getAllUsers(pageSize,pageNumber,userName),
         staleTime: 1000 * 60 * 5,
      placeholderData: (prev)=>prev,
       refetchOnWindowFocus:false
    })
}

export const useDeleteUser=()=>{
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:(id:string)=>deleteUser(id),
       onSuccess:()=>{
                      queryClient.invalidateQueries({queryKey:["Users"], exact:false})
                     toast.success("User Deleted Successfully")
                  },
                  onError:(error:any)=>{
                      toast.error( error.response?.data?.message ||error.message ||"Failed to delete user" )
                  }
    })
}