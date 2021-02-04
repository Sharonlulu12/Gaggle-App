import { browser, by, element } from 'protractor';

export class LoginPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async setUsernameField(username: string): Promise<void> {
    await element(by.id('login-username')).sendKeys(username);
  }

  async setPasswordField(username: string): Promise<void> {
    await element(by.id('login-password')).sendKeys(username);
  }

  async clickSubmit(): Promise<void> {
    await element(by.id('submit-btn')).click();
  }

  async clickRegister(): Promise<void> {
    await element(by.id('register-btn')).click();
  }
}
