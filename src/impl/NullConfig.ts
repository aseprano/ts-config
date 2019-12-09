import { Config } from "../Config";

export class NullConfig implements Config {
    private value: Promise<any>;
    private hasValue: Promise<boolean>;

    constructor() {
        this.value = Promise.resolve(undefined);
        this.hasValue = Promise.resolve(false);
    }

    async has(param: string): Promise<boolean> {
        return this.hasValue;
    }
    
    get(param: string): Promise<any> {
        return this.value;
    }

}