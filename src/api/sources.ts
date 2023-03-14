import { Base } from "../base";
import fetch from "node-fetch";
import { CreateAssetCatalogSourceDto, AssetCatalogSourceDto, CreateLiveSourceDto, LiveSourceDto, CreateAssetSourceDto, AssetSourceDto, CreateSlateSourceDto, SlateSourceDto, CreateAdServerSourceDto, AdServerSourceDto } from '../types';

interface TAllSourcesArrayObject {
    id: number;
    name: string;
    type: string;
    url: string;
    format: string;
}
type TAllSources = Array<TAllSourcesArrayObject>

interface TCheckSourcesArrayObject {
    messageText: string;
    severityLevel: string;
}
type TCheckSources = Array<TCheckSourcesArrayObject>

interface TLiveResponse {
    name: string;
    description?: string;
    url: string;
    backupIp?: string;
    id: number;
    format: string;
}

/**
 * @example
 * const Asset = await Sources.Assets.create({name:'ABC', url: 'https://example/media/content.m3u8'});
 * const Asset = await Sources.Assets.get(assetSourceId);
 * const Asset = await Sources.Assets.update(assetSourceId, {name:'ABCD', url: 'https://example/media/content2.m3u8'});
 * const Asset = await Sources.Assets.delete(assetSourceId);
 */
export class Asset extends Base<CreateAssetSourceDto, AssetSourceDto> {
    constructor(apiKeySecret: string) {
        super('/v1', '/sources', '/asset', apiKeySecret);
    }
}

/**
 * @example
 * const Slate = await Sources.Slates.create({name:'ABC', url: 'https://example/media/content.jpg'});
 * const Slate = await Sources.Slates.get(slateSourceId);
 * const Slate = await Sources.Slates.update(slateSourceId, {name:'ABCD', url: 'https://example/media/content2.jpg'});
 * const Slate = await Sources.Slates.delete(slateSourceId);
 */
export class Slate extends Base<CreateSlateSourceDto, SlateSourceDto> {
    constructor(apiKeySecret: string) {
        super('/v1', '/sources', '/slate', apiKeySecret);
    }
}

/**
 * @example
 * const AssetCatalog = await Sources.AssetCatalog.create({name:'ABC', url: 'https://example.io/vod/', assetSample: 'default/sample.mpd'});
 * const AssetCatalog = await Sources.AssetCatalog.get(assetCatalogSourceId);
 * const AssetCatalog = await Sources.AssetCatalog.update(assetCatalogSourceId, {name:'ABCD', url: 'https://example2.io/vod/', assetSample: 'default/sample2.mpd'});
 * const AssetCatalog = await Sources.AssetCatalog.delete(assetCatalogSourceId);
 */
export class AssetCatalog extends Base<CreateAssetCatalogSourceDto, AssetCatalogSourceDto> {
    constructor(apiKeySecret: string) {
        super('/v1', '/sources', '/asset-catalog', apiKeySecret);
    }
}

/**
 * @example
 * const AdServer = await Sources.AdServer.create({name:'ABC', url: 'https://example/adsapi'});
 * const AdServer = await Sources.AdServer.get(adServerId);
 * const AdServer = await Sources.AdServer.update(adServerId, {name:'ABCD', url: 'https://example2/adsapi'});
 * const AdServer = await Sources.AdServer.delete(adServerId);
 */
export class AdServer extends Base<CreateAdServerSourceDto, AdServerSourceDto> {
    constructor(apiKeySecret: string) {
        super('/v1', '/sources', '/ad-server', apiKeySecret);
    }
}

/**
 * @example
 * const Live = await Sources.Live.create({name:'ABC', url: 'https://example/media/content.m3u8'});
 * const Live = await Sources.Live.get(liveSourceId);
 * const Live = await Sources.Live.update(liveSourceId, {name:'ABCD', url: 'https://example/media/content2.m3u8'});
 * const Live = await Sources.Live.delete(liveSourceId);
 */
export class Live extends Base<CreateLiveSourceDto, LiveSourceDto> {
    constructor(apiKeySecret: string) {
        super('/v1', '/sources', '/live', apiKeySecret);
    }
}

/**
 * @example
 * const Sources = await Sources.Parent.getAllSources(0, 10);
 * const SourceStatus = await Sources.Parent.checkSourceStatus({type:'live', url: 'https://example/media/content.m3u8'});
 */
export class Parent {
    private apiKeySecret: string;
    constructor(apiKeySecret: string) {
        this.apiKeySecret = apiKeySecret;
    }

    getAllSources = async (offset = "0", limit = "1000") => {

        const options = {
            method: 'GET',
            headers: { authorization: 'Bearer ' + this.apiKeySecret }
        };

        const url = new URL(`https://api.broadpeak.io/v1/sources?offset=${offset}&limit=${limit}`);
        const response = await fetch(url.href, options);
        if (response.ok) {
            const body: TAllSources = await response.json() as TAllSources;
            return body;
        }
        throw new Error(response.statusText);
    }

    checkSourceStatus = async (type, sourceUrl) => {

        const options = {
            method: 'GET',
            headers: { authorization: 'Bearer ' + this.apiKeySecret }
        };

        const url = new URL(`https://api.broadpeak.io/v1/sources/${type}/check?url=${sourceUrl}`);
        const response = await fetch(url.href, options);
        if (response.ok) {
            const body: TCheckSources = await response.json() as TCheckSources;
            return body;
        }
        throw new Error(response.statusText);
    }
}

/** @hidden */
export function factory(apiKeySecret: string) {

    return {
        Parent: new Parent(apiKeySecret),
        Asset: new Asset(apiKeySecret),
        Slate: new Slate(apiKeySecret),
        AssetsCatalog: new AssetCatalog(apiKeySecret),
        AdServer: new AdServer(apiKeySecret),
        Live: new Live(apiKeySecret)
    }
}