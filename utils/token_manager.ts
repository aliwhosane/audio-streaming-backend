import jwt from 'jsonwebtoken';
import { createNewLogger } from '../settings/logger';

declare interface TokenPayload {
    user: { [key: string]: any }, iat?: number, exp?: number, nbf?: number, jti?: number;
}

const logger = createNewLogger('TOKEN_MANAGER');
const INSTANCE = Symbol('TokenManager') as unknown as keyof typeof TokenManager;

export const TOKEN_HEADER_KEYS = ['auth-token', 'x-auth-token', 'jwt', 'authorization'];
export const TOKEN_QUERY_KEY = 'auth_token';

export class TokenManager {
    private _passphrase!: string;
    private _tokenExpiresIn!: number;

    static get instance(): TokenManager  {
        if (!this[INSTANCE]) {
            (this[INSTANCE] as  TokenManager) = new TokenManager();
        }
        return this[INSTANCE] as TokenManager;
    }

    setExpiresIn(value: number) {
        this._tokenExpiresIn = value;
        return this;
    }

    setJWTPassword(value: string) {
        this._passphrase = value;
        return this;
    }

    static extractTokenFromRequest(request:any, headerKeys = TOKEN_HEADER_KEYS,
        queryKey = TOKEN_QUERY_KEY){
        let token = '';
        if(request.query && request.query[queryKey]) {
            return request.query[queryKey];
        }
        if(request.headers) {
            for(const headerkey of headerKeys) {
                if(request.headers[headerkey]) {
                    token = request.headers[headerkey];
                    break;
                }
            }
        }
    };

    extractTokenFromRequest(
        request:any,
        headerKeys = TOKEN_HEADER_KEYS,
        queryKey = TOKEN_QUERY_KEY
    ) {
        return TokenManager.extractTokenFromRequest(request, headerKeys, queryKey);
    }

    async createToken(payload: TokenPayload) {
        return jwt.sign(payload,this._passphrase,{expiresIn:this._tokenExpiresIn});
    }

    async verifyToken(token:string) {
        let payload:TokenPayload;
        try {
            payload = await jwt.verify(token, this._passphrase) as TokenPayload;
        } catch (e:unknown) {
            logger.debug('Failed tp verify user token.', e);
            throw new Error(e as string);
        }
        return payload;
    }

    async refresh(token:string) {
        let payload: TokenPayload;
        try {
            payload = await this.verifyToken(token);
            delete payload.iat;
            delete payload.exp;
            delete payload.nbf;
            delete payload.jti;

            return this.createToken(payload);
        } catch(e:unknown) {
            logger.debug('Failed tp refresh user token.', e);
            throw new Error(e as string);
        }
    }
}

export function initTokenManager({tokenExpiresIn, password}:{tokenExpiresIn:number, password:string}): TokenManager {
    const manager = TokenManager.instance;
    manager.setJWTPassword(password).setExpiresIn(tokenExpiresIn);
    return manager;
}