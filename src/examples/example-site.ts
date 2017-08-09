import { SiteApp } from '../site-app';
import { ScriptElement } from "./../sub-models/script-element";
import { StyleElement } from "./../sub-models/style-element";
import { TagElement } from "./../sub-models/tag-element";
import { Page } from "./../page";
import { examplePages } from "./pages/example-pages";

export const exampleSite: SiteApp = {
    _id: "",
    base_url: 'http://my.site.com',
    title: 'My Official Website',
    display_name: "Official Website",
    unique_name: "official_website",
    theme: {
        _id: "",
        project_id:"",
        display_name: "Default Theme",
        unique_name: "default_theme",
        styles: [],
        scripts: [],
        metadata: [],
        templates: [],

    },
    pages: examplePages,
    metadata: [
        {
            enabled: true,
            tag_name: 'meta', attributes: [
                {
                    enabled: true,
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
}