import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addToFav, deleteFromFav, getAllFav } from "../Apis/Apis"
import { toast } from "react-toastify"

export const useGetAllFav=()=>{
    return useQuery({
        queryKey:["favourits"],
        queryFn:getAllFav
    })
}

export const useAddToFav=()=>{
    const quaryClient=useQueryClient()
    return useMutation({
        mutationFn:addToFav,
        onSuccess:()=>{
            quaryClient.invalidateQueries({queryKey:["favourits"]})
            toast.success("recipie  item added to favourite Successfully")
        },
        onError:(error:any)=>{
       toast.error( error.response?.data?.message ||error.message ||"Failed to added to favourite" )
        }

    })
}

export const useDeleteFromFav=()=>{
        const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(id:string)=>deleteFromFav(id),
            onSuccess:()=>{
                queryClient.invalidateQueries({queryKey:["favourits"]})
               toast.success(" Deleted from favourite Successfully")
            },
            onError:(error:any)=>{
                toast.error( error.response?.data?.message ||error.message ||"Failed to delete from favourite" )
            }
    })
}

