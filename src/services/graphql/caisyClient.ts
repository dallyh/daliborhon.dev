import { getSdk as getSdkWithClient, type Requester } from "./__generated/sdk";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { ApolloLink, HttpLink } from "@apollo/client/core/index";
import { withScalars } from "apollo-link-scalars";
import introspectionResult from "@services/graphql/__generated/graphql.schema.json";
import { buildClientSchema, type IntrospectionQuery } from "graphql";

const schema = buildClientSchema(introspectionResult as unknown as IntrospectionQuery);
const typesMap = {
    Date: {
        serialize: (parsed: unknown): string | null => (parsed instanceof Date ? parsed.toString() : null),
        parseValue: (raw: unknown): Date | null => {
            if (!raw) return null;
            try {
                return new Date(raw as string);
            } catch {
                throw new Error("invalid value to parse");
            }
        },
    },
    DateTime: {
        serialize: (parsed: unknown): string | null => (parsed instanceof Date ? parsed.toString() : null),
        parseValue: (raw: unknown): Date | null => {
            if (!raw) return null;
            try {
                return new Date(raw as string);
            } catch {
                throw new Error("invalid value to parse");
            }
        },
    },
};

const requester: Requester<any> = async (doc: any, vars: any) => {
    const CAISY_PROJECT_ID = import.meta.env.CAISY_PROJECT_ID;
    const CAISY_API_KEY = import.meta.env.CAISY_API_KEY;
    const SHOW_ALL_POSTS = import.meta.env.CAISY_SHOW_ALL_POSTS === "true" ? true : false;

    if (!CAISY_PROJECT_ID || CAISY_PROJECT_ID == "") {
        throw new Error("CAISY_PROJECT_ID is not defined - please add it to the env file");
    }
    if (!CAISY_API_KEY || CAISY_API_KEY == "") {
        throw new Error("CAISY_API_KEY is not defined - please add it to the env file");
    }

    const uri = `https://cloud.caisy.io/api/e/v4/${CAISY_PROJECT_ID}/graphql`;
    const link = ApolloLink.from([
        withScalars({ schema, typesMap }),
        new HttpLink({
            uri: uri,
            headers: {
                "x-caisy-apikey": `${CAISY_API_KEY}`,
                "x-caisy-preview": `${SHOW_ALL_POSTS}`,
            },
        }),
    ]);

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: link,
    });

    try {
        const res = await client.query({ query: doc, variables: vars });
        return res?.data as any;
    } catch (err: any) {
        if (import.meta.env.DEV) {
            console.error("Error in GraphQL request:", "\n" + doc + "\n", vars, "\n" + err.message);
        } else {
            console.error(err);
        }
    }
};

export const caisyClient = getSdkWithClient(requester);
