"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class Widget extends base_1.BaseModel {
    constructor() {
        super(...arguments);
        this.content = '';
        this.tag_name = 'div';
    }
}
exports.Widget = Widget;
//# sourceMappingURL=widget.js.map