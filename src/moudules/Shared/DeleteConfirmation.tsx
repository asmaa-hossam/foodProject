import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import nodata from "../../assets/images/nodata.webp"
interface DeleteConfirmationProps{
    handleClose:()=>void
    show:boolean
    title:string
    selectedId:string
    mutate:(id:string)=>void
}

export default function DeleteConfirmation({selectedId,handleClose,show,title,mutate}:DeleteConfirmationProps) {

    
  return (
    <>
       <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
              </Modal.Header>
              <Modal.Body>
                <div className=" d-flex  flex-column justify-content-center align-items-center text-center gap-3">
                <img src={nodata} alt="deleteimg" />
                <h2>Delete This {title} ?</h2>
                <p style={{color:"rgba(73, 73, 73, 0.6)"}}>are you sure you want to delete this {title} ? <br/>if you are sure just click on delete it</p>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" className=" text-white" 
                onClick={()=>{
                  if(selectedId){
                    mutate(selectedId)
                    handleClose()
                  }
                }}
                >
                Delete this {title}
                </Button>
                
              </Modal.Footer>
            </Modal>
    </>
  )
}
