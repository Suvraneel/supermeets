import { redis1, redis2 } from "@utils/db";

const nftCommunityCollection = [
  {
    CollectionName: "Solana Monkey Business Gen2",
    address: "SMBtHCCC6RYRutFEPb4gZqeBLUZbMNhRKaMKZZLHi7W",
  },
  {
    CollectionName: "Madlads",
    address: "J1S9H3QjnRtBbbuD4HjPV6RpRhwuk4zKbxsnCHuTgh9w",
  },
  {
    CollectionName: "Superteam",
    address: "E4ToMjm8YtRyfPUhZ7hxRMxe4J8FnSr9CcprytZBYFua",
  },
  {
    CollectionName: "Solana Monkey Business Gen3",
    address: "8Rt3Ayqth4DAiPnW9MDFi63TiQJHmohfTWLMQFHi4KZH",
  },
  {
    CollectionName: "Claynosaurz",
    address: "6mszaj17KSfVqADrQj3o4W3zoLMTykgmV37W4QadCczK",
  },
];

const findRoommates = async (wallet_address: string, preferences: string[]) => {
  console.log(wallet_address);

  for (let i = 0; i < preferences.length; i++);
  {
    const availablePool = await redis1.get(preferences[i]);
    if (availablePool) {
      console.log("found in redis");
      return availablePool;
    }
  }
};
