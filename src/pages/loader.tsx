import { useMachingStore } from "@store/matching";
import { redis1, redis2 } from "@utils/db";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";

const loader = () => {
  const [matchedAddress, setMatchedAddress] = useState("");
  const { publicKey } = useWallet();
  const { push } = useRouter();

  const getPreferredMatchNFT = async (preferences: string[]) => {
    let maxPreference: string | null = null;
    let maxLength = 0;
    for (const preference of preferences) {
      const value = (await redis1.get(preference)) as string[] | null;
      if (value && value.length > maxLength) {
        maxPreference = preference;
        maxLength = value.length;
      }
    }
    return maxPreference;
  };

  const getMatchedAddress = async (preferences: string[]) => {
    const preferredMatchNFT = await getPreferredMatchNFT(preferences);
    console.log("Preferred Match NFT", preferredMatchNFT);
    if (preferredMatchNFT) {
      let value = (await redis1.get(preferredMatchNFT)) as string[] | null;
      if (value) {
        const address = value[0];
        value = value.slice(1);
        value = value.filter((item) => item !== publicKey?.toBase58());
        setMatchedAddress(address);
        // await redis1.set(preferredMatchNFT, value);
        console.log("values", value);
        const roomId = await redis2.get(address);
        console.log("RoomId", roomId);
        // push(`room/${roomId}`);
      }
    }
    return matchedAddress;
  };

  useEffect(() => {
    const preferences = localStorage.getItem("preferences");
    if (preferences) {
      const parsedPreferences = JSON.parse(preferences);
      console.log("Parsed Preferences", parsedPreferences);
      console.log("Matched Address", matchedAddress);
      if (matchedAddress === "") {
        getMatchedAddress(parsedPreferences);
      }
    }
  }, []);

  return <div className="w-full h-screen flex items-center justify-center">{matchedAddress}</div>;
};

export default loader;
