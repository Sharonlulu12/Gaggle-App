import { browser, logging, by, element } from 'protractor';
import { LoginPage } from './login.po';

describe('Login Page', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('should open registration modal when clicking register', async () => {
    await page.navigateTo();
    await page.clickRegister();
    const isTitlePresent = await element(by.tagName('h1')).isPresent();

    expect(isTitlePresent).toBe(true);
  });

  it('should transition to home page after successful login', async () => {
    await page.navigateTo();
    await page.setUsernameField('TestUsername');
    await page.setPasswordField('TestPassword!');
    await page.clickSubmit();

    expect(browser.getCurrentUrl()).toBe(browser.get(browser.baseurl + '/home'));
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
