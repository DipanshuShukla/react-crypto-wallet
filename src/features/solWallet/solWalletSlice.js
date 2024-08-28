import { createSlice } from "@reduxjs/toolkit";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";

const initialState = {
    wallets: [],
    curID: 0,
};

const solWalletSlice = createSlice({
    name: "solWallets",
    initialState,
    reducers: {
        clear: (state) => {
            state.wallets = [];
            state.curID = 0;
        },
        generate: (state, action) => {
            const seed = mnemonicToSeed(action.payload);
            const path = `m/44'/501'/${state.curID}'/0'`;
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);

            state.wallets.push({
                id: state.curID,
                publicKey: keypair.publicKey.toBase58(),
                privateKey: bs58.encode(keypair.secretKey),
            });

            state.curID++;

            console.log("here in sol gen");
        },
        deleteWallet: (state, action) => {
            state.wallets = state.wallets.filter(
                (wallet) => action.payload !== wallet.id
            );
        },
    },
});

export const {
    clear: clearSol,
    generate: generateSol,
    deleteWallet: deleteSolWallet,
} = solWalletSlice.actions;

export default solWalletSlice.reducer;
