import { StyleElement } from './sub-models/style-element';
import { ScriptElement } from './sub-models/script-element';
import { BaseModel } from "./base";
import { Attribute } from "./sub-models/attribute";
import { GridDefinition } from "./sub-models/grid-definition";

export class Widget extends BaseModel {
    content: string;
    project_id: string;
    tag_name: string = 'div';
    script: ScriptElement;
    style: StyleElement;
    read_only: boolean;
    page_ids: [string];
}
