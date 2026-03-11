import { useDeleteFromFav, useGetAllFav } from "../../hooks/FavouritHooks";
import Header from "../Shared/Header/Header";
import Loader from "../Shared/Loader";
import NoData from "../Shared/NoData/NoData";
import { Card, Row, Col, Container } from "react-bootstrap";
import food from "../../assets/images/food.webp";
import { DeleteIcon } from "../../assets/svgIcons";
import DeleteConfirmation from "../Shared/DeleteConfirmation";
import { useState } from "react";

export default function Favourite() {
  const { data, isLoading, isError, error } = useGetAllFav();
  const dataList = data?.data;
 const {mutate}=useDeleteFromFav()
 const [show, setShow] = useState(false)
 const [id,setId]=useState<string|null>(null)
 const handleClose=()=>{
  setShow(false)
 }
 const handleShow=(id:string)=>{
setId(id)
  setShow(true)
 }
  return (
    <>
      <Header 
        text1="Favorite" 
        text2="Items!" 
        paragraph="You can now view your favorite recipes. These are the items you've saved for quick access later."
      />

      <Container className="my-5">
       
        {isLoading && (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <Loader />
          </div>
        )}

        
        {isError && (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <h2 className="text-danger">{error?.message || "Something went wrong"}</h2>
          </div>
        )}

       
        {!isLoading && !isError && dataList?.length === 0 && (
          <div className="text-center mt-5">
            <NoData />
          </div>
        )}

        {!isLoading && !isError && dataList!!.length > 0 && (
          <Row className="g-4">
            {dataList?.map((item) => (
              <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
                <div className="position-relative h-100 shadow-sm border rounded-4 overflow-hidden bg-white recipe-card">
                  
                  <div 
                    className="position-absolute top-0 end-0 m-3 z-3 bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm pointer hover-zoom"
                    style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                    title="Remove from favorites"
                    onClick={()=>handleShow(item.id)}
                  >
                   <DeleteIcon />
                  </div>

                  <Card className="border-0 h-100">
                    <div style={{ height: '200px', overflow: 'hidden' }}>
                      <Card.Img 
                        variant="top" 
                        src={item?.recipe?.imagePath ? `https://upskilling-egypt.com:3006/${item?.recipe?.imagePath}` : food} 
                        className="w-100 h-100 object-fit-cover transition-transform"
                      />
                    </div>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="fw-bold text-dark mb-2 text-truncate">
                        {item?.recipe?.name}
                      </Card.Title>
                      <Card.Text className="text-muted small flex-grow-1" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {item?.recipe?.description || "No description available for this delicious recipe."}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
      <DeleteConfirmation
      show={show}
      handleClose={handleClose}
      selectedId={id!!}
      title="Recipie from favourite"
      mutate={mutate}
      />
    </>
  );
}