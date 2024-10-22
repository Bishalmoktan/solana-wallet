import { Card, CardContent } from "@/components/ui/card";
import { Input } from "./ui/input";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { toast } from "sonner";

export default function SendSolana() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const wallet = useWallet();
  const { connection } = useConnection();

  async function sendSolana() {
    if (recipient.length === 0) {
      toast.error("Please enter recipient public key");
      return;
    }
    if (amount.length === 0) {
      toast.error("Please enter amount");
      return;
    }
    try {
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey!,
          toPubkey: new PublicKey(recipient),
          lamports: parseInt(amount) * LAMPORTS_PER_SOL,
        })
      );

      await wallet.sendTransaction(transaction, connection);
      toast.success("Sent " + amount + " SOL to " + recipient);
    } catch (error: unknown) {
       if (error instanceof Error) {
         toast.error(error.message);
       } else {
         toast.error("An unexpected error occurred");
       }
    }
      
      setRecipient("");
      setAmount("");
  }
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Send className="h-5 w-5 text-purple-400" />
            <h3 className="font-semibold text-white">Send SOL</h3>
          </div>
          <Input
            placeholder="Recipient address"
            className="bg-gray-700 border-gray-600 text-gray-200"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <Input
            placeholder="Amount"
            type="number"
            className="bg-gray-700 border-gray-600 text-gray-200"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700"
            onClick={sendSolana}
          >
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
