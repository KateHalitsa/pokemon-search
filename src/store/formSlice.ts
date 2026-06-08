
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Submission {
  id: string;
  name: string;
  age: number;
  email: string;
  gender: string;
  country: string;
  terms: boolean;
  formType: "uncontrolled" | "react-hook-form";
  image?: string;
  isNew?: boolean;
}

export interface SubmissionState {
  submissions: Submission[];
}

export const initialState: Submission[] = [];
const submissionsSlice = createSlice({
  name: "submissions",
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<Submission>) => {
        console.log("REDUCER");
        state.unshift(action.payload);
    },
    removeHighlight: (state, action: PayloadAction<string>) => {
      const item = state.find(s => s.id === action.payload);

      if (item) {
        item.isNew = false;
      }
    }
  }
});

export const { addSubmission, removeHighlight} = submissionsSlice.actions;
export default submissionsSlice.reducer;