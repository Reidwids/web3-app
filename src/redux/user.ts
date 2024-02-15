import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
	name: "user",
	initialState: {
		account: null as string | null,
		networkID: null as number | null,
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
