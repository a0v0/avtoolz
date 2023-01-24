import { Filesystem } from "@capacitor/filesystem";
import { LocalNotifications } from "@capacitor/local-notifications";
import { Toast } from "@capacitor/toast";

export function permissionCheck() {
  const pText =
    "One or more of the permissions were denied. Please enable it in the settings manually.";

  Notification;
  LocalNotifications.checkPermissions().then((result) => {
    if (result.display === "denied") {
      LocalNotifications.requestPermissions();
      Toast.show({
        text: pText,
      });
    }
  });

  // File Permission
  Filesystem.checkPermissions().then((result) => {
    if (result.publicStorage === "denied") {
      Filesystem.requestPermissions().then((status) => {
        if (status.publicStorage === "granted") {
          Toast.show({
            text: pText,
          });
        }
      });
    }
  });
}
