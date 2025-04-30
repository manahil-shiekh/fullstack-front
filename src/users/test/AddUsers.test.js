import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddUsers from "./AddUsers";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

jest.mock("axios");
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("AddUsers Component", () => {
  beforeEach(() => {
    axios.post.mockClear();
    mockNavigate.mockClear();
  });

  test("renders all input fields and buttons", () => {
    render(<AddUsers />, { wrapper: MemoryRouter });

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/user name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cancel/i })).toBeInTheDocument();
  });

  test("submits form and navigates on success", async () => {
    axios.post.mockResolvedValue({ data: {} });

    render(<AddUsers />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/user name/i), { target: { value: "johndoe" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/user", {
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        password: "password123",
      });
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
