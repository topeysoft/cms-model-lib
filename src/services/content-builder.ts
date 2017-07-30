import { GridDefinition } from './../sub-models/grid-definition';
import { Theme } from "./../theme";
import { Page } from "./../page";
import { SiteApp } from "./../site-app";
import { ContentData } from "./../content-data";
import { Widget } from "../widget";
import { WidgetItem } from "../widget-item";

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
    const bodyContent = ContentBuilder.buildWidgets(data.page.widgets);

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
  static buildWidgetGridAttributes(widget) {
    widget = widget || {};
    const def = widget.grid_definition|| new GridDefinition;
    const keys = Object.keys(def);
    let gridClasses = "";
    keys.forEach(key => {
      const attr = def[key];
      const visibility = attr.hidden ? ` hidden-${key} ` : ``;
      gridClasses += `col-${key}-${attr.size} ${visibility}`;
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

  static buildWidgets(widgetItems: WidgetItem[]) {
    widgetItems = widgetItems || [];
    let content = ``;
    widgetItems.forEach(widgetItem => {
      const widget = widgetItem.widget;
      widget.tag_name = widget.tag_name || "div";
      let attr = ContentBuilder.buildAttributes(widget.attributes);
      if (!attr.includes('class="')) {
        attr += ' class="" ';
      }
      attr = attr.replace(
        'class="',
        `class="${ContentBuilder.buildWidgetGridAttributes(widget)} `
      );
      content += `<${widget.tag_name} ${attr}>${widget.content}</${widget.tag_name}>`;
    });
    return content;
  }
}
