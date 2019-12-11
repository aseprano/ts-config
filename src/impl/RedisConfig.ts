import { Config } from "../Config";
import { RedisClient } from "redis";

export class RedisConfig implements Config {
    private prefix: string;

    constructor(
        private cli: RedisClient,
        prefix?: string
    ) {
        this.prefix = prefix || '';
    }

    has(param: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.cli.HGET(this.prefix, param, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data !== null);
                }
            });
        });
    }
    
    get(param: string, default_value?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.cli.HGET(this.prefix, param, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data === null ? default_value : data.toString());
                }
            });
        });
    }

}