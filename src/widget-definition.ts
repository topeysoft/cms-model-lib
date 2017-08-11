import { BaseModel } from "./base";
import { Attribute } from "./sub-models/attribute";
import { GridDefinition } from "./sub-models/grid-definition";
import { Widget } from "./widget";

export class WidgetDefinition {
    grid_definition?: GridDefinition;
    attributes?: Attribute[];
    backgroundImage?: string;
    backgroundColor?: string;
    border?:string;
    margin?:string;
    padding?:string;
    widget?: Widget;
    unique_name?: string;
}
