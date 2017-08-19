import { Section } from './../section';
import { WidgetDefinition } from './../widget-definition';
import { GridDefinition } from './../sub-models/grid-definition';
import { Theme } from "./../theme";
import { Page } from "./../page";
import { SiteApp } from "./../site-app";
import { ContentData } from "./../content-data";
import { Widget } from "../widget";

export class ContentBuilder {
  constructor() {}
  static buildPreview(data: ContentData) {
    data.site_info = data.site_info || new SiteApp();
    data.page = data.page || new Page();
    data.theme = data.theme || new Theme();

    data.theme.styles = data.theme.styles || [];
    data.page.styles = data.page.styles || [];

    data.theme.scripts = data.theme.scripts || [];
    data.page.scripts = data.page.scripts || [];
    data.site_info.scripts = data.site_info.scripts || [];

    data.site_info.metadata = data.site_info.metadata || [];
    data.page.metadata = data.page.metadata || [];
    data.theme.metadata = data.theme.metadata || [];
    const styles = ContentBuilder.buildTagElements(
      data.theme.styles.concat(data.page.styles)
    );
    const metadata = ContentBuilder.buildTagElements(
      data.theme.metadata
        .concat(data.page.metadata)
        .concat(data.site_info.metadata)
    );
    const scripts = ContentBuilder.buildTagElements(
      data.theme.scripts.concat(data.page.scripts)
    );
    const bodyContent = ContentBuilder.buildSections(data.page.sections, data.is_draft);

    const content = `<html>
      <head>
      <title>Test</title>
      ${metadata}
      ${styles}
      </head>
      <body>
      ${bodyContent}
      </body>
      ${scripts}
      </html>`;
    return content;
  }

  static buildAttributes(attributes) {
    attributes = attributes || [];
    let str = "";
    attributes.forEach(attr => {
      if (attr.enabled) {
        str += `${attr.key}="${attr.value}" `;
      }
    });
    return str;
  }
  static buildTagElements(tags) {
    let tagString = "";
    tags.forEach(item => {
      if(!item.tag_name){ return}
      let str = `<${item.tag_name} ${ContentBuilder.buildAttributes(
        item.attributes
      )}>`;
      if (!item.self_closing || item.content) {
        str += `${item.content}</${item.tag_name}>`;
      }
      tagString += str;
    });
    return tagString;
  }
  static buildWidgetGridAttributes(widgetDef) {
    widgetDef = widgetDef || {};
    const def = widgetDef.grid_definition|| new GridDefinition;
    const keys = Object.keys(def);
    let gridClasses = "";
    keys.forEach(key => {
      const attr = def[key];
      const visibility = attr.hidden ? ` hidden-${key} ` : ` `;
      gridClasses += ` col-${key}-${attr.size} ${visibility}`;
    });
    return gridClasses;
  }
  static buildVisualWidgetGridAttributes(widget) {
    widget = widget || {};
    const def = widget.grid_definition|| new GridDefinition;
    const keys = Object.keys(def);
    let gridClasses = "";
    keys.forEach(key => {
      const attr = def[key];
      const visibility = attr.hidden ? ` vc-hidden-${key} ` : ``;
      gridClasses += `vc-${key}-${attr.size} ${visibility}`;
    });
    return gridClasses;
  }

  static buildWidgets(widgetDefs: WidgetDefinition[], fromDraft?:boolean) {
    widgetDefs = widgetDefs || [];
    let content = ``;
    widgetDefs.forEach(widgetDef => {
      widgetDef.widget = widgetDef.widget || new Widget;
    let widget = widgetDef.widget;
    if(fromDraft){
      widget = widgetDef.widget.draft  || new Widget;
    }
      widget.tag_name = widget.tag_name || "div";
      let attr = ContentBuilder.buildAttributes(widgetDef.attributes);
      if (!attr.includes('class="')) {
        attr += ' class="" ';
      }
      attr = attr.replace(
        'class="',
        `class="${ContentBuilder.buildWidgetGridAttributes(widgetDef)} `
      );
      content += `<${widget.tag_name} ${attr}>${widget.content}</${widget.tag_name}>`;
    });
    return content;
  }
  static buildSections(sections: Section[], fromDraft?:boolean) {
    sections = sections || [];
    let content = ``;
    sections.forEach(section => {
      section.tag_name = section.tag_name || "section";
      let widgetContent = '';
      let attr = ContentBuilder.buildAttributes(section.attributes);
      if(section.widget_definitions){
        widgetContent = this.buildWidgets(section.widget_definitions, fromDraft);
      }
      content += `<${section.tag_name} ${attr}>${widgetContent}</${section.tag_name}>`;
    });
    return content;
  }
}
