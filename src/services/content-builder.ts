import { Section } from "./../section";
import { WidgetDefinition } from "./../widget-definition";
import { GridDefinition } from "./../sub-models/grid-definition";
import { Theme } from "./../theme";
import { Page } from "./../page";
import { SiteApp } from "./../site-app";
import { ContentData } from "./../content-data";
import { Widget } from "../widget";

export class ContentBuilder {
  constructor() { }
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
    const bodyContent = ContentBuilder.buildSections(
      data.page.sections,
      data.is_draft
    );
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
    let str = "";
    try {
      if(attributes.forEach){
      attributes.forEach(attr => {
        if (attr.enabled) {
          str += `${attr.key}="${attr.value}" `;
        }
      });
          }else{
              Object.keys(attributes).forEach(key => {
                  let attr = attributes[key];
              if (attr.enabled) {
              str += `${attr.key}="${attr.value}" `;
              }
          });
          
      }
       } catch (err) {
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
    tagString = `<${tag.tag_name} ${ContentBuilder.buildAttributes(
      tag.attributes
    )}>`;
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
    const def = widgetDef.grid_definition || new GridDefinition();
    const keys = Object.keys(def);
    let gridClasses = "";
    keys.forEach(key => {
      const attr = def[key];
      let visibility = def[key].display?` d-${key}-${def[key].display} `:' ';
      let gd = ` col-${key}-${attr.size} ${visibility} `;
      if(key==='xs'){
        visibility = def[key].display?` d-${def[key].display} `:' ';
        gd = ` col-${attr.size} ${visibility} `;
      }
      gridClasses += gd;
    });
    return gridClasses;
  }
  static buildVisualWidgetGridAttributes(widget) {
    widget = widget || {};
    const def = widget.grid_definition || new GridDefinition();
    const keys = Object.keys(def);
    let gridClasses = "";
    keys.forEach(key => {
      const attr = def[key];
      let visibility = def[key].display?` vc-d-${key}-${def[key].display} `:' ';
      let gd = ` vc-col-${key}-${attr.size} ${visibility} `;
      if(key==='xs'){
        visibility = def[key].display?` vc-d-${def[key].display} `:' ';
        gd = ` vc-col-${attr.size} ${visibility} `;
      }    
      gridClasses+=gd;
    });
    return gridClasses;
  }

  static buildWidgets(widgetDefs: WidgetDefinition[], fromDraft?: boolean) {
    widgetDefs = widgetDefs || [];
    let content = ``;
    widgetDefs.forEach(widgetDef => {
      widgetDef.widget = widgetDef.widget || new Widget();
      let widget = widgetDef.widget;
      console.log(widgetDef.widget);
      if (fromDraft) {
        widget = widgetDef.widget.draft || new Widget();
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
  static buildSections(sections: Section[], fromDraft?: boolean) {
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
        widgetContent = this.buildWidgets(
          section.widget_definitions,
          fromDraft
        );
      }
      let sectionContent = widgetContent;
      // if(!section.no_inner_container){
      //   const section_wrapper =  {tag_name:'div', content: widgetContent, self_closing:false, attributes:[{enabled:true, key:'class', value:'container-fluid'}]};
      //   sectionContent = this.buildTagElement(section_wrapper);
      // }
      content += `<${section.tag_name} ${attr}>${sectionContent}</${section.tag_name}>`;
    });
    return content;
  }
}
