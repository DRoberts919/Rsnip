import React, { useState } from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../pages/login/login";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../hooks/useContext";

const server = setupServer(
  rest.get("/login", (req, res, ctx) => {
    return res(ctx.json({ greeting: "hello there" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays login form", async () => {
  render(
    <UserContext.Provider value={["", ""]}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </UserContext.Provider>
  );

  await waitFor(() => screen.findByTestId("login-form"));

  expect(screen.getByTestId("login-form")).not.toBeEmpty();
  expect(screen.getByRole("button")).toBeEnabled();
});

//sample
// test('handles server error', async () => {
//   render(<Fetch url="/login" />)

//   fireEvent.click(screen.getByText('Login'))

//   await waitFor(() => screen.getByRole('alert'))

//   expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
//   expect(screen.getByRole('button')).not.toBeDisabled()
// })

test("displays error message on form submit when form fields are empty", async () => {
  render(
    <UserContext.Provider value={["", ""]}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </UserContext.Provider>
  );

  await waitFor(() => screen.findByTestId("login-form"));

  fireEvent.click(screen.getByTestId("login-btn"));

  await waitFor(() => screen.findByTestId("login-error-message"));
  expect(screen.getByTestId("login-error-message")).toHaveTextContent(
    "Invalid Username/Password"
  );
});
