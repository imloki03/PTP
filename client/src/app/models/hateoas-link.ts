export interface HateoasLink {
  href: string;
}

export interface HateoasLinks {
  self?: HateoasLink;
}

export interface HateoasResource {
  _links?: HateoasLinks;
}
