export interface Config {

    has(param: string): Promise<boolean>;

    get(param: string, default_value?: any): Promise<any>;

}
