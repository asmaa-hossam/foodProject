import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useGetAllTages } from "../../../hooks/Tageshookes"
import { useGetAllCategories } from "../../../hooks/Categorieshooks"
import { useForm } from "react-hook-form"
import type { CrateUbdateViewRecipe } from "../../../interfaces"
import { useCreateRecipies, useGetRecipeById, useUbdateRecipies } from "../../../hooks/RecipiesHoohs"
import { useEffect, useRef, useState } from "react"
import { Recipie } from "../../../assets/svgIcons"
export default function RecipesData() {
  const {register,formState:{errors,isSubmitting},handleSubmit,reset}=useForm<CrateUbdateViewRecipe>({defaultValues:{
  name:"",
  description:"",
  price:0,
  tagId:"",
  categoriesIds:"",
 
  }})
  const{id} =useParams()
  const fileInputRef = useRef<HTMLInputElement>(null);
  //رابط مؤقت لعرض الصوره قبل الرفع
  const [imgPreview, setImgPreview] = useState(null);
  const{state} = useLocation()
  const {mutate:createRecipe}=useCreateRecipies()
  const {data:getRecipeById}=useGetRecipeById(id!) 
  console.log(getRecipeById)
  const {mutate:updateRecipe}=useUbdateRecipies()
  const {data:Tages}=useGetAllTages()
const {data:Categories}=useGetAllCategories()
const CategoriesData=Categories?.data
  const navigate =useNavigate()
  //الصوره
  const handleClick=()=>{
  fileInputRef.current?.click()
  }
   const handleFileChange=(event:any)=>{
const file = event.target?.files[0];  
setImgPreview(file && URL.createObjectURL(file));

}

  let text;
if(id){
  if(state){
    text="View"
  }else{
    text="Edit"
  }
}else{
  text="Create"
}
const appendFormData=(data:CrateUbdateViewRecipe)=>{
const formData=new FormData()
formData.append("name",data.name);
 formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("tagId", data.tagId.toString());
    formData.append("categoriesIds", data.categoriesIds);
    if (data.recipeImage instanceof FileList && data.recipeImage.length > 0) {
      formData.append("recipeImg", data.recipeImage[0]);
    }
    return formData;
}

const onSubmit=(data:CrateUbdateViewRecipe)=>{
const formData=appendFormData(data)
if(id){
    updateRecipe({id,data:formData},{
        onSuccess: () => {
          navigate('/dashboard/recipes');
        }})
   
}else{
  createRecipe(formData,{
        onSuccess: () => {
          navigate('/dashboard/recipes');
        }})
}
}
useEffect(() => {
  if ( getRecipeById) {
    const categoryId = getRecipeById.category?.[0]?.id;
    reset({
      name: getRecipeById.name,
      description: getRecipeById.description,
      price: getRecipeById.price,
      tagId: getRecipeById.tag?.id ,
      categoriesIds: categoryId ,
    })}

}, [getRecipeById])
  return (
    <>
      <div className="d-flex  justify-content-between gap-5 align-items-center ">
        <div className="title">
       <h3>{text} the <span className=' text-success'>Recipeis.......</span></h3>
       <p className='text-muted'>you can now fill the meals easily using the table and form ,<br/> click here and sill it with the table !</p>
        </div>
        <div className="btt">
       <button onClick={()=>navigate('/dashboard/recipes')} className='btn px-5 py-2 text-light  rounded-2' style={{backgroundColor:"rgba(0, 146, 71, 1)"}}>Fill Recipes<i className="fas fa-arrow-right m-2"></i></button>
        </div>
      </div>

    <form className="w-75 m-auto p-4 bg-white rounded-3 shadow-sm" onSubmit={handleSubmit(onSubmit)}>
  {/* حقل اسم الوصفة */}
  <div className="mb-3">
    <input 
      type="text" 
      disabled={state} 
      className={`form-control bg-light py-2 ${errors.name ? 'is-invalid' : ''}`} 
      placeholder="Recipe Name" 
      {...register("name", { required: "Recipe name is required" })} 
    />
    {errors.name && <p className="text-danger small mt-1">{errors.name?.message as string}</p>}
  </div>

  <div className="row g-3 mb-3">
    <div className="col-md-6">
      <select 
        className={`form-select bg-light py-2 ${errors.tagId ? 'is-invalid' : ''}`} 
        disabled={state} 
        {...register("tagId", { required: "Tag is required" })}
      >
        <option value="">-- Choose a Tag --</option>
        {Tages?.map((tag) => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
      </select>
      {errors.tagId && <p className="text-danger small mt-1">{errors.tagId?.message as string}</p>}
    </div>

    <div className="col-md-6">
      <div className="input-group">
        <input 
          type="number" 
          step="0.01"
          className={`form-control bg-light py-2 ${errors.price ? 'is-invalid' : ''}`} 
          disabled={state} 
          placeholder="Price" 
          {...register("price", { required: "Price is required" })}
        />
        <span className="input-group-text bg-light text-muted">EGP</span>
      </div>
      {errors.price && <p className="text-danger small mt-1">{errors.price?.message as string}</p>}
    </div>
  </div>

  {/* حقل اختيار الفئة (Category) */}
  <div className="mb-3">
    <select 
      className={`form-select bg-light py-2 ${errors.categoriesIds ? 'is-invalid' : ''}`} 
      disabled={state} 
      {...register("categoriesIds", { required: "Category is required" })}
    >
      <option value="">-- Choose a Category --</option>
      {CategoriesData?.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
    </select>
    {errors.categoriesIds && <p className="text-danger small mt-1">{errors.categoriesIds?.message as string}</p>}
  </div>

  {/* حقل الوصف */}
  <div className="mb-3">
    <textarea 
      placeholder="Description" 
      disabled={state} 
      className="form-control bg-light" 
      rows={3} 
      {...register("description")}
    ></textarea>
  </div>

  {/* منطقة رفع الصورة - تصميم Figma */}
  <div
    className="upload-container d-flex flex-column align-items-center justify-content-center py-4"
    style={{
      width: "100%",
      border: "2px dashed rgba(0, 146, 71, 1)",
      borderRadius: "10px",
      backgroundColor: "#F8F9FB",
      cursor: "pointer",
      textAlign: "center",
      marginBottom: "40px",
      transition: "background 0.3s"
    }}
    onClick={() => handleClick()}
    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f0fdf4")}
    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#F8F9FB")}
  >
    {imgPreview ? (
      <img src={imgPreview} alt="Preview" style={{ width: "120px", height: "100px", objectFit: "cover", borderRadius: "8px" }} />
    ) : (
      <Recipie/>
    )}
    
    <p className="fw-medium mt-2 mb-0">
      Drag & Drop or <span style={{ color: "rgba(0, 146, 71, 1)" }}>Choose a Item Image</span> to Upload
    </p>

    <input
      type="file"
      hidden
      accept="image/*"
      {...register("recipeImage")}
      onChange={handleFileChange}
      ref={(e) => {
        register("recipeImage").ref(e);
        fileInputRef.current = e;
      }}
    />
  </div>

  <div className="btns d-flex justify-content-end gap-3 pt-3 border-top">
    <button
      type="button"
      onClick={() => navigate('/dashboard/recipes')}
      disabled={isSubmitting}
      className="btn px-5 py-2 border-success text-success fw-bold rounded-2"
      style={{ border: "1px solid" }}
    >
      Cancel
    </button>
    <button
      type="submit"
      disabled={isSubmitting}
      className="btn px-5 py-2 text-light fw-bold rounded-2"
      style={{ backgroundColor: "rgba(0, 146, 71, 1)" }}
    >
      {isSubmitting ? "Saving..." : "Save"}
    </button>
  </div>
</form>
    </>
  )
}
