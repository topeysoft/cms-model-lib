import { TagElement } from './sub-models/tag-element';
import { BaseModel } from "./base";
import { Attribute } from "./sub-models/attribute";
import { GridDefinition } from "./sub-models/grid-definition";
import { Widget } from "./widget";
import * as shortid from "shortid";
import { WidgetDefinition, StyleElement, ScriptElement } from "./index";

export class Section {
    _id:string;
    project_id:string;
    unique_name:string = shortid();
    tag_name:string = 'section';
    attributes:[Attribute] = [{enabled:true, key:'class',value:'row'}];    
    content: string;
    styles: StyleElement[];
    scripts: ScriptElement[];
    is_global = false;
    widget_definitions: WidgetDefinition[];
}
