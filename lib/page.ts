import { Browser, WaitCondition } from './browser';

export interface NewablePage<T extends Page> {
  new(browser: Browser): T;
}

export abstract class Page {
  private url: string;

  protected setUrl(url: string) {
    this.url = url;
  }

  public async navigate(): Promise<void> {
    await this.browser.navigate(this.url);
    await this.browser.waitUntilAny(this.loadCondition());
  }

  public abstract loadCondition(): WaitCondition;

  public constructor(protected browser: Browser) {

  }
}
