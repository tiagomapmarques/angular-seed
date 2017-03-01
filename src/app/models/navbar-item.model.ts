export interface NavbarItemInterface {
  title: string,
  link: string,
  icon: string,
}

export class NavbarItem implements NavbarItemInterface {
  title: string;
  link: string;
  icon: string;

  constructor(json: NavbarItemInterface|string) {
    this.title = '';
    this.link = '';
    this.icon = '';

    if (typeof json === 'object') {
      this.title = json.title;
      this.link = json.link;
      this.icon = json.icon;
    }
    else if (typeof json === 'string') {
      const jsonParsed = <NavbarItemInterface> JSON.parse(json);
      this.title = jsonParsed.title;
      this.link = jsonParsed.link;
      this.icon = jsonParsed.icon;
    }
  }
}
