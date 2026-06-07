import type { Submission } from "../../store/formSlice";

type Props = {
  data: Submission;
};
function SubmissionCard({ data }: Props) {
  return (
    <div className="card">
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
    </div>
  );
}
export default SubmissionCard;