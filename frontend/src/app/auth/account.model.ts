export class Account {
  private name: string;
  private auth: number;

  constructor(name: string, auth?: number) {
    this.name = name;
    this.auth = auth || 0;
  }

  getName() {
    return this.name;
  }

  getAuth() {
    return this.auth;
  }

  // domain(): string {
  //   try {
  //     const domainAndPath: string = this.link.split('//')[1];
  //     return domainAndPath.split('/')[0];
  //   } catch (err) {
  //     return null;
  //   }
  // }
}