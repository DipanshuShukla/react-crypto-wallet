import "./App.css";
import { useSelector } from "react-redux";
import SecretGen from "./components/SecretGen";
import WalletHome from "./components/WalletHome";
import Navbar from "./components/Navbar";

function App() {
    const secret = useSelector((state) => state.secret.mnemonic);
    return (
        <>
            <Navbar />
            {secret.length ? <WalletHome /> : <SecretGen />}
        </>
    );
}

export default App;
