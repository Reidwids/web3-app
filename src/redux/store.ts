import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./user";

export default configureStore({
	reducer: {
		// Add your reducers here
		userInfo: userInfoReducer,
	},
});
