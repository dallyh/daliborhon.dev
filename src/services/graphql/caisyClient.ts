import { GraphQLClient } from "graphql-request";
import { print } from "graphql";
import { getSdk as getSdkWithClient, type Requester } from "./__generated/sdk";
import { GraphQLDateTime } from "graphql-scalars";

const RFC_3339_REGEX = /^(\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60))(\.\d{1,})?(([Z])|([+|-]([01][0-9]|2[0-3]):[0-5][0-9]))$/;
const isDateTimeString = (value: string) => RFC_3339_REGEX.test(value);
const parse = (value: unknown): unknown => {
    if (value === null) {
        return value;
    }
    if (typeof value === "string") {
        if (isDateTimeString(value)) {
            return GraphQLDateTime.parseValue(value);
        }
    }
    if (typeof value === "object") {
        if (Array.isArray(value)) {
            return value.map(parse);
        }
        return Object.fromEntries(
            Object.entries(value).map(([k, v]) => {
                return [k, parse(v)];
            }),
        );
    }

    return value;
};

const stringify = (value: unknown): unknown => {
    if (value === null) {
        return value;
    }
    if (value instanceof Date) {
        return GraphQLDateTime.serialize(value);
    }
    if (typeof value === "object") {
        if (Array.isArray(value)) {
            return value.map(stringify);
        }
        return Object.fromEntries(
            Object.entries(value).map(([k, v]) => {
                return [k, stringify(v)];
            }),
        );
    }

    return value;
};

const gqlSerializer = {
    parse: <T = any>(jsonStr: string): T => {
        const jsonValue = JSON.parse(jsonStr);
        return parse(jsonValue) as T;
    },

    stringify: <T = unknown>(obj: T): string => {
        const objWithoutDate = stringify(obj);
        return JSON.stringify(objWithoutDate);
    },
};

const requester: Requester<any> = async (doc: any, vars: any) => {
    const CAISY_PROJECT_ID = import.meta.env.CAISY_PROJECT_ID;
    const CAISY_API_KEY = import.meta.env.CAISY_API_KEY;
    const NODE_ENV = import.meta.env.NODE_ENV;

    if (!CAISY_PROJECT_ID || CAISY_PROJECT_ID == "") {
        throw new Error("CAISY_PROJECT_ID is not defined - please add it to the env file");
    }
    if (!CAISY_API_KEY || CAISY_API_KEY == "") {
        throw new Error("CAISY_API_KEY is not defined - please add it to the env file");
    }

    const client = new GraphQLClient(`https://cloud.caisy.io/api/e/v4/${CAISY_PROJECT_ID}/graphql`, {
        headers: {
            "x-caisy-apikey": `${CAISY_API_KEY}`,
        },
        jsonSerializer: gqlSerializer,
    });

    try {
        const res = await client.rawRequest(print(doc), vars);
        return res?.data as any;
    } catch (err: any) {
        if (NODE_ENV == "development") {
            console.error("Error in GraphQL request:", "\n" + print(doc) + "\n", vars, "\n" + err.message);
        } else {
            console.error(err);
        }
    }
};

export const caisyClient = getSdkWithClient(requester);
