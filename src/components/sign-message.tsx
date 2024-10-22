import { ed25519 } from "@noble/curves/ed25519";
import bs58 from "bs58";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "sonner";

export default function SignMessage() {
  const [message, setMessage] = useState("");
  const { publicKey, signMessage } = useWallet();

  async function handleSignMessage() {
    if (!publicKey) {
      toast.error("Wallet not connected!");
      return;
    }
    if (!signMessage) {
      toast.error("Wallet does not support message signing!");
      return;
    }
    try {
      const encodedMessage = new TextEncoder().encode(message);
      const signature = await signMessage(encodedMessage);

      if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes()))
        toast.error("Message signature invalid!");
      else toast.success(` Message signature: ${bs58.encode(signature)}`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
      
      setMessage("")
  }
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-purple-400" />
            <h3 className="font-semibold text-white">Sign Message</h3>
          </div>
          <Input
            placeholder="Enter message"
            className="bg-gray-700 border-gray-600 text-gray-200"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700"
            onClick={handleSignMessage}
          >
            Sign
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
