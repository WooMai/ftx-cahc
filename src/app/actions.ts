"use server";

import axios from "axios";
import { ISearchRequest } from "./models/Search.model";

export async function searchWithConditions(prevState, formData: FormData) {
    const numConditions = parseInt(formData.get("num-conditions") as string);
    const conditions = [];
    let page: number, page_size: number;

    for (let i = 0; i < numConditions; i++) {
        const condition: { name: string; min_balance?: number; max_balance?: number; } = {
            name: formData.get(`conditions-${i}-name`) as string,
        };
        const minBalance = formData.get(`conditions-${i}-min_balance`) as string;
        const maxBalance = formData.get(`conditions-${i}-max_balance`) as string;

        if (minBalance) {
            condition.min_balance = parseFloat(minBalance);
        }
        if (maxBalance) {
            condition.max_balance = parseFloat(maxBalance);
        }

        conditions.push(condition);
    }

    page = parseInt(formData.get("pagenumber") as string);
    page_size = parseInt(formData.get("pagesize") as string);

    const searchRequest: ISearchRequest = {
        conditions,
        page,
        page_size,
    };

    // Optionally validate searchRequest here

    try {
        console.log('Requesting search with conditions', searchRequest);
        const response = await axios.post('https://fastapi-production-c0c6.up.railway.app/search', searchRequest);
        console.log("Submission successful", response.data);
        return response.data;
    } catch (error) {
        console.log(error)
        console.log("Submission error", error.response?.data || error.message);
        return error;
        // throw new Error("Error submitting search conditions");
    }
}
