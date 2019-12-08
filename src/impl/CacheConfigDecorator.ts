import { Config } from "../Config";

const OneCentury = 86400 * 365 * 100;

class TimedValue {
    private expirationTime: number;

    constructor(private value: any, ttl: number) {
        this.expirationTime = this.getCurrentTime() + ttl;
    }

    private getCurrentTime(): number {
        return Math.floor(Date.now() / 100) / 10;
    }

    getValue(): any {
        return this.value;
    }

    expired(): boolean {
        return this.expirationTime <= this.getCurrentTime();
    }

}

export class CacheConfigDecorator implements Config {
    private cache = new Map<string, TimedValue>();
    private ttl: number;

    constructor(private innerConfig: Config, ttl?: number) {
        if (ttl !== undefined && ttl < 0) {
            throw new Error('Invalid cache ttl: ' + ttl);
        }

        this.ttl = ttl === undefined ? OneCentury : ttl;
    }

    private hold(key: string, item: any) {
        this.cache.set(key, new TimedValue(item, this.ttl));
    }

    private fromCache(key: string): any {
        let val = this.cache.get(key);

        if (val !== undefined && val.expired()) {
            this.cache.delete(key);
            val = undefined;
        }

        return val === undefined ? val : val.getValue();
    }

    async has(param: string): Promise<boolean> {
        return this.get(param)
            .then((val) => val !== undefined);
    }
    
    async get(key: string): Promise<any> {
        const v = this.fromCache(key);

        if (v !== undefined) {
            return v;
        }
        
        return this.innerConfig
            .get(key)
            .then((val) => {
                if (val !== undefined) {
                    this.hold(key, val);
                }

                return val;
            });
    }

}