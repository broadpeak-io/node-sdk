import types from "../src/swagger-json.json";
import { compile } from 'json-schema-to-typescript';
import { appendFileSync } from 'fs';
import $RefParser from "@apidevtools/json-schema-ref-parser";

async function resolveJSON(): Promise<void> {

    let parser = new $RefParser();
    let schema: any = await parser.dereference(types);
    let myParsedSchema = schema.components.schemas;

    for (let key in myParsedSchema) {
        compile(myParsedSchema[key], key).then(ts => appendFileSync('./src/types.ts', ts))
    }
}

resolveJSON();