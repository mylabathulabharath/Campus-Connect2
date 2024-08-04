import { create } from "zustand";

const useChatStore = create((set) => ({
	chats: [],
	
	setChats: (chats) => set({ chats }),
    }));

export default useChatStore;
