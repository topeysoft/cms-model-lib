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
    metadata: [new index_1.TagElement()],
    styles: [new index_1.StyleElement()],
    scripts: [new index_1.ScriptElement()],
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
            widget: example_widget_1_1.exampleWidget1
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
            widget: example_widget_2_1.exampleWidget2
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
            widget: example_widget_3_1.exampleWidget3
        }
    ]
};
//# sourceMappingURL=example-page-1.js.map