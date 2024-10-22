import { useWalletMultiButton } from "@solana/wallet-adapter-base-ui";
import { Button } from "./ui/button";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { SetStateAction, useEffect, useState } from "react";

export default function CustomConnectButton({
  setConnected
}: {
  setConnected: React.Dispatch<SetStateAction<boolean>> 
}) {
  const { setVisible: setModalVisible } = useWalletModal();
  const [label, setLabel] = useState("Connect Wallet");

  const { onConnect, buttonState, onDisconnect } = useWalletMultiButton({
    onSelectWallet() {
      setModalVisible(true);
    },
  });

  useEffect(() => {
    switch (buttonState) {
      case "disconnecting":
        setLabel("Disconnecting...");
        break;
      case "connecting":
        setLabel("Connecting...");
        break;

      case "connected":
        setConnected(true);
        setLabel("Disconnect Wallet");
        break;
    }
  }, [buttonState]);

  const handleClick = () => {
    switch (buttonState) {
      case "no-wallet":
        setModalVisible(true);
        break;
      case "has-wallet":
        if (onConnect) {
          onConnect();
        }
        break;
      case "connected":
        if (onDisconnect) {
          onDisconnect();
          setConnected(false);
          setLabel("Connect Wallet");
        }
        break;
    }
  };

  return (
    <Button
      onClick={handleClick}
      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
    >
      {label}
    </Button>
  );
}
