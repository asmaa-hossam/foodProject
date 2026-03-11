import { useState } from "react";
import { DeleteIcon, Threedots, User, ViewwIcon } from "../../assets/svgIcons";
import { useDeleteUser, UseGetAllUsers } from "../../hooks/Usershooks"
import Header from "../Shared/Header/Header"
import Loader from "../Shared/Loader"
import NoData from "../Shared/NoData/NoData"
import {  motion } from "framer-motion";
import DeleteConfirmation from "../Shared/DeleteConfirmation";
import ViewModal from "../Shared/ViewModal";
import type { Users } from "../../interfaces";
import Pagination from "../Shared/Pagination/Pagination";

export default function Users() {
    const [pageNumber, setpageNumber] = useState(1)
const pageSize=6;
  const [NameValue, setNameValue] = useState<string|"">("")

    const {data ,isLoading,isError,error}=UseGetAllUsers(pageSize,pageNumber,NameValue)
   const dataList=data?.data
  const totalNumberOfPages=data?.totalNumberOfPages||0
const getNameValue = (input: React.ChangeEvent<HTMLInputElement>) => {
  const value = input?.target.value;
  setNameValue(value);
  setpageNumber(1); 
};
   const {mutate:deleteUser}=useDeleteUser()
   const [isOpenMenueId, setisOpenMenueId] = useState<string|null>(null)
   const [ selectedId, setSelectedId] = useState<string|null>(null)
   const [show, setShow] = useState(false)
   const handleClose=()=>setShow(false)
   const handleShow=(id:string)=>{
   setSelectedId(id)
   setShow(true)
   }
 const [selectedUser, setSelectedUser] = useState<Users | null>(null);
  const [ShowView, setShowView] = useState(false);

  const handleCloseView = () => {
    setShowView(false);
    setSelectedUser(null);
  };

  const handleShowView = (user: any) => {
    setSelectedUser(user);
    setShowView(true);
  };
  return (
    <>
      <Header text1="Users" text2="List" paragraph={`You can now add your items that any user can order it  from  the Application and you can edit`}/>
      <div className="d-flex  justify-content-start  align-items-center ">
        <div className="title">
       <h3 >Users Table Details</h3>
       <p className='text-muted'>You can check all details</p>
        </div>
        </div>
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
      <th style={{backgroundColor:"rgba(226, 229, 235, 1)"}} scope="col">UserName</th>
      <th style={{backgroundColor:"rgba(226, 229, 235, 1)"}} scope="col">PhoneNumber</th>
       <th style={{backgroundColor:"rgba(226, 229, 235, 1)"}} scope="col"> Country</th>
      <th style={{backgroundColor:"rgba(226, 229, 235, 1)"}} scope="col">Email</th>
            <th style={{backgroundColor:"rgba(226, 229, 235, 1)"}} scope="col">Image</th>
      <th  style={{backgroundColor:"rgba(226, 229, 235, 1)"}} scope="col">Actions</th>
    </tr>
  </thead>
   <tbody>
        {!isLoading&&!isError&&dataList!!.length>0&&dataList?.map((item,index)=><motion.tr key={item.id} 
        className="custom-row"
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.3, delay: index * 0.1 }}>
         <td>{item.id}</td>
         <td>{item.userName}</td>
         <td>{item.phoneNumber}</td>
         <td>{item.country}</td>
         <td>{item.email}</td>
        <td>{item.imagePath?<img src={`https://upskilling-egypt.com:3006/${item.imagePath}`} style={{width:"50px",height:"50px",borderRadius:"50%"}}/>:(
    <div
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f2f2f2"
      }}
    >
      <User size={28} />
    </div>
  )}</td>
         <td className=" position-relative">
          <button onClick={()=>setisOpenMenueId(isOpenMenueId===item.id?null:item.id)}
            className=" border-0 action-btn"
            >
            <Threedots/>
          </button>
           {isOpenMenueId === item.id && (
  <div
    className="position-absolute bg-white rounded-3 shadow-sm py-2 "
    style={{
      top: "0",
      left: "-120px",
      minWidth: "140px",
      border: "1px solid #eee",
      zIndex: 20,
    }}>
   {/* View */}
       <div
         className="d-flex align-items-center gap-2 px-3 py-2 dropdown-item-custom"
         style={{ cursor: "pointer" }}
         onClick={()=>{
          handleShowView(item)
          setisOpenMenueId(null)
         }}
       >
         <ViewwIcon />
         <span className="small">View</span>
       </div>
       
           {/* Divider */}
           <div style={{ height: "1px", background: "#f1f1f1", margin: "4px 0" }} />
       
           {/* Delete */}
           <div
             className="d-flex align-items-center gap-2 px-3 py-2 dropdown-item-custom text-danger"
             style={{ cursor: "pointer" }}
             onClick={()=>{
              handleShow(item.id)
              setisOpenMenueId(null)
             }}
           >
             <DeleteIcon />
             <span className="small">Delete</span>
           </div>
         
    </div>)}
         </td>
    </motion.tr>)}
    </tbody>
</table>
        </motion.div>

        <DeleteConfirmation
        handleClose={handleClose}
        show={show}
        title="User"
        selectedId={selectedId!!}
        mutate={deleteUser}
        />
       <ViewModal
        show={ShowView}
        handleClose={handleCloseView}
        name={selectedUser?.userName}
        email={selectedUser?.email}
        phone={selectedUser?.phoneNumber}
        image={selectedUser?.imagePath}
        country={selectedUser?.country}
        title="User Details"
      />
      <Pagination
        pageNumber={pageNumber}
     setpageNumber={setpageNumber}
     totalNumOfPages={totalNumberOfPages}
      />
    </>
  )
}
