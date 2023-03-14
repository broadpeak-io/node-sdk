import { Base } from "../base";
import fetch from "node-fetch";

/**
 * @example
 * const user = await ApplicationStatus.Parent.get();
 */
export class Parent {
    private apiKeySecret: string;
    constructor(apiKeySecret: string) {
        this.apiKeySecret = apiKeySecret;
    }

    getApplicationStatus = async () => {

        const options = {
            method: 'GET',
            headers: { authorization: 'Bearer ' + this.apiKeySecret }
        };

        const url = new URL(`https://api.broadpeak.io/v1/status`);
        const response = await fetch(url.href, options);
        if (response.ok) {
            const body = await response.json();
            return body;
        }
        throw new Error(response.statusText);
    }
}

/** @hidden */
export function factory(apiKeySecret: string) {

    return {
        Parent: new Parent(apiKeySecret)
    }
}