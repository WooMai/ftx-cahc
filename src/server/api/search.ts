
// import { claims } from "@/server/db/schema";
import axios, { type AxiosResponse } from "axios";
import type { ISearchRequest } from "@/app/models/Search.model";

export const searchWithConditions = async function (queryData: ISearchRequest) {
    return await axios.post(`https://fastapi-production-c0c6.up.railway.app/search`, queryData)
}
// perhaps some error handling
// if (!statsRes.ok) {
//     throw new TRPCError(...);
// }

// shold prob validate the shape with Zod
// const validated = pokemonValidator.parse(pokeRes.json());
// return validated;