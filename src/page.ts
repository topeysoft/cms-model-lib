import { WidgetItem } from './widget-item';
import { BaseModel } from "./base";
import { TagElement } from "./sub-models/tag-element";
import { StyleElement } from "./sub-models/style-element";
import { ScriptElement } from "./sub-models/script-element";
import { Widget } from "./widget";

export class Page extends BaseModel {
    metadata: TagElement[];
    styles: StyleElement[];
    scripts: ScriptElement[];
    widgets: WidgetItem[];
}