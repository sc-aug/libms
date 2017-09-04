export class Account {
  constructor(
    public _id?: string,
    public email?: string,
    public passwd?: string,
    public uname?: string,
    public auth?: string,
    public books?: any[]) {}
}
