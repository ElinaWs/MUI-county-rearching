export interface ICountryShort {
    name: string,
    alpha3Code: string,
    independent: boolean
}

export interface ICountryFull {
name: string;
capital: string;
population: number;
flag: string;
borders?: string[]
}