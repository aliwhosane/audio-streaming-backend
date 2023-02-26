export function pHandler(promise:Promise<any>) {
    return promise.then((data:any) =>  [null, data]).catch((err:any) => [err]);
}