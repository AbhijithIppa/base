import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],                  //these are defualt values
  users: [],                         
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    
  },

  getMessages: async (userId) => {
    
  },
  sendMessage: async (messageData) => {
    
  },

  subscribeToMessages: () => {
    
  },

  unsubscribeFromMessages: () => {
    
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
