import { BaseModel } from "./base";
import { Attribute } from "./sub-models/attribute";

export class Widget extends BaseModel {
    content: string;
    tag_name: string;
    attributes: Attribute[];
}