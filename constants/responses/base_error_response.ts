export class BaseError extends  Error {
    code: string = '';
    message: string= '';
    status: number = 200;
    details?: any = null;
}