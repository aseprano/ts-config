export interface Config {

    has(param: string): boolean;

    get<T = any>(param: string, default_value?: T): T|undefined;

}
