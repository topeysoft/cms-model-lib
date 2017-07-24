import { BaseModel } from "./base";
import { TagElement } from "./sub-models/tag-element";
import { Theme } from "./theme";

export class SiteApp extends BaseModel {
    base_url: string;
    title: string;
    metadata: TagElement[];
    theme:Theme;
}