"use strict";
exports.__esModule = true;
var react_1 = require("react");
var formik_1 = require("formik");
var client_1 = require("@apollo/client");
var ToastMessage_1 = require("./ToastMessage");
var mutations_1 = require("../graphql/mutations");
var router_1 = require("next/router");
function UploadProfileImages() {
    var _a = react_1.useState(null), imgs = _a[0], setImgs = _a[1];
    var _b = client_1.useMutation(mutations_1.UPLOAD_PICTURES, {
        onError: function (err) {
            console.log(err);
        }
    }), upload = _b[0], _c = _b[1], data = _c.data, loading = _c.loading, error = _c.error;
    var router = router_1.useRouter();
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        loading && react_1["default"].createElement("div", null, "Loading...."),
        (data === null || data === void 0 ? void 0 : data.uploadProfilePictures.ok) && (react_1["default"].createElement(ToastMessage_1["default"], { message: data.uploadProfilePictures.successMessage, "case": 'success' })),
        (data === null || data === void 0 ? void 0 : data.uploadProfilePictures.ok) && (react_1["default"].createElement(ToastMessage_1["default"], { message: data.uploadProfilePictures.successMessage, "case": 'error' })),
        react_1["default"].createElement(formik_1.Formik, { initialValues: {
                userName: "",
                email: "",
                password: "",
                verifyPassword: "",
                firstName: "",
                lastName: ""
            }, onSubmit: function (values, _a) {
                var setSubmitting = _a.setSubmitting;
                setSubmitting(false);
            } },
            react_1["default"].createElement(formik_1.Form, null,
                react_1["default"].createElement("input", { required: true, multiple: true, className: 'custom custom-file mb-2', type: 'file', name: 'productImage', onChange: function (e) {
                        setImgs(e.target.files);
                    } }),
                react_1["default"].createElement("button", { type: 'submit', onClick: function () {
                        upload({ variables: { file: imgs } });
                        router.push("/");
                    } }, "Upload")))));
}
exports["default"] = UploadProfileImages;
