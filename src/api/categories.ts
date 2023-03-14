import { Base } from "../base";
import fetch from "node-fetch";
import { CreateCategoryDto, CategoryDto } from '../types';

interface TObject {
    key: string;
    value: string;
}

interface TCategoriesResponseObject {
    id: number;
    name: string;
    subcategories: TObject[];
}
type TAllCategories = Array<TCategoriesResponseObject>

/**
 * @example
 * const Categories = await Categories.getAllCategories(0, 10);
 * const Categories = await Categories.Categories.create({name: "myCategory"});
 * const Categories = await Categories.Categories.get(categoryId);
 * const Categories = await Categories.Categories.update(id, {name: name, subcategories: [{key: 'zip', value: '35000'}]});
 * const Categories = await Categories.Categories.delete(categoryId);
 */
export class Categories extends Base<CreateCategoryDto, CategoryDto> {
    constructor(apiKeySecret: string) {
        super('/v1', '/categories', '', apiKeySecret);
    }
}

/**
 * @example
 * const Categories = await Services.Parent.getAllCategories(0, 10);
 */
export class Parent {
    private apiKeySecret: string;
    constructor(apiKeySecret: string) {
        this.apiKeySecret = apiKeySecret;
    }

    getAllCategories = async (offset = "0", limit = "1000") => {

        const options = {
            method: 'GET',
            headers: { authorization: 'Bearer ' + this.apiKeySecret }
        };

        const url = new URL(`https://api.broadpeak.io/v1/categories?offset=${offset}&limit=${limit}`);
        const response = await fetch(url.href, options);
        if (response.ok) {
            const body: TAllCategories = await response.json() as TAllCategories;
            return body;
        }
        throw new Error(response.statusText);
    }
}

/** @hidden */
export function factory(apiKeySecret: string) {

    return {
        Parent: new Parent(apiKeySecret),
        Categories: new Categories(apiKeySecret)
    }
}