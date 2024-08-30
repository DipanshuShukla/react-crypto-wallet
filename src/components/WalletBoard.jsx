/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch } from "react-redux";
import { generateSol } from "../features/solWallet/solWalletSlice";
import { generateEth } from "../features/ethWallet/ethWalletSlice";
import { useSelector } from "react-redux";
import { tokens } from "../utils/tokenEnum";

/* eslint-disable react/prop-types */
export default function WalletBoard(props) {
    const mnemonic = useSelector((state) => state.secret.mnemonic);

    const { currency } = props;
    const dispatch = useDispatch();
    let wallets = [];

    if (currency === tokens.SOL) {
        wallets = useSelector((state) => state.solWallets.wallets);
    } else if (currency === tokens.ETH) {
        wallets = useSelector((state) => state.ethWallets.wallets);
    }

    const newWallet = () => {
        if (currency === tokens.SOL) {
            dispatch(generateSol(mnemonic));
        } else if (currency === tokens.ETH) {
            dispatch(generateEth(mnemonic));
        }
    };
    return (
        <div className="border-2 content-border border-gray-700 bg-gray-900/50 rounded-2xl mt-14 p-8 w-full sm:w-screen max-w-[28rem] lg:max-w-[40rem] md:max-w-[60rem] min-h-[50vh] max-h-[80vh] m-auto ">
            <div className="w-full flex items-center justify-center">
                <h1 className="text-white text-2xl mr-auto">
                    {currency} Wallets
                </h1>
                <button
                    className="border-2 border-white rounded-xl p-2 text-white"
                    onClick={newWallet}
                >
                    add new
                </button>
                <button className="text-red-500 border-2 border-red-500 rounded-xl p-2 ml-3">
                    clear
                </button>
            </div>
            <div className="flex flex-col justify-center items-center mt-5 max-h-[100%] overflow-y-auto">
                {wallets.map((w) => (
                    <div
                        className="text-white flex flex-col justify-center items-center border-2
                        border-white p-5 rounded-xl mt-6 w-full"
                        key={w.id}
                    >
                        <h1 className="mr-auto text-lg">
                            {currency.substring(0, 3).toUpperCase()} Wallet id:{" "}
                            {w.id}
                        </h1>
                        <h2 className="mr-auto mt-4 text-sm">Public Key:</h2>
                        <input
                            className="bg-slate-600 w-full rounded-lg min-h-[2.5rem] pl-2 pr-2 text-[.85rem] mt-2"
                            type="text"
                            value={w.publicKey}
                        />
                        <h2 className="mr-auto mt-4 text-sm">Private Key:</h2>
                        <input
                            className="bg-slate-600 w-full rounded-lg min-h-[2.5rem] pl-2 pr-2 text-[.85rem] mt-2"
                            type="text"
                            value={w.privateKey}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
