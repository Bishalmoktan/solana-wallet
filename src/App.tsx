import { useMemo, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";
import CustomConnectButton from "./components/custom-connect-button";
import BalanceCard from "./components/balance-card";
import SendSolana from "./components/send-sol";
import SignMessage from "./components/sign-message";
import RequestAirdrop from "./components/request-airdrop";
import { Alert, AlertDescription } from "./components/ui/alert";
import { Info } from "lucide-react";

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const [connected, setConnected] = useState(false);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-md mx-auto space-y-6">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                  Solana Wallet
                </h1>
                <p className="text-gray-400">Your Web3 Gateway</p>
              </div>

              <Alert className="bg-gray-800 border-purple-500">
                <AlertDescription className="text-white flex gap-2 items-center">
                  <Info />
                  Using Devnet</AlertDescription>
              </Alert>

              <CustomConnectButton setConnected={setConnected} />

              {connected && (
                <>
                  <BalanceCard />
                  <div className="grid grid-cols-2 gap-4">
                    <SendSolana />
                    <SignMessage />
                  </div>
                  <RequestAirdrop />
                </>
              )}
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
