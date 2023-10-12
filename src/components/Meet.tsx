import {
  useAudio,
  useEventListener,
  useHuddle01,
  usePeers,
  useRoom,
  useVideo,
} from "@huddle01/react/hooks";
import clsx from "clsx";
import type { FC } from "react";
import { useEffect, useRef } from "react";
import { useMeetPersistStore } from "@/store/meet";
import { useUpdateEffect } from "usehooks-ts";
import { useRouter } from "next/router"

import AudioElem from "./Audio";
import { BasicIcons } from "./BasicIcons";
import SwitchDeviceMenu from "./SwitchDeviceMenu";
import VideoElem from "./Video";
import Image from "next/image";

const Meet: FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { leaveRoom } = useRoom();
  const {
    produceAudio,
    stopProducingAudio,
    stream: micStream,
    fetchAudioStream,
    stopAudioStream,
  } = useAudio();
  const {
    produceVideo,
    stopProducingVideo,
    stream: camStream,
    fetchVideoStream,
    stopVideoStream,
  } = useVideo();
  const {
    isMicMuted,
    isCamOff,
    toggleMicMuted,
    toggleCamOff,
    videoDevice,
    audioInputDevice,
  } = useMeetPersistStore();
  const { peers } = usePeers();
  const { me } = useHuddle01();

  const { push } = useRouter();

  useEventListener("app:cam-on", async () => {
    toggleCamOff(false);
    produceVideo(camStream);
  });

  useEventListener("app:cam-off", async () => {
    toggleCamOff(true);
    stopProducingVideo();
  });

  useEventListener("app:mic-on", async () => {
    toggleMicMuted(false);
    if (micStream) {
      produceAudio(micStream);
    }
  });

  useEventListener("app:mic-off", async () => {
    toggleMicMuted(true);
    stopProducingAudio();
  });

  useEffect(() => {
    if (camStream && videoRef.current) {
      videoRef.current.srcObject = camStream;
      produceVideo(camStream);
    }
  }, [camStream]);

  useEffect(() => {
    console.log("isCamOff", isCamOff);
    if (!isCamOff) {
      fetchVideoStream(videoDevice.deviceId);
    }
  }, [isCamOff]);

  useEffect(() => {
    console.log("isCamOff", isCamOff);
    if (!isMicMuted) {
      fetchAudioStream(audioInputDevice.deviceId);
    }
  }, [isMicMuted]);

  useEffect(() => {
    if (micStream) {
      toggleMicMuted(false);
      produceAudio(micStream);
    }
  }, [micStream]);

  useUpdateEffect(() => {
    if (!isCamOff) {
      stopVideoStream();
      fetchVideoStream(videoDevice.deviceId);
    }
  }, [videoDevice]);

  useUpdateEffect(() => {
    if (!isMicMuted) {
      stopAudioStream();
      fetchAudioStream(audioInputDevice.deviceId);
    }
  }, [audioInputDevice]);

  useEventListener("room:me-left", () => {
    push(`/`);
  })

  return (
    <>
      <div className="my-5 flex h-[75vh] items-center justify-center self-stretch">
        <div className="flex h-full grid-cols-2 items-center justify-center gap-10 rounded-lg ">
          <div
            className={clsx(
              Object.values(peers).length === 0
                ? "my-5 h-full w-[60vw]"
                : "h-[60vh] w-[40vw]",
              "bg-gray-900",
              "relative flex flex-shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-transparent"
            )}
          >
            {!isCamOff ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                className="h-full w-full rounded-lg object-cover -scaleY-100"
              />
            ) : (
              <div className="h-full w-full flex flex-col justify-center items-center">
              <Image
                src={
                  me.avatarUrl ? `${me.avatarUrl}` : `/icons/default-avatar.svg`
                }
                width={100}
                height={100}
                alt="avatar"
                className="mb-16 mt-16 h-32 w-32 rounded-full"
              />
                <h3 className="text-2xl font-bold text-white">{me.displayName.split(' ', 3).map(part => part.charAt(0).toUpperCase()).join('')}</h3>
              </div>
            )}
            <div
              className="bg-black text-slate-100 absolute bottom-1 left-1 rounded-md py-1 px-2 font-lg flex gap-2">
              {me.displayName ?? "Me"}
              {BasicIcons.ping}
            </div>
          </div>

          {Object.values(peers).map(
            ({ cam, peerId, mic, displayName, avatarUrl }) => (
              <div
                key={peerId}
                className="relative flex h-[60vh] w-[40vw] flex-shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-transparent"
              >
                {cam ? (
                  <VideoElem track={cam} key={peerId} />
                ) : (
                  <div className="h-full w-full flex flex-col justify-center items-center">
                  <Image
                    key={peerId}
                    src={
                      '/icons/default-avatar.svg'
                    }
                    width={100}
                    height={100}
                    alt="avatar"
                    className="mb-16 mt-16 h-32 w-32 rounded-full"
                  />
                    <h3 className="text-2xl font-bold text-white">{displayName.split(' ', 3).map(part => part.charAt(0).toUpperCase()).join('')}</h3>
                  </div>
                )}
                {mic && <AudioElem track={mic} key={peerId} />}
                <div
                  className="bg-black text-slate-100 absolute bottom-1 left-1 rounded-md py-1 px-2 font-lg flex gap-2">
                  {displayName ?? "Guest"}
                  {BasicIcons.ping}
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="flex items-center justify-center self-stretch">
        <div className="flex w-full flex-row items-center justify-center gap-8">
          {isCamOff ? (
            <button
              type="button"
              onClick={() => {
                fetchVideoStream(videoDevice.deviceId);
              }}
              className="bg-brand-500 hover:bg-white/20 flex h-10 w-10 items-center justify-center rounded-xl"
            >
              {BasicIcons.inactive["cam"]}
            </button>
          ) : (
            <button
              type="button"
              onClick={stopVideoStream}
              className={clsx(
                "flex h-10 w-10 items-center bg-gray-800 hover:bg-white/20 justify-center rounded-xl"
              )}
            >
              {BasicIcons.active["cam"]}
            </button>
          )}
          {isMicMuted ? (
            <button
              type="button"
              onClick={() => {
                fetchAudioStream(audioInputDevice.deviceId);
              }}
              className="bg-brand-500 hover:bg-white/20 flex h-10 w-10 items-center justify-center rounded-xl"
            >
              {BasicIcons.inactive["mic"]}
            </button>
          ) : (
            <button
              type="button"
              onClick={stopAudioStream}
              className={clsx(
                "flex h-10 w-10 items-center bg-gray-800 hover:bg-white/20 justify-center rounded-xl"
              )}
            >
              {BasicIcons.active["mic"]}
            </button>
          )}
      <SwitchDeviceMenu />
          <button
            type="button"
            onClick={() => {
              leaveRoom();
              window.close();
            }}
            className="bg-red-500 hover:bg-red-500/50 flex h-10 w-10 items-center justify-center rounded-xl"
          >
            {BasicIcons.close}
          </button>
        </div>
      </div>
    </>
  );
};

export default Meet;
