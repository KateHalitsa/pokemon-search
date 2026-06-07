
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Submission {
  id: string;
  name: string;
  age: number;
  email: string;
  gender: string;
  terms: boolean;
  formType: "uncontrolled" | "react-hook-form";
}

export interface SubmissionState {
  submissions: Submission[];
}

const initialState: Submission[] = [];
const submissionsSlice = createSlice({
  name: "submissions",
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<Submission>) => {
      state.push(action.payload);
    },
  },
});

export const { addSubmission } = submissionsSlice.actions;
export default submissionsSlice.reducer;