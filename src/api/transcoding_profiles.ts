import { Base } from "../base";
import fetch from "node-fetch";
import { CreateTranscodingProfileDto, TranscodingProfileDto } from '../types';

interface TAllTranscodingProfilesArrayObject {
    id: number;
    name: string;
    content: string;
}
type TAllTranscodingProfiles = Array<TAllTranscodingProfilesArrayObject>

/**
 * @example
 * const TranscodingProfile = await TranscodingProfiles.TranscodingProfiles.get(transcodingProfileId);
 */
export class TranscodingProfiles extends Base<CreateTranscodingProfileDto, TranscodingProfileDto> {
    constructor(apiKeySecret: string) {
        super('/v1', '/transcoding-profiles', '', apiKeySecret);
    }
}

/**
 * @example
 * const TranscodingProfiles = await TranscodingProfiles.Parent.getAllTranscodingProfiles(0, 10);
 */
export class Parent {
    private apiKeySecret: string;
    constructor(apiKeySecret: string) {
        this.apiKeySecret = apiKeySecret;
    }

    getAllTranscodingProfiles = async (offset = "0", limit = "1000") => {

        const options = {
            method: 'GET',
            headers: { authorization: 'Bearer ' + this.apiKeySecret }
        };

        const url = new URL(`https://api.broadpeak.io/v1/transcoding-profiles?offset=${offset}&limit=${limit}`);
        const response = await fetch(url.href, options);
        if (response.ok) {
            const body: TAllTranscodingProfiles = await response.json() as TAllTranscodingProfiles;
            return body;
        }
        throw new Error(response.statusText);
    }
}

/** @hidden */
export function factory(apiKeySecret: string) {

    return {
        Parent: new Parent(apiKeySecret),
        TranscodingProfiles: new TranscodingProfiles(apiKeySecret)
    }
}