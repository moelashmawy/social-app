"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.useApollo = exports.initializeApollo = void 0;
var react_1 = require("react");
var client_1 = require("@apollo/client");
var context_1 = require("@apollo/client/link/context");
var js_cookie_1 = require("js-cookie");
var isomorphic_unfetch_1 = require("isomorphic-unfetch");
var apollo_upload_client_1 = require("apollo-upload-client");
var apolloClient;
var token;
var isBrowser = typeof window !== "undefined";
var httpLink = apollo_upload_client_1.createUploadLink({
    uri: "http://localhost:5000/graphql",
    credentials: "include",
    fetch: isomorphic_unfetch_1["default"]
});
// will user `setContext` to send the token with every request
var authLink = context_1.setContext(function (_, _a) {
    var headers = _a.headers;
    // get the authentication token from protected route context
    if (typeof window !== "undefined") {
        token = js_cookie_1["default"].get("token");
    }
    if (headers) {
        token = headers.token;
    }
    // return the headers to the context so httpLink can read them
    return {
        headers: __assign(__assign({}, headers), { token: token ? token : "" })
    };
});
// create an apollo client
function createApolloClient() {
    return new client_1.ApolloClient({
        ssrMode: !isBrowser,
        link: authLink.concat(httpLink),
        cache: new client_1.InMemoryCache()
    });
}
function initializeApollo(initialState) {
    if (initialState === void 0) { initialState = null; }
    var _apolloClient = apolloClient !== null && apolloClient !== void 0 ? apolloClient : createApolloClient();
    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // get hydrated here
    if (initialState) {
        _apolloClient.cache.restore(initialState);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined")
        return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient)
        apolloClient = _apolloClient;
    return _apolloClient;
}
exports.initializeApollo = initializeApollo;
function useApollo(initialState) {
    var store = react_1.useMemo(function () { return initializeApollo(initialState); }, [initialState]);
    return store;
}
exports.useApollo = useApollo;
