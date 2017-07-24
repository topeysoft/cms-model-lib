import { BaseModel } from "./base";
import { Attribute } from "./sub-models/attribute";
import { GridDefinition } from "./sub-models/grid-definition";

export class Widget extends BaseModel {
    content: string;
    tag_name: string;
    grid_definition: GridDefinition;
    attributes: Attribute[];
}