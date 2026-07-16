export interface HateoasLink {
  rel: string;
  href: string;
}

export interface HateoasResource {
  links: HateoasLink[];
}
