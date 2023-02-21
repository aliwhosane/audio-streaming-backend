"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
const logger_1 = require("./settings/logger");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const logger = (0, logger_1.createNewLogger)('ROUTES');
(0, routes_1.configureRoutes)(app);
app.get("/", (req, res) => {
    logger.debug(`Processing route: ${req.url}`);
    res.send("Tape A Tale  Server 2023");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
