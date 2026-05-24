import { describe, expect, test } from "vitest";
import { screen } from "@testing-library/react";
import { ThemeProvider } from "./ThemeContext";
import userEvent from "@testing-library/user-event";
import Navbar from "../components/Navbar/Navbar";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe('ThemeContext', () => {
     test('switches theme on button click', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <MemoryRouter>              
        <Navbar />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(document.body.className)
      .toBe('light');

    await user.click(
      screen.getByText('light')
    );

    expect(document.body.className)
      .toBe('dark');
  });
})