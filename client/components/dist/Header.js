"use strict";
exports.__esModule = true;
var react_1 = require("react");
var link_1 = require("next/link");
var AppBar_1 = require("@material-ui/core/AppBar");
var Toolbar_1 = require("@material-ui/core/Toolbar");
var IconButton_1 = require("@material-ui/core/IconButton");
var icons_1 = require("@material-ui/icons");
var client_1 = require("@apollo/client");
var mutations_1 = require("../graphql/mutations");
var router_1 = require("next/router");
function Header(props) {
    // check whether the user is logged in or not
    var me = props.me;
    var _a = client_1.useMutation(mutations_1.LOGOUT_MUTATION, {
        onError: function (error) {
            //console.log(error);
        }
    }), logout = _a[0], _b = _a[1], data = _b.data, loading = _b.loading, error = _b.error;
    // redirect to home page after logout
    if (data === null || data === void 0 ? void 0 : data.logout.ok) {
        router_1.useRouter().reload();
    }
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(AppBar_1["default"], { position: 'static' },
            react_1["default"].createElement(Toolbar_1["default"], null,
                react_1["default"].createElement(IconButton_1["default"], { edge: 'start', color: 'inherit', "aria-label": 'menu' },
                    react_1["default"].createElement(link_1["default"], { href: '/homePage' },
                        react_1["default"].createElement("a", null,
                            react_1["default"].createElement(icons_1.Home, null)))),
                !me.ok && (react_1["default"].createElement(link_1["default"], { href: '/login' },
                    react_1["default"].createElement("a", null, "LogIn"))),
                !me.ok && (react_1["default"].createElement(link_1["default"], { href: '/signup' },
                    react_1["default"].createElement("a", null, "SignUp"))),
                me.ok && react_1["default"].createElement("a", { onClick: function () { return logout(); } }, "Logout"),
                me.ok && (react_1["default"].createElement(link_1["default"], { href: '/users/[userName]', as: "/users/" + me.user.userName },
                    react_1["default"].createElement("a", null, "My Profile"))),
                me.ok && (react_1["default"].createElement(link_1["default"], { href: '/messages' },
                    react_1["default"].createElement("a", null, "Messages"))),
                me.ok && (react_1["default"].createElement(link_1["default"], { href: '/friends/[userName]', as: "/friends/" + me.user.userName },
                    react_1["default"].createElement("a", null, "Friends"))),
                me.ok && (react_1["default"].createElement(link_1["default"], { href: '/wall' },
                    react_1["default"].createElement("a", null, "Wall"))),
                me.ok && (react_1["default"].createElement(link_1["default"], { href: '/photos/[userName]', as: "/photos/" + me.user.userName },
                    react_1["default"].createElement("a", null, "Photos"))),
                me.ok && (react_1["default"].createElement(link_1["default"], { href: '/bookmarks' },
                    react_1["default"].createElement("a", null, "Bookmarks"))),
                me.ok && (react_1["default"].createElement(link_1["default"], { href: '/settings' },
                    react_1["default"].createElement("a", null, "Settings")))))));
}
exports["default"] = Header;
