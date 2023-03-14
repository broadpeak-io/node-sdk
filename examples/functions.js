require('dotenv').config()
const { BroadpeakSDK } = require('../dist');
const apiKeySecret = process.env.API_KEY;
const { Services, Sources, Categories, TranscodingProfiles, Users, ApiKeys, ApplicationStatus } = new BroadpeakSDK(apiKeySecret);

async function main() {
  const sources = await Sources.Parent.getAllSources(0, 100);
  console.log(JSON.stringify(sources));
}

//API/SERVICE/VIRTUALCHANNEL
async function createVirtualChannel(name, baseLive) {
  const virtualChannel = await Services.VirtualChannel.create({
    name: name,
    baseLive: baseLive
  });
}

async function getVirtualChannel(id) {
  const virtualChannel = await Services.VirtualChannel.get(id);
}

async function updateVirtualChannel(name, baseLive, id) {
  const virtualChannel = await Services.VirtualChannel.update(id, {
    name: name,
    baseLive: baseLive
  });
}

async function deleteVirtualChannel(id) {
  const virtualChannel = await Services.VirtualChannel.delete(id);
}

//API/SERVICE/CONTENT-REPLACEMENT
async function createContentReplacement(name, source, replacement) {
  const contentReplacement = await Services.ContentReplacement.create({
    name: name,
    source: source,
    replacement: replacement
  });
}

async function getContentReplacement(id) {
  const contentReplacement = await Services.ContentReplacement.get(id);
}

async function updateContentReplacement(name, source, replacement, id) {
  const contentReplacement = await Services.ContentReplacement.update(id, {
    name: name,
    source: source,
    replacement: replacement
  });
}

async function deleteContentReplacement(id) {
  const contentReplacement = await Services.ContentReplacement.delete(id);
}

//API/SERVICE/AD-INSERTION
async function createAdInsertion(name, source) {
  const adInsertion = await Services.AdInsertion.create({
    name: name,
    source: source,
  });
}

async function getAdInsertion(id) {
  const adInsertion = await Services.AdInsertion.get(id);
}

async function updateAdInsertion(name, source, id) {
  const adInsertion = await Services.AdInsertion.update(id, {
    name: name,
    source: source,
    replacement: replacement
  });
}

async function deleteAdInsertion(id) {
  const adInsertion = await Services.AdInsertion.delete(id);
}

//API/SOURCE
async function getAllSources(offset, limit) {
  const sources = await Sources.Parent.getAllSources(offset, limit);
}

async function checkSourceStatus(type, url) {
  const sources = await Sources.Parent.checkSourceStatus(type, url);
}

//API/SOURCE/ASSET
async function createAssetSource(name, url) {
  const asset = await Sources.Assets.create({
    name: name,
    url: url
  });
}

async function getAssetSource(id) {
  const asset = await Sources.Assets.get(id);
}

async function updateAssetSource(name, url, id) {
  const asset = await Sources.Assets.update(id, {
    name: name,
    url: url
  });
}

async function deleteAssetSource(id) {
  const asset = await Sources.Assets.delete(id);
}

//API/SOURCE/SLATE
async function createSlateSource(name, url) {
  const slate = await Sources.Slates.create({
    name: name,
    url: url
  });
}

async function getSlateSource(id) {
  const slate = await Sources.Slates.get(id);
}

async function updateSlateSource(name, url, id) {
  const slate = await Sources.Slates.update(id, {
    name: name,
    url: url
  });
}

async function deleteSlateSource(id) {
  const slate = await Sources.Slates.delete(id);
}

//API/SOURCE/ASSET-CATALOG
async function createAssetCatalogSource(name, url, assetSample) {
  const assetCatalog = await Sources.AssetsCatalog.create({
    name: name,
    url: url,
    assetSample: assetSample
  });
}

async function getAssetSource(id) {
  const assetCatalog = await Sources.AssetsCatalog.get(id);
}

async function updateAssetSource(name, url, assetSample, id) {
  const assetCatalog = await Sources.AssetsCatalog.update(id, {
    name: name,
    url: url,
    assetSample: assetSample
  });
}

async function deleteAssetSource(id) {
  const assetCatalog = await Sources.AssetsCatalog.delete(id);
}

//API/SOURCE/ADSERVER
async function createAdServerSource(name, url) {
  const adServer = await Sources.AdServers.create({
    name: name,
    url: url
  });
}

async function getAdServerSource(id) {
  const adServer = await Sources.AdServers.get(id);
}

async function updateAdServerSource(name, url, id) {
  const adServer = await Sources.AdServers.update(id, {
    name: name,
    url: url
  });
}

async function deleteAdServerSource(id) {
  const adServer = await Sources.AdServers.delete(id);
}

//API/SOURCE/LIVE
async function createLiveSource(name, url) {
  const live = await Sources.Live.create({
    name: name,
    url: url
  });
}

async function getLiveSource(id) {
  const live = await Sources.Live.get(id);
}

async function updateLiveSource(name, url, id) {
  const live = await Sources.Live.update(id, {
    name: name,
    url: url
  });
}

async function deleteLiveSource(id) {
  const live = await Sources.Live.delete(id);
}

//API/CATEGORIES
async function getAllCategories() {
  const category = await Categories.getAllCategories(apiKeySecret, offset, limit);
}

async function createCategory(name) {
  const category = await Categories.Categories.create({
    name: name
  });
}

async function getCategory(id) {
  const category = await Categories.Categories.get(id);
}

async function updateCategory(name, id) {
  const category = await Categories.Categories.update(id, {
    name: name,
    url: url
  });
}

async function deleteCategory(id) {
  const category = await Categories.Categories.delete(id);
}

//API/SERVICES
async function getAllServices(offset, limit) {
  const services = await Services.getAll(apiKeySecret, offset, limit);
}

//API/SERVICES/ADINSERTION
async function createAdInsertion(name, source) {
  const adInsertion = await Services.AdInsertion.create({
    name: name,
    source: source
  });
}

async function getAdInsertion(id) {
  const adInsertion = await Services.AdInsertion.get(id);
}

async function updateAdInsertion(name, source, id) {
  const adInsertion = await Services.AdInsertion.update(id, {
    name: name,
    source: source,
    id: id
  });
}

async function deleteAdInsertion(id) {
  const adInsertion = await Services.AdInsertion.delete(id);
}

//API/TRANSCODINGPROFILES
async function getAllTranscodingProfiles() {
  const transcodingProfile = await TranscodingProfiles.getAll;
}

async function getTranscodingProfile(id) {
  const transcodingProfiles = await TranscodingProfiles.TranscodingProfiles.get(id);
}

//API/USERS
async function getAllUsers() {
  const user = await Users.getAll;
}

async function getUser(id) {
  const user = await Users.Users.get(id);
}

async function updateUser(id, firstName, lastName, email) {
  const user = await Users.Users.update(id, {
    id: id,
    firstName: firstName,
    lastName: lastName,
    email: email
  });
}

async function deleteUser(id) {
  const user = await Users.Users.delete(id);
}

//API/APIKEYS
async function createApiKey(name) {
  const apiKey = await ApiKeys.ApiKeys.create({
    name: name
  });
}

async function getAllApiKeys() {
  const apiKey = await ApiKeys.getAll;
}

async function deleteApiKey(name) {
  const apiKey = await ApiKeys.ApiKeys.delete(name);
}

//API/APPLICATIONSTATUS
async function getApplicationStatus() {
  const user = await ApplicationStatus.get;
}


main();