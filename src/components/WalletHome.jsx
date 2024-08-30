import { useSelector } from "react-redux";
import SecretViewer from "./SecretViewer";
import WalletBoard from "./WalletBoard";
import { tokens } from "../utils/tokenEnum";

export default function WalletHome() {
    const mnemonic = useSelector((state) => state.secret.mnemonic);

    return (
        <div className="flex flex-col items-center w-full mt-20">
            <SecretViewer mnemonic={mnemonic} />
            <div className="w-full md:w-auto grid lg:grid-cols-2 lg:gap-16">
                <WalletBoard currency={tokens.SOL} />
                <WalletBoard currency={tokens.ETH} />
            </div>
        </div>
    );
}
