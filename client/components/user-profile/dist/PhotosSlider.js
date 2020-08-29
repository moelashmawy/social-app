"use strict";
exports.__esModule = true;
var react_1 = require("react");
var material_auto_rotating_carousel_1 = require("material-auto-rotating-carousel");
var colors_1 = require("@material-ui/core/colors");
var PhotosSlider = function (_a) {
    var handleOpen = _a.handleOpen, setHandleOpen = _a.setHandleOpen, photos = _a.photos;
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(material_auto_rotating_carousel_1.AutoRotatingCarousel
        //label='Get started'
        , { 
            //label='Get started'
            open: handleOpen.open, onClose: function () { return setHandleOpen({ open: false }); }, onStart: function () { return setHandleOpen({ open: false }); }, autoplay: false, 
            // mobile={isMobile}
            style: { position: "absolute" } }, photos &&
            photos.map(function (photo) { return (react_1["default"].createElement(material_auto_rotating_carousel_1.Slide, { media: react_1["default"].createElement("img", { src: photo }), mediaBackgroundStyle: { backgroundColor: colors_1.red[400] }, style: { backgroundColor: colors_1.red[600] } })); }))));
};
exports["default"] = PhotosSlider;
