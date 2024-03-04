import { type ISearchRequest } from "../models/Search.model";

export const defaultSearchPayload = {
    conditions: [{ name: "USD", min_balance: 99999999 }],
    page: 1,
    page_size: 10,
} as ISearchRequest;