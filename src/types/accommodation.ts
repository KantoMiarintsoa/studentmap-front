export type Accommodation = {
    id: number
    name: string
    address: string
    area: number
    receptionCapacity: string,
    IsAvailable: boolean
    rentMin: number
    rentMax: number
    type: string,
    description: string
}

export type SearchParams = {
    name?: string;
    address?: string;
    type?: string;
    budget?: number;
}