import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatHeader2 from '../components/ChatHeader2';

describe('ChatHeader2', () => {
  it('renders user information correctly', () => {
    render(<ChatHeader2 />);
    
    // Check if user name is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    
    // Check if online status is displayed
    expect(screen.getByText('Online')).toBeInTheDocument();
    
    // Check if user avatar is present
    const avatar = screen.getByAltText('John Doe');
    expect(avatar).toBeInTheDocument();
    expect(avatar.src).toContain('/avatar.png');
  });

  it('renders messages correctly', () => {
    render(<ChatHeader2 />);
    
    // Check if all messages are rendered
    expect(screen.getByText('Hey, how are you?')).toBeInTheDocument();
    expect(screen.getByText("I'm good, thanks! How about you?")).toBeInTheDocument();
    expect(screen.getByText('I'm doing great! Check out this photo')).toBeInTheDocument();
    
    // Check if message image is rendered
    const messageImage = screen.getByAltText('Attachment');
    expect(messageImage).toBeInTheDocument();
    expect(messageImage.src).toContain('/avatar.png');
  });

  it('has functional message input', () => {
    render(<ChatHeader2 />);
    
    // Check if input field exists
    const input = screen.getByPlaceholderText('Type a message...');
    expect(input).toBeInTheDocument();
    
    // Check if send button exists
    const sendButton = screen.getByText('Send');
    expect(sendButton).toBeInTheDocument();
  });

  it('has functional close button', () => {
    render(<ChatHeader2 />);
    
    // Check if close button exists
    const closeButton = screen.getByRole('button', { name: '' }); // X icon button
    expect(closeButton).toBeInTheDocument();
  });
}); 