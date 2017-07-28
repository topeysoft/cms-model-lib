import { Theme } from './../theme';
import { Page } from './../page';
import { SiteApp } from './../site-app';
import { ContentData } from "./../content-data";
import { Widget } from "../widget";

export class ContentBuilder {
  constructor() {}
  buildPreview(data: ContentData) {
    data.site_info = data.site_info || new SiteApp;
    data.page = data.page || new Page;
    data.theme = data.theme || new Theme;

    data.theme.styles = data.theme.styles || [];
    data.page.styles = data.page.styles || [];
    data.site_info.metadata = data.site_info.metadata || [];
    data.page.metadata = data.page.metadata || [];

    const styles = this.buildTagElements(
      data.theme.styles.concat(data.page.styles)
    );
    const metadata = this.buildTagElements(
      data.theme.metadata.concat(data.page.metadata).concat(data.site_info.metadata)
    );
    const scripts = this.buildTagElements(
      data.theme.scripts.concat(data.page.scripts)
    );
    const bodyContent = this.buildWidgets(data.page.widgets);

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

  buildAttributes(attributes) {
    attributes = attributes || [];
    let str = "";
    attributes.forEach(attr => {
      if (attr.enabled) {
        str += `${attr.key}="${attr.value}" `;
      }
    });
    return str;
  }
  buildTagElements(tags) {
    let tagString = "";
    tags.forEach(item => {
      let str = `<${item.tag_name} ${this.buildAttributes(item.attributes)}>`;
      if (!item.self_closing || item.content) {
        str += `${item.content}</${item.tag_name}>`;
      }
      tagString += str;
    });
    return tagString;
  }
  buildWidgetGridAttributes(widget) {
    widget = widget || {};
    const def = widget.grid_definition;
    const keys = Object.keys(def);
    let gridClasses = "";
    keys.forEach(key => {
      const attr = def[key];
      const visibility = attr.hidden ? ` hidden-${key} ` : ``;
      gridClasses += `col-${key}-${attr.size} ${visibility}`;
    });
    return gridClasses;
  }

  buildWidgets(widgets: Widget[]) {
    widgets = widgets || [];
    let content = ``;
    widgets.forEach(widget => {
      let attr = this.buildAttributes(widget.attributes);
      if (!attr.includes('class="')) {
        attr += 'class=""';
      }
      attr = attr.replace(
        'class="',
        `${this.buildWidgetGridAttributes(widget)} `
      );
      content += `<${widget.tag_name} ${this.buildAttributes(
        widget.attributes
      )}>${widget.content}</${widget.tag_name}>`;
    });
    return content;
  }
}
