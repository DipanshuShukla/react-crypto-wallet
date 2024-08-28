import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clear, generate } from "../features/secret/secretSlice";
import { clearEth } from "../features/ethWallet/ethWalletSlice";
import { clearSol } from "../features/solWallet/solWalletSlice";

/* eslint-disable react/prop-types */
export default function SecretViewer(props) {
    const dispatch = useDispatch();

    const generateKeys = () => {
        dispatch(generate());
    };

    const clearKeys = () => {
        dispatch(clear());
        dispatch(clearEth());
        dispatch(clearSol());
    };

    const { mnemonic } = props;
    const [keysHidden, setKeysHidden] = useState(true);
    const [maxHeight, setMaxHeight] = useState("0px");
    const contentRef = useRef(null);

    useEffect(() => {
        if (keysHidden) {
            setMaxHeight("0px");
        } else {
            setMaxHeight(`${contentRef.current.scrollHeight}px`);
        }
    }, [keysHidden]);

    return (
        <div className="text-white w-full max-w-4xl border-4 p-10 border-gray-700 rounded-2xl bg-gray-900/50">
            <div className="flex items-center justify-center w-auto h-10">
                <span className="text-3xl">Your Secret Phrase</span>
                <button
                    onClick={() => {
                        setKeysHidden(!keysHidden);
                    }}
                    className="p-2 text-xl flex items-center justify-center ml-auto"
                >
                    {keysHidden ? (
                        <i className="fa-solid fa-angle-down"></i>
                    ) : (
                        <i className="fa-solid fa-angle-up"></i>
                    )}
                </button>
            </div>
            <div
                ref={contentRef}
                style={{ maxHeight: maxHeight }}
                className="overflow-hidden transition-max-height duration-300 ease-in-out"
            >
                <div className="text-center grid grid-cols-4 gap-4 mb-8 mt-10">
                    {mnemonic.split(" ").map((word, index) => (
                        <div
                            className="p-4 transition-all duration-75 bg-gray-500/25 hover:bg-gray-400/25 text-lg border-white rounded-2xl"
                            key={index}
                        >
                            {word}
                        </div>
                    ))}
                </div>
                <div className="flex">
                    <button
                        onClick={generateKeys}
                        className="hidden p-4 pt-2 pb-0 rounded-xl"
                    >
                        Generate new Secret
                    </button>
                    <button
                        onClick={clearKeys}
                        className="text-red-400 p-4 pt-2 pb-0 rounded-xl ml-auto"
                    >
                        Clear Secrets
                    </button>
                </div>
            </div>
        </div>
    );
}
