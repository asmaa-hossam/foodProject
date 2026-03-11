import noData from "../../../assets/images/nodata.webp"
export default function NoData() {
  return (
    <>
       <div className=" text-center">
     <img src={noData} alt="No Data" />
     <h2 className=" border-1">No Data !</h2>
     <p className=" text-muted">are you sure you want to delete this item ? if you are sure just click on delete it</p>
       </div>
    </>
  )
}
