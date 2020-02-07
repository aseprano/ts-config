import { Config } from "../Config";

export class EnvVariablesConfig implements Config {

    constructor(private env: {[key: string]: any}) {}

    async has(param: string): Promise<boolean> {
        return this.env.hasOwnProperty(param);
    }
    
    async get(param: string, default_value?: any): Promise<any> {
        const value = this.env[param];
        return value !== undefined ? value : default_value;
    }

}