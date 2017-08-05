import { LibmsPage } from './app.po';

describe('libms App', () => {
  let page: LibmsPage;

  beforeEach(() => {
    page = new LibmsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
