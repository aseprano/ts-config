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
    
    has(param: string): Promise<boolean> {
        return Promise.resolve(this.cfg.has(param));
    }
    
    get(param: string): Promise<any> {
        return Promise.resolve(this.cfg.get(param));
    }

}