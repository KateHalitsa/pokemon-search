import { describe, it, expect, vi } from 'vitest';
import HookForm, { type FormValues } from '../HookForm/HookForm';
import { fireEvent, render,screen, waitFor} from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import UncontrolledForm from '../components/UncontrolledForm/UncontrolledForm';
import Modal from '../components/Modal/Modal';
import reducer, { addSubmission, type Submission } from '../store/formSlice';
import { getPasswordStrength } from '../utils/getPasswordStrength';
import { convertToBase64 } from '../utils/convertToBase64';
import SubmissionCard from '../components/SubmissionCard/SubmissionCard';
import Submissions from '../components/Submissions/Submissions';
import App from '../App';
import FormFields from '../components/FormFields/FormFields';
import type { UseFormRegister } from 'react-hook-form';

describe('App', () => {
  it('works', () => {
    expect(true).toBe(true);
  });
});
describe('Form components are tested (rendering, validation, submission)',()=>{
  it('Test render',()=>{
    const fun =vi.fn();
    render( <Provider store={store}>
   <HookForm onSuccess={fun}/>
   </Provider>);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });
    it('Test validation',async()=>{
    const fun =vi.fn();
    render( <Provider store={store}>
   <UncontrolledForm onSuccess={fun}/>
   </Provider>);

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
await waitFor(() => {

    expect(screen.getByText("Name is required")).toBeInTheDocument();
  })
  });
      it('Test submit',async()=>{
        const fun =vi.fn();
        render( <Provider store={store}>
        <UncontrolledForm onSuccess={fun}/>
        </Provider>);
     
  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: "Kate" }
  });

  fireEvent.change(screen.getByLabelText(/age/i), {
    target: { value: "20" }
  });

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "koza@test.com" }
  });

  fireEvent.change(screen.getByLabelText(/country/i), {
    target: { value: "Belarus" }
  });

fireEvent.change(screen.getByLabelText(/^Password$/i), {
  target: { value: "Qwerty1!" }
});

fireEvent.change(screen.getByLabelText(/^Confirm Password$/i), {
  target: { value: "Qwerty1!" }
});
  fireEvent.click(screen.getByLabelText(/accept terms/i));

  fireEvent.click(
    screen.getByRole("button", { name: /submit/i })
  );

  await waitFor(() => {
    expect(store.getState().submissions).toHaveLength(1);
  });

  expect(store.getState().submissions[0]).toEqual(
    expect.objectContaining({
      name: "Kate",
      email: "koza@test.com"
    })
  );})
it("disables submit button when form invalid", () => {
  render(
    <Provider store={store}>
      <HookForm onSuccess={vi.fn()} />
    </Provider>
  );

  expect(screen.getByRole("button")).toBeDisabled();
});
  it("submits valid RHF form", async () => {
    const fun = vi.fn()
  render(
    <Provider store={store}>
      <HookForm onSuccess={fun} />
    </Provider>
  );

  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: "Kate" }
  });

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "kate@test.com" }
  });

  fireEvent.change(screen.getByLabelText(/age/i), {
    target: { value: "20" }
  });

fireEvent.change(screen.getByLabelText(/^Password$/i), {
    target: { value: "Qwerty1!" }
  });

fireEvent.change(screen.getByLabelText(/^Confirm Password$/i), {
    target: { value: "Qwerty1!" }
  });

  fireEvent.click(screen.getByLabelText(/terms/i));

  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitFor(() => {
    expect(store.getState().submissions.length).toBe(1);
  });
  
});
  it("renders SubmissionCard", async() => {
    const renderWithStore = (ui: React.ReactElement) =>
  render(<Provider store={store}>{ui}</Provider>);
  renderWithStore(
    <Provider store={store}>
      <SubmissionCard
        data={{
          id: "1",
          name: "Kate",
          age: 20,
          email: "kate@test.com",
          gender: "female",
          country: "Poland",
          terms: true,
          formType: "uncontrolled",
          image: "img.png",
        }}
      />
    </Provider>
  );

expect(screen.getByText(/Name:\s*Kate/i)).toBeInTheDocument();});
})

it("rejects password mismatch", async () => {
  render(
    <Provider store={store}>
      <UncontrolledForm onSuccess={vi.fn()} />
    </Provider>
  );

  fireEvent.change(screen.getByLabelText(/^Password$/i), {
    target: { value: "123" }
  });

  fireEvent.change(screen.getByLabelText(/^Confirm Password$/i), {
    target: { value: "456" }
  });


const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

fireEvent.click(screen.getByRole("button"));

expect(alertMock).toHaveBeenCalledWith("Passwords do not match");
});

