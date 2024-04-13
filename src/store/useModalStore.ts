import { create } from 'zustand';

interface ModalState {
	isShow: boolean;
	setIsShow: (isShow: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
	isShow: false,
	setIsShow: (isShow) => set({ isShow: isShow })
}));
