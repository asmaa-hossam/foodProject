import { Modal, Button, Badge } from "react-bootstrap";
import food from "../../assets/images/food.webp"
import { useLocation } from "react-router-dom";
import type { FavoriteRecipe } from "../../interfaces";
import { Banknote, ChefHat, EmailIcon, FavIcon, Phone, User } from "../../assets/svgIcons";
interface ViewModalProps {
  show: boolean;
  handleClose: () => void;
  name?: string;
  image?: string;
  email?: string;
  phone?: string;
  country?: string;
  price?:number;
  tag?:string
  title:string,
addToFav?: (data: FavoriteRecipe) => void;
  id?: string;
  isFavorite?: boolean;
  isPending?: boolean;
}

export default function ViewModal({ show, handleClose, name, image, email, phone, country,title ,price,tag,addToFav,id,isFavorite, isPending}: ViewModalProps) {
  const baseUrl = "https://upskilling-egypt.com:3006/";
  const fullImageUrl = image ? `${baseUrl}${image}` : null;
  const {pathname}=useLocation()
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="view-modal"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold text-dark">{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-4 pb-4">
        <div className="text-center mb-4">
          <div className="position-relative d-inline-block">
            {image ? (
              <img
                src={fullImageUrl!}
                alt={name}
                className="rounded-circle shadow-sm border border-3 border-light"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
            ) : 
            <>
            {pathname==="/dashboard/users"? <div 
                className="rounded-circle bg-light d-flex align-items-center justify-content-center border border-3 border-white shadow-sm"
                style={{ width: "120px", height: "120px" }}
              >
                <User  />
              </div>: <div 
                className="rounded-circle bg-light d-flex align-items-center justify-content-center border border-3 border-white shadow-sm"
                style={{ width: "120px", height: "120px" }}
              >
               <img src={food} alt="food" />
              </div>  }
             
           </>}
          </div>
          <h4 className="mt-3 fw-bold mb-0 text-primary">{name || ""}</h4>
          <Badge bg="light" className="text-muted border mt-1">{country || ""}</Badge>
        </div>

        <div className="px-3">
          <div className="d-flex align-items-center mb-3 p-3 bg-light rounded-3">
            <div className="bg-white p-2 rounded-circle shadow-sm me-3">
               {pathname==="/dashboard/users"? <EmailIcon  />:
               <Banknote/>
               }
             
            </div>
            <div>
                 {pathname==="/dashboard/users"?<> <small className="text-muted d-block">Email Address</small>
              <span className="fw-medium">{email || "Not Provided"}</span></>:<> <small className="text-muted d-block">Recipie Price</small>
              <span className="fw-medium">{price || "Not Provided"}$</span></>}
             
            </div>
          </div>

          <div className="d-flex align-items-center p-3 bg-light rounded-3">
            <div className="bg-white p-2 rounded-circle shadow-sm me-3">
              {pathname==="/dashboard/users"?<Phone  />:
              <ChefHat />
              }
              
            </div>
            <div>
               {pathname==="/dashboard/users"?<> <small className="text-muted d-block">Phone Number</small>
              <span className="fw-medium">{phone || "Not Provided"}</span></>:<>
               <small className="text-muted d-block"> Recipie Tag</small>
              <span className="fw-medium">{tag || "Not Provided"}</span>
              </>}
             
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0 justify-content-center">
        {pathname==="/dashboard/users"? <Button variant="outline-secondary" className="px-5 rounded-pill" onClick={handleClose}>
          Close
        </Button>:<Button 
            variant={isFavorite ? "success" : "outline-danger"} 
            className="px-5 rounded-pill d-flex align-items-center"
            disabled={isFavorite || isPending} 
            onClick={() => id && addToFav?.({ recipeId: id })}
          >
            {isPending ? "Adding..." : isFavorite ? "Saved to Favorites" : "Add To Favourite"}
            <span className="ms-2">
             <FavIcon/>
            </span>
          </Button>}
       
      </Modal.Footer>
    </Modal>
  );
}