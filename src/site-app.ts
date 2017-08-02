import { ScriptElement } from './sub-models/script-element';
import { BaseModel } from "./base";
import { Page } from "./page";
import { TagElement } from "./sub-models/tag-element";
import { Theme } from "./theme";

export class SiteApp extends BaseModel {
    base_url: string;
    title: string;
    metadata?: TagElement[] = [];
    scripts?: ScriptElement[] = [];
    theme:Theme;
    pages: Page[]
}