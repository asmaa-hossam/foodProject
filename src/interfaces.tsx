export interface LOGIN{
  email: string,
  password: string

}
export interface LOGIN_RESPONSE{
  token: string,
 }
 export interface Register{
  userName:string,
  email:string,
  country:string,
  phoneNumber:string,
  profileImage:File,
  password:string,
  confirmPassword:string
 }
export interface Register_Response{

}
export interface virify{
  email:string,
  code:string
}
export interface Forget_Password{
 email:string
}
export interface Forget_Password_Response{
    
 message: string
}
 export interface Reset_Password{
 email:string,
 seed:string,
  password:string,
  confirmPassword:string
 }
    export interface Reset_Password_Response{
message:string
    }
    export interface User{
      userEmail:string
      userGroup:string
      userName:string

    }
    export interface ChangePassword{
     oldPassword: string,
  newPassword: string,
  confirmNewPassword: string
    }
    export interface ChangePasswordRes{
     
  message: "Password has been updated successfully"
}
    
    export interface AuthContextType{
    LoginData:User|null,
    setLoginData:(data:User|null)=>void,
    getLoginData:()=>void
    }
export interface categoryData{
  creationDate:string
  id:string
  modificationDate:string 
  name:string

}
    export interface CategotyRes{
      data:categoryData[]
    pageNumber:number
    pageSize:number
    totalNumberOfPages:number
    totalNumberOfRecords:number

    }
    export interface CreateCategory{
  name:string
    }
    export interface CreateCategoryResponse{
  name: string,
  id: number,
  creationDate: string,
  modificationDate: string

    }
    export interface RecipeData{
      category:categoryData[]
     creationDate:string
      description:string
      id:string
   imagePath:string
   modificationDate:string
   name:string
   price:number
  tag:{
  id:string
  name:string
  creationDate:string
  modificationDate:string
}

    }
    export interface RecipeResponse{
  data:RecipeData[]
    pageNumber:number
    pageSize:number
    totalNumberOfPages:number
    totalNumberOfRecords:number
    }
    export interface tages{
    
        id:string
        name:string
        creationDate:string
        modificationDate:string}
     
    export interface CrateUbdateViewRecipe{
  name:string
  description:string
  price:number
  tagId:string
  categoriesIds:string
  recipeImage:File
}
export interface Users{
  country:string
creationDate:string
email:string
group:{
creationDate:string,
id:string,
modificationDate:string,
name:string,

}

id:string
imagePath:string
modificationDate:string
phoneNumber:string
userName:string

}
export interface UserResponse{
data:Users[]
    pageNumber:number
    pageSize:number
    totalNumberOfPages:number
    totalNumberOfRecords:number
}
export interface FavoriteRecipe{
  recipeId:string
}
export interface FavoriteItem {
  id:string;
  creationDate: string;
  modificationDate: string;
  recipe: RecipeData;
}
export interface FavoritesResponse {
  pageNumber: number;
  pageSize: number;
  totalNumberOfPages?: number; 
  totalNumberOfRecords?: number;
  data: FavoriteItem[];
}

