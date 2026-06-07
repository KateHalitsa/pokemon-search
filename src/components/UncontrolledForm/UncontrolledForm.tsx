import { useDispatch } from "react-redux";
import { addSubmission } from "../../store/formSlice";
import FormFields from "../FormFields/FormFields";

function UncontrolledForm() {
   const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const data = {
      id: crypto.randomUUID(),
      formType: "uncontrolled" as const,
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      age: Number((form.elements.namedItem("age") as HTMLInputElement).value),
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      gender: (form.elements.namedItem("gender") as HTMLSelectElement).value,
      terms: (form.elements.namedItem("terms") as HTMLInputElement).checked,
      
    };

    console.log(data);
    dispatch(addSubmission(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormFields />
      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledForm;

