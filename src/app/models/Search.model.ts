import { z } from "zod";
import { type ClaimSchema } from "./Claim.model";

export const SearchCondition = z.object({
    name: z.string().min(1),
    min_balance: z.number().optional(),
    max_balance: z.number().optional(),
});

export interface ISearchCondition {
    name: string;
    min_balance?: number;
    max_balance?: number;
}

export const SearchRequest = z.object({
    conditions: z.array(SearchCondition),
    page: z.number().min(1),
    page_size: z.number().min(1),
});

export interface ISearchRequest {
    conditions: ISearchCondition[];
    page: number;
    page_size: number;
}

export interface ISearchResponse {
    claims: typeof ClaimSchema[],
    current_page: number,
    total_pages: number,
    total_records: number,
}


export interface IBatchSearchRequest {
    customer_codes: string[];
}

export interface IBatchSearchResponse {
    customer_count: number;
    invalid_count: number;
    not_found_count: number;
    total_sum: string;
    total_sum_latest: string;
    claims: typeof ClaimSchema[];
}
