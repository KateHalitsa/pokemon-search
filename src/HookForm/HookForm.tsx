import { useForm } from "react-hook-form";
import FormFields from "../components/FormFields/FormFields";
import { useDispatch } from "react-redux";
import { addSubmission } from "../store/formSlice";

export type FormValues = {
  name: string;
  age: number;
  email: string;
  gender: string;
  terms: boolean;
};

function HookForm() {
  const { register, handleSubmit } = useForm<FormValues>();
  const dispatch = useDispatch();

 const onSubmit = (data: FormValues) => {
    const submission = {
      id: crypto.randomUUID(),
      formType: "react-hook-form" as const,
      ...data,
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