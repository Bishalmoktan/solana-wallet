import { Card, CardContent } from "@/components/ui/card";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Wallet } from "lucide-react";
import { useEffect, useState } from "react";

export default function BalanceCard() {
    const [balance, setBalance] = useState<number | null>(null);
    const { connection } = useConnection();
    const wallet = useWallet();

    useEffect(() => {
      async function getBalance() {
        if (wallet.publicKey) {
          const balance = await connection.getBalance(wallet.publicKey);
          setBalance(balance / LAMPORTS_PER_SOL);
        }
      }

      getBalance();
    }, [connection, wallet]);

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400">Balance</p>
            <h2 className="text-2xl font-bold text-white">{balance} SOL</h2>
          </div>
          <Wallet className="h-8 w-8 text-purple-400" />
        </div>
      </CardContent>
    </Card>
  );
}