export type University = {
    id: number;
    type: "public" | "prive",
    name: string,
    description: string,
    city: string,
    webSite: string,
    mention: string[],
    address: string
}
