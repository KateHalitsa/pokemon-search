import { useForm } from "react-hook-form";
import FormFields from "../components/FormFields/FormFields";
import { useDispatch } from "react-redux";
import { addSubmission } from "../store/formSlice";
import { convertToBase64 } from "../utils/convertToBase64";
import { getPasswordStrength } from "../utils/getPasswordStrength";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../utils/validationSchema";
import { useRef } from "react";

export type FormValues = {
  name: string;
  age: number;
  email: string;
  gender: string;
  country: string;
  terms: boolean;
  image?: FileList;
  password: string;
  confirmPassword: string;
  
};
interface Props {
  onSuccess: () => void;
}
function HookForm({ onSuccess }: Props) {
  const {
  register,
  handleSubmit,
  watch,
  reset,
  formState: { errors,isValid }
} = useForm<FormValues>({
  resolver: yupResolver(schema),
  mode: "onChange"

});
const isSubmitting = useRef(false);

  const dispatch = useDispatch();
const password = watch("password")||'';

const strength = getPasswordStrength(password);

 const onSubmit = async (data: FormValues) => { if (isSubmitting.current) return;


const file = data.image?.[0];

  const base64 = file
    ? await convertToBase64(file)
    : undefined;

  const submission = {
    id: crypto.randomUUID(),
    formType: "react-hook-form" as const,
    ...data,
    image: base64,
    isNew: true
  };
    dispatch(addSubmission(submission));
    isSubmitting.current = true;
    reset();
    onSuccess();
}

  return (
    
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormFields register={register}  rhfErrors={errors}  password={password}strength={strength}
 />
      
      <button type="submit"disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}

export default HookForm;