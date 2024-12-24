"use client";

import { useEffect } from "react";
import * as ChannelService from "@channel.io/channel-web-sdk-loader";
import toast from "react-hot-toast";

const ChannelTalk = () => {
  const pluginKey = process.env.NEXT_PUBLIC_CHANNEL_IO_PLUGIN_KEY || "";

  useEffect(() => {
    if (!pluginKey) {
      toast.error("채널톡 플러그인 키가 없습니다!");
      return;
    }

    const initChannelTalk = () => {
      try {
        ChannelService.loadScript();
        ChannelService.boot({
          pluginKey,
          hideChannelButtonOnBoot: false,
        });
      } catch (error) {
        console.error("채널톡 초기화 오류:", error);
        toast.error("채널톡 초기화 중 오류가 발생했습니다");
      }
    };

    initChannelTalk();

    return () => {
      ChannelService.shutdown();
    };
  }, [pluginKey]);

  return null;
};

export default ChannelTalk;
