export interface Config {

    has(param: string): Promise<boolean>;

    get(param: string): Promise<any>;

}
