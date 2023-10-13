import { useMachingStore } from "@store/matching";
import { redis1, redis2 } from "@utils/db";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";

const Loader = () => {
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
    console.log("Preferred Match NFT Collection is", preferredMatchNFT);
    if (preferredMatchNFT) {
      let value = (await redis1.get(preferredMatchNFT)) as string[] | null;

      console.log("The addresses in the pool", value);

      const availablePartners = value?.filter(
        (item) => item !== publicKey?.toBase58()
      );

      if (availablePartners) {
        const roomPartner = availablePartners[0];

        console.log("we are matching with", roomPartner);

        // put all the other addresses back in the pool

        const restAddresses = availablePartners.slice(1);

        await redis1.set(preferredMatchNFT, restAddresses);

        console.log("The addresses in the pool after", restAddresses);

        const roomId = await redis2.get(publicKey?.toBase58() as string);

        await redis2.set(roomPartner, {
          roomId: roomId,
          partner: publicKey?.toBase58(),
        });

        await redis2.set(publicKey?.toBase58() as string, {
          roomId: roomId,
          partner: roomPartner,
        });

        console.log("RoomId", roomId);
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

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {matchedAddress}
    </div>
  );
};

export default Loader;
