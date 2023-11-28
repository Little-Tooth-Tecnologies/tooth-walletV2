import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userSlice {

}

const initialState: userSlice = {

}

const userSlice = createSlice({
    name: "userStates",
    initialState,
    reducers: {

    },
});

export const {

} = userSlice.actions;

export default userSlice.reducer;