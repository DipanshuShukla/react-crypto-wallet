import { useDispatch } from "react-redux";
import { generateSol } from "../features/solWallet/solWalletSlice";
import { generateEth } from "../features/ethWallet/ethWalletSlice";
import { useSelector } from "react-redux";

/* eslint-disable react/prop-types */
export default function WalletBoard(props) {
    const mnemonic = useSelector((state) => state.secret.mnemonic);

    const { currency } = props;
    const dispatch = useDispatch();

    const newWallet = () => {
        if (currency === "SOL") {
            dispatch(generateSol(mnemonic));
        } else if (currency === "ETH") {
            dispatch(generateEth(mnemonic));
        }
    };
    return (
        <>
            lol {currency} <br /> <button onClick={newWallet}>create</button>
        </>
    );
}
