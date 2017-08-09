import { exampleWidget3 } from "./../widgets/example-widget-3";
import { TagElement, StyleElement, ScriptElement, Page } from "../../index";
import { exampleWidget2 } from "../widgets/example-widget-2";
import { exampleWidget1 } from "../widgets/example-widget-1";

export const examplePage1: Page = {
  _id: "ea54ed32ade23322323232",
  project_id: "123efe345",
  display_name: "Homepage",
  unique_name: "homepage",
  metadata: [new TagElement()],
  styles: [new StyleElement()],
  scripts: [new ScriptElement()],
  widget_definitions: [
    {
      grid_definition: {
        xs: {
          size: 10,
          hidden: false
        },
        lg: {
          size: 4,
          hidden: false
        }
      },
      widget: exampleWidget1
    },
    {
      grid_definition: {
        xs: {
          size: 12,
          hidden: false
        },
        lg: {
          size: 8,
          hidden: false
        }
      },
      widget: exampleWidget2
    },
    {
      grid_definition: {
        xs: {
          size: 12,
          hidden: false
        },
        md: {
          size: 8,
          hidden: true
        }
      },
      widget: exampleWidget3
    }
  ]
};
