import { createSlice } from "@reduxjs/toolkit";
import { generateMnemonic } from "bip39";

const initialState = {
    mnemonic: [],
};

const secretSlice = createSlice({
    name: "secret",
    initialState,
    reducers: {
        generate: (state) => {
            state.mnemonic = generateMnemonic();
        },
        clear: (state) => {
            state.mnemonic = [];
        },
    },
});

export const { generate, clear } = secretSlice.actions;

export default secretSlice.reducer;
