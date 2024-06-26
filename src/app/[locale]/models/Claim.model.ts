import { z } from 'zod';

// Helper function to format numbers as USD currency strings
function formatUsdCurrency(value: number): string {
    return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

// Define a Zod schema for an Asset
const AssetSchema = z.object({
    name: z.string(),
    type: z.string(),
    balance: z.number(),
    usd_petition: z.union([z.string(), z.null()]).transform((usdValue) => {
        // If the value is null, return "Undetermined"
        if (usdValue === null) {
            return "Undetermined";
        }

        // Attempt to parse the number, removing the $ and commas
        const parsedValue = parseFloat(usdValue.replace(/[$,]/g, ''));
        if (!isNaN(parsedValue)) {
            // If it's a valid number, round it and format back to currency string
            return formatUsdCurrency(parsedValue);
        }

        // Return the original string if parsing fails or it's already "Undetermined"
        // This branch might be unnecessary given the updated requirements,
        // but is left here for completeness and future adjustments if needed.
        return usdValue;
    }),
    usd_latest: z.union([z.string(), z.null()]).transform((usdValue) => {
        // If the value is null, return "Undetermined"
        if (usdValue === null) {
            return "Undetermined";
        }

        // Attempt to parse the number, removing the $ and commas
        const parsedValue = parseFloat(usdValue.replace(/[$,]/g, ''));
        if (!isNaN(parsedValue)) {
            // If it's a valid number, round it and format back to currency string
            return formatUsdCurrency(parsedValue);
        }

        // Return the original string if parsing fails or it's already "Undetermined"
        // This branch might be unnecessary given the updated requirements,
        // but is left here for completeness and future adjustments if needed.
        return usdValue;
    }),
});

// Enum-like structure for contingentIndicator values
const ContingentIndicatorEnum = z.enum(["Contingent", "Unliquidated", "Disputed"]);

// Zod schema for Claim with constraints for contingentIndicator
export const ClaimSchema = z.object({
    customer_code: z.string(),
    contingent_indicator: z.array(ContingentIndicatorEnum).max(3), // Ensures max length of 3 and uniqueness
    token_fiat_nft_balance: z.array(AssetSchema),
    earn_indicator: z.boolean(),
    token_fiat_lend: z.array(AssetSchema),
    uuid: z.string(),
    total_petition_value: z.string(),
    total_latest_value: z.string(),
});

// TypeScript interface for Asset
export interface IAssetDeprecated {
    name: string;
    type: string;
    balance: number;
    usdPetition: string;
    usdLatest: string;
}

// TypeScript interface for Claim
export interface IClaimDeprecated {
    customerCode: string;
    contingentIndicator: Array<"Contingent" | "Unliquidated" | "Disputed">;
    assets: IAssetDeprecated[];
    earnIndicator: boolean;
    // assetsLend: IAssetDeprecated[] | null;
    uuid: string;
    totalPetitionValue: string;
    totalLatestValue: string;
}



// Claim class implementing the IClaimDeprecated { interface, with explicit assignment in constructor
export class Claim implements IClaimDeprecated {
    customerCode: string;
    contingentIndicator: Array<"Contingent" | "Unliquidated" | "Disputed"> = [];
    assets: IAssetDeprecated[];
    earnIndicator: boolean;
    uuid: string;
    totalPetitionValue: string;
    totalLatestValue: string;

    constructor(data: typeof ClaimSchema) {
        // Example usage (assuming dataFromApi is defined elsewhere, received in snake_case)
        // try {
        //     const claimInstance = new Claim(dataFromApi);
        //     console.log('Claim created successfully:', claimInstance);
        // } catch (error) {
        //     console.error('Error creating claim:', error);
        // }

        // We assume api returns good data
        // if it doesn't it will be caught in the instantiation 
        // we dont want to put try catch here
        // because we get a better stacktrace at call-site
        const validatedData = ClaimSchema.parse(data);
        // we use parse and not safeParse because we want to throw on error

        // Explicitly map and assign properties
        this.customerCode = validatedData.customer_code!;
        this.contingentIndicator = validatedData.contingent_indicator;
        this.assets = validatedData.token_fiat_nft_balance.map((item) => ({
            name: item.name,
            type: item.type,
            balance: item.balance,
            usdPetition: item.usd_petition,
            usdLatest: item.usd_latest
        }));
        this.earnIndicator = validatedData.earn_indicator!;

        this.uuid = validatedData.uuid!;
        this.totalPetitionValue = validatedData.total_petition_value!;
        this.totalLatestValue = validatedData.total_latest_value!;
    }

}

export class ClaimDrizzle implements IClaimDeprecated {
    customerCode: string;
    contingentIndicator: Array<"Contingent" | "Unliquidated" | "Disputed"> = [];
    assets: IAssetDeprecated[];
    earnIndicator: boolean;
    uuid: string;
    totalPetitionValue: string;
    totalLatestValue: string;

    constructor(data: unknown) { // its actually not IClaimsResponse but follows that shape
        const validatedData = ClaimsViewSchema.parse(data);
        // Explicitly map and assign properties
        this.customerCode = validatedData.customerCode!;
        this.contingentIndicator = validatedData.contingentIndicator;
        this.assets = validatedData.assets.map((item) => ({
            name: item.name,
            type: item.type,
            balance: item.balance,
            usdPetition: item.usd_petition_currency,
            usdLatest: item.usd_latest_currency
        }));
        this.earnIndicator = validatedData.earnIndicator!;
        this.uuid = validatedData.id!;
        this.totalPetitionValue = validatedData.totalPetitionValueCurrency;
        this.totalLatestValue = validatedData.totalLatestValueCurrency;
    }
}

export interface IClaimAssetsResponse {
    name: string;
    type: string;
    balance: number;
    usdPetitionCurrency: string;
    usdLatestCurrency: string;
}

export interface IClaimsResponse {
    id: string;
    customerCode: string;
    contingentIndicator: string[];
    earnIndicator: boolean;
    totalPetitionValueCurrency: string;
    totalLatestValueCurrency: string;
    assets: IClaimAssetsResponse[];
}

// Define a Zod schema for an Asset
export const ClaimAssetsViewSchema = z.object({
    name: z.string(),
    type: z.string(),
    balance: z.number(),
    usd_petition_currency: z.string(),
    usd_latest_currency: z.string(),
});

// Zod schema for Claim with constraints for contingentIndicator
export const ClaimsViewSchema = z.object({
    id: z.string(),
    customerCode: z.string(),
    contingentIndicator: z.array(ContingentIndicatorEnum).max(3), // Ensures max length of 3 and uniqueness
    assets: z.array(ClaimAssetsViewSchema),
    earnIndicator: z.boolean(),
    totalPetitionValueCurrency: z.string(),
    totalLatestValueCurrency: z.string(),
});

