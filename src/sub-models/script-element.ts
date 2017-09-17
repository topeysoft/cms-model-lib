import { TagElement } from "./tag-element";

export class ScriptElement extends TagElement {
    content:string;
    render_in_head = false; 
}