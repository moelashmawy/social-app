"use strict";
exports.__esModule = true;
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var link_1 = require("next/link");
var client_1 = require("@apollo/client");
var mutations_1 = require("../../graphql/mutations");
var ToastMessage_1 = require("../ToastMessage");
var FriendsRequests = function (_a) {
    var requests = _a.requests;
    var _b = client_1.useMutation(mutations_1.ACCEPT_FRIEND_MUTATION), accept_friend = _b[0], _c = _b[1], data = _c.data, loading = _c.loading;
    if (data) {
        console.log(data);
    }
    return (react_1["default"].createElement(core_1.Grid, { container: true },
        (data === null || data === void 0 ? void 0 : data.acceptFriend.ok) && (react_1["default"].createElement(ToastMessage_1["default"], { message: data.acceptFriend.successMessage, "case": 'success' })),
        (requests === null || requests === void 0 ? void 0 : requests.length) < 1 && react_1["default"].createElement("div", null, "No requests yet"),
        (requests === null || requests === void 0 ? void 0 : requests.length) > 0 &&
            requests.map(function (requestt) { return (react_1["default"].createElement(core_1.Grid, { container: true },
                react_1["default"].createElement(core_1.Grid, { item: true, xs: 2 },
                    react_1["default"].createElement(core_1.Avatar, { src: requestt.avatarUrl })),
                react_1["default"].createElement(core_1.Grid, { item: true, xs: 5 },
                    react_1["default"].createElement(link_1["default"], { href: "/users/[userName]", as: "/users/" + requestt.userName },
                        react_1["default"].createElement("a", null, requestt.firstName + " " + requestt.lastName))),
                react_1["default"].createElement(core_1.Grid, { item: true, xs: 5 },
                    react_1["default"].createElement(core_1.Button, { onClick: function () {
                            accept_friend({ variables: { id: requestt.id } });
                        } }, "Confirm")))); })));
};
exports["default"] = FriendsRequests;
