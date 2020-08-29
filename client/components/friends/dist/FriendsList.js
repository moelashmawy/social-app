"use strict";
exports.__esModule = true;
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var link_1 = require("next/link");
var FriendsList = function (_a) {
    var friends = _a.friends;
    return (react_1["default"].createElement(core_1.Grid, { container: true },
        (friends === null || friends === void 0 ? void 0 : friends.length) < 1 && react_1["default"].createElement("div", null, "Your friends list is empty, make some friends"),
        (friends === null || friends === void 0 ? void 0 : friends.length) > 0 &&
            friends.map(function (friend) { return (react_1["default"].createElement(core_1.Grid, { container: true },
                react_1["default"].createElement(core_1.Grid, { item: true, xs: 2 },
                    react_1["default"].createElement(core_1.Avatar, { src: friend.avatarUrl })),
                react_1["default"].createElement(core_1.Grid, { item: true, xs: 5 },
                    react_1["default"].createElement(link_1["default"], { href: "/users/[userName]", as: "/users/" + friend.userName },
                        react_1["default"].createElement("a", null, friend.firstName + " " + friend.lastName))),
                react_1["default"].createElement(core_1.Grid, { item: true, xs: 5 },
                    react_1["default"].createElement(core_1.Button, null, "Delete")))); })));
};
exports["default"] = FriendsList;
