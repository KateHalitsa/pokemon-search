import type { UseFormRegister } from "react-hook-form";
import type { FormValues } from "../../HookForm/HookForm";

interface Props {
  register?: UseFormRegister<FormValues>;
}function FormFields({ register }: Props){
    return(
        <>
        <label htmlFor="name">Name</label>
        <input id="name" name="name"  {...(register ? register("name") : {})}/>

        <label htmlFor="age">Age</label>
        <input id="age" name="age" type="number" {...(register ? register("age") : {})} />

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email"  {...(register ? register("email") : {})}/>

        <label htmlFor="gender">Gender</label>
        <select id="gender" name="gender" {...(register ? register("gender") : {})}>
            <option value="male">Male</option>
            <option value="female">Female</option>      
        </select>

        <label htmlFor="terms">
        <input id="terms" type="checkbox" name="terms" {...(register ? register("terms") : {})}/>
        Accept Terms & Conditions
        </label>
</>
    )
}
export default FormFields;