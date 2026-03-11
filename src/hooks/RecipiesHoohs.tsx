import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRecipe, deleteRecipe, getAllRecipes, getRecipeById, updateRecipe } from "../Apis/Apis";
import { toast } from "react-toastify";

export const useGetAllRecipies=(pageSize:number,pageNumber:number,name:string)=>{
    return useQuery({
    queryKey:["Recipies",pageSize,pageNumber,name],
    queryFn:()=>getAllRecipes(pageSize,pageNumber,name),
     staleTime: 1000 * 60 * 5,
      placeholderData: (prev)=>prev,
       refetchOnWindowFocus:false
})
}

export const useDeleteRecipies=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(id:string)=>deleteRecipe(id),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["Recipies"], exact:false})
            toast.success("Recipe Deleted Successfully")
        },
        onError:(error:any)=>{
  toast.error( error.response?.data?.message ||error.message ||"Failed to delete recipe" )        }

    })
}

export const useCreateRecipies=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(data:FormData)=>createRecipe(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["Recipies"], exact:false})
            toast.success("Recipe Created Successfully")
            
        },
        onError:(error:any)=>{
  toast.error( error.response?.data?.message ||error.message ||"Failed to create recipe" )        }

    })
}

export const useUbdateRecipies=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:({id,data}:{id:string,data:FormData})=>updateRecipe(id,data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["Recipies"], exact:false})
            toast.success("Recipe Updated Successfully")
        },
        onError:(error:any)=>{
  toast.error( error.response?.data?.message ||error.message ||"Failed to update recipe" )        }

    })
}

export const useGetRecipeById = (id:string) => {
  return useQuery({
    queryKey: ["Recipies", id],
    queryFn: ()=>getRecipeById(id),
    enabled: !!id
  })
}