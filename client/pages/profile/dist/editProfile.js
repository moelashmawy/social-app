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
var react_1 = require("react");
var AppBar_1 = require("@material-ui/core/AppBar");
var Tab_1 = require("@material-ui/core/Tab");
var TabContext_1 = require("@material-ui/lab/TabContext");
var TabList_1 = require("@material-ui/lab/TabList");
var TabPanel_1 = require("@material-ui/lab/TabPanel");
var core_1 = require("@material-ui/core");
var General_1 = require("../../components/edit-profile/General");
var head_1 = require("next/head");
var Contact_1 = require("../../components/edit-profile/Contact");
var AboutMe_1 = require("../../components/edit-profile/AboutMe");
var Languages_1 = require("../../components/edit-profile/Languages");
var useStyles = core_1.makeStyles(function (theme) { return ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    }
}); });
var editProfile = function (props) {
    var user = props.data.me.user;
    var classes = useStyles();
    var _a = react_1["default"].useState("General"), value = _a[0], setValue = _a[1];
    var handleChange = function (event, newValue) {
        setValue(newValue);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(head_1["default"], null,
            react_1["default"].createElement("title", null, "My Profile - Update"),
            react_1["default"].createElement("link", { rel: 'icon', href: '/favicon.ico' })),
        react_1["default"].createElement(core_1.Grid, { container: true },
            react_1["default"].createElement(core_1.Grid, { xs: 8, item: true, className: classes.root },
                react_1["default"].createElement("h1", null, "My Account"),
                react_1["default"].createElement(TabContext_1["default"], { value: value },
                    react_1["default"].createElement(AppBar_1["default"], { position: 'static' },
                        react_1["default"].createElement(TabList_1["default"], { onChange: handleChange, "aria-label": 'simple tabs example' },
                            react_1["default"].createElement(Tab_1["default"], { label: 'General', value: 'General' }),
                            react_1["default"].createElement(Tab_1["default"], { label: 'Contact Info', value: 'Contact Info' }),
                            react_1["default"].createElement(Tab_1["default"], { label: 'About Me', value: 'About Me' }),
                            react_1["default"].createElement(Tab_1["default"], { label: 'Languages', value: 'Languages' }),
                            react_1["default"].createElement(Tab_1["default"], { label: 'Settings', value: 'Settings' }))),
                    react_1["default"].createElement(TabPanel_1["default"], { value: 'General' },
                        react_1["default"].createElement(General_1["default"], { me: user })),
                    react_1["default"].createElement(TabPanel_1["default"], { value: 'Contact Info' },
                        react_1["default"].createElement(Contact_1["default"], { me: user })),
                    react_1["default"].createElement(TabPanel_1["default"], { value: 'About Me' },
                        react_1["default"].createElement(AboutMe_1["default"], { me: user })),
                    react_1["default"].createElement(TabPanel_1["default"], { value: 'Languages' },
                        react_1["default"].createElement(Languages_1["default"], { me: user })),
                    react_1["default"].createElement(TabPanel_1["default"], { value: 'Settings' }, "Settings"))),
            react_1["default"].createElement(core_1.Grid, { item: true, xs: 4 }, "Right Side"))));
};
// redirect to home page if there is not user
exports.getServerSideProps = function (_a) {
    var req = _a.req, res = _a.res;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            if (!req.headers.cookie) {
                res.writeHead(302, {
                    // or 301
                    Location: "/"
                });
                res.end();
            }
            return [2 /*return*/, { props: {} }];
        });
    });
};
exports["default"] = editProfile;
