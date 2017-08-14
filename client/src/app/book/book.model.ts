export class Book {
  constructor(
    public _id?: string,
    public remain?: number,
    public copy?: number,
    public title?: string,
    public author?: string,
    public publisher?: string,
    public year?: number,
    public lang?: string,
    public subjects?: [string],
    public description?: string) {}
}
