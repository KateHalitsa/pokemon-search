import { useForm } from "react-hook-form";
import FormFields from "../components/FormFields/FormFields";
import { useDispatch } from "react-redux";
import { addSubmission } from "../store/formSlice";
import { convertToBase64 } from "../utils/convertToBase64";

export type FormValues = {
  name: string;
  age: number;
  email: string;
  gender: string;
  terms: boolean;
  image?: FileList;
};

function HookForm() {
  const { register, handleSubmit } = useForm<FormValues>();
  const dispatch = useDispatch();

 const onSubmit = async (data: FormValues) => {
const file = data.image?.[0];

  const base64 = file
    ? await convertToBase64(file)
    : undefined;

  const submission = {
    id: crypto.randomUUID(),
    formType: "react-hook-form" as const,
    ...data,
    image: base64,
  };
    dispatch(addSubmission(submission));
}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormFields register={register} />

      <button type="submit">
        Submit
      </button>
    </form>
  );
}

export default HookForm;