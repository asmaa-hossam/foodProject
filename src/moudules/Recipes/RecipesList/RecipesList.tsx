import { AnimatePresence, motion } from "framer-motion";
import { useDeleteRecipies, useGetAllRecipies } from "../../../hooks/RecipiesHoohs";
import Header from "../../Shared/Header/Header";
import Loader from "../../Shared/Loader";
import NoData from "../../Shared/NoData/NoData";
import TableHeader from "../../Shared/TableHeader";
import food from "../../../assets/images/food.webp"
import { DeleteIcon, EditIcon, Threedots, ViewwIcon } from "../../../assets/svgIcons";
import React, { lazy, Suspense, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
const DeleteConfirmation = lazy(() => import("../../Shared/DeleteConfirmation"));
const Pagination =lazy(()=>import("../../Shared/Pagination/Pagination"))  ;
import { useAuth } from "../../../Context/AuthContext";
const ViewModal = React.lazy(() => import("../../Shared/ViewModal"));import type {  RecipeData } from "../../../interfaces";
import { useAddToFav, useGetAllFav } from "../../../hooks/FavouritHooks";
export default function RecipesList() {
  const {LoginData}=useAuth()
  const { mutate: deleteRecipe } = useDeleteRecipies()
  {/* delete modal */}
  const [selectedId, setSelectedId] = useState<string>("")
  const [show, setshow] = useState(false)
  const handleClose = () => setshow(false);
  const handleShow = (id:string) => {
    setSelectedId(id)
    setshow(true)
    setOpenMenueID(null)
  }
  {/**view modal uswr */}
 const [selectedRecipe, setSelectedRecipie] = useState<RecipeData|null>(null)
  const [showV, setshowV] = useState(false)
  const handleCloseV = () => setshowV(false);
 const handleShowV = (item:RecipeData) => {
  setSelectedRecipie(item)
    setshowV(true)
    setOpenMenueID(null)
  }
  {/**get add to fav recipie */}
const {mutate:addtofav}=useAddToFav()
const {data:getFav,isPending}=useGetAllFav()
const isFavourite = useMemo(()=>{
 return getFav?.data?.some(
   (fav) => fav.recipe.id === selectedRecipe?.id
 )
},[getFav,selectedRecipe])
  const navigate=useNavigate()
  const [openMenueID,setOpenMenueID]=useState<string|null>(null)
  const [pageNumber, setpageNumber] = useState(1)
  const pageSize=7;
  const [NameValue, setNameValue] = useState<string|"">("")

      const { data, isLoading, isError ,error } = useGetAllRecipies(pageSize,pageNumber,NameValue)
const totalNumOfPages = useMemo(() => data?.totalNumberOfPages || 0, [data]);
const dataList = useMemo(() => data?.data, [data]);
const getNameValue = (input: React.ChangeEvent<HTMLInputElement>) => {
  const value = input?.target.value;
  setNameValue(value);
  setpageNumber(1); 
};
  return (
    <>
   <Header text1="Recipes" text2="Items" paragraph="You can now add your items that any user can order it from the Application and you can edit"/>
   <TableHeader title="Recipe Table Details" description="You can check all details"buttonText="Add New Item"
   to="/dashboard/recipeData"
   />
   
    {isLoading&&<div className=" d-flex justify-content-center  align-items-center mt-5">
           <Loader/>
           </div>}
           {isError&&<div className=" d-flex justify-content-center  align-items-center mt-5">
           <h2 className=" text-danger">{error.message}</h2>
           </div>}
           {!isLoading&&!isError&&dataList?.length===0&&<div className=" d-flex justify-content-center  align-items-center mt-5">
           <NoData/>
           </div>}
           <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-3">
  <input
    onChange={getNameValue}
    type="text"
    placeholder="Search by Name"
    className="form-control search-input"
  />
</div>
            <motion.div
          initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
           <table className="table mt-4  table-hover table-striped custom-table">
  <thead  className="p-2" >
    <tr >
      <th style={{backgroundColor:"rgba(226, 229, 235, 1)"}} scope="col">ItemName</th>
      <th style={{backgroundColor:"rgba(226, 229, 235, 1)"}} scope="col">Image</th>
      <th style={{backgroundColor:"rgba(226, 229, 235, 1)"}} scope="col">Price</th>
     <th style={{backgroundColor:"rgba(226, 229, 235, 1)"}} scope="col">Category</th>
       <th style={{backgroundColor:"rgba(226, 229, 235, 1)"}} scope="col">Tages</th>
      <th  style={{backgroundColor:"rgba(226, 229, 235, 1)"}} scope="col">Actions</th>
    </tr>
  </thead>
 <tbody>
{!isLoading&&!isError&&dataList!!.length>0&&dataList?.map((item,index)=><motion.tr key={item.id}
className="custom-row"
  initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
>
        <td>{item.name}</td>
        <td>{item.imagePath?<img loading="lazy"  src={`https://upskilling-egypt.com:3006/${item.imagePath}`} style={{width:"50px",height:"50px",borderRadius:"50%"}}/>:<img src={food} loading="lazy" style={{width:"50px",height:"50px",borderRadius:"50%",objectFit:"cover"}}/>}</td>
        <td>{item.price?.toFixed(2)} EGP</td>
        <td>{item.category[0]?.name}</td>
        <td>{item.tag?.name}</td>
       <td className=" position-relative">
        <button aria-label="three-dots"
        className=" border-0 action-btn" onClick={()=>setOpenMenueID(openMenueID===item.id?null:item.id)}>
        <Threedots/>
        </button>
        <AnimatePresence>
        {openMenueID === item.id && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -5 }}
      transition={{ duration: 0.2 }}
      className=" position-absolute bg-white rounded-3 shadow-sm py-2 "
      style={{
        top: "0",
        left: "-120px",
        minWidth: "150px",
        zIndex: 20,
      }} >
          {LoginData?.userGroup === "SuperAdmin"? <>
           {/* View */}
          <div
            className="d-flex align-items-center gap-2 px-3 py-2 dropdown-item-custom "
            style={{ cursor: "pointer" }}
            onClick={()=>navigate(`/dashboard/viewRecipe/${item.id}`,{state:{view:true}})}
          >
            <ViewwIcon />
            <span className="small">View</span>
          </div>
          {/* Edit */}
          <div
          className=" d-flex align-items-center gap-2 px-3 py-2 dropdown-item-custom "
           style={{ cursor: "pointer" }}
            onClick={()=>navigate(`/dashboard/updateRecipe/${item.id}`)}
          >
          <EditIcon/>
           <span className="small">Edit</span>
          </div>

           {/* delete */}
          <div
          className=" d-flex align-items-center gap-2 px-3 py-2 dropdown-item-custom "
           style={{ cursor: "pointer" }}
           onClick={()=>handleShow(item.id)}
          >
          <DeleteIcon/>
           <span className="small">Delete</span>
          </div>
          </>: 
          <>
          {/* View */}
          <div
            className="d-flex align-items-center gap-2 px-3 py-2 dropdown-item-custom "
            style={{ cursor: "pointer" }}
            onClick={()=>handleShowV(item)}
          >
            <ViewwIcon />
            <span className="small">View</span>
          </div>
          </>
          }
       
          
      </motion.div>
      )}
      
      </AnimatePresence>
        </td>
      
</motion.tr>)}
</tbody>
  </table>
  {/**pagination */}
 <Pagination
 pageNumber={pageNumber}
 setpageNumber={setpageNumber}
 totalNumOfPages={totalNumOfPages}
 />
        </motion.div>

        <DeleteConfirmation
        title="Recipie"
        show={show}
        handleClose={handleClose}
        selectedId={selectedId}
        mutate={deleteRecipe}
        />
      <Suspense fallback={<Loader/>}>
        <ViewModal
        handleClose={handleCloseV}
        show={showV}
        title="Recipe Details"
       image={selectedRecipe?.imagePath}
       name={selectedRecipe?.name}
       price={selectedRecipe?.price}
       tag={selectedRecipe?.tag.name}
      id={selectedRecipe?.id}
      addToFav={addtofav}
      isFavorite={isFavourite}          
      isPending={isPending}
        />
        </Suspense>
    </>
  )
}
