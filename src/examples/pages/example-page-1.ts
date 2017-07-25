import { exampleWidget3 } from './../widgets/example-widget-3';
import { TagElement, StyleElement, ScriptElement, Page } from "../../index";
import { exampleWidget2 } from "../widgets/example-widget-2";
import { exampleWidget1 } from "../widgets/example-widget-1";

export const examplePage1: Page = {
    _id: "ea54ed32ade23322323232",
    display_name: "Homepage",
    unique_name: "homepage",
    metadata: [new TagElement],
    styles: [new StyleElement],
    scripts: [new ScriptElement],
    widgets: [

        exampleWidget1,
        exampleWidget2,
        exampleWidget3,
    ]
};
