import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// export const useClaimsStore = create((set) => ({
//     storedClaims: [] as { customerCode: string, totalPetitionValue: string }[],
//     selectClaim: (selectedClaim: { customerCode: string, totalPetitionValue: string }) => set((state) => ({ storedClaims: [...state.storedClaims, selectedClaim] })),
//     removeClaimWithCode: (customerCode: string) => set((state) => {
//         return state.storedClaims.filter((claim) => claim.customerCode !== customerCode)
//     }),
// }))

interface SelectedClaimsState {
    selectedClaims: { customerCode: string, totalPetitionValue: string }[];
    selectClaim: (selectedClaim: { customerCode: string, totalPetitionValue: string }) => void
    removeClaimWithCode: (customerCode: string) => void
}

export const useClaimsStore = create<SelectedClaimsState>()(
    devtools(
        (set) => ({
            selectedClaims: [],
            selectClaim: (selectedClaim) => set((state) => {
                // Check if the selectedClaim's customerCode already exists in the selectedClaims array
                const exists = state.selectedClaims.some(claim => claim.customerCode === selectedClaim.customerCode);

                // If it doesn't exist, add it to the array; otherwise, leave the array unchanged
                return {
                    selectedClaims: exists ? state.selectedClaims : [...state.selectedClaims, selectedClaim]
                };
            }),

            removeClaimWithCode: (customerCode) => set((state) => {
                return state.selectedClaims.filter((claim) => claim.customerCode !== customerCode)
            }),
        })
    )
)