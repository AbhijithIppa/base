import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,                    //These are defualt values
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
   
  },

  signup: async (data) => {
    
  },

  login: async (data) => {
    
  },

  logout: async () => {
    
  },


  connectSocket: () => {
   
  },
  disconnectSocket: () => {
    
  },
}));
