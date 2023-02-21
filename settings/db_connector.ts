import mongoose, { CallbackError } from 'mongoose';

interface MongoConfig  {
    user: string;
    pass: string;
    srv?: boolean;
    host: string;
    database: string;
    port: number;
}


export class DbConnector {
    private _mongoConfig!: MongoConfig;
    setConfig(config: MongoConfig){
        this._mongoConfig = config;
        return this;
    }
    async connect(){
        const { user, pass, srv } = this._mongoConfig;
        const url = this._getMongoUrl();
        const mongoOptions =  {
            useNewUrlParser: true,
            reconnectTries: 2,
            reconnectInterval: 500, // Reconnect every 500ms
            connectTimeoutMS: 5000,
            ...(srv && { user, pass })
          };

          return new Promise((resolve, reject)=> {
            mongoose.connect(url, (err: CallbackError) => {
                if (err) return reject(err);
        resolve({message: "connected"});
            })
          })
    }
    
    _getMongoUrl() {
        const { host, database, user, pass, port, srv } = this._mongoConfig;
        const authPart = pass ? `${user}:${pass}@` : '';
        if (srv) {
            return `mongodb+srv://${host}/${database}?ssl=true&authSource=admin`;
          }
          if (authPart) {
            return `mongodb://${authPart}${host}:${port}/${database}?authMechanism=SCRAM-SHA-1&authSource=admin`;
          } else {
            return `mongodb://${authPart}${host}:${port}/${database}`;
          }
      
        }
   
}