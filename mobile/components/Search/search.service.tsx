export abstract class SearchParam<Params> {
  constructor(private title: string, protected value: Params) { }

  public getSearchParams() {
    return this.initState() ? `${this.title}=${this.value}` : '';
  }

  public setValue(value: Params): void {
    this.value = value;
  }

    abstract initState(): boolean;
}
export class PagesSearch extends SearchParam<number> {
  initState():boolean {
    return this.value > 0;
  }
}
export class TitleSearch extends SearchParam<string> {
  initState():boolean {
    return this.value !== '';
  }
}
export class PublicSearch extends SearchParam<boolean> {
  initState():boolean {
    return this.value == true ||true;
  }
}
export class CompletedSearch extends SearchParam<boolean> {
  initState():boolean {
    return this.value == true ||true;
  }
}

export const Handler = (params: SearchParam<any>[]) => {
  const mapParams = params.map((i) => i.getSearchParams());
  const filterParams = mapParams.filter((i) => i !== '');
  return `?${filterParams.join('&')}`;
}
