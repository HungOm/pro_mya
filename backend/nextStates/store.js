import create from 'zustand';
import axios from 'axios';

const reqAsync = async (set) => {
	try {
		const response = await axios.get('http://localhost:3000/api/users');
		const data = await response.json();
		set(() => ({ users: data }));
	} catch (error) {
		console.error(error);
	}
};

const [userStore] = create((set) => ({
	user: '',
	users: [],

	addUser: (payload) => set((state) => ({ users: [...state.users, payload] })),
	getUser: (id) => set((state) => ({ users: state.users.filter((user) => user._id === id) })),
	deleteUser: (id) => set((state) => ({ users: state.users.filter((user) => user._id !== id) })),
	getUsers: () => set((state) => ({ users: state.users })),
	reqAsync: () => {
		reqAsync(set);
	},
}));

export { userStore };
