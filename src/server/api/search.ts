
// import { claims } from "@/server/db/schema";
import axios, { AxiosError, AxiosResponse } from "axios";
import type { IBatchSearchRequest, IBatchSearchResponse, ISearchRequest, ISearchResponse } from "@/app/[locale]/models/Search.model";

export const searchWithConditions: (queryData: ISearchRequest) => Promise<AxiosResponse<ISearchResponse, unknown>> = async function (queryData: ISearchRequest) {
    return await axios.post(`https://fastapi-production-c0c6.up.railway.app/search`, queryData);
}
export const batchSearch: (queryData: IBatchSearchRequest) => Promise<AxiosResponse<IBatchSearchResponse, unknown>> = async function (queryData: IBatchSearchRequest) {
    console.log(queryData)
    return await axios.post(`https://fastapi-production-c0c6.up.railway.app/batch-claims`, queryData);
}
// perhaps some error handling
// if (!statsRes.ok) {
//     throw new TRPCError(...);
// }

// shold prob validate the shape with Zod
// const validated = pokemonValidator.parse(pokeRes.json());
// return validated;