import { useCreateCategory, useDeleteCategory, useGetAllCategories, useUbdateCategory } from "../../../hooks/Categorieshooks";
import Header from "../../Shared/Header/Header";
import Loader from "../../Shared/Loader";
import NoData from "../../Shared/NoData/NoData";
import TableHeader from "../../Shared/TableHeader";
import { lazy, useEffect, useMemo, useRef, useState } from "react";
const AddEditCategory = lazy(() => import("../../Shared/AddEditCategory"));
const DeleteConfirmation = lazy(() => import("../../Shared/DeleteConfirmation"));
import { DeleteIcon, EditIcon, Threedots, ViewwIcon } from "../../../assets/svgIcons";
import type { categoryData, CreateCategory } from "../../../interfaces";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import Pagination from "../../Shared/Pagination/Pagination";
export default function CategoriesList() {
 const {register,formState:{errors},handleSubmit,reset}=useForm<CreateCategory>()
 const {LoginData}=useAuth()
 const navigate=useNavigate()
  const meueRef=useRef<HTMLDivElement>(null)
    const [openMenueID,setOpenMenueID]=useState<string|null>("")

  {/* delete modal */}
  const [show, setShow] = useState(false)
  const [selectedId, setSelectedId] = useState<string>("")
const handleClose = () => setShow(false);
  const handleShow = (id:string) => {
    setSelectedId(id),
    setShow(true),
    setOpenMenueID(null)
  }
{/**add modal */}
 const [showAddModal, setShowAddModal] = useState(false);
  const handleCloseAddModal = () => setShowAddModal(false);
 const handleShowAddModal = (category: categoryData | null = null) => {
  if (category) {
    setEditId(category.id)
    reset({ name: category.name })
  } else {
    setEditId(null)
    reset({ name: "" })
  }
  setShowAddModal(true)
}
  


const {mutate: mutateCreate,isPending:isCreatePending}=useCreateCategory()
const {mutate: mutateUpdate,isPending:isUpdatePending}=useUbdateCategory()
const [editId, setEditId] = useState<string | null>(null)


 const onSubmit = (data: CreateCategory) => {
  if (editId) {
    mutateUpdate(
      { id:editId,name:data },
      {
        onSuccess: () => {
          handleCloseAddModal()
          reset()
        }
      }
    )
  } else {
    mutateCreate(data, {
      onSuccess: () => {
        handleCloseAddModal()
        reset()
      }
    })
  }
}
const [pageNumber, setpageNumber] = useState(1)
const pageSize=6;
const [NameValue, setNameValue] = useState<string|"">("")

  const {data,error,isError,isLoading}=useGetAllCategories(pageSize,pageNumber,NameValue)
 const {mutate: mutateDelete}=useDeleteCategory()
const dataList = useMemo(() => data?.data, [data]);
const totalNumberOfPages = useMemo(() => data?.totalNumberOfPages || 0, [data]);
const getNameValue = (input: React.ChangeEvent<HTMLInputElement>) => {
  const value = input.target.value;
  setNameValue(value);
  setpageNumber(1); 
};
  useEffect(() => {
      if(LoginData?.userGroup==='SystemUser'){
      navigate("/login")
      toast.error("Access Denied")
    }
  const handleClickOutside = (event: MouseEvent) => {
    if (
      meueRef.current &&
      !meueRef.current.contains(event.target as Node)
    ) {
      setOpenMenueID(null)
    }
  }

  document.addEventListener("mousedown", handleClickOutside)

  return () => {
    document.removeEventListener("mousedown", handleClickOutside)
  }
}, [navigate,LoginData])

  return (
    <>
    
<AddEditCategory editId={editId}  handleCloseAddModal={handleCloseAddModal} isCreatePending={isCreatePending} 
isUpdatePending={isUpdatePending} onSubmit={onSubmit} showAddModal={showAddModal} errors={errors} register={register} handleSubmit={handleSubmit}
/>
       <Header text1="Categories" text2="Item" paragraph={`You can now add your items that any user can order ${<br/>} it from the Application and you can edit`}/> 
       <TableHeader title="Categories Table Details" description="You can check all details" buttonText="Add New Category"
     onClick={handleShowAddModal}
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
      <th style={{backgroundColor:"rgba(226, 229, 235, 1)"}} scope="col">#</th>
      <th style={{backgroundColor:"rgba(226, 229, 235, 1)"}} scope="col">Name</th>
      <th style={{backgroundColor:"rgba(226, 229, 235, 1)"}} scope="col">CreationDate</th>
      <th  style={{backgroundColor:"rgba(226, 229, 235, 1)"}} scope="col">Actions</th>
    </tr>
  </thead>
 <tbody>
        {!isLoading&&!isError&&dataList&&dataList?.length>0&&dataList?.map((item,index)=><motion.tr key={item.id} 
        className="custom-row"
         initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}>
       <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{new Date(item.creationDate).toLocaleDateString()}</td>
      <td className=" position-relative">
        <button onClick={()=>setOpenMenueID(openMenueID===item.id?null:item.id)} className=" border-0 action-btn" >
          <Threedots/>
        </button>
     {openMenueID === item.id && (
  <div
    className="position-absolute bg-white rounded-3 shadow-sm py-2 "
    style={{
      top: "0",
      left: "-120px",
      minWidth: "140px",
      border: "1px solid #eee",
      zIndex: 20,
    }}
    ref={meueRef}
  >
    
    {/* View */}
    <div
      className="d-flex align-items-center gap-2 px-3 py-2 dropdown-item-custom"
      style={{ cursor: "pointer" }}
    >
      <ViewwIcon />
      <span className="small">View</span>
    </div>

    {/* Edit */}
    <div
      className="d-flex align-items-center gap-2 px-3 py-2 dropdown-item-custom"
      style={{ cursor: "pointer" }}
      onClick={() => {
        setEditId(item.id);
        handleShowAddModal(item);
        setOpenMenueID(null);
      }}
    >
      <EditIcon />
      <span className="small">Edit</span>
    </div>

    {/* Divider */}
    <div style={{ height: "1px", background: "#f1f1f1", margin: "4px 0" }} />

    {/* Delete */}
    <div
      className="d-flex align-items-center gap-2 px-3 py-2 dropdown-item-custom text-danger"
      style={{ cursor: "pointer" }}
      onClick={() => handleShow(item.id)}
    >
      <DeleteIcon />
      <span className="small">Delete</span>
    </div>
  </div>
)}

      </td>
        </motion.tr>)}
      </tbody>
        </table>
        </motion.div>

        {/**pagination */}
        {data?.totalNumberOfPages&& (
     <Pagination
     pageNumber={pageNumber}
     setpageNumber={setpageNumber}
     totalNumOfPages={totalNumberOfPages}
     />)}
      <DeleteConfirmation
        show={show}
        selectedId={selectedId}
        handleClose={handleClose}
        title={"Category"}
        mutate={mutateDelete}
      />
    </>
  )
}
