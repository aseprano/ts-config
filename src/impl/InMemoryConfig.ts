import { Config } from "../Config";

export class InMemoryConfig implements Config {
    private cfg = new Map<string,any>()

    set(param: string, value: any): void {
        if (value === undefined) {
            this.cfg.delete(param);
        } else {
            this.cfg.set(param, value);
        }
    }

    setMany(params: {[key: string]: any}): void {
        Object.keys(params).forEach((k) => {
            this.set(k, params[k]);
        });
    }
    
    async has(param: string): Promise<boolean> {
        return this.cfg.has(param);
    }
    
    async get(param: string): Promise<any> {
        return this.cfg.get(param);
    }

}