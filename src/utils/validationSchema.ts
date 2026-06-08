import * as yup from "yup";
import type { FormValues } from "../HookForm/HookForm";

export const schema: yup.ObjectSchema<FormValues>  = yup.object({
  name: yup
    .string()
    .required("Name is required"),

  age: yup
    .number()
    .required("Age is required")
    .positive()
    .integer(),

  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  gender: yup
    .string()
    .required("Gender is required"),

  country: yup
    .string()
    .required("Country is required"),

  terms: yup
    .boolean()
    .required()
    .oneOf([true], "Accept Terms & Conditions"),

  password: yup
    .string()
    .required()
    .matches(/[A-Z]/, "Need uppercase")
    .matches(/[a-z]/, "Need lowercase")
    .matches(/[0-9]/, "Need number")
    .matches(/[!@#$%^&*]/, "Need special character"),

  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords do not match"),

  image: yup.mixed<FileList>().optional()
});