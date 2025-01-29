import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";

// Wrap component with required providers
const renderLoginPage = () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );
};

describe("LoginPage", () => {
  it(
    "renders login form with all essential elements",
    () => {
      renderLoginPage();

      // Check main headings
      expect(screen.getByText("Welcome Back")).toBeInTheDocument();
      expect(screen.getByText("Sign in to your account")).toBeInTheDocument();

      // Check form elements
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /sign in/i })
      ).toBeInTheDocument();
    },
    {
      meta: {
        friendlyErrorMessage:
          "The login form is missing essential elements. Please verify that:\n" +
          "1. The 'Welcome Back' heading is present\n" +
          "2. The 'Sign in to your account' subheading is present\n" +
          "3. Email and Password input fields have correct labels\n" +
          "4. The 'Sign In' button is present and properly labeled",
      },
    }
  );

  it(
    "allows email input",
    () => {
      renderLoginPage();
      const emailInput = screen.getByLabelText("Email");
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      expect(emailInput.value).toBe("test@example.com");
    },
    {
      meta: {
        friendlyErrorMessage:
          "The email input field is not working as expected. This could be because:\n" +
          "1. The input field label doesn't match 'Email'\n" +
          "2. The input field is not properly handling value changes\n" +
          "3. The input field might be disabled or not properly connected to its state",
      },
    }
  );

  it(
    "allows password input and toggles password visibility",
    () => {
      renderLoginPage();
      const passwordInput = screen.getByLabelText("Password");
      const toggleButton = screen.getByRole("button", {
        name: /toggle password visibility/i,
      });

      // Test password input
      fireEvent.change(passwordInput, { target: { value: "testpassword" } });
      expect(passwordInput.value).toBe("testpassword");

      // Test password visibility toggle
      expect(passwordInput).toHaveAttribute("type", "password");
      fireEvent.click(toggleButton);
      expect(passwordInput).toHaveAttribute("type", "text");
      fireEvent.click(toggleButton);
      expect(passwordInput).toHaveAttribute("type", "password");
    },
    {
      meta: {
        friendlyErrorMessage:
          "Password field functionality is not working correctly. This could be because:\n" +
          "1. The password input field label doesn't match 'Password'\n" +
          "2. The password visibility toggle button is missing or incorrectly labeled\n" +
          "3. The password input type is not changing between 'password' and 'text'\n" +
          "4. The input field is not properly handling value changes",
      },
    }
  );

  it(
    "submits form with entered data",
    () => {
      renderLoginPage();

      // Fill form
      fireEvent.change(screen.getByLabelText("Email"), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(screen.getByLabelText("Password"), {
        target: { value: "password123" },
      });

      // Submit form
      const submitButton = screen.getByRole("button", { name: /sign in/i });
      fireEvent.click(submitButton);
    },
    {
      meta: {
        friendlyErrorMessage:
          "Form submission is not working as expected. This could be because:\n" +
          "1. The input fields are not accessible or properly labeled\n" +
          "2. The submit button is missing or incorrectly labeled\n" +
          "3. The form submission handler might not be properly implemented",
      },
    }
  );
});
