import { EtsimedPage } from './app.po';

describe('etsimed App', () => {
  let page: EtsimedPage;

  beforeEach(() => {
    page = new EtsimedPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
