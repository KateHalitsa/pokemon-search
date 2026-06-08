import { useEffect } from "react";
import { removeHighlight, type Submission } from "../../store/formSlice";
import { useDispatch } from "react-redux";

type Props = {
  data: Submission;
};
function SubmissionCard({ data }: Props) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data.isNew) return;

    const timer = setTimeout(() => {
      dispatch(removeHighlight(data.id));
    }, 3000);

    return () => clearTimeout(timer);
  }, [data.isNew]);
  return (
    <div className={`card ${data.isNew ? "new-card" : ""}`}>      
    <h3>
        {data.formType === "uncontrolled"
          ? "Uncontrolled Form"
          : "React Hook Form"}
      </h3>

      <p>Name: {data.name}</p>
      {data.image && (
        <img src={data.image} alt={data.name} width={150} />
      )}      
      <p>Age: {data.age}</p>
      <p>Email: {data.email}</p>
      <p>Gender: {data.gender}</p>
      <p>Country: {data.country}</p>

    </div>
  );
}
export default SubmissionCard;