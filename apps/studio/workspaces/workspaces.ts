interface ISanityWorkspace {
    name: string;
    title: string;
    projectId: string;
    getProdDataset: () => string;
    getDevDataset: () => string;
}

export const CURRENT_API_VERSION = "2021-10-21";

export const defaultWorkspace: ISanityWorkspace = {
    name: "default",
    title: "daliborhon.dev",
    projectId: "33c1m11m",
    getProdDataset: () => {
        return "production";
    },
    getDevDataset: () => {
        return "development";
    },
};
