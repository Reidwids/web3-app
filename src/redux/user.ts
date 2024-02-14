import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
	name: "user",
	initialState: {
		account: null,
		networkID: null,
	},
	reducers: {
		setAccount: (state, action) => {
			state.account = action.payload;
		},
		setNetworkID: (state, action) => {
			state.networkID = action.payload;
		},
	},
});

export const { setAccount, setNetworkID } = userSlice.actions;
export default userSlice.reducer;
