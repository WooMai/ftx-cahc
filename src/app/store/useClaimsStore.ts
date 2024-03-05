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
            selectClaim: (selectedClaim) => set((state) => ({ selectedClaims: [...state.selectedClaims, selectedClaim] })),
            removeClaimWithCode: (customerCode) => set((state) => {
                return state.selectedClaims.filter((claim) => claim.customerCode !== customerCode)
            }),
        })
    )
)