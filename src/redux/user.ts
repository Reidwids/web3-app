import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
	name: "user",
	initialState: {
		account: null as string | null,
	},
	reducers: {
		setAccount: (state, action) => {
			state.account = action.payload;
		},
	},
});

export const { setAccount } = userSlice.actions;
export default userSlice.reducer;
