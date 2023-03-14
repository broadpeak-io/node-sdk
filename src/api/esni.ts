import fetch from "node-fetch";

/**
 * @example
 * const category = await Esni.Mediapoint.get(mediapointId);
 * const category = await Esni.Mediapoint.create(mediapointId); // {id} may be any valid url-encoded string
 */
export class MediaPoint {
    private apiKeySecret: string;
    constructor(apiKeySecret: string) {
        this.apiKeySecret = apiKeySecret;
    }

    get = async (id) => {

        const options = {
            method: 'GET',
            headers: { authorization: 'Bearer ' + this.apiKeySecret, 'Content-Type': 'application/xml' }
        };

        const url = new URL(`https://api.broadpeak.io/v1/esni/mediapoint/${id}`);
        const response = await fetch(url.href, options);
        if (response.ok) {
            const body = await response.json();
            return body;
        }
        throw new Error(response.statusText);
    }

    create = async (id) => {

        const options = {
            method: 'PUT',
            headers: { authorization: 'Bearer ' + this.apiKeySecret, 'Content-Type': 'application/xml' }
        };

        const url = new URL(`https://api.broadpeak.io/v1/esni/media/${id}`);
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
        MediaPoint: new MediaPoint(apiKeySecret)
    }
}