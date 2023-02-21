import path from "path";
import {createLogger, format, transports} from 'winston';
import { AbstractConfigSetColors, AbstractConfigSetLevels } from "winston/lib/winston/config";

const ENV:string = process.env.ENVIROMENT!;


    const levels = ():AbstractConfigSetLevels => {
        return {
            debug: 5,
      error: 0,
      http: 3,
      info: 2,
      verbose: 4,
      warn: 1
        };
    }

    const setLevel = (env:string) => {
        if (env === "production") {
            return "info";
          }
          if (env === "testing") {
            return "error";
          }
          return "debug";
    }

    const colors = ():AbstractConfigSetColors => ({
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'magenta',
        debug: 'white',
      });
      

    const getLabel = (file: string) => {
        const parts = file; 
        return parts; 
      }

      const createNewLogger = (modelName:string)=> {
        return createLogger({
            levels: levels(),
            level:  setLevel(ENV),
            format: format.combine(
                format.colorize({message:true}),
                format.label({label: getLabel(modelName)}),
                format.timestamp({format: 'YYYY-MM-DD hh:mm:ss.SSS A',}),
                format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
            ),
            transports: [
                new transports.Console()
            ]
        })
      }

export { createNewLogger  }