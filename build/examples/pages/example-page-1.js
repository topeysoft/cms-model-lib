"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
exports.examplePage1 = {
    _id: "ea54ed32ade23322323232",
    display_name: "Homepage",
    unique_name: "homepage",
    metadata: [new index_1.TagElement],
    styles: [new index_1.StyleElement],
    scripts: [new index_1.ScriptElement],
    widgets: [
        {
            _id: "23124235edaed2332daae",
            tag_name: "header",
            display_name: 'Header widget',
            unique_name: 'header_widget',
            content: "<h1>Welcome</h1>",
            attributes: [
                {
                    key: 'class', value: "main-header", enabled: true
                },
            ],
            grid_definition: {
                xs: {
                    size: 12,
                    visible: true
                },
                md: {
                    size: 8,
                    visible: true
                }
            }
        },
    ]
};
//# sourceMappingURL=example-page-1.js.map