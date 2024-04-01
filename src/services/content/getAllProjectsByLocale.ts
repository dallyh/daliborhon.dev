import { caisyClient } from "../graphql/caisyClient";
import { type IGenBlogArticleMetaFragment, type IGenProjectMetaFragment } from "../graphql/__generated/sdk";

export interface GetAllProjectsByLocale {
    locale: string;
    after?: string;
    arr?: IGenProjectMetaFragment[];
}

export const getAllProjectsByLocale = async ({ locale, after, arr = [] }: GetAllProjectsByLocale): Promise<IGenProjectMetaFragment[]> => {
    const { allProject } = await caisyClient.allProjectsByLocale({ locale, after });

    allProject?.edges?.forEach((edge) => {
        edge?.node && arr.push(edge.node);
    });

    if (allProject?.pageInfo?.hasNextPage) {
        return await getAllProjectsByLocale({
            locale: locale,
            after: allProject?.pageInfo?.endCursor ?? undefined,
            arr,
        });
    }

    return arr as IGenProjectMetaFragment[];
};
