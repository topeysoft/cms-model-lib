import { BaseModel } from "./base";
import { Attribute } from "./sub-models/attribute";
import { GridDefinition } from "./sub-models/grid-definition";

export class Widget extends BaseModel {
    content: string;
    project_id: string;
    tag_name: string = 'div';
    // attributes: Attribute[];
}
