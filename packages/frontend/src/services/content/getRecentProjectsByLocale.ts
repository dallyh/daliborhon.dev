import { caisyClient } from "../graphql/caisyClient";
import { type IGenProjectMetaFragment } from "../graphql/__generated/sdk";

export interface GetRecentProjectsByLocale {
    locale: string;
    first: number;
    arr?: IGenProjectMetaFragment[];
}

export const getRecentProjectsByLocale = async ({ locale, first, arr = [] }: GetRecentProjectsByLocale): Promise<IGenProjectMetaFragment[]> => {
    const { allProject } = await caisyClient.recentProjectsByLocale({ locale, first });

    allProject?.edges?.forEach((edge) => {
        edge?.node && arr.push(edge.node);
    });

    return arr as IGenProjectMetaFragment[];
};
