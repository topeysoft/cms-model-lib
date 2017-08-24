import { BaseModel } from "./base";
import { Attribute } from "./sub-models/attribute";
import { GridDefinition } from "./sub-models/grid-definition";
import { Widget } from "./widget";
import * as shortid from "shortid";
import { WidgetDefinition } from "./index";

export class Section {
    unique_name:string = shortid();
    tag_name:string = 'section';
    attributes:[Attribute] = [{enabled:true, key:'class',value:'row'}];    
    widget_definitions: WidgetDefinition[];
}