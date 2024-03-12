export { };

declare global {
    interface CustomJwtSessionClaims {
        externalId: string;
    }
}