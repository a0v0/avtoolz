package com.avtoolz.mergepdf;
import android.app.ActivityManager;
import android.os.Build;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

  @Override
  public void onDestroy() {
    super.onDestroy();
    clearAppData();
  }

  private void clearAppData() {
    try {
      // clearing app data
      if (Build.VERSION_CODES.KITKAT <= Build.VERSION.SDK_INT) {
        ((ActivityManager)getSystemService(ACTIVITY_SERVICE))
            .clearApplicationUserData(); // note: it has a return value!
      } else {
        String packageName = getApplicationContext().getPackageName();
        Runtime runtime = Runtime.getRuntime();
        runtime.exec("pm clear " + packageName);
      }

    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
