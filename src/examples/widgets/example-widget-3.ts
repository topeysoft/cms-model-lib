import { Widget } from './../../widget';
export const exampleWidget3: Widget = {
            _id: "23124235edaed2332daae",
            tag_name: "header",
            display_name: 'Header widget',
            unique_name: 'header_widget',
            content: "<h1>Welcome</h1>",
            attributes: [
                {
                    key: 'class', value: "main-header"
                },
            ],
            grid_definition: {
                xs: {
                    size: 12,
                    hidden: true
                },
                md: {
                    size: 8,
                    hidden: true
                }
            }
        },
}