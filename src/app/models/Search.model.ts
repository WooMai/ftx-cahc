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
    data: typeof ClaimSchema[];
}