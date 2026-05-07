exports.config = {
  runner: "local",

  //
  // APPIUM SERVER
  //
  port: 4723,

  //
  // TEST FILE
  //
  specs: ["./test/specs/**/*.ts"],

  exclude: [],

  //
  // INSTANCE
  //
  maxInstances: 1,

  //
  // CAPABILITIES
  //
  capabilities: [
    {
      platformName: "Android",

      // emulator/device name
      "appium:deviceName": "Android Emulator",

      // Android version
      "appium:platformVersion": "11",

      // automation engine
      "appium:automationName": "UiAutomator2",

      // APK path
      "appium:app":
        "C:\\QA ENGINEER\\mobile-automation\\apps\\APIDemos-debug.apk",

      // IMPORTANT
      // selalu mulai fresh dari home APIDemos
      "appium:noReset": false,

      // jangan uninstall app setiap run
      "appium:fullReset": false,

      // auto allow permission
      "appium:autoGrantPermissions": true,

      // tunggu activity app siap
      "appium:appWaitActivity": "*",

      // timeout command
      "appium:newCommandTimeout": 240,
    },
  ],

  //
  // LOG
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
    // tunggu app benar-benar terbuka
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

    // pause biar kelihatan hasil di emulator
    await browser.pause(3000);
  },
};
