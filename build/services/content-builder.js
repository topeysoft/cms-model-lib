"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grid_definition_1 = require("./../sub-models/grid-definition");
const theme_1 = require("./../theme");
const page_1 = require("./../page");
const site_app_1 = require("./../site-app");
const widget_1 = require("../widget");
class ContentBuilder {
    constructor() { }
    static buildPreview(data) {
        data.site_info = data.site_info || new site_app_1.SiteApp();
        data.page = data.page || new page_1.Page();
        data.theme = data.theme || new theme_1.Theme();
        data.theme.styles = data.theme.styles || [];
        data.page.styles = data.page.styles || [];
        data.theme.scripts = data.theme.scripts || [];
        data.page.scripts = data.page.scripts || [];
        data.site_info.scripts = data.site_info.scripts || [];
        data.site_info.metadata = data.site_info.metadata || [];
        data.page.metadata = data.page.metadata || [];
        data.theme.metadata = data.theme.metadata || [];
        const styles = ContentBuilder.buildTagElements(data.theme.styles.concat(data.page.styles));
        const metadata = ContentBuilder.buildTagElements(data.theme.metadata
            .concat(data.page.metadata)
            .concat(data.site_info.metadata));
        const scripts = ContentBuilder.buildTagElements(data.theme.scripts.concat(data.page.scripts));
        const bodyContent = ContentBuilder.buildSections(data.page.sections, data.is_draft);
        let title = this.buildTitle(data);
        let bodyTagAttributes = this.buildAttributes(data.page.attributes);
        const content = `<html>
      <head>
      ${title}
      ${metadata}
      ${styles}
      </head>
      <body ${bodyTagAttributes}>
      ${bodyContent}
      </body>
      ${scripts}
      </html>`;
        return content;
    }
    static buildTitle(data) {
        let title = `${data.page.title} | ${data.site_info.title}`;
        return `<title>${title}</title>`;
    }
    static buildAttributes(attributes) {
        attributes = attributes || [];
        const type = typeof (attributes);
        console.log('TYPE', type);
        if (!Array.isArray(attributes)) {
            attributes = [attributes];
        }
        let str = "";
        try {
            attributes.forEach(attr => {
                if (attr.enabled) {
                    str += `${attr.key}="${attr.value}" `;
                }
            });
        }
        catch (err) {
            console.log('Attrib error', err, attributes);
        }
        return str;
    }
    static buildTagElement(tag) {
        if (!tag) {
            return '';
        }
        let tagString = "";
        if (!tag.tag_name) {
            return;
        }
        tagString = `<${tag.tag_name} ${ContentBuilder.buildAttributes(tag.attributes)}>`;
        if (!tag.self_closing || tag.content) {
            tagString += `${tag.content ? tag.content : ''}</${tag.tag_name}>`;
        }
        return tagString;
    }
    static buildTagElements(tags) {
        if (!tags) {
            return '';
        }
        let tagString = "";
        tags.forEach(item => {
            tagString += ContentBuilder.buildTagElement(item);
        });
        return tagString;
    }
    static buildWidgetGridAttributes(widgetDef) {
        widgetDef = widgetDef || {};
        const def = widgetDef.grid_definition || new grid_definition_1.GridDefinition();
        const keys = Object.keys(def);
        let gridClasses = "";
        keys.forEach(key => {
            const attr = def[key];
            let visibility = attr.hidden ? ` d-${key}-none` : ` `;
            gridClasses += ` col-${key}-${attr.size} ${visibility}`;
            if (key === 'xs') {
                visibility = attr.hidden ? ` d-none ` : ` `;
                gridClasses += ` col-${attr.size} ${visibility}`;
            }
        });
        return gridClasses;
    }
    static buildVisualWidgetGridAttributes(widget) {
        widget = widget || {};
        const def = widget.grid_definition || new grid_definition_1.GridDefinition();
        const keys = Object.keys(def);
        let gridClasses = "";
        keys.forEach(key => {
            const attr = def[key];
            let visibility = attr.hidden ? ` vc-d-${key}-none` : ` `;
            gridClasses += ` vc-col-${key}-${attr.size} ${visibility}`;
            if (key === 'xs') {
                visibility = attr.hidden ? ` vc-d-none ` : ` `;
                gridClasses += ` vc-col-${attr.size} ${visibility}`;
            }
        });
        return gridClasses;
    }
    static buildWidgets(widgetDefs, fromDraft) {
        widgetDefs = widgetDefs || [];
        let content = ``;
        widgetDefs.forEach(widgetDef => {
            widgetDef.widget = widgetDef.widget || new widget_1.Widget();
            let widget = widgetDef.widget;
            console.log(widgetDef.widget);
            if (fromDraft) {
                widget = widgetDef.widget.draft || new widget_1.Widget();
            }
            widget.tag_name = widget.tag_name || "div";
            let attr = ContentBuilder.buildAttributes(widgetDef.attributes);
            if (!attr.includes('class="')) {
                attr += ' class="" ';
            }
            attr = attr.replace('class="', `class="${ContentBuilder.buildWidgetGridAttributes(widgetDef)} `);
            content += `<${widget.tag_name} ${attr}>${widget.content}</${widget.tag_name}>`;
        });
        return content;
    }
    static buildSections(sections, fromDraft) {
        sections = sections || [];
        let content = ``;
        sections.forEach(section => {
            section.tag_name = section.tag_name || "section";
            section.attributes = section.attributes || [{
                    "enabled": true,
                    "key": "class",
                    "value": "row"
                }];
            let widgetContent = "";
            let attr = ContentBuilder.buildAttributes(section.attributes);
            if (section.widget_definitions) {
                widgetContent = this.buildWidgets(section.widget_definitions, fromDraft);
            }
            let sectionContent = widgetContent;
            content += `<${section.tag_name} ${attr}>${sectionContent}</${section.tag_name}>`;
        });
        return content;
    }
}
exports.ContentBuilder = ContentBuilder;
//# sourceMappingURL=content-builder.js.map