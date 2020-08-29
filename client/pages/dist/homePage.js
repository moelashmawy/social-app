"use strict";
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
exports.getServerSideProps = void 0;
var head_1 = require("next/head");
var apollo_1 = require("../lib/apollo");
var UsersList_1 = require("../components/UsersList");
var queries_1 = require("../graphql/queries");
var core_1 = require("@material-ui/core");
var link_1 = require("next/link");
var useStyles = core_1.makeStyles(function (theme) {
    return core_1.createStyles({
        root: {
            flexGrow: 1
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: "center",
            color: theme.palette.text.secondary
        }
    });
});
function homePage(props) {
    var classes = useStyles();
    var users = props.users.users;
    // extract the logged in user
    var _a = props.data, me = _a.me, loading = _a.loading;
    var error = me.error, ok = me.ok, user = me.user;
    return (React.createElement(React.Fragment, null,
        React.createElement(head_1["default"], null,
            React.createElement("title", null, "Social App"),
            React.createElement("link", { rel: 'icon', href: '/favicon.ico' })),
        React.createElement("div", { className: "home-page-body " + classes.root },
            React.createElement(core_1.Grid, { container: true },
                React.createElement(core_1.Grid, { container: true, item: true, xs: 8, className: "" + classes.root },
                    React.createElement(core_1.Grid, { container: true },
                        React.createElement(core_1.Grid, { item: true, xs: 3 },
                            React.createElement(core_1.Avatar, { alt: 'my pic', src: user === null || user === void 0 ? void 0 : user.avatarUrl }),
                            React.createElement("div", null, user === null || user === void 0 ? void 0 : user.userName)),
                        React.createElement(core_1.Grid, { item: true, xs: 9 },
                            React.createElement("h3", null,
                                "Hi, ", user === null || user === void 0 ? void 0 :
                                user.firstName,
                                "! Get started making new friends!"),
                            React.createElement(core_1.Grid, { container: true, item: true, xs: 12, className: "" + classes.root, spacing: 1 },
                                React.createElement(core_1.Grid, { item: true }, "Edit profile"),
                                React.createElement(core_1.Grid, { item: true }, "Add photos"),
                                React.createElement(core_1.Grid, { item: true }, "Invite friends"),
                                React.createElement(core_1.Grid, { item: true }, "Search"),
                                React.createElement(core_1.Grid, { item: true }, "Forums")))),
                    React.createElement(core_1.Grid, { container: true },
                        React.createElement(core_1.Grid, { container: true, item: true, xs: 12, className: "" + classes.root }, users &&
                            users.map(function (user) { return (React.createElement(core_1.Grid, { item: true, key: user.id },
                                React.createElement(core_1.Avatar, { alt: 'my pic', src: user.avatarUrl }),
                                React.createElement(link_1["default"], { href: "/users/[userName]", as: "/users/" + user.userName },
                                    React.createElement("a", null, user.userName)),
                                React.createElement("div", null, user.userName),
                                React.createElement("div", null, user.email),
                                React.createElement("div", null, user.firstName),
                                React.createElement("div", null, user.lastName),
                                React.createElement("div", null, user.createdAt))); })))),
                React.createElement(core_1.Grid, { container: true, item: true, xs: 4 }, "Right Side")),
            React.createElement(UsersList_1["default"], { users: props.users }))));
}
function getServerSideProps(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var apolloClient, token, allUsers, users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apolloClient = apollo_1.initializeApollo();
                    token = ctx.req.headers.cookie ? ctx.req.headers.cookie : null;
                    return [4 /*yield*/, apolloClient.query({
                            query: queries_1.ALL_USERS_QUERY
                        })];
                case 1:
                    allUsers = _a.sent();
                    users = allUsers.data.users;
                    return [2 /*return*/, {
                            props: {
                                initialApolloState: apolloClient.cache.extract(),
                                users: JSON.parse(JSON.stringify(users))
                            }
                        }];
            }
        });
    });
}
exports.getServerSideProps = getServerSideProps;
exports["default"] = homePage;
