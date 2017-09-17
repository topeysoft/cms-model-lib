"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tag_element_1 = require("./tag-element");
class ScriptElement extends tag_element_1.TagElement {
    constructor() {
        super(...arguments);
        this.render_in_head = false;
    }
}
exports.ScriptElement = ScriptElement;
//# sourceMappingURL=script-element.js.map