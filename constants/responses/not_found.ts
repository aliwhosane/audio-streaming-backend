import { HTTP_CODES } from "../httpcodes";
import { BaseError } from "./base_error_response";

export class NotFound extends BaseError {
    constructor(message:string, code:string) {
        super(message);
        this.name = "NOT FOUND";
        this.code = code || "UNKNOWN";
        this.status = HTTP_CODES.NOT_FOUND;
        this.message= message  || "Resource Not Found";
    }
}