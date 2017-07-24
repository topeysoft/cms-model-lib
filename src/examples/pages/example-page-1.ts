import { TagElement, StyleElement, ScriptElement, Page } from "../../index";

export const examplePage1: Page = {
    _id: "ea54ed32ade23322323232",
    display_name: "Homepage",
    unique_name: "homepage",
    metadata: [new TagElement],
    styles: [new StyleElement],
    scripts: [new ScriptElement],
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
