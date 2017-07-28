import { Widget } from './../../widget';
export const exampleWidget2: Widget = {
    _id:'widget2',
    content: "<p>This is awesome</p>",
    tag_name: 'span',
    display_name: "Body Text",
    unique_name: "body-text",
    attributes:[
        {enabled:true, key:"class", value:"text-primary"}
    ],
    grid_definition:{
        xs:{
            size:12,
            hidden:false
        },
        lg:{
            size:8,
            hidden:false
        }
    }
}