"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRoutes = void 0;
const basic_1 = require("./basic");
function configureRoutes(app) {
    (0, basic_1.attachApplicationRoutes)(app);
}
exports.configureRoutes = configureRoutes;
