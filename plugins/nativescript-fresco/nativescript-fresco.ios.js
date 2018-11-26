"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var commonModule = require("./nativescript-fresco-common");
var nativescript_fresco_common_1 = require("./nativescript-fresco-common");
var imageSrc = require("image-source");
var utils = require("utils/utils");
var FrescoDrawee = (function (_super) {
    __extends(FrescoDrawee, _super);
    function FrescoDrawee() {
        var _this = _super.call(this) || this;
        _this.nativeView = UIImageView.new();
        _this.nativeView.userInteractionEnabled = true;
        return _this;
    }
    Object.defineProperty(FrescoDrawee.prototype, "ios", {
        get: function () {
            return this.nativeView;
        },
        enumerable: true,
        configurable: true
    });
    FrescoDrawee.prototype.createNativeView = function () {
        if (this.nativeView) {
            return this.nativeView;
        }
        var nativeView = UIImageView.new();
        nativeView.userInteractionEnabled = true;
        return nativeView;
    };
    FrescoDrawee.prototype.initNativeView = function () {
        var self = this;
        setTimeout(function () {
            self.loadImageFromUri();
        }, 20);
    };
    FrescoDrawee.prototype.loadImageFromUri = function (src) {
        var imageUri = src ? src : this.imageUri;
        var that = new WeakRef(this);
        var self = this;
        if (!imageUri)
            return;
        if (imageUri.startsWith("http")) {
            var placeHolder = this.placeholderImage && utils.isFileOrResourcePath(this.placeholderImage) && imageSrc.fromFileOrResource(this.placeholderImage) ? imageSrc.fromFileOrResource(this.placeholderImage).ios : null;
            this.isLoading = true;
            if (this.showIndicator) {
                this.nativeView.sd_setShowActivityIndicatorView(true);
                this.nativeView.sd_setIndicatorStyle(UIActivityIndicatorViewStyleGray);
            }
            this.nativeView.sd_setImageWithURLPlaceholderImageCompleted(imageUri, placeHolder, function (value) {
                self.isLoading = false;
                if (that && that.get()) {
                    var args = {
                        eventName: value ? FrescoDrawee.finalImageSetEvent : FrescoDrawee.failureEvent,
                        object: that.get(),
                        image: value
                    };
                    that.get().notify(args);
                }
                if (!value) {
                    var failureImageSource = self.failureImage && utils.isFileOrResourcePath(self.failureImage) && imageSrc.fromFileOrResource(self.failureImage) ? imageSrc.fromFileOrResource(self.failureImage).ios : null;
                    if (failureImageSource) {
                        self.nativeView.image = failureImageSource;
                    }
                }
                setTimeout(function () {
                    self.checkAndSetCircleImage();
                    self.resizeImage();
                }, 20);
                self.requestLayout();
            });
        }
        else {
            if (utils.isFileOrResourcePath(imageUri) && imageSrc.fromFileOrResource(imageUri)) {
                this.nativeView.image = imageSrc.fromFileOrResource(imageUri).ios;
                setTimeout(function () {
                    self.checkAndSetCircleImage();
                    self.resizeImage();
                }, 20);
                this.requestLayout();
            }
        }
    };
    FrescoDrawee.prototype.checkAndSetCircleImage = function () {
        if (this.nativeView.frame.size.width && this.circle) {
            if (this.nativeView.frame.size.width != this.nativeView.frame.size.height) {
                if (this.nativeView.frame.size.width < this.nativeView.frame.size.height) {
                    this.nativeView.frame.size.height = this.nativeView.frame.size.width;
                }
                else {
                    this.nativeView.frame.size.width = this.nativeView.frame.size.height;
                }
            }
            this.nativeView.layer.cornerRadius = this.nativeView.frame.size.width / 2;
            this.nativeView.clipsToBounds = true;
        }
    };
    FrescoDrawee.prototype.resizeImage = function () {
        if (this.resize && this.resize !== undefined && this.resize.split(' ').length > 1 && !this.isLoading) {
            var rect = new CGRect();
            var point = new CGPoint();
            var size = new CGSize();
            var image = void 0;
            point.x = 0;
            point.y = 0;
            size.width = parseInt(this.resize.split(' ')[0]);
            size.height = parseInt(this.resize.split(' ')[1]);
            rect.origin = point;
            rect.size = size;
            UIGraphicsBeginImageContext(size);
            this.nativeView.image.drawInRect(rect);
            image = UIGraphicsGetImageFromCurrentImageContext();
            UIGraphicsEndImageContext();
            this.nativeView.image = image;
        }
    };
    FrescoDrawee.prototype[nativescript_fresco_common_1.showIndicatorProperty.setNative] = function (value) {
        this.showIndicator = !!value;
    };
    FrescoDrawee.prototype[nativescript_fresco_common_1.resizeProperty.setNative] = function (value) {
        this.resize = value;
        this.resizeImage();
    };
    FrescoDrawee.prototype[nativescript_fresco_common_1.stretchProperty.setNative] = function (value) {
        switch (value) {
            case "aspectFit":
                this.nativeView.contentMode = UIViewContentMode.ScaleAspectFit;
                break;
            case "aspectFill":
                this.nativeView.contentMode = UIViewContentMode.ScaleAspectFill;
                break;
            case "fill":
                this.nativeView.contentMode = UIViewContentMode.ScaleToFill;
                break;
            case "none":
            default:
                this.nativeView.contentMode = UIViewContentMode.TopLeft;
                break;
        }
    };
    FrescoDrawee.prototype[commonModule.FrescoDrawee.roundAsCircleProperty.setNative] = function (value) {
        this.circle = !!value;
        this.checkAndSetCircleImage();
    };
    FrescoDrawee.prototype[commonModule.FrescoDrawee.placeholderImageUriProperty.setNative] = function (value) {
        if (value && utils.isFileOrResourcePath(value) && imageSrc.fromFileOrResource(value)) {
            this.placeholderImage = value;
        }
    };
    FrescoDrawee.prototype[commonModule.FrescoDrawee.failureImageUriProperty.setNative] = function (value) {
        if (value && utils.isFileOrResourcePath(value) && imageSrc.fromFileOrResource(value)) {
            this.failureImage = value;
        }
    };
    FrescoDrawee.prototype[commonModule.FrescoDrawee.imageUriProperty.setNative] = function (value) {
        this.loadImageFromUri(value);
    };
    return FrescoDrawee;
}(commonModule.FrescoDrawee));
exports.FrescoDrawee = FrescoDrawee;
