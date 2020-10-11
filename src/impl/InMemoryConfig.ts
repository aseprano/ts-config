import { Config } from "../Config";

export class InMemoryConfig implements Config {
    private values = new Map<string,any>()

    public set(param: string, value: any): void {
        if (value === undefined) {
            this.values.delete(param);
        } else {
            this.values.set(param, value);
        }
    }

    public setMany(params: {[key: string]: any}): void {
        Object.keys(params).forEach((paramName) => this.set(paramName, params[paramName]));
    }
    
    public has(param: string): boolean {
        return this.values.has(param);
    }
    
    public get<T = any>(param: string, default_value?: T): T|undefined {
        return this.values.get(param) ?? default_value;
    }

}