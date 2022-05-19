import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Signup from '../pages/signup/signup';
import Confirmation from '../pages/confirmation/Confirmation';
import { Router, Route } from "react-router-dom";

const server = setupServer(
  rest.get('/signup', (req, res, ctx) => {
    return res(ctx.json({greeting: 'hello there'}))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays signup form', async () => {
  render(<Router>
 <Signup /></Router>)

  await waitFor(() => screen.findByTestId('signup-form'))

  expect(screen.getByTestId('signup-form')).not.toBeEmpty()
  expect(screen.getByRole('button')).toBeEnabled()
});

//sample
// test('handles server error', async () => {
//   render(<Fetch url="/signup" />)

//   fireEvent.click(screen.getByText('signup'))

//   await waitFor(() => screen.getByRole('alert'))

//   expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
//   expect(screen.getByRole('button')).not.toBeDisabled()
// })


// test('displays error message on form submit when form fields are empty', async () => {
//     render(<Router>      
//     <Route path="confirmation" element={<Confirmation />}></Route>
// <Signup /></Router>)

//     await waitFor(() => screen.findByTestId('signup-form'))

//     fireEvent.click(screen.getByTestId('signup-btn'))

//     await waitFor(() => screen.findByTestId('signup-error-username'))
//     await waitFor(() => screen.findByTestId('signup-error-email'))
//     await waitFor(() => screen.findByTestId('signup-error-password'))
//     await waitFor(() => screen.findByTestId('signup-error-confirm'))
//     expect(screen.getByTestId('signup-error-username')).not.toBeEmpty();
//     expect(screen.getByTestId('signup-error-email')).not.toBeEmpty();
//     expect(screen.getByTestId('signup-error-password')).not.toBeEmpty();
//     expect(screen.getByTestId('signup-error-confirm')).not.toBeEmpty();
// });

