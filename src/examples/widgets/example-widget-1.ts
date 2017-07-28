import { Widget } from './../../widget';
export const exampleWidget1: Widget = {
    _id:'widget1',
    content: "<p>Hello</p>",
    tag_name: 'aside',
    display_name: "Left menu",
    unique_name: "left-menu",
    attributes:[
        {enabled:false, key:"class", value:"text-danger"}
    ],
    grid_definition:{
        xs:{
            size:10,
            hidden:false
        },
        lg:{
            size:4,
            hidden:false
        }
    }
}