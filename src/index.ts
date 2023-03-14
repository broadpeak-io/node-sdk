import { factory as servicesFactory } from "./api/services";
import { factory as sourcesFactory } from "./api/sources";
import { factory as categoryFactory } from "./api/categories";
import { factory as transcodingProfilesFactory } from "./api/transcoding_profiles";
import { factory as usersFactory } from "./api/users";
import { factory as apiKeysFactory } from "./api/api_keys";
import { factory as applicationStatusFactory } from "./api/application_status";
import test from "node:test";

export class BroadpeakSDK {

  private apis;
  private apiKeySecret;
  private apiFactories;

  constructor(apiKeySecret: string) {
    this.apis = {};
    this.apiKeySecret = apiKeySecret;
    this.apiFactories = {
      Services: servicesFactory,
      Sources: sourcesFactory,
      Categories: categoryFactory,
      TranscodingProfiles: transcodingProfilesFactory,
      Users: usersFactory,
      ApiKeys: apiKeysFactory,
      ApplicationStatus: applicationStatusFactory,
    };
  }

  /** @hidden */
  getApi(api: string) {

    if (!this.apis[api]) {
      this.apis[api] = this.apiFactories[api](this.apiKeySecret);
    }
    return this.apis[api];
  }

  get Services() { return this.getApi('Services'); }
  get Sources() { return this.getApi('Sources'); }
  get Categories() { return this.getApi('Categories'); }
  get TranscodingProfiles() { return this.getApi('TranscodingProfiles'); }
  get Users() { return this.getApi('Users'); }
  get ApiKeys() { return this.getApi('ApiKeys'); }
  get ApplicationStatus() { return this.getApi('ApplicationStatus'); }
}