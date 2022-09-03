import { environment } from "src/environments/environment";

export default {
    oidc: {
        clientId: '0oa6cl3zctm3eOFbE5d7',
        issuer: 'https://dev-27563964.okta.com/oauth2/default',
        redirectUri: environment.itmBaseUrl + '/login/callback',
        scopes: ['openid', 'profile', 'email']
    }
}
