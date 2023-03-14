import { Base } from "../base";
import fetch from "node-fetch";
import { CreateVirtualChannelDto, VirtualChannelDto, CreateVirtualChannelSlotDto, VirtualChannelSlotDto, CreateContentReplacementServiceDto, ContentReplacementServiceDto, CreateContentSlotDto, ContentSlotDto, CreateAdInsertionServiceDto, AdInsertionServiceDto } from '../types';

interface TAllServicesArrayObject {
  id: number;
  name: string;
  type: string;
  url: string;
  environmentTags: string[];
  creationDate: Date;
  updateDate: Date;
}
type TAllServices = Array<TAllServicesArrayObject>

/**
 * @example
 * const VirtualChannel = await Services.VirtualChannel.create({name:'Service A',baseLive: {id: 42}});
 * const VirtualChannel = await Services.VirtualChannel.get(virtualChannelId);
 * const VirtualChannel = await Services.VirtualChannel.update(virtualChannelId, {name: 'Service B', baseLive: {id: 43}});
 * const VirtualChannel = await Services.VirtualChannel.delete(virtualChannelId);
 * 
 * const slot = await Services.VirtualChannel.createSlot(42, {startTime: '2022-01-01T12:30:00Z', duration: 120});
 * const allSlots = await Services.VirtualChannel.getAllSlots(42);
 * const slot = await Services.VirtualChannel.getSlot(42, 123);
 * const slot = await Services.VirtualChannel.updateSlot(42, 123, {startTime: '2022-01-01T12:30:00Z', duration: 120});
 * const slot = await Services.VirtualChannel.deleteSlot(42, 123);
 */
export class VirtualChannel extends Base<CreateVirtualChannelDto, VirtualChannelDto> {
  constructor(apiKeySecret: string) {
    super('/v1', '/services', '/virtual-channel', apiKeySecret);
  }

  async createSlot(serviceId: string, params: CreateVirtualChannelSlotDto): Promise<VirtualChannelSlotDto> {

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + this.apiKeySecret
      },
      body: JSON.stringify(params)
    };

    const url = new URL(this.resourceUrl + `/${serviceId}/slots`);
    const response = await fetch(url.href, options);
    if (response.ok) {
      const body: any = await response.json();
      return body;
    }
    throw new Error(response.statusText);
  }

  async updateSlot(serviceId: string, id: string, params: CreateVirtualChannelSlotDto): Promise<VirtualChannelSlotDto> {

    const options = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + this.apiKeySecret
      },
      body: JSON.stringify(params)
    };

    const url = new URL(this.resourceUrl + `/${serviceId}/slots/` + id);
    const response = await fetch(url.href, options);
    if (response.ok) {
      const body: any = await response.json();
      return body;
    }
    throw new Error(response.statusText);
  }

  async deleteSlot(serviceId: string, id: string) {

    const options = {
      method: 'DELETE',
      headers: { authorization: 'Bearer ' + this.apiKeySecret }
    };

    const url = new URL(this.resourceUrl + `/${serviceId}/slots/` + id);

    const response = await fetch(url.href, options);
    if (response.ok) {
      const status = await response.status;
      return status;
    }
    throw new Error(response.statusText);
  }

  async getSlot(serviceId: string, id: string): Promise<VirtualChannelSlotDto> {

    const options = {
      method: 'GET',
      headers: { authorization: 'Bearer ' + this.apiKeySecret }
    };

    const url = new URL(this.resourceUrl + `/${serviceId}/slots/` + id);
    const response = await fetch(url.href, options);
    if (response.ok) {
      const body: any = await response.json();
      return body;
    }
    throw new Error(response.statusText);
  }

  async getAllSlots(serviceId: string): Promise<Array<VirtualChannelSlotDto>> {

    const options = {
      method: 'GET',
      headers: { authorization: 'Bearer ' + this.apiKeySecret }
    };

    const url = new URL(this.resourceUrl + `/${serviceId}/slots/`);
    const response = await fetch(url.href, options);
    if (response.ok) {
      const body: any = await response.json();
      return body;
    }
    throw new Error(response.statusText);
  }
}

/**
 * @example
 * const ContentReplacement = await Services.ContentReplacement.create({name:'Service A', source: {id: 42}, replacement: {id: 42}});
 * const ContentReplacement = await Services.ContentReplacement.get(sourceId);
 * const ContentReplacement = await Services.ContentReplacement.update(sourceId, {name: 'Service B', baseLive: {id: 43}});
 * const ContentReplacement = await Services.ContentReplacement.delete(sourceId);
 * 
 * const allSlots = await Services.ContentReplacement.createSlot(42, {startTime: '2022-01-01T12:30:00Z', duration: 120});
 * const allSlots = await Services.ContentReplacement.getAllSlots(42);
 * const allSlots = await Services.ContentReplacement.getSlot(42, 123);
 * const allSlots = await Services.ContentReplacement.updateSlot(42, 123, {startTime: '2022-01-01T12:30:00Z', duration: 120});
 * const allSlots = await Services.ContentReplacement.deleteSlot(42, 123);
 */
export class ContentReplacement extends Base<CreateContentReplacementServiceDto, ContentReplacementServiceDto> {
  constructor(apiKeySecret: string) {
    super('/v1', '/services', '/content-replacement', apiKeySecret);
  }

  async createSlot(serviceId: string, params: CreateContentSlotDto): Promise<ContentSlotDto> {

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + this.apiKeySecret
      },
      body: JSON.stringify(params)
    };

    const url = new URL(this.resourceUrl + `/${serviceId}/slots`);
    const response = await fetch(url.href, options);
    if (response.ok) {
      const body: any = await response.json();
      return body;
    }
    throw new Error(response.statusText);
  }

  async updateSlot(serviceId: string, id: string, params: CreateContentSlotDto): Promise<ContentSlotDto> {

    const options = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + this.apiKeySecret
      },
      body: JSON.stringify(params)
    };

    const url = new URL(this.resourceUrl + `/${serviceId}/slots/` + id);
    const response = await fetch(url.href, options);
    if (response.ok) {
      const body: any = await response.json();
      return body;
    }
    throw new Error(response.statusText);
  }

  async deleteSlot(serviceId: string, id: string) {

    const options = {
      method: 'DELETE',
      headers: { authorization: 'Bearer ' + this.apiKeySecret }
    };

    const url = new URL(this.resourceUrl + `/${serviceId}/slots/` + id);

    const response = await fetch(url.href, options);
    if (response.ok) {
      const status = await response.status;
      return status;
    }
    throw new Error(response.statusText);
  }

  async getSlot(serviceId: string, id: string): Promise<ContentSlotDto> {

    const options = {
      method: 'GET',
      headers: { authorization: 'Bearer ' + this.apiKeySecret }
    };

    const url = new URL(this.resourceUrl + `/${serviceId}/slots/` + id);
    const response = await fetch(url.href, options);
    if (response.ok) {
      const body: any = await response.json();
      return body;
    }
    throw new Error(response.statusText);
  }

  async getAllSlots(serviceId: string): Promise<Array<ContentSlotDto>> {

    const options = {
      method: 'GET',
      headers: { authorization: 'Bearer ' + this.apiKeySecret }
    };

    const url = new URL(this.resourceUrl + `/${serviceId}/slots/`);
    const response = await fetch(url.href, options);
    if (response.ok) {
      const body: any = await response.json();
      return body;
    }
    throw new Error(response.statusText);
  }
}

/**
 * @example
 * const AdInsertion = await Services.AdInsertion.create({name:'Service A', source: {id: 42}});
 * const AdInsertion = await Services.AdInsertion.get(adInsertionId);
 * const AdInsertion = await Services.AdInsertion.update(adInsertionId, {name: 'Service B', source: {id: 43}});
 * const AdInsertion = await Services.AdInsertion.delete(adInsertionId);
 */
export class AdInsertion extends Base<CreateAdInsertionServiceDto, AdInsertionServiceDto> {
  constructor(apiKeySecret: string) {
    super('/v1', '/services', '/ad-insertion', apiKeySecret);
  }
}

/**
 * @example
 * const Services = await Services.Parent.getAllServices(0, 10);
 */
export class Parent {
  private apiKeySecret: string;
  constructor(apiKeySecret: string) {
    this.apiKeySecret = apiKeySecret;
  }

  getAllServices = async (offset = "0", limit = "1000") => {

    const options = {
      method: 'GET',
      headers: { authorization: 'Bearer ' + this.apiKeySecret }
    };

    const url = new URL(`https://api.broadpeak.io/v1/services?offset=${offset}&limit=${limit}`);
    const response = await fetch(url.href, options);
    if (response.ok) {
      const body: TAllServices = await response.json() as TAllServices;
      return body;
    }
    throw new Error(response.statusText);
  }
}

/** @hidden */
export function factory(apiKeySecret: string) {

  return {
    Parent: new Parent(apiKeySecret),
    VirtualChannel: new VirtualChannel(apiKeySecret),
    ContentReplacement: new ContentReplacement(apiKeySecret),
    AdInsertion: new AdInsertion(apiKeySecret)
  }
}