import  { type CreateCategoryResponse, type CategotyRes, type CreateCategory, type RecipeResponse, type tages, type RecipeData, type UserResponse, type FavoriteRecipe, type FavoritesResponse } from "../interfaces"
import { axiosInstanse, CATEGORIES_URL, FAVOURITE_URLS, RECIPES_URL, Tages_URL, USERS_URL } from "../services/ulrs"

export const getAllCategory=async(pageSize:number,pageNumber:number,name:string)=>{
    const response= await axiosInstanse.get<CategotyRes>(CATEGORIES_URL.GET_ALL,{
    params:{
        pageSize,
        pageNumber,
        name
    }
    })
    return response.data
}

export const deleteCategory=async(id:string)=>{
 const response=await axiosInstanse.delete(CATEGORIES_URL.DELETE(id))
 return response.data
}
export const createCategory=async(data:CreateCategory)=>{
const response=await axiosInstanse.post<CreateCategoryResponse>(CATEGORIES_URL.CREATE,data)
return response.data
}

export const updateCategory=async(id:string,data:CreateCategory)=>{
 const response=await axiosInstanse.put(CATEGORIES_URL.UPDATE(id),data)
 return response.data
}
export const getAllRecipes=async(pageSize:number,pageNumber:number,name:string)=>{
const response=await axiosInstanse.get<RecipeResponse>(RECIPES_URL.GetAll,{
    params:{
        pageSize,
        pageNumber,
        name
    }})
return response.data
}
export const deleteRecipe=async(id:string)=>{
    const response=await axiosInstanse.delete(RECIPES_URL.Delete(id))
    return response.data
}
export const getAllTages=async()=>{
    const response=await axiosInstanse.get<tages[]>(Tages_URL.GetAll)
    return response.data
}

export const createRecipe=async(data:FormData)=>{
    const response=await axiosInstanse.post(RECIPES_URL.Create,data)
    return response.data
}
export const updateRecipe=async(id:string,data:FormData)=>{
    const response=await axiosInstanse.put(RECIPES_URL.Update(id),data)
    return response.data
}
export const getRecipeById=async(id:string)=>{
    const response=await axiosInstanse.get<RecipeData>(RECIPES_URL.GetById(id))
    return response.data
}
export const getAllUsers=async(pageSize:number,pageNumber:number,userName:string)=>{
const response=await axiosInstanse.get<UserResponse>(USERS_URL.GET_ALL,{
    params:{
        pageSize,
        pageNumber,
        userName
    }
})
return response.data
}

export const deleteUser=async(id:string)=>{
const response=await axiosInstanse.delete(USERS_URL.DELETE_USER(id))
return response.data
}
export const getAllFav=async()=>{
    const response=await axiosInstanse.get<FavoritesResponse>(FAVOURITE_URLS.all)
    return response.data
}
export const addToFav=async(data:FavoriteRecipe)=>{
    const response=await axiosInstanse.post(FAVOURITE_URLS.addFav,data)
    return response.data
}

export const deleteFromFav=async(id:string)=>{
    const response=await axiosInstanse.delete(FAVOURITE_URLS.removeFav(id))
    return response.data
}