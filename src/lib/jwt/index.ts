import { myLocalStorage } from "../storage/browserStorage";

export type JwtProperties = "access" | "refresh";

export interface JwtType {
    access: string;
    refresh: string;
}
const setAccessToken = (accessToken: string) => {
    setJwtProperty("access", accessToken);
};

const setRefreshToken = (refreshToken: string) => {
    setJwtProperty("refresh", refreshToken);
};

const getAccessToken = () => {
    const accessToken = getJwt()?.access;
    return accessToken;
};

const getRefreshToken = () => {
    const refreshToken = getJwt()?.refresh;
    return refreshToken;
};

const saveJwt = (jwt: JwtType) => {
    myLocalStorage?.set("jwt", jwt);
};

const setJwtProperty = (propertyName: JwtProperties, propertyValue: string) => {
    myLocalStorage?.modify<JwtType>("jwt", (jwt) => {
        jwt[propertyName] = propertyValue;
        return jwt;
    });
};

const getJwt = () => {
    return myLocalStorage?.get("jwt") as JwtType;
};

const removeJwt = () => {
    myLocalStorage?.remove("jwt");
};

const jwtService = {
    setAccessToken,
    setRefreshToken,
    getAccessToken,
    getRefreshToken,
    saveJwt,
    removeJwt,
};

export default jwtService;
