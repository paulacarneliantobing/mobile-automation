describe("APIDemos Text Entry Dialog", () => {
  it("should input name and password and verify", async () => {
    // klik App
    const appMenu = await $('android=new UiSelector().text("App")');
    await appMenu.click();

    // klik Alert Dialogs
    const alertDialogs = await $(
      'android=new UiSelector().text("Alert Dialogs")',
    );
    await alertDialogs.click();

    // klik Text Entry dialog
    const textEntry = await $(
      'android=new UiSelector().text("Text Entry dialog")',
    );
    await textEntry.click();

    // input name
    const nameField = await $("id=io.appium.android.apis:id/username_edit");
    await nameField.setValue("Weni");

    // verify name
    await expect(nameField).toHaveText("Weni");

    // input password
    const passwordField = await $("id=io.appium.android.apis:id/password_edit");
    await passwordField.setValue("12345");

    // verify password field displayed
    await expect(passwordField).toBeDisplayed();

    // klik OK
    const okButton = await $("id=android:id/button1");
    await okButton.click();
  });
});
