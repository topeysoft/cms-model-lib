"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const example_pages_1 = require("./pages/example-pages");
exports.exampleSite = {
    _id: "",
    base_url: 'http://my.site.com',
    title: 'My Official Website',
    display_name: "Official Website",
    unique_name: "official_website",
    theme: {
        _id: "",
        display_name: "Default Theme",
        unique_name: "default_theme",
        styles: [],
        scripts: [],
        metadata: [],
        templates: [],
    },
    pages: example_pages_1.examplePages,
    metadata: [
        {
            enabled: true,
            tag_name: 'meta', attributes: [
                {
                    disabled: false,
                    key: "http-equiv",
                    value: "X-UA-Compatible"
                },
                {
                    key: "content",
                    value: "IE=edge"
                }
            ]
        }
    ]
};
//# sourceMappingURL=example-site.js.map