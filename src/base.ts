import EventEmitter from "events";
import fetch from "node-fetch";

/** @hidden */
export class Base<RequestBody, ResponseBody> extends EventEmitter {

  protected resourceUrl: string;
  protected apiKeySecret: string;

  constructor(version: string, api: string, resource: string, apiKeySecret: string) {
    super();

    this.resourceUrl = `https://api.broadpeak.io${version}${api}${resource}`;
    this.apiKeySecret = apiKeySecret;
  }

  async create(params: RequestBody): Promise<ResponseBody> {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + this.apiKeySecret
      },
      body: JSON.stringify(params)
    };

    const url = new URL(this.resourceUrl);
    const response = await fetch(url.href, options);
    if (response.ok) {
      const body: ResponseBody = await response.json();
      return body;
    }
    throw new Error(response.statusText);
  }

  async update(id: string, params: RequestBody): Promise<ResponseBody> {

    const options = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + this.apiKeySecret
      },
      body: JSON.stringify(params)
    };

    const url = new URL(this.resourceUrl + '/' + id);
    const response = await fetch(url.href, options);
    if (response.ok) {
      const body: ResponseBody = await response.json();
      return body;
    }
    throw new Error(response.statusText);
  }

  async delete(id: string) {

    const options = {
      method: 'DELETE',
      headers: { authorization: 'Bearer ' + this.apiKeySecret }
    };

    const url = new URL(this.resourceUrl + '/' + id);

    const response = await fetch(url.href, options);
    if (response.ok) {
      const status = await response.status;
      return status;
    }
    throw new Error(response.statusText);
  }

  async get(id: string): Promise<ResponseBody> {

    const options = {
      method: 'GET',
      headers: { authorization: 'Bearer ' + this.apiKeySecret }
    };

    const url = new URL(this.resourceUrl + '/' + id);
    const response = await fetch(url.href, options);
    if (response.ok) {
      const body: ResponseBody = await response.json();
      return body;
    }
    throw new Error(response.statusText);
  }
}