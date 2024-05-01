import { type ISearchRequest } from "../models/Search.model";

export const defaultSearchPayload = {
    conditions: [{ name: "BTC", min_balance: 1000, max_balance: 10000 }],
    page: 1,
    page_size: 10,
} as ISearchRequest;