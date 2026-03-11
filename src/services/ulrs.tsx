import axios from "axios"

export const baseURL="https://upskilling-egypt.com:3006/api/v1/"

export const axiosInstanse=axios.create({baseURL,headers:{
    Authorization:localStorage.getItem("token")
}})

axiosInstanse.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization =  token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export const USERS_URL={
    LOGIN:"Users/Login",
    REGISTER:"Users/Register",
    FORGET_PASSWORD:"Users/Reset/Request",
    RESET_PASSWORD:"Users/Reset",
    VIRIFY_ACCOUNT:"Users/verify",
    CHANGE_PASSWORD:"Users/ChangePassword",
    GET_ALL:"Users/",
    DELETE_USER:(id:string)=>`Users/${id}`
}

export const CATEGORIES_URL={
    GET_ALL:"Category/",
    GET_BY_ID:(id:string)=>`Category/${id}`,
    CREATE:"Category/",
    UPDATE:(id:string)=>`Category/${id}`,
    DELETE:(id:string)=>`Category/${id}`
}

export const RECIPES_URL={
    GetAll:"Recipe/",
    GetById:(id:string)=>`Recipe/${id}`,
    Create:"Recipe/",
    Update:(id:string)=>`Recipe/${id}`,
    Delete:(id:string)=>`Recipe/${id}`
}
export const Tages_URL={
    GetAll:"Tag/",
}
export const FAVOURITE_URLS={
     all: `userRecipe`,
    addFav: `userRecipe`,
    removeFav:(id:string)=> `/userRecipe/${id}`
}