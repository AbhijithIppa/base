import { render, screen, fireEvent } from "@testing-library/react";
import ChatContainer from "../../components/ChatContainer";
import { vi } from "vitest";

// Mock the store hooks
vi.mock("../store/useChatStore", () => ({
  useChatStore: () => ({
    messages: mockMessages,
    selectedUser: mockSelectedUser,
    isMessagesLoading: false,
    getMessages: vi.fn(),
    subscribeToMessages: vi.fn(),
    unsubscribeFromMessages: vi.fn(),
  }),
}));

vi.mock("../store/useAuthStore", () => ({
  useAuthStore: () => ({
    authUser: mockCurrentUser,
  }),
}));

// Mock basic message data
const mockMessages = [
  {
    _id: "msg1",
    text: "Hello there",
    senderId: "user1",
    createdAt: new Date().toISOString(),
    image: null,
  },
  {
    _id: "msg2",
    text: null,
    senderId: "user2",
    createdAt: new Date().toISOString(),
    image: "/test-image.jpg",
  },
  {
    _id: "msg3",
    text: "How are you?",
    image: "/another-image.jpg",
    senderId: "user1",
    createdAt: new Date().toISOString(),
  },
];

// Mock current user and selected user
const mockCurrentUser = {
  _id: "user1",
  profilePic: "/avatar1.png",
};

const mockSelectedUser = {
  _id: "user2",
  profilePic: "/avatar2.png",
};

describe("ChatContainer UI", () => {
  it(
    "renders chat container with basic structure",
    () => {
      render(<ChatContainer />);

      // Check for main structural elements
      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(screen.getByTestId("message-container")).toBeInTheDocument();
      expect(screen.getByTestId("message-input")).toBeInTheDocument();
    },
    {
      meta: {
        friendlyErrorMessage:
          "Basic chat structure is missing. Please verify that:\n" +
          "1. The main chat container exists\n" +
          "2. The message container is present\n" +
          "3. The message input component is rendered",
      },
    }
  );

  it(
    "displays messages correctly",
    () => {
      render(<ChatContainer />);

      // Check if text messages are displayed
      expect(screen.getByText("Hello there")).toBeInTheDocument();
      expect(screen.getByText("How are you?")).toBeInTheDocument();

      // Check if images are rendered
      const messageImages = screen.getAllByRole("img", { name: "Attachment" });
      expect(messageImages).toHaveLength(2);
    },
    {
      meta: {
        friendlyErrorMessage:
          "Messages are not displaying correctly. Please verify that:\n" +
          "1. Text messages are visible\n" +
          "2. Message images are properly rendered\n" +
          "3. Both text and image messages are handled",
      },
    }
  );

  it(
    "aligns messages correctly based on sender",
    () => {
      render(<ChatContainer />);

      const messageContainers = screen.getAllByTestId("message-bubble");

      messageContainers.forEach((container, index) => {
        if (mockMessages[index].senderId === mockCurrentUser._id) {
          expect(container).toHaveClass("chat-end");
        } else {
          expect(container).toHaveClass("chat-start");
        }
      });
    },
    {
      meta: {
        friendlyErrorMessage:
          "Message alignment is incorrect. Please verify that:\n" +
          "1. Current user's messages are aligned to the right\n" +
          "2. Other user's messages are aligned to the left\n" +
          "3. Message bubbles have correct chat-end/chat-start classes",
      },
    }
  );

  it(
    "displays correct profile pictures for messages",
    () => {
      render(<ChatContainer />);

      const avatars = screen.getAllByRole("img", { name: "profile pic" });

      avatars.forEach((avatar, index) => {
        const message = mockMessages[index];
        const expectedSrc =
          message.senderId === mockCurrentUser._id
            ? mockCurrentUser.profilePic
            : mockSelectedUser.profilePic;

        expect(avatar).toHaveAttribute("src", expectedSrc || "/avatar.png");
      });
    },
    {
      meta: {
        friendlyErrorMessage:
          "Profile pictures are not displaying correctly. Please verify that:\n" +
          "1. Each message has a profile picture\n" +
          "2. Current user's profile picture is shown for their messages\n" +
          "3. Selected user's profile picture is shown for their messages\n" +
          "4. Default avatar is used when no profile picture exists",
      },
    }
  );

  it(
    "handles empty message list",
    () => {
      vi.mocked(useChatStore).mockReturnValue({
        ...vi.mocked(useChatStore)(),
        messages: [],
      });

      render(<ChatContainer />);

      const messageContainer = screen.getByTestId("message-container");
      expect(messageContainer.children.length).toBe(1); // Only the scroll ref div
    },
    {
      meta: {
        friendlyErrorMessage:
          "Empty message list is not handled correctly. Please verify that:\n" +
          "1. The chat container still renders\n" +
          "2. No message bubbles are displayed\n" +
          "3. The message input is still available",
      },
    }
  );
});
