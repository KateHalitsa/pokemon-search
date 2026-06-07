import { useDispatch } from "react-redux";
import { addSubmission } from "../../store/formSlice";
import FormFields from "../FormFields/FormFields";
import { useRef, useState } from "react";
import { convertToBase64 } from "../../utils/convertToBase64";
import { getPasswordStrength } from "../../utils/getPasswordStrength";

function UncontrolledForm() {
    const [password, setPassword] = useState("");
   const dispatch = useDispatch();
const isSubmitting = useRef(false);
const strength = getPasswordStrength(password || "");

  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSubmitting.current) return;
  isSubmitting.current = true;

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
    setPassword((form.elements.namedItem("password") as HTMLInputElement).value);
const passwordValue = (form.elements.namedItem("password") as HTMLInputElement).value;
const confirmPasswordValue = (form.elements.namedItem("confirmPassword") as HTMLInputElement).value;

if (passwordValue !== confirmPasswordValue) {
  alert("Passwords do not match");
  return;
}
    console.log(data);
    const fullData = {
 ...data,
  image
};   

    dispatch(addSubmission(fullData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormFields password={password} setPassword={setPassword} strength={strength}/>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledForm;

