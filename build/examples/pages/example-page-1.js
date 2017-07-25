"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const example_widget_3_1 = require("./../widgets/example-widget-3");
const index_1 = require("../../index");
const example_widget_2_1 = require("../widgets/example-widget-2");
const example_widget_1_1 = require("../widgets/example-widget-1");
exports.examplePage1 = {
    _id: "ea54ed32ade23322323232",
    display_name: "Homepage",
    unique_name: "homepage",
    metadata: [new index_1.TagElement],
    styles: [new index_1.StyleElement],
    scripts: [new index_1.ScriptElement],
    widgets: [
        example_widget_1_1.exampleWidget1,
        example_widget_2_1.exampleWidget2,
        example_widget_3_1.exampleWidget3,
    ]
};
//# sourceMappingURL=example-page-1.js.map