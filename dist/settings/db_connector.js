"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnector = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class DbConnector {
    setConfig(config) {
        this._mongoConfig = config;
        return this;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, pass, srv } = this._mongoConfig;
            const url = this._getMongoUrl();
            const mongoOptions = Object.assign({ useNewUrlParser: true, reconnectTries: 2, reconnectInterval: 500, connectTimeoutMS: 5000 }, (srv && { user, pass }));
            return new Promise((resolve, reject) => {
                mongoose_1.default.connect(url, (err) => {
                    if (err)
                        return reject(err);
                    resolve({ message: "connected" });
                });
            });
        });
    }
    _getMongoUrl() {
        const { host, database, user, pass, port, srv } = this._mongoConfig;
        const authPart = pass ? `${user}:${pass}@` : '';
        if (srv) {
            return `mongodb+srv://${host}/${database}?ssl=true&authSource=admin`;
        }
        if (authPart) {
            return `mongodb://${authPart}${host}:${port}/${database}?authMechanism=SCRAM-SHA-1&authSource=admin`;
        }
        else {
            return `mongodb://${authPart}${host}:${port}/${database}`;
        }
    }
}
exports.DbConnector = DbConnector;
