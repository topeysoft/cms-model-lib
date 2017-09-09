import { Attribute } from './sub-models/attribute';
import { Section } from './section';
import { WidgetDefinition } from './widget-definition';
import { BaseModel } from "./base";
import { TagElement } from "./sub-models/tag-element";
import { StyleElement } from "./sub-models/style-element";
import { ScriptElement } from "./sub-models/script-element";
import { Widget } from "./widget";

export class Page extends BaseModel {
    project_id:string;
    title: string;
    uri: string;
    attributes: Attribute[];
    metadata: TagElement[];
    styles: StyleElement[];
    scripts: ScriptElement[];
    sections: Section[];
    requre_user_login: boolean = false;
}

