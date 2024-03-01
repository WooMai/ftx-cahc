
// import { claims } from "@/server/db/schema";
import axios, { AxiosResponse } from "axios";
import { ISearchRequest, ISearchResponse } from "@/app/models/Search.model";

export const getSome = async function () {
    return await axios.post(`https://fastapi-production-c0c6.up.railway.app/batch-claims`, {
        customer_codes: ["00151365", "00151470", "00152020"],
    })
        .then((res) => res.data)
}

export const searchWithConditions: any = async function (queryData: ISearchRequest) {
    return await axios.post(`https://fastapi-production-c0c6.up.railway.app/search`, queryData)
}
// perhaps some error handling
// if (!statsRes.ok) {
//     throw new TRPCError(...);
// }

// shold prob validate the shape with Zod
// const validated = pokemonValidator.parse(pokeRes.json());
// return validated;