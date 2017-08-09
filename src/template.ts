import { BaseModel } from "./base";
import { TagElement } from "./sub-models/tag-element";
import { ScriptElement } from "./sub-models/script-element";
import { StyleElement } from "./sub-models/style-element";

export class Template extends BaseModel {
    metadata: TagElement[];
    styles: StyleElement[];
    scripts: ScriptElement[];
    project_id: string;
}