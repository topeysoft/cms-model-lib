import { Section } from "./../section";
import { WidgetDefinition } from "./../widget-definition";
import { GridDefinition } from "./../sub-models/grid-definition";
import { Theme } from "./../theme";
import { Page } from "./../page";
import { SiteApp } from "./../site-app";
import { ContentData } from "./../content-data";
import { Widget } from "../widget";
import { ScriptElement } from "../index";

export class ContentBuilder {
  constructor() { }
  static buildPreview(data: ContentData) {
    return ContentBuilder.buildContent(data, true);
  }
  static buildContent(contentData: ContentData, fromDraft = false) {
    contentData.site_info = contentData.site_info || new SiteApp();
    contentData.site_info.scripts = contentData.site_info.scripts || [];
    contentData.site_info.metadata = contentData.site_info.metadata || [];

    contentData.theme = contentData.theme || new Theme();
    contentData.theme.styles = contentData.theme.styles || [];
    contentData.theme.scripts = contentData.theme.scripts || [];
    contentData.theme.metadata = contentData.theme.metadata || [];

      const project_id_global_script = new ScriptElement;
      project_id_global_script.tag_name = 'script';
      project_id_global_script.render_in_head = true;
      project_id_global_script.content = `project_id = project_id || '${contentData.site_info._id}';`;
      contentData.theme.scripts.splice(0, 0 ,project_id_global_script);

    let data = Object.assign({}, contentData);
    if (fromDraft) {
      data.page = contentData.page.draft || new Page();
      data.page.styles = contentData.page.draft.styles || [];
      data.page.scripts = contentData.page.draft.scripts || [];
      data.page.metadata = contentData.page.draft.metadata || [];
    } else {
      data.page = data.page || new Page();
      data.page.styles = data.page.styles || [];
      data.page.scripts = data.page.scripts || [];
      data.page.metadata = data.page.metadata || [];
    }

    if (data.page.require_user_login) {
      const sc = new ScriptElement;
      sc.tag_name = 'script';
      sc.content = 'window.requireUserLogin = true;';
      data.page.scripts.push(sc);
    }
    const styles = ContentBuilder.buildTagElements(
      data.theme.styles.concat(data.page.styles)
    );
    const metadata = ContentBuilder.buildTagElements(
      data.theme.metadata
        .concat(data.page.metadata)
        .concat(data.site_info.metadata)
    );

    const allScriptArray = data.theme.scripts.concat(data.page.scripts);
    const footScriptArray = allScriptArray.filter(s=>{return !s.render_in_head});
    const headScriptArray = allScriptArray.filter(s=>{return s.render_in_head});
    const foot_scripts = ContentBuilder.buildTagElements(footScriptArray);
    const head_scripts = ContentBuilder.buildTagElements(headScriptArray);
    
    const bodyContent = ContentBuilder.buildSections(
      data.page.sections,
      fromDraft
    );
    let title = this.buildTitle(data);
    let bodyTagAttributes = this.buildAttributes(data.page.attributes);
    const content = `<html>
      <head>
      ${title}
      ${metadata}
      ${styles}
      ${head_scripts}
      </head>
      <body ${bodyTagAttributes}>
      ${bodyContent}
      </body>
      ${foot_scripts}
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
      if (attributes.forEach) {
        attributes.forEach(attr => {
          if (attr.enabled) {
            str += `${attr.key}="${attr.value}" `;
          }
        });
      } else {
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
  static buildWidgetGridAttributes(widgetDef, prefix = '') {
    widgetDef = widgetDef || {};
    const def = widgetDef.grid_definition || new GridDefinition();
    const keys = Object.keys(def);
    let gridClasses = "";
    keys.forEach(key => {
      const attr = def[key];
      let visibility = def[key].display ? ` ${prefix}d-${key}-${def[key].display} ` : ' ';
      let col = `${prefix}col`;
      if (attr[key] && attr[key].size) {
        col = `${prefix}col-${key}-${attr.size}`;
      }
      let gd = ` ${col} ${visibility} `;
      if (key === 'xs') {
        visibility = def[key].display ? ` ${prefix}d-${def[key].display} ` : ' ';
        let col = `${prefix}col`;
        if (attr[key] && attr[key].size) {
          col = `${prefix}col-${attr.size}`;
        }
        gd = ` ${col} ${visibility} `;
      }
      gridClasses += gd;
    });
    return gridClasses;
  }
  static buildVisualWidgetGridAttributes(widgetDef) {
    return this.buildWidgetGridAttributes(widgetDef, 'vc-');
  }

  static buildWidgets(widgetDefs: WidgetDefinition[], fromDraft?: boolean) {
    widgetDefs = widgetDefs || [];
    let content = ``;
    widgetDefs.forEach(widgetDef => {
      widgetDef.widget = widgetDef.widget || new Widget();
      let widget = widgetDef.widget;
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
      if (section.is_global) {
        widgetContent = section.content
      } else {
        if (section.widget_definitions) {
          widgetContent = this.buildWidgets(
            section.widget_definitions,
            fromDraft
          );
        }
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
