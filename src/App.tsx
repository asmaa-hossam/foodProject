
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { lazy, Suspense } from "react";
const AuthLayout = lazy(() =>
  import('./moudules/Shared/AuthLayout/AuthLayout')
)
const Login = lazy(() => import('./moudules/Authontication/Login/Login'))
 const Register = lazy(() => import('./moudules/Authontication/Register/Register'))
const Forget_password = lazy(() => import('./moudules/Authontication/Forget_password/Forget_password'))
const Reset_Password = lazy(() => import('./moudules/Authontication/Reset_Password/Reset_Password'))
const Verify_account = lazy(() => import('./moudules/Authontication/Verify_account/Verify_account'))
const Change_password = lazy(() => import('./moudules/Authontication/Change_password/Change_password'))
const MasterLayout = lazy(() =>
  import('./moudules/Shared/MasterLayout/MasterLayout')
)
const DashBoard = lazy(() => import('./moudules/DashBoard/DashBoard'))
const RecipesList = lazy(() => import('./moudules/Recipes/RecipesList/RecipesList'))
const CategoriesList = lazy(() => import('./moudules/Categories/CategoriesList/CategoriesList'))
const RecipesData = lazy(() => import('./moudules/Recipes/RecipesData/RecipesData'))
const Favourite = lazy(() => import('./moudules/Favourites/Favourite'))
const Users = lazy(() => import('./moudules/Users/Users'))
import { ToastContainer } from 'react-toastify'
import AuthContextProvider from './Context/AuthContext'
import ProtectedRoute from './moudules/Shared/ProtectedRoute/ProtectedRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Loader from './moudules/Shared/Loader';

 const quaryClient= new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false
    }
  }
});
function App() {
 const route=createBrowserRouter([
    {path:"",element:<AuthLayout/>,children:[
     {index:true,element:<Login/>},
    {path:"login",element:<Login/>},
    {path:"verify_account",element:<Verify_account/>},
    {path:"register",element:<Register/>},
     {path:"Forget_pass",element:<Forget_password/>},
    {path:"reset_pass",element:<Reset_Password/>},
    {path:"change_pass",element:<Change_password/>}

  ]},
  {path:"dashboard",element:<ProtectedRoute><MasterLayout/></ProtectedRoute>,children:[
    {index:true,element:<DashBoard/>},
        {path:'recipes',element:<RecipesList/>},
          {path:"category",element:<CategoriesList />},
         { path:"recipeData",element:<RecipesData/>},
           { path:"updateRecipe/:id",element:<RecipesData/>},
            { path:"viewRecipe/:id",element:<RecipesData/>},
         {path:"favourites",element:<Favourite/>},
         {path:"users",element:<Users/>}

  ]}
 ])

  return (
    <>
    <QueryClientProvider client={quaryClient}>
    <AuthContextProvider>
     <Suspense fallback={<div><Loader/></div>}>
   <RouterProvider router={route} />
</Suspense>
        <ToastContainer/>
        </AuthContextProvider>
        </QueryClientProvider>
    </>
  )
}

export default App
