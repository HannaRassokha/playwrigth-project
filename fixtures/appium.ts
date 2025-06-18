import { spawn } from "child_process";

let appiumProcess: ReturnType<typeof spawn>;

export async function startAppium(): Promise<void> {
  return new Promise((resolve) => {
    console.log("🟢 Starting Appium...");
    appiumProcess = spawn("appium", ["--port", "4723"], { stdio: "inherit" });

    setTimeout(() => {
      console.log("✅ Appium should be running");
      resolve();
    }, 5000);
  });
}

export async function stopAppium(): Promise<void> {
  if (appiumProcess) {
    console.log("🛑 Stopping Appium...");
    appiumProcess.kill();
  }
}
