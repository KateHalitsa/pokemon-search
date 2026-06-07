import { useDispatch } from "react-redux";
import { addSubmission } from "../../store/formSlice";
import FormFields from "../FormFields/FormFields";
import { useRef } from "react";
import { convertToBase64 } from "../../utils/convertToBase64";

function UncontrolledForm() {
  console.log("RENDER UncontrolledForm");
   const dispatch = useDispatch();
const isSubmitting = useRef(false);

  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSubmitting.current) return;
  isSubmitting.current = true;
      console.log("HANDLE SUBMIT");

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

  const file = (form.elements.namedItem("image") as HTMLInputElement)
  .files?.[0];    
  let image: string | undefined;
  
  if (file) {

    const allowedTypes = ["image/png", "image/jpeg"];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PNG and JPEG are allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Max size is 2 MB");
      return;
    }
     image = await convertToBase64(file);
    }
    console.log(data);
    const fullData = {
 ...data,
  image
};   
console.log("BEFORE DISPATCH");

    dispatch(addSubmission(fullData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormFields />
      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledForm;

