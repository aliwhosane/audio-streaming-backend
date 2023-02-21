"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewLogger = void 0;
const winston_1 = require("winston");
const ENV = process.env.ENVIROMENT;
const levels = () => {
    return {
        debug: 5,
        error: 0,
        http: 3,
        info: 2,
        verbose: 4,
        warn: 1
    };
};
const setLevel = (env) => {
    if (env === "production") {
        return "info";
    }
    if (env === "testing") {
        return "error";
    }
    return "debug";
};
const colors = () => ({
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
});
const getLabel = (file) => {
    const parts = file;
    return parts;
};
const createNewLogger = (modelName) => {
    return (0, winston_1.createLogger)({
        levels: levels(),
        level: setLevel(ENV),
        format: winston_1.format.combine(winston_1.format.colorize({ message: true }), winston_1.format.label({ label: getLabel(modelName) }), winston_1.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A', }), winston_1.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)),
        transports: [
            new winston_1.transports.Console()
        ]
    });
};
exports.createNewLogger = createNewLogger;
