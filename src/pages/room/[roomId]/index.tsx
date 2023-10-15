import { useRoom } from "@huddle01/react/hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Meet from "@components/Meet";

const Home = () => {
  const { isRoomJoined } = useRoom();
  const { push, query } = useRouter();

  useEffect(() => {
    if (!isRoomJoined && query.roomId) {
      push(`/room/${query.roomId}/lobby`);
    }
  }, [query.roomId, isRoomJoined, push]);

  return <Meet />;
};

export default Home;
