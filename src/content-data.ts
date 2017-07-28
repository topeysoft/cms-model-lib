import { SiteApp } from "./site-app";
import { BaseModel } from "./base";
import { Page } from "./page";
import { TagElement } from "./sub-models/tag-element";
import { Theme } from "./theme";

export class ContentData extends BaseModel {
  site_info: SiteApp;
  theme: Theme;
  page: Page;
}