describe('Modal components',()=>{
  it('Test opening',()=>{
    render(
        <Modal isOpen={true} handleClose={vi.fn()}>
          test
        </Modal>
      );

      expect(screen.getByText("test")).toBeInTheDocument();
  })
    it('Test closing',()=>{
    const handleClose = vi.fn();

    render(
      <Modal isOpen={true} handleClose={handleClose}>
        test
      </Modal>
    );

    fireEvent.click(screen.getByText("Close"));

    expect(handleClose).toHaveBeenCalled();
  })
  it('Test portal',()=>{
    const handleClose = vi.fn();

    render(
      <Modal isOpen={true} handleClose={handleClose}>
        test
      </Modal>
    );

    fireEvent.click(screen.getByText("Close"));

    expect(
    document.getElementById("react-portal-modal-container")
    ).toBeInTheDocument();
  })
it("renders submissions list", () => {
  render(
    <Provider store={store}>
      <Submissions />
    </Provider>
  );

  expect(screen.getByText(/submissions/i)).toBeInTheDocument();
});
it("does not render when closed", () => {
  const { container } = render(
    <Modal isOpen={false} handleClose={vi.fn()}>
      test
    </Modal>
  );

  expect(container).toBeEmptyDOMElement();
});
})
describe("formSlice", () => {
  it("adds submission", () => {

    const initialState: Submission[] | undefined = [];

    const action = addSubmission({
      id: "1",
      name: "Kate",
      age: 20,
      email: "test@test.com",
      gender: "female",
      country: "Poland",
      terms: true,
      formType: "react-hook-form"
    });

    const state = reducer(initialState, action);

    expect(state).toHaveLength(1);
  });

it("returns initial state", () => {
  expect(reducer(undefined, { type: "unknown" })).toEqual([]);
});

it("adds multiple submissions", () => {
  const state1 = reducer([], addSubmission({
    id: "1",
    name: "A",
    age: 1,
    email: "a@test.com",
    gender: "male",
    country: "PL",
    terms: true,
    formType: "uncontrolled",
  }));

  const state2 = reducer(state1, addSubmission({
    id: "2",
    name: "B",
    age: 2,
    email: "b@test.com",
    gender: "female",
    country: "UA",
    terms: true,
    formType: "react-hook-form",
  }));

  expect(state2).toHaveLength(2);
});

});
describe('Utility functions',()=>{
  describe("getPasswordStrength", () => {

  it("returns score 4", () => {

    const result = getPasswordStrength("Abc123!");

    expect(result.score).toBe(4);

  });
  it("empty password has score 0", () => {
    expect(getPasswordStrength("")).toEqual({
      score: 0,
      hasNumber: false,
      hasUpper: false,
      hasLower: false,
      hasSpecial: false,
    });
  });

});
  it("converts file to base64", async () => {
    const file = new File(
      ["Hello"],
      "test.txt",
      { type: "text/plain" }
    );

    const result = await convertToBase64(file);

    expect(result).toContain("data:text/plain;base64");
  });

})

it("opens uncontrolled form modal", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  fireEvent.click(screen.getByText(/Open Uncontrolled Form/i));

  expect(screen.getByRole("dialog")).toBeInTheDocument();
});

it("switches to hook form", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  fireEvent.click(screen.getByText(/Open React Hook Form/i));

  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
});
it("renders uncontrolled form", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  fireEvent.click(screen.getByText(/Open Uncontrolled Form/i));

  expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
});


vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}))

describe('main', () => {
  it('renders app', async () => {
    await import('../main')
  })
})

describe("FormFields", () => {
  it("renders errors and password strength", () => {
    render(
      <Provider store={store}>
        <FormFields
          uncontrolledErrors={{
            name: "Name required",
            password: "Password required",
          }}
          strength={{
            score: 3,
            hasNumber: true,
            hasUpper: true,
            hasLower: false,
            hasSpecial: true,
          }}
        />
      </Provider>
    );

    expect(screen.getByText("Name required")).toBeInTheDocument();
    expect(screen.getByText("Password required")).toBeInTheDocument();

    expect(screen.getByText("Password strength: 3/4")).toBeInTheDocument();
    expect(screen.getByText("1 number")).toHaveStyle({
  color: "rgb(0, 128, 0)",
    });
    expect(screen.getByText("1 lowercase")).toHaveStyle({
  color: "rgb(255, 0, 0)",
    });
  });
});

it("renders countries from store", () => {
  render(
    <Provider store={store}>
      <FormFields />
    </Provider>
  );

  expect(document.querySelector("#countries")).toBeInTheDocument();

  const options = document.querySelectorAll("#countries option");

  expect(options.length).toBeGreaterThan(0);
});
it("calls register for form fields", () => {
const register = vi.fn((name) => ({
  name,
  onChange: vi.fn(),
  onBlur: vi.fn(),
  ref: vi.fn(),
})) as unknown as UseFormRegister<FormValues>;
  render(
    <Provider store={store}>
      <FormFields
        register={register}
        password="123456"
      />
    </Provider>
  );

  expect(register).toHaveBeenCalledWith("name");
  expect(register).toHaveBeenCalledWith("age");
  expect(register).toHaveBeenCalledWith("email");
  expect(register).toHaveBeenCalledWith("gender");
  expect(register).toHaveBeenCalledWith("image");
  expect(register).toHaveBeenCalledWith("country");
  expect(register).toHaveBeenCalledWith("terms");
  expect(register).toHaveBeenCalledWith("password");
});