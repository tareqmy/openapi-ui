const {REACT_APP_BASE_URL} = process.env;

//auth
export const USER_LOGIN_URL = `${REACT_APP_BASE_URL}/auth/realms/spring-cloud-microservices-realm/protocol/openid-connect/token`;

// Token & Profile
export const ACCESS_TOKEN = 'market-place-token';
export const REFRESH_TOKEN = 'market-place-refresh-token';
export const SERVICE_DATA = 'service-data';
