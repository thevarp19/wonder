import { jwtDecode } from "jwt-decode";
import jwtService from ".";

interface DecodedJwt {
    exp: number;
    iat: number;
    jti: string;
    iss: string;
    aud: string;
    sub: string;
    typ: string;
    azp: string;
    session_state: string;
    acr: string;
    realm_access: {
        roles: string[];
    };
    resource_access: {
        wonder: {
            roles: string[];
        };
        account: {
            roles: string[];
        };
    };
    scope: string;
    sid: string;
    email_verified: boolean;
    user_id: string;
    name: string;
    preferred_username: string;
    given_name: string;
    family_name: string;
    email: string;
}

interface DecodedRefreshJwt {
    exp: number;
    iat: number;
    jti: string;
    iss: string;
    aud: string;
    sub: string;
    typ: string;
    azp: string;
    session_state: string;
    scope: string;
    sid: string;
}

const decode = () => {
    try {
        const token = jwtService.getAccessToken();
        const decodedJwt = jwtDecode<DecodedJwt>(token);
        return decodedJwt;
    } catch (error) {
        return null;
    }
};

const decodeRefresh = () => {
    try {
        const token = jwtService.getAccessToken();
        const decodedJwt = jwtDecode<DecodedRefreshJwt>(token);
        return decodedJwt;
    } catch (error) {
        return null;
    }
};

export const getRoles = () => {
    const decodedJwt = decode();
    if (!decodedJwt) {
        return null;
    }
    return decodedJwt.resource_access.wonder.roles;
};

export const getUserData = () => {
    const decodedJwt = decode();
    if (!decodedJwt) {
        return null;
    }

    return {
        email: decodedJwt.email,
        name: decodedJwt.name,
        userId: decodedJwt.user_id,
    };
};

export const isJwtExpired = () => {
    const decodedJwt = decodeRefresh();
    if (!decodedJwt) {
        return true;
    }
    const currentTime = Date.now() / 1000;
    return decodedJwt.exp < currentTime;
};
