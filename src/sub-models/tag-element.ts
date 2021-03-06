import { Attribute } from "./attribute";

export class TagElement {
    identifier: string;
    tag_name:string;
    attributes:Attribute[];
    enabled?:boolean = true
    self_closing?:boolean = true;
}