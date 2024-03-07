import { caisyClient } from "../graphql/caisyClient";
import { type IGenBlogArticleMetaFragment, type IGenTagMetaFragment } from "../graphql/__generated/sdk";

export interface GetAllTags {
    after?: string;
    arr?: IGenTagMetaFragment[];
}

export const getAllTags = async ({ after, arr = [] }: GetAllTags): Promise<IGenTagMetaFragment[]> => {
    const { allTags } = await caisyClient.allTags({after});

    allTags?.edges?.forEach((edge) => {
        edge?.node && arr.push(edge.node);
    });

    if (allTags?.pageInfo?.hasNextPage) {
        return await getAllTags({
            after: allTags?.pageInfo?.endCursor ?? undefined,
            arr,
        });
    }

    return arr as IGenTagMetaFragment[];
};
