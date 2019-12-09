import { Config } from "../Config";

export class EnvVariablesConfig implements Config {

    constructor(private env: {[key: string]: any}) {}

    async has(param: string): Promise<boolean> {
        return this.env.hasOwnProperty(param);
    }
    
    async get(param: string): Promise<any> {
        return this.env[param];
    }

}