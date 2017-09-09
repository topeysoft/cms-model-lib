"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class Page extends base_1.BaseModel {
    constructor() {
        super(...arguments);
        this.requre_user_login = false;
    }
}
exports.Page = Page;
//# sourceMappingURL=page.js.map