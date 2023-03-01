import { HTTP_CODES } from "../httpcodes";
import { BaseError } from "./base_error_response";

export class  BadRequestError  extends BaseError {
    constructor(message: string, code: string) {
        super(message);
        this.name = "BAD REQUESTT";
        this.code = code || "UNKNOWN";
        this.status = HTTP_CODES.BAD_REQUEST;
        this.message = message ||  "Bad Request";
    }
}