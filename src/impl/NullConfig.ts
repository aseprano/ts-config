import { Config } from "../Config";

export class NullConfig implements Config {

    has(param: string): Promise<boolean> {
        return Promise.resolve(false);
    }
    
    get(param: string): Promise<any> {
        return Promise.resolve(undefined);
    }

}