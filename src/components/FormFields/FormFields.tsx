import {type UseFormRegister } from "react-hook-form";
import type { FormValues } from "../../HookForm/HookForm";
import { getPasswordStrength } from "../../utils/getPasswordStrength";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

type Props ={
  register?: UseFormRegister<FormValues>;
  password?: string;
  setPassword?: React.Dispatch<React.SetStateAction<string>>;
  strength?: ReturnType<typeof getPasswordStrength>;}

function FormFields({ register,password, setPassword,strength}: Props){
const countries = useSelector(
  (state: RootState) => state.countries
);
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
        <label htmlFor="image">Photo</label>
        <input
        id="image"
        name="image"
        type="file"
        accept=".png,.jpg,.jpeg"
        {...(register ? register("image") : {})}
        />
        
        <label htmlFor="country">Country</label>

<input
  id="country"
  name="country"
  list="countries"
  {...(register ? register("country") : {})}
/>

<datalist id="countries">
  {countries.map(country => (
    <option
      key={country}
      value={country}
    />
  ))}
</datalist>

        <label htmlFor="terms">
        <input id="terms" type="checkbox" name="terms" {...(register ? register("terms") : {})}/>
        Accept Terms & Conditions
        </label>
        <label htmlFor="password">Password</label>
        <input
        id="password"
        name="password"
        type="password"
        {...(register ? register("password") : {})}
        onInput={(e) => {
          if (!register) setPassword?.((e.target as HTMLInputElement).value);
        }}
      />
<div>
  <p>Password strength: {strength?.score}/4</p>

  <ul>
    <li style={{ color: strength?.hasNumber ? "green" : "red" }}>
      1 number
    </li>
    <li style={{ color: strength?.hasUpper ? "green" : "red" }}>
      1 uppercase
    </li>
    <li style={{ color: strength?.hasLower ? "green" : "red" }}>
      1 lowercase
    </li>
    <li style={{ color: strength?.hasSpecial ? "green" : "red" }}>
      1 special character
    </li>
  </ul>
</div>


        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" name="confirmPassword" type="password" {...(register ? register("confirmPassword",{validate: value =>
      value === password || "Passwords do not match"}) : {})}
      
 />
</>
    )
}
export default FormFields;