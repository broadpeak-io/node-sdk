Official Broadpeak.io API wrapper for Node projects

[broadpeak.io](https://www.broadpeak.io/) is the Video API Platform helping you to reach the quality of the top OTT video leaders without being an HLS or a DASH expert. Call our APIs to contextualize your streaming feeds and deliver a broadcast-TV like experience to your viewers.

broadpeak.io provides Manifest Manipulator functionalities with applications such as Content Replacement, Virtual Channel and Dynamic Ad Insertion.

## Installation

```shell
npm install --save broadpeak.io
```

## Usage

You will need a Broadpeak API key. Visit the broadpeak.io homepage to get started: https://app.broadpeak.io/


First, `require` the `@broadpeak/sdk` npm module and create a BroadpeakSDK instance.
You can use destructuring for each of the API you intend to use.
```javascript
const { BroadpeakSDK } = require('broadpeak.io');

const { Sources, Services, Users } = new BroadpeakSDK(apiKeySecret);
```

**All available API areas**
```javascript
const { Sources, Services, TranscodingProfiles, Esni, Categories, Users, ApiKeys, ApplicationStatus } = new BroadpeakSDK(apiKeySecret);
```
Each instance will have properties corresponding to the available [API calls](https://developers.broadpeak.io/reference/).

**Making calls**
```javascript
const asset = await Sources.Assets.create({
    name: "myAsset",
    url: "myAssetURL"
  }); // When an object is created it automatically receives an ID which is included in the request response. 

const asset = await Sources.Assets.get("assetID");
const asset = await Sources.Assets.delete("assetID");

const users = await Users.Users.getAllUsers();
const users = await Users.Users.getAllUsers(0, 10); // Start displaying results at index = 0; Limit Maximum number of results = 10;

const user = await Users.Users.update("userID", {
    firstName: "firstName",
    lastName: "lastName",
    email: "email@provider.com"
  });
```

## Requests and Responses

This wrapper uses [node-fetch](https://www.npmjs.com/package/node-fetch) to make http requests to the Broadpeak API. Many request parameters have expected formats which need to be correct or otherwise result in a Bad Request.

See the [API documentation](https://developers.broadpeak.io/reference/) for details on available calls, expected parameters and response content.

## Development

- Install dependencies
```shell
npm install
```

- Compiling from Typescript to Javascript:

```shell
npm run build
```

- Run examples

Create an API key in your broadpeak.io account settings.
Then create an `.env` file at the root of the repository containing:
```text
API_KEY=eyJhb....
```
After that you can run the examples
```shell
node examples/sample-javascript.js
ts-node examples/sample-typescript
```

- Generate documentation

```shell
npm run build:docs
```

- Generate Types
First, remove types.ts
```shell
npm run build:types
```
