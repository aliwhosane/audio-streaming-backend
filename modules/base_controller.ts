import { createLogger } from "winston";

export abstract class  BaseController {
    protected static readonly logger = createLogger;
}