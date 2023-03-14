require('dotenv').config()
const { BroadpeakSDK } = require('../dist');
const apiKeySecret = process.env.API_KEY;

const liveURL = "https://origin.broadpeak.io/bpk-tv/bbb/default/index.mpd";
const vodURL = "https://origin.broadpeak.io/bpk-vod/voddemo/default/bbb/bbb/index.mpd";

async function main() {
    example();
}

example = async () => {
    const client = new BroadpeakSDK(apiKeySecret);

    // Create and update sources
    const newSource1 = await client.Sources.Asset.create({
        name: "mySource1",
        url: vodURL
    });
    console.log("Created asset: " + JSON.stringify(newSource1));

    const newSource2 = await client.Sources.Live.create({
        name: "mySource2",
        url: liveURL
    });
    console.log("Created live: " + JSON.stringify(newSource2));

    const updateAsset = await client.Sources.Asset.update(newSource1.id, {
        name: "myNewSource",
        url: vodURL
    });
    console.log("Updated asset: " + JSON.stringify(newSource1));

    // Get sources
    var allSources = await client.Sources.Parent.getAllSources();
    console.log("All sources: " + JSON.stringify(allSources));

    const getAsset = await client.Sources.Asset.get(newSource1.id);
    console.log("Get Asset: " + JSON.stringify(getAsset));

    // Cleanup
    await client.Sources.Asset.delete(newSource1.id);
    await client.Sources.Live.delete(newSource2.id);
}

main();