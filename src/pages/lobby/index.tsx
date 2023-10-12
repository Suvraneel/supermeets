import { Redis } from "@upstash/redis";
import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { redis } from "@/utils/db";
import WalletContextProvider from "@components/WalletProvider";

const LobbyPage = () => {
  const [searching, setSearching] = useState(false);
  const { publicKey } = useWallet();

  useEffect(() => {
    if (publicKey) console.log(publicKey?.toString());
  }, [publicKey]);

  const handleStartSearch = async () => {
    await redis.set(publicKey?.toBase58()!, "Madlads");
  };

  const handleStopSearch = async () => {
    // delete data from redis
    await redis.del(publicKey?.toBase58()!);
  };

  return (
    <div className="flex gap-4 w-full h-[90vh] items-center justify-center">
      <button
        className="bg-gray-800 rounded-lg p-2"
        onClick={handleStartSearch}
      >
        Start Searching
      </button>
      <button className="bg-gray-800 rounded-lg p-2" onClick={handleStopSearch}>
        Stop Searching
      </button>
    </div>
  );
};

export default LobbyPage;
