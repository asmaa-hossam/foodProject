import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategory, deleteCategory, getAllCategory, updateCategory } from "../Apis/Apis";
import type { CategotyRes, CreateCategory } from "../interfaces";
import { toast } from "react-toastify";

export const useGetAllCategories = (pageSize:number,pageNumber:number,name:string) => {
    return useQuery<CategotyRes>({
        queryKey: ["categories",pageSize,pageNumber,name],
        queryFn:()=> getAllCategory(pageSize,pageNumber,name),
         staleTime: 1000 * 60 * 5,
      placeholderData: (prev)=>prev,
       refetchOnWindowFocus:false
    });
};

export const useDeleteCategory=()=>{
        const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(id:string)=>deleteCategory(id),
            onSuccess:()=>{
                queryClient.invalidateQueries({queryKey:["categories"], exact:false})
               toast.success("Category Deleted Successfully")
            },
            onError:(error:any)=>{
                toast.error( error.response?.data?.message ||error.message ||"Failed to delete category" )
            }
    })
}

export const useCreateCategory=()=>{
    const quaryClint=useQueryClient()
    return useMutation({
        mutationFn:createCategory,
onSuccess:()=>{
    quaryClint.invalidateQueries({queryKey:["categories"], exact:false})
    toast.success("Category Created Successfully")
},
onError:(error:any)=>{
    toast.error( error.response?.data?.message ||error.message ||"Failed to create category" )
}
    })
}
export const useUbdateCategory=()=>{
const quaryClient=useQueryClient()
return useMutation({
    mutationFn:({id,name}:{id:string,name:CreateCategory})=>updateCategory(id,name),
    onSuccess:()=>{
        quaryClient.invalidateQueries({queryKey:["categories"], exact:false})
        toast.success("Category Updated Successfully")
    }
    ,onError:(error:any)=>{
        toast.error( error.response?.data?.message ||error.message ||"Failed to update category" )
    }
})
}


