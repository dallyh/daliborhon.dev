import { sanityClient } from "sanity:client";
import { allProjectsQuery, type AllProjectsQueryResult } from "@daliborhon.dev/studio/groq";
import { defaultLocale } from "@daliborhon.dev/shared/frontend/i18n";

interface GetAllProjects {
    locale: string;
}

// TODO: Pagination
export const getAllProjects = async ({ locale = defaultLocale }: GetAllProjects): Promise<AllProjectsQueryResult> => {
    console.log(`Getting all projects...`);

    const result = await sanityClient.fetch<AllProjectsQueryResult>(allProjectsQuery, { language: locale });

    return result;
};
