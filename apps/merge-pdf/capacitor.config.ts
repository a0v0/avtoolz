/// <reference types="@capacitor/local-notifications" />

import { CapacitorConfig } from "@capacitor/cli";
const config: CapacitorConfig = {
  appId: "com.avtoolz.mergepdf",
  appName: "PDF Merger X",
  webDir: "build",
  bundledWebRuntime: false,

  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
  },
};

export default config;
