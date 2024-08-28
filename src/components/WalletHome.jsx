import { useSelector } from "react-redux";
import SecretViewer from "./SecretViewer";
import WalletBoard from "./WalletBoard";

export default function WalletHome() {
    const mnemonic = useSelector((state) => state.secret.mnemonic);

    return (
        <div className="flex flex-col items-center w-auto mt-20">
            <SecretViewer mnemonic={mnemonic} />
            <div className="grid grid-cols-2 gap-4">
                <WalletBoard currency="SOL" />
                <WalletBoard currency="ETH" />
            </div>
        </div>
    );
}
