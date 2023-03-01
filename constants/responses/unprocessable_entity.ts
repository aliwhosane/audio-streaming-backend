import { HTTP_CODES } from "../httpcodes";
import { BaseError } from "./base_error_response";

export class UnprocessableEntityError extends BaseError {
    constructor(message:string, code: string, details?:any) {
        super(message);
        this.name = "UNPROCESSABLE ENTITY";
        this.code = code ||  "UNKNOWN";
        this.status = HTTP_CODES.UNPROCESSABLE_ENTITY;
        this.message = message || "Bad  Request";
        this.details = details || null;
    }
}