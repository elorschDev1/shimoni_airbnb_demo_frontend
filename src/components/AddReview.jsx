import { useNavigate } from "react-router";
const AddReview = () => {
    const navigate=useNavigate();
  return (
    <section className="p-3 m-2">
        <button className="bg-dark rounded-4 text-white p-2 m-2" onClick={()=>navigate("/reviewForm")}>Add A Review</button>
    </section>
  )
}

export default AddReview