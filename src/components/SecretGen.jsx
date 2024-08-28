import { useDispatch } from "react-redux";
import { generate } from "../features/secret/secretSlice";

export default function SecretGen() {
    const dispatch = useDispatch();

    const generateSecret = () => {
        dispatch(generate());
    };

    return (
        <>
            <div className="w-auto text-center h-screen flex flex-col items-center justify-center">
                <span className="text-white max-w-2xl text-5xl font-bold leading-tight block mb-5">
                    Welcome to Crypto Wallet! <br />
                    Begin by generating a Secret.
                </span>
                <p className="max-w-2xl text-lg leading-8 text-gray-400 mb-6">
                    Your secret is a twelve word phrase that is crucial for
                    accessing and managing your crypto assets. Store it
                    securely, as it cannot be recovered if lost.
                </p>
                <button
                    onClick={generateSecret}
                    className="mb-20 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    Generate Secret Phrase{" "}
                    <i className="fa-solid fa-angles-right"></i>
                </button>
            </div>
        </>
    );
}
