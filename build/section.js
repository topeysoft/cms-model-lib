"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shortid = require("shortid");
class Section {
    constructor() {
        this.unique_name = shortid();
        this.tag_name = 'section';
        this.attributes = [{ enabled: true, key: 'class', value: 'row' }];
        this.no_inner_container = false;
    }
}
exports.Section = Section;
//# sourceMappingURL=section.js.map