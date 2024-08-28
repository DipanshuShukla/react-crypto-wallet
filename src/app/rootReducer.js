import { combineReducers } from "redux";
import secretReducer from "../features/secret/secretSlice";
import solWalletReducer from "../features/solWallet/solWalletSlice";
import ethWalletReducer from "../features/ethWallet/ethWalletSlice";

const rootReducer = combineReducers({
    secret: secretReducer,
    solWallets: solWalletReducer,
    ethWallets: ethWalletReducer,
});

export default rootReducer;
