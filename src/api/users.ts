import { Base } from "../base";
import fetch from "node-fetch";
import { CreateUserDto } from '../types';

interface TTenantObject {
    name: string;
    commercialPlan: string;
}

interface TUsersResponseObject {
    firstName: string;
    lastName: string;
    email: string;
    tenantId: number;
    tenant: TTenantObject;
}
type TAllTenantUsers = Array<TUsersResponseObject>

/**
 * @example
 * const User = await Users.Users.get(userId);
 * const User = await Users.Users.update(userId, {firstName: 'Jean', lastName: 'Bon', email: 'jean.bon@boucherie.com'});
 * const User = await Users.Users.delete(userId);
 */
export class Users extends Base<CreateUserDto, CreateUserDto> {
    constructor(apiKeySecret: string) {
        super('/v1', '/users', '', apiKeySecret);
    }

    async update(id: string, params: CreateUserDto): Promise<CreateUserDto> {

        const options = {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer ' + this.apiKeySecret
            },
            body: JSON.stringify(params)
        };

        const url = new URL(this.resourceUrl + '/' + id);
        const response = await fetch(url.href, options);
        if (response.ok) {
            const body: CreateUserDto = await response.json() as CreateUserDto;
            return body;
        }
        throw new Error(response.statusText);
    }

}

/**
 * @example
 * const users = await Users.Parent.getAllUsers(0, 10);
 */
export class Parent {
    private apiKeySecret: string;
    constructor(apiKeySecret: string) {
        this.apiKeySecret = apiKeySecret;
    }

    getAllUsers = async (offset = "0", limit = "1000") => {

        const options = {
            method: 'GET',
            headers: { authorization: 'Bearer ' + this.apiKeySecret }
        };

        const url = new URL(`https://api.broadpeak.io/v1/users?offset=${offset}&limit=${limit}`);
        const response = await fetch(url.href, options);
        if (response.ok) {
            const body: TAllTenantUsers = await response.json() as TAllTenantUsers;
            return body;
        }
        throw new Error(response.statusText);
    }
}

/** @hidden */
export function factory(apiKeySecret: string) {

    return {
        Parent: new Parent(apiKeySecret),
        Users: new Users(apiKeySecret)
    }
}