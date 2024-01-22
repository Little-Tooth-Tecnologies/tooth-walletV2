import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface appStates {
    success: boolean;
    infoMSG: string;        
    error: boolean;
    loading: boolean;
    show: boolean;        
}

const initialState: appStates = {
    infoMSG: '',
    show: false,
    loading: false,
    success: false,
    error: false,    
}

const appSlice = createSlice({
    name: "states",
    initialState,
    reducers: {
        setStates: (state, action: PayloadAction<Partial<appStates>>) => {
            return { ...state, ...action.payload };
        },  
    },
});

export const { 
    setStates       
    } = appSlice.actions;

export default appSlice.reducer;