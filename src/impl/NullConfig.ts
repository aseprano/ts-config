import { Config } from "../Config";

export class NullConfig implements Config {

    public has(param: string): boolean {
        return false;
    }
    
    public get<T>(param: string, default_value?: T): T|undefined {
        return default_value || undefined;
    }

}