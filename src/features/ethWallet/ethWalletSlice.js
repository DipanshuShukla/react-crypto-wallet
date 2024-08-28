import { createSlice } from "@reduxjs/toolkit";
import { mnemonicToSeedSync } from "bip39";
import { Wallet } from "ethers";
import { HDNodeWallet } from "ethers";

const initialState = {
    wallets: [],
    curID: 0,
};

const ethWalletSlice = createSlice({
    name: "ethWallets",
    initialState,
    reducers: {
        clear: (state) => {
            state.wallets = [];
            state.curID = 0;
        },
        generate: (state, action) => {
            const seed = mnemonicToSeedSync(action.payload);
            const derivationPath = `m/44'/60'/${state.curID}'/0'`;
            const hdNode = HDNodeWallet.fromSeed(seed);
            const child = hdNode.derivePath(derivationPath);
            const privateKey = child.privateKey;
            const wallet = new Wallet(privateKey);

            state.wallets.push({
                id: state.curID,
                publicKey: wallet.address,
                privateKey: wallet.privateKey,
            });
            state.curID++;
        },
        deleteWallet: (state, action) => {
            state.wallets = state.wallets.filter(
                (wallet) => action.payload !== wallet.id
            );
        },
    },
});

export const {
    clear: clearEth,
    generate: generateEth,
    deleteWallet: deleteEthWallet,
} = ethWalletSlice.actions;

export default ethWalletSlice.reducer;
