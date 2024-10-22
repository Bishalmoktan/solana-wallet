import { Download } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "sonner";
import { Input } from "./ui/input";

export default function RequestAirdrop() {
    const [sol, setSol] = useState<string>("");
    const [loading, setLoading] = useState(false);
  const { connection } = useConnection();
  const wallet = useWallet();

  const handleAirDrop = async () => {
    if (sol.length === 0) {
        toast.error("Enter units of sol");
        return;
    }
      setLoading(true);
    try {
      if (wallet.publicKey) {
        await connection.requestAirdrop(
          wallet.publicKey,
          Number(sol) * LAMPORTS_PER_SOL
        );
        toast.success(`AirDropped ${sol} sol`);
      } else {
        toast.error("Wallet not found!");
      }
    } catch (error) {
        if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
      setLoading(false);
      setSol("");
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Download className="h-5 w-5 text-purple-400" />
        <h3 className="font-semibold text-white">Airdrop Solana</h3>
      </div>
      <Input
        placeholder="Enter solana"
        className="bg-gray-700 border-gray-600 text-gray-200"
        value={sol}
        onChange={(e) => setSol(e.target.value)}
      />

      <Button
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={handleAirDrop}
              disabled={loading}
      >
        <Download className="mr-2 h-4 w-4" />
        Request Airdrop
      </Button>
    </div>
  );
}
