import { Modal } from "react-bootstrap";
import type { CreateCategory } from "../../interfaces";
import { motion } from "framer-motion"

import type { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
interface AddEditCategoryProps {
    showAddModal:boolean,
    handleCloseAddModal:()=>void,
    isCreatePending:boolean,
    isUpdatePending:boolean,
    editId?:string|null,
     onSubmit: (data: CreateCategory) => void
     register: UseFormRegister<CreateCategory>
  handleSubmit: UseFormHandleSubmit<CreateCategory>
  errors: FieldErrors<CreateCategory>
}
export default function AddEditCategory(props:AddEditCategoryProps) {
      
  return (
    <>
    <motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.3 }}
>
       <Modal show={props.showAddModal} onHide={props.handleCloseAddModal} className="p-2">
        <Modal.Header closeButton className=" border-0">
          <Modal.Title> {props.editId ? "Edit Category" : "Add Category"}</Modal.Title>
        </Modal.Header>
       <form onSubmit={ props.handleSubmit(props.onSubmit)} className="p-2">
        <input className="w-100 border-0 form-control" type="text" placeholder="Category Name " {...props.register("name",{required:"CategoryName Is required"})} />
        <span className="text-danger d-block">{props.errors.name?.message}</span>
        <div className=" d-flex  align-items-center justify-content-end">
          
        <button className="btn btn-primary  mt-4" disabled={props.isCreatePending||props.isUpdatePending} type="submit"> 
           {props.isCreatePending||props.isUpdatePending
    ? props.editId
      ? "Updating..."
      : "Adding..."
    : props.editId
    ? "Update Category"
    : "Add Category"}</button>
        </div>
       </form>
       
      </Modal>
</motion.div>
    </>
  )
}
