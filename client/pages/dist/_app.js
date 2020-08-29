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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var client_1 = require("@apollo/client");
var apollo_1 = require("../lib/apollo");
var Layout_1 = require("../components/Layout");
var queries_1 = require("../graphql/queries");
require("./../styles/index.scss");
require("font-awesome/css/font-awesome.min.css");
require("react-awesome-slider/dist/custom-animations/cube-animation.css");
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var CssBaseline_1 = require("@material-ui/core/CssBaseline");
var theme_1 = require("../styles/theme");
function MyApp(props) {
    var Component = props.Component, pageProps = props.pageProps;
    var apolloClient = apollo_1.useApollo(pageProps === null || pageProps === void 0 ? void 0 : pageProps.initialApolloState);
    // will send me as a prop to each page in the Component props
    var me = props.meQuery;
    // part of nextjs - material Ui configuration
    react_1.useEffect(function () {
        // Remove the server-side injected CSS.
        var jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);
    return (React.createElement(client_1.ApolloProvider, { client: apolloClient },
        React.createElement(core_1.ThemeProvider, { theme: theme_1["default"] },
            React.createElement(CssBaseline_1["default"], null),
            React.createElement(Layout_1["default"], { me: me.data.me },
                React.createElement(Component, __assign({}, pageProps, me))))));
}
// we will get the current logged in user, send it to all Cpts
// after the user logs in, i save the token in a cookie
// the cookie is sent with every request on the server
// i have access to the cookie in `getInitialProps` cause it rund on the server
// we get the logged in user and send it as a prop to all the components
// all the components as a props so we deal with authentication
MyApp.getInitialProps = function (_a) {
    var Component = _a.Component, ctx = _a.ctx;
    return __awaiter(void 0, void 0, void 0, function () {
        var pageProps, apolloClient, token, meQuery;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    pageProps = {};
                    apolloClient = apollo_1.initializeApollo();
                    token = ((_b = ctx === null || ctx === void 0 ? void 0 : ctx.req) === null || _b === void 0 ? void 0 : _b.headers.cookie) ? ctx.req.headers.cookie : null;
                    return [4 /*yield*/, apolloClient.query({
                            query: queries_1.ME_QUERY,
                            // apollo can send headers with every request in `setContext` func provided by apollo team
                            // so here we have the token attached to every request, to know if the user has auth
                            context: { headers: { token: token } }
                        })];
                case 1:
                    meQuery = _c.sent();
                    if (!Component.getInitialProps) return [3 /*break*/, 3];
                    return [4 /*yield*/, Component.getInitialProps(ctx)];
                case 2:
                    pageProps = _c.sent();
                    _c.label = 3;
                case 3: return [2 /*return*/, {
                        pageProps: pageProps,
                        meQuery: meQuery
                    }];
            }
        });
    });
};
exports["default"] = MyApp;
