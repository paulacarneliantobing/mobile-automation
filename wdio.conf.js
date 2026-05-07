const path = require("path");

exports.config = {
  //
  // RUNNER
  //
  runner: "local",

  //
  // APPIUM
  //
  port: 4723,

  //
  // TEST FILES
  //
  specs: ["./test/specs/**/*.ts"],

  exclude: [],

  //
  // INSTANCES
  //
  maxInstances: 1,

  //
  // CAPABILITIES
  //
  capabilities: [
    {
      // platform
      platformName: "Android",

      // emulator/device
      "appium:deviceName": "Android Emulator",

      // HAPUS platformVersion biar fleksibel
      // "appium:platformVersion": "11",

      // automation engine
      "appium:automationName": "UiAutomator2",

      // APK path
      "appium:app": path.join(process.cwd(), "./apps/APIDemos-debug.apk"),

      // reset settings
      "appium:noReset": false,
      "appium:fullReset": false,

      // auto permission
      "appium:autoGrantPermissions": true,

      // wait activity
      "appium:appWaitActivity": "*",

      // timeout
      "appium:newCommandTimeout": 240,
    },
  ],

  //
  // LOG LEVEL
  //
  logLevel: "info",

  bail: 0,

  //
  // TIMEOUT
  //
  waitforTimeout: 20000,

  connectionRetryTimeout: 120000,

  connectionRetryCount: 3,

  //
  // SERVICES
  //
  services: [
    [
      "appium",
      {
        command: "appium",
      },
    ],
  ],

  //
  // FRAMEWORK
  //
  framework: "mocha",

  //
  // REPORTERS
  //
  reporters: [
    "spec",

    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  //
  // MOCHA
  //
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },

  //
  // HOOKS
  //
  before: async function () {
    // tunggu app terbuka
    await browser.pause(5000);
  },

  afterTest: async function (
    test,
    context,
    { error, result, duration, passed },
  ) {
    // screenshot jika gagal
    if (!passed) {
      await browser.takeScreenshot();
    }

    // pause biar hasil terlihat
    await browser.pause(3000);
  },
};
