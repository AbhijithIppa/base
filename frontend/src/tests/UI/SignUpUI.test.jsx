import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUpPage from "../../pages/SignUpPage";

// Helper function to render component with router
const renderSignUpPage = () => {
  return render(
    <BrowserRouter>
      <SignUpPage />
    </BrowserRouter>
  );
};

describe("SignUpPage UI Elements", () => {
  test(
    "renders the signup form with title",
    () => {
      renderSignUpPage();
      expect(screen.getByText(/create account below/i)).toBeInTheDocument();
    },
    {
      meta: {
        friendlyErrorMessage:
          "Could not find the title 'Create Account Below' on the signup page. Please check if the title text has been changed or if the component is rendering properly.",
      },
    }
  );

  test(
    "renders all form input fields",
    () => {
      renderSignUpPage();

      // Check for input fields
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    },
    {
      meta: {
        friendlyErrorMessage:
          "One or more form input fields are missing. Please verify that all required fields (Full Name, Email, and Password) have proper label text and are being rendered correctly.",
      },
    }
  );

  test(
    "renders submit button",
    () => {
      renderSignUpPage();
      expect(
        screen.getByRole("button", { name: /create account/i })
      ).toBeInTheDocument();
    },
    {
      meta: {
        friendlyErrorMessage:
          "The 'Create Account' submit button is missing. Check if the button text is correct and the button is being rendered with the proper role and text content.",
      },
    }
  );

  test(
    "renders sign in link",
    () => {
      renderSignUpPage();
      expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    },
    {
      meta: {
        friendlyErrorMessage:
          "The 'Sign In' link is missing. Verify that the link text is correct and the link element is being rendered properly.",
      },
    }
  );

  test(
    "allows typing in input fields",
    () => {
      renderSignUpPage();

      const nameInput = screen.getByLabelText(/full name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });

      expect(nameInput.value).toBe("John Doe");
      expect(emailInput.value).toBe("test@example.com");
      expect(passwordInput.value).toBe("password123");
    },
    {
      meta: {
        friendlyErrorMessage:
          "Input fields are not working as expected. This could be because:\n" +
          "1. The input field labels don't match ('Full Name', 'Email', 'Password')\n" +
          "2. The input fields are not properly handling value changes\n" +
          "3. The input fields might be disabled or not properly connected to their state",
      },
    }
  );

  test(
    "toggles password visibility when eye icon is clicked",
    () => {
      renderSignUpPage();

      const passwordInput = screen.getByLabelText(/password/i);
      const toggleButton = screen.getByLabelText(/toggle/i);

      expect(passwordInput.type).toBe("password");
      fireEvent.click(toggleButton);
      expect(passwordInput.type).toBe("text");
      fireEvent.click(toggleButton);
      expect(passwordInput.type).toBe("password");
    },
    {
      meta: {
        friendlyErrorMessage:
          "Password visibility toggle is not working correctly. This could be because:\n" +
          "1. The toggle button is missing or has incorrect aria-label ('Toggle')\n" +
          "2. The password input type is not changing between 'password' and 'text'\n" +
          "3. The click event handler might not be properly implemented",
      },
    }
  );
});
