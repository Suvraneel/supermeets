interface APIData {
  success: boolean;
  message: string;
  result: any;
}

interface NFTData {
  name: string;
  cached_image_uri: string;
  collection: {
    address: string;
  };
}

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

const matchNFTs = async (wallet_address?: string) => {
  // const address = "BGfybQ2uFGPmCscCPAgJtBFXDWc5GNqzymSq3AAo6Nvi";
  console.log(wallet_address);
  const url = "https://api.shyft.to/sol/v1/nft/read_all?network=mainnet-beta&address="+wallet_address;
  const response = await fetch(url, {
    headers: {
      "X-API-KEY": process.env.NEXT_PUBLIC_SHYFT_API_KEY || "",
    },
  });
  const data = (await response.json()) as APIData;
  const nfts: NFTData[] = data.result;
  
  // Only return NFTs that are in the community collection
  const nftCommunityCollectionAddresses = nftCommunityCollection.map(
    (nft) => nft.address
  );

  const filteredNFTs = nfts?.filter((nft: NFTData) =>
    nftCommunityCollectionAddresses.includes(nft.collection.address)
  );

  return filteredNFTs || [];
};

export default matchNFTs;
