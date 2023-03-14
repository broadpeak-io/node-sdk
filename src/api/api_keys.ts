import { Base } from "../base";
import fetch from "node-fetch";
import { CreateTokenDto, FullTokenDto } from '../types';

type TAllApiKeys = Array<FullTokenDto>

/**
 * @example
 * const ApiKey = await ApiKeys.ApiKeys.create({name: "myKey"});
 * const ApiKey = await ApiKeys.Parent.getAllApiKeys("0", "10");
 * const ApiKey = await ApiKeys.ApiKeys.delete("keyId");
 */
export class ApiKeys extends Base<CreateTokenDto, FullTokenDto> {
    constructor(apiKeySecret: string) {
        super('/v1', '/tokens', '', apiKeySecret);
    }
}

/**
 * @example
 * const ApiKeys = await ApiKeys.Parent.getAllApiKeys(0, 10);
 */
export class Parent {

    private apiKeySecret: string;
    constructor(apiKeySecret: string) {
        this.apiKeySecret = apiKeySecret;
    }

    getAllApiKeys = async (offset = "0", limit = "1000") => {

        const options = {
            method: 'GET',
            headers: { authorization: 'Bearer ' + this.apiKeySecret }
        };

        const url = new URL(`https://api.broadpeak.io/v1/tokens?offset=${offset}&limit=${limit}`);
        const response = await fetch(url.href, options);
        if (response.ok) {
            const body: TAllApiKeys = await response.json() as TAllApiKeys;
            return body;
        }
        throw new Error(response.statusText);
    }
}

/** @hidden */
export function factory(apiKeySecret: string) {

    return {
        Parent: new Parent(apiKeySecret),
        ApiKeys: new ApiKeys(apiKeySecret)
    }
}