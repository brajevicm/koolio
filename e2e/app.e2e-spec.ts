import { KoolioPage } from './app.po';

describe('koolio App', () => {
  let page: KoolioPage;

  beforeEach(() => {
    page = new KoolioPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
