import { BaseModel } from "./base";
import { TagElement } from "./sub-models/tag-element";
import { StyleElement } from "./sub-models/style-element";
import { ScriptElement } from "./sub-models/script-element";
import { Template } from "./template";

export class Theme extends BaseModel {
  metadata: TagElement[];
  styles: StyleElement[];
  scripts: ScriptElement[];
  templates: Template[];
  project_id: string;
}
