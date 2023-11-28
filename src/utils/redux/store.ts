
import { configureStore } from '@reduxjs/toolkit';
import appStates from './appSlice';

const store = configureStore({
    reducer: {
        commonState: appStates,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;