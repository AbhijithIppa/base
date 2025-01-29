import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MessageInput from "../../components/MessageInput";

describe("MessageInput", () => {
  beforeEach(() => {
    render(<MessageInput />);
  });

  it("renders the message input form", () => {
    expect(screen.getByTestId("message-form")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Type a message...")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("updates text input value when typing", async () => {
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("Type a message...");

    await user.type(input, "Hello, world!");
    expect(input.value).toBe("Hello, world!");
  });

  it("disables send button when input is empty and no image", () => {
    const sendButton = screen.getByRole("button", { name: /send/i });
    expect(sendButton).toBeDisabled();
  });

  it("enables send button when there is text input", async () => {
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("Type a message...");
    const sendButton = screen.getByRole("button", { name: "send" });

    await user.type(input, "Hello");
    expect(sendButton).toBeEnabled();
  });

  it("handles image upload and preview", async () => {
    const file = new File(["dummy content"], "test.png", { type: "image/png" });
    const fileInput = screen.getByTestId("file-input");

    // Mock FileReader
    const mockFileReader = {
      readAsDataURL: vi.fn(),
      result: "data:image/png;base64,dummy",
      onloadend: null,
    };
    vi.spyOn(window, "FileReader").mockImplementation(() => mockFileReader);

    // Trigger file upload
    fireEvent.change(fileInput, { target: { files: [file] } });
    mockFileReader.onloadend();

    // Check if preview appears
    const preview = await screen.findByAltText("Preview");
    expect(preview).toBeInTheDocument();
  });

  it("removes image preview when clicking remove button", async () => {
    const file = new File(["dummy content"], "test.png", { type: "image/png" });
    const fileInput = screen.getByTestId("file-input");

    // Mock FileReader
    const mockFileReader = {
      readAsDataURL: vi.fn(),
      result: "data:image/png;base64,dummy",
      onloadend: null,
    };
    vi.spyOn(window, "FileReader").mockImplementation(() => mockFileReader);

    // Upload image
    fireEvent.change(fileInput, { target: { files: [file] } });
    mockFileReader.onloadend();

    // Find and click remove button
    const removeButton = await screen.findByRole("button", { name: /remove/i });
    await userEvent.click(removeButton);

    // Check if preview is removed
    expect(screen.queryByAltText("Preview")).not.toBeInTheDocument();
  });

 
});
