/*!
 * Sirio WebKit v.7.0.0
 * Copyright 2022 INPS
 */
var SirioLib;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 738:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.alphabeth = exports.sirioPrefix = void 0;
exports.sirioPrefix = "sirio-";
exports.alphabeth = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    '-', '+', '@', '?', '^', '!', '(', ')', '&', '#', '%', '$', '|', '<', '>'
];


/***/ }),

/***/ 376:
/***/ (function(__unused_webpack_module, exports) {


var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SirioAccordion_instances, _SirioAccordion_id, _SirioAccordion_exclusive, _SirioAccordion_accordionElement, _SirioAccordion_triggerElement, _SirioAccordion_groupElementId, _SirioAccordion_groupElement, _SirioAccordion_show, _SirioAccordion_hide, _SirioAccordion_toggleHandler, _SirioAccordion_getAccordionId, _SirioAccordion_getGroupElementId, _SirioAccordion_setAccordionHeight;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SirioAccordion = void 0;
class SirioAccordion {
    constructor(id, trigger) {
        var _a;
        _SirioAccordion_instances.add(this);
        _SirioAccordion_id.set(this, void 0);
        _SirioAccordion_exclusive.set(this, void 0);
        _SirioAccordion_accordionElement.set(this, void 0);
        _SirioAccordion_triggerElement.set(this, void 0);
        _SirioAccordion_groupElementId.set(this, void 0);
        _SirioAccordion_groupElement.set(this, void 0);
        _SirioAccordion_toggleHandler.set(this, (event) => {
            event.preventDefault();
            this.toggle();
        });
        if (SirioAccordion.isAccordion(id)) {
            __classPrivateFieldSet(this, _SirioAccordion_id, id, "f");
            __classPrivateFieldSet(this, _SirioAccordion_accordionElement, document.getElementById(id), "f");
            trigger.addEventListener("click", __classPrivateFieldGet(this, _SirioAccordion_toggleHandler, "f"));
            __classPrivateFieldSet(this, _SirioAccordion_triggerElement, trigger, "f");
            if (__classPrivateFieldGet(this, _SirioAccordion_accordionElement, "f").hasAttribute("data-sirio-parent")) {
                __classPrivateFieldSet(this, _SirioAccordion_exclusive, true, "f");
                __classPrivateFieldSet(this, _SirioAccordion_groupElementId, (_a = __classPrivateFieldGet(this, _SirioAccordion_accordionElement, "f").getAttribute("data-sirio-parent")) === null || _a === void 0 ? void 0 : _a.substring(1), "f");
                __classPrivateFieldSet(this, _SirioAccordion_groupElement, document.getElementById(__classPrivateFieldGet(this, _SirioAccordion_groupElementId, "f")), "f");
            }
            else {
                __classPrivateFieldSet(this, _SirioAccordion_exclusive, false, "f");
                __classPrivateFieldSet(this, _SirioAccordion_groupElementId, null, "f");
                __classPrivateFieldSet(this, _SirioAccordion_groupElement, null, "f");
            }
        }
        else
            throw TypeError(`HTML element with id="'${id}'" is not a valid Sirio-Accordion.`);
    }
    static init() {
        let triggerElements = document.querySelectorAll(`[data-sirio-toggle="collapse"]`);
        triggerElements.forEach(function (trigger) {
            SirioAccordion.initComponent(trigger);
        });
    }
    static initComponent(trigger) {
        var _a, _b;
        let targetId;
        switch (trigger.tagName.toLowerCase()) {
            case "button":
                targetId = (_a = trigger.getAttribute("data-sirio-target")) === null || _a === void 0 ? void 0 : _a.substring(1); //substring per togliere il #
                break;
            case "a":
                targetId = (_b = trigger.getAttribute("href")) === null || _b === void 0 ? void 0 : _b.substring(1);
                break;
            default:
                break;
        }
        if (targetId != undefined) {
            let accordionObj = new SirioAccordion(targetId, trigger);
            if (accordionObj != undefined) {
                SirioAccordion.accordions.set(trigger, accordionObj);
            }
            if (__classPrivateFieldGet(accordionObj, _SirioAccordion_exclusive, "f")) {
                let groupElementId = __classPrivateFieldGet(accordionObj, _SirioAccordion_instances, "m", _SirioAccordion_getGroupElementId).call(accordionObj);
                if (!(groupElementId in SirioAccordion.accordionGroups))
                    SirioAccordion.accordionGroups[groupElementId] = [];
                SirioAccordion.accordionGroups[groupElementId].push(accordionObj);
            }
        }
    }
    static destroy(trigger) {
        let accordion = SirioAccordion.accordions.get(trigger);
        if (accordion) {
            accordion.removeEventListeners();
            if (__classPrivateFieldGet(accordion, _SirioAccordion_groupElementId, "f")) {
                let groupElementId = __classPrivateFieldGet(accordion, _SirioAccordion_instances, "m", _SirioAccordion_getGroupElementId).call(accordion);
                let group = SirioAccordion.accordionGroups[groupElementId];
                group.splice(group.indexOf(accordion), 1);
                SirioAccordion.accordionGroups[groupElementId] = group;
                if (SirioAccordion.accordionGroups[groupElementId].length == 0)
                    delete SirioAccordion.accordionGroups[groupElementId];
            }
            SirioAccordion.accordions.delete(trigger);
            accordion = null;
        }
    }
    static isAccordion(id) {
        const accordionElement = document.getElementById(id);
        if (accordionElement != null)
            return true;
        return false;
    }
    static getAccordionByElement(trigger) {
        return SirioAccordion.accordions.get(trigger) || null;
    }
    toggle() {
        let hidden = this.isHidden();
        if (__classPrivateFieldGet(this, _SirioAccordion_accordionElement, "f")) {
            if (hidden) {
                if (__classPrivateFieldGet(this, _SirioAccordion_exclusive, "f")) {
                    let id = __classPrivateFieldGet(this, _SirioAccordion_id, "f");
                    let accordionGroup = SirioAccordion.accordionGroups[__classPrivateFieldGet(this, _SirioAccordion_groupElementId, "f")];
                    accordionGroup.forEach(function (accordionObj) {
                        if (accordionObj && __classPrivateFieldGet(accordionObj, _SirioAccordion_instances, "m", _SirioAccordion_getAccordionId).call(accordionObj) != id && !accordionObj.isHidden()) {
                            __classPrivateFieldGet(accordionObj, _SirioAccordion_instances, "m", _SirioAccordion_hide).call(accordionObj);
                        }
                    });
                }
                __classPrivateFieldGet(this, _SirioAccordion_instances, "m", _SirioAccordion_show).call(this);
            }
            else {
                __classPrivateFieldGet(this, _SirioAccordion_instances, "m", _SirioAccordion_hide).call(this);
            }
        }
    }
    isHidden() {
        const accordionElement = document.getElementById(__classPrivateFieldGet(this, _SirioAccordion_id, "f"));
        if (accordionElement != null) {
            if (accordionElement.getAttribute("data-sirio-visible") == "false")
                return true;
            else
                return false;
        }
        else {
            return null;
        }
    }
    isExclusive() {
        return __classPrivateFieldGet(this, _SirioAccordion_exclusive, "f");
    }
    getTriggerElement() {
        return __classPrivateFieldGet(this, _SirioAccordion_triggerElement, "f");
    }
    getAccordionElement() {
        return __classPrivateFieldGet(this, _SirioAccordion_accordionElement, "f");
    }
    getGroupElement() {
        return __classPrivateFieldGet(this, _SirioAccordion_groupElement, "f");
    }
    removeEventListeners() {
        __classPrivateFieldGet(this, _SirioAccordion_triggerElement, "f").removeEventListener("click", __classPrivateFieldGet(this, _SirioAccordion_toggleHandler, "f"));
    }
}
exports.SirioAccordion = SirioAccordion;
_SirioAccordion_id = new WeakMap(), _SirioAccordion_exclusive = new WeakMap(), _SirioAccordion_accordionElement = new WeakMap(), _SirioAccordion_triggerElement = new WeakMap(), _SirioAccordion_groupElementId = new WeakMap(), _SirioAccordion_groupElement = new WeakMap(), _SirioAccordion_toggleHandler = new WeakMap(), _SirioAccordion_instances = new WeakSet(), _SirioAccordion_show = function _SirioAccordion_show() {
    if (__classPrivateFieldGet(this, _SirioAccordion_accordionElement, "f") != null) {
        let accordionElement = __classPrivateFieldGet(this, _SirioAccordion_accordionElement, "f");
        let scrollHeight = __classPrivateFieldGet(this, _SirioAccordion_instances, "m", _SirioAccordion_setAccordionHeight).call(this);
        accordionElement.setAttribute("data-sirio-visible", "collapsing");
        let accordions = SirioAccordion.accordions;
        accordions.forEach((accordionObj) => {
            var _a;
            if (__classPrivateFieldGet(accordionObj, _SirioAccordion_instances, "m", _SirioAccordion_getAccordionId).call(accordionObj) === __classPrivateFieldGet(this, _SirioAccordion_id, "f")) {
                (_a = accordionObj.getTriggerElement()) === null || _a === void 0 ? void 0 : _a.setAttribute("aria-expanded", "true");
            }
        });
        __classPrivateFieldGet(this, _SirioAccordion_triggerElement, "f").setAttribute("aria-expanded", "true");
        setTimeout(() => {
            accordionElement.style.height = scrollHeight;
        }, 50);
        setTimeout(() => {
            accordionElement.setAttribute("data-sirio-visible", "true");
            accordionElement.style.height = "";
            if (accordionElement.style.length == 0)
                accordionElement.removeAttribute("style");
        }, 400);
    }
}, _SirioAccordion_hide = function _SirioAccordion_hide() {
    if (__classPrivateFieldGet(this, _SirioAccordion_accordionElement, "f") != null) {
        let accordionElement = __classPrivateFieldGet(this, _SirioAccordion_accordionElement, "f");
        let scrollHeight = __classPrivateFieldGet(this, _SirioAccordion_instances, "m", _SirioAccordion_setAccordionHeight).call(this);
        accordionElement.style.height = scrollHeight;
        accordionElement.setAttribute("data-sirio-visible", "collapsing");
        __classPrivateFieldGet(this, _SirioAccordion_triggerElement, "f").setAttribute("aria-expanded", "false");
        let accordions = SirioAccordion.accordions;
        accordions.forEach((accordionObj) => {
            var _a;
            if (__classPrivateFieldGet(accordionObj, _SirioAccordion_instances, "m", _SirioAccordion_getAccordionId).call(accordionObj) === __classPrivateFieldGet(this, _SirioAccordion_id, "f")) {
                (_a = accordionObj.getTriggerElement()) === null || _a === void 0 ? void 0 : _a.setAttribute("aria-expanded", "false");
            }
        });
        setTimeout(() => {
            accordionElement.style.height = "0px";
        }, 50);
        setTimeout(() => {
            accordionElement.setAttribute("data-sirio-visible", "false");
            accordionElement.style.height = "";
            if (accordionElement.style.length == 0)
                accordionElement.removeAttribute("style");
        }, 400);
    }
}, _SirioAccordion_getAccordionId = function _SirioAccordion_getAccordionId() {
    return __classPrivateFieldGet(this, _SirioAccordion_id, "f");
}, _SirioAccordion_getGroupElementId = function _SirioAccordion_getGroupElementId() {
    return __classPrivateFieldGet(this, _SirioAccordion_groupElementId, "f");
}, _SirioAccordion_setAccordionHeight = function _SirioAccordion_setAccordionHeight() {
    var _a, _b, _c, _d;
    let scrollHeight = String((_a = __classPrivateFieldGet(this, _SirioAccordion_accordionElement, "f")) === null || _a === void 0 ? void 0 : _a.scrollHeight) + "px";
    if (__classPrivateFieldGet(this, _SirioAccordion_triggerElement, "f").getAttribute("aria-expanded") == "false") {
        (_b = __classPrivateFieldGet(this, _SirioAccordion_accordionElement, "f")) === null || _b === void 0 ? void 0 : _b.setAttribute("data-sirio-visible", "true");
        scrollHeight = String((_c = __classPrivateFieldGet(this, _SirioAccordion_accordionElement, "f")) === null || _c === void 0 ? void 0 : _c.scrollHeight) + "px";
        (_d = __classPrivateFieldGet(this, _SirioAccordion_accordionElement, "f")) === null || _d === void 0 ? void 0 : _d.setAttribute("data-sirio-visible", "false");
    }
    return scrollHeight;
};
SirioAccordion.accordionGroups = {};
SirioAccordion.accordions = new Map();


/***/ }),

/***/ 832:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SirioAlert_instances, _SirioAlert_alertEl, _SirioAlert_dismissEl, _SirioAlert_closed, _SirioAlert_alertType, _SirioAlert_onClose, _SirioAlert_onClosed, _SirioAlert_checkType;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SirioAlert = void 0;
class SirioAlert {
    constructor(alertEl, onClose, onClosed) {
        _SirioAlert_instances.add(this);
        _SirioAlert_alertEl.set(this, void 0);
        _SirioAlert_dismissEl.set(this, void 0);
        _SirioAlert_closed.set(this, void 0);
        _SirioAlert_alertType.set(this, void 0);
        _SirioAlert_onClose.set(this, void 0);
        _SirioAlert_onClosed.set(this, void 0);
        if (SirioAlert.isAlert(alertEl)) {
            __classPrivateFieldSet(this, _SirioAlert_alertEl, alertEl, "f");
            __classPrivateFieldSet(this, _SirioAlert_onClose, onClose, "f");
            __classPrivateFieldSet(this, _SirioAlert_onClosed, onClosed, "f");
            __classPrivateFieldSet(this, _SirioAlert_dismissEl, alertEl.querySelector(`[data-sirio-dismiss="alert"]`), "f");
            __classPrivateFieldGet(this, _SirioAlert_dismissEl, "f").addEventListener("click", (event) => {
                event.preventDefault();
                this.close();
            });
            __classPrivateFieldSet(this, _SirioAlert_alertType, __classPrivateFieldGet(this, _SirioAlert_instances, "m", _SirioAlert_checkType).call(this), "f");
            __classPrivateFieldSet(this, _SirioAlert_closed, true, "f");
            this.open();
        }
        else
            throw TypeError(`HTML element" '${alertEl}'" is not a valid Sirio-Alert.`);
    }
    static isAlert(alertEl) {
        const validRoles = ["alert"];
        if (alertEl != null) {
            let role = alertEl.getAttribute("role");
            if (typeof role === "string") {
                if (validRoles.includes(role))
                    return true;
                else
                    return false;
            }
            else
                return false;
        }
        else
            return false;
    }
    getAlertEl() {
        return __classPrivateFieldGet(this, _SirioAlert_alertEl, "f");
    }
    getAlertType() {
        return __classPrivateFieldGet(this, _SirioAlert_alertType, "f");
    }
    isClosed() {
        return __classPrivateFieldGet(this, _SirioAlert_closed, "f");
    }
    setOnclose(onClose) {
        __classPrivateFieldSet(this, _SirioAlert_onClose, onClose, "f");
    }
    setOnclosed(onClosed) {
        __classPrivateFieldSet(this, _SirioAlert_onClosed, onClosed, "f");
    }
    open() {
        if (this.isClosed()) {
            __classPrivateFieldGet(this, _SirioAlert_alertEl, "f").setAttribute("data-sirio-visible", "true");
            __classPrivateFieldSet(this, _SirioAlert_closed, false, "f");
        }
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isClosed()) {
                if (__classPrivateFieldGet(this, _SirioAlert_onClose, "f") != undefined)
                    yield __classPrivateFieldGet(this, _SirioAlert_onClose, "f").call(this);
                __classPrivateFieldGet(this, _SirioAlert_alertEl, "f").setAttribute("data-sirio-visible", "false");
                __classPrivateFieldSet(this, _SirioAlert_closed, true, "f");
                if (__classPrivateFieldGet(this, _SirioAlert_onClosed, "f") != undefined)
                    __classPrivateFieldGet(this, _SirioAlert_onClosed, "f").call(this);
            }
        });
    }
    dispose() {
        __classPrivateFieldGet(this, _SirioAlert_alertEl, "f").remove();
    }
}
exports.SirioAlert = SirioAlert;
_SirioAlert_alertEl = new WeakMap(), _SirioAlert_dismissEl = new WeakMap(), _SirioAlert_closed = new WeakMap(), _SirioAlert_alertType = new WeakMap(), _SirioAlert_onClose = new WeakMap(), _SirioAlert_onClosed = new WeakMap(), _SirioAlert_instances = new WeakSet(), _SirioAlert_checkType = function _SirioAlert_checkType() {
    if (__classPrivateFieldGet(this, _SirioAlert_alertEl, "f").classList.contains("sirio-alert-danger"))
        return "danger";
    else if (__classPrivateFieldGet(this, _SirioAlert_alertEl, "f").classList.contains("sirio-alert-error"))
        return "error";
    else if (__classPrivateFieldGet(this, _SirioAlert_alertEl, "f").classList.contains("sirio-alert-info"))
        return "info";
    else if (__classPrivateFieldGet(this, _SirioAlert_alertEl, "f").classList.contains("sirio-alert-warning"))
        return "warning";
    else if (__classPrivateFieldGet(this, _SirioAlert_alertEl, "f").classList.contains("sirio-alert-success"))
        return "success";
    else
        return undefined;
};


/***/ }),

/***/ 991:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SirioBreadcrumb_instances, _SirioBreadcrumb_breadcrumbEl, _SirioBreadcrumb_breadcrumbComponentEl, _SirioBreadcrumb_breadcrumbItems, _SirioBreadcrumb_expandedBreadCrumbItems, _SirioBreadcrumb_truncated, _SirioBreadcrumb_isResizing, _SirioBreadcrumb_determineBreadcrumbVisibility, _SirioBreadcrumb_truncate, _SirioBreadcrumb_expand;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SirioBreadcrumb = void 0;
const Constants_1 = __webpack_require__(738);
class SirioBreadcrumb {
    constructor(breadcrumbEl, breadcrumbComponentEl) {
        _SirioBreadcrumb_instances.add(this);
        _SirioBreadcrumb_breadcrumbEl.set(this, void 0);
        _SirioBreadcrumb_breadcrumbComponentEl.set(this, void 0);
        _SirioBreadcrumb_breadcrumbItems.set(this, void 0);
        _SirioBreadcrumb_expandedBreadCrumbItems.set(this, void 0);
        _SirioBreadcrumb_truncated.set(this, void 0);
        _SirioBreadcrumb_isResizing.set(this, void 0);
        if (SirioBreadcrumb.isBreadcrumb(breadcrumbEl)) {
            __classPrivateFieldSet(this, _SirioBreadcrumb_breadcrumbComponentEl, breadcrumbComponentEl, "f");
            __classPrivateFieldSet(this, _SirioBreadcrumb_breadcrumbEl, breadcrumbEl, "f");
            __classPrivateFieldSet(this, _SirioBreadcrumb_isResizing, false, "f");
            __classPrivateFieldSet(this, _SirioBreadcrumb_truncated, false, "f");
            __classPrivateFieldSet(this, _SirioBreadcrumb_breadcrumbItems, Array.from(breadcrumbEl.children), "f");
            __classPrivateFieldSet(this, _SirioBreadcrumb_expandedBreadCrumbItems, [...__classPrivateFieldGet(this, _SirioBreadcrumb_breadcrumbItems, "f")], "f");
            if (breadcrumbEl.getAttribute("data-sirio-visible") == "truncate") {
                __classPrivateFieldGet(this, _SirioBreadcrumb_instances, "m", _SirioBreadcrumb_truncate).call(this);
            }
        }
        else
            throw TypeError(`HTML element" '${breadcrumbEl}'" is not a valid Sirio-Breadcrumb.`);
    }
    static init() {
        let breadcrumbComponentElements = Array.from(document.querySelectorAll(`[data-sirio-component="breadcrumb"]`));
        breadcrumbComponentElements.forEach(function (breadcrumbComponentEl) {
            SirioBreadcrumb.initComponent(breadcrumbComponentEl);
        });
    }
    static initComponent(breadcrumbComponentEl) {
        let breadcrumbEls = Array.from(breadcrumbComponentEl.getElementsByClassName(Constants_1.sirioPrefix + "breadcrumb"));
        breadcrumbEls.forEach(function (breadcrumbEl) {
            if (breadcrumbEl != null) {
                let breadcrumbObj = new SirioBreadcrumb(breadcrumbEl, breadcrumbComponentEl);
                window.addEventListener("load", function () {
                    __classPrivateFieldGet(breadcrumbObj, _SirioBreadcrumb_instances, "m", _SirioBreadcrumb_determineBreadcrumbVisibility).call(breadcrumbObj);
                });
                window.addEventListener("resize", function () {
                    if (!__classPrivateFieldGet(breadcrumbObj, _SirioBreadcrumb_isResizing, "f")) {
                        __classPrivateFieldSet(breadcrumbObj, _SirioBreadcrumb_isResizing, true, "f");
                        this.setTimeout(() => {
                            __classPrivateFieldGet(breadcrumbObj, _SirioBreadcrumb_instances, "m", _SirioBreadcrumb_expand).call(breadcrumbObj);
                            __classPrivateFieldGet(breadcrumbObj, _SirioBreadcrumb_instances, "m", _SirioBreadcrumb_determineBreadcrumbVisibility).call(breadcrumbObj);
                            __classPrivateFieldSet(breadcrumbObj, _SirioBreadcrumb_isResizing, false, "f");
                        }, 200);
                    }
                });
                SirioBreadcrumb.breadcrumbs.set(breadcrumbComponentEl, breadcrumbObj);
            }
        });
    }
    static destroy(breadcrumbComponentEl) {
        let breadcrumb = SirioBreadcrumb.breadcrumbs.get(breadcrumbComponentEl);
        if (breadcrumb) {
            breadcrumb.removeEventListeners();
            SirioBreadcrumb.breadcrumbs.delete(breadcrumbComponentEl);
            breadcrumb = null;
        }
    }
    static isBreadcrumb(breadcrumbEl) {
        const validRoles = ["list"];
        if (breadcrumbEl != null) {
            let role = breadcrumbEl.getAttribute("role");
            if (typeof role === "string") {
                if (validRoles.includes(role))
                    return true;
                else
                    return false;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    static getBreadcrumbByElement(breadcrumbEl) {
        return SirioBreadcrumb.breadcrumbs.get(breadcrumbEl) || undefined;
    }
    isTruncated() {
        return __classPrivateFieldGet(this, _SirioBreadcrumb_truncated, "f");
    }
    removeEventListeners() {
        let breadcrumbObj = this;
        window.removeEventListener("load", function () {
            __classPrivateFieldGet(breadcrumbObj, _SirioBreadcrumb_instances, "m", _SirioBreadcrumb_determineBreadcrumbVisibility).call(breadcrumbObj);
        });
        window.removeEventListener("resize", function () {
            if (!__classPrivateFieldGet(breadcrumbObj, _SirioBreadcrumb_isResizing, "f")) {
                __classPrivateFieldSet(breadcrumbObj, _SirioBreadcrumb_isResizing, true, "f");
                this.setTimeout(() => {
                    __classPrivateFieldGet(breadcrumbObj, _SirioBreadcrumb_instances, "m", _SirioBreadcrumb_expand).call(breadcrumbObj);
                    __classPrivateFieldGet(breadcrumbObj, _SirioBreadcrumb_instances, "m", _SirioBreadcrumb_determineBreadcrumbVisibility).call(breadcrumbObj);
                    __classPrivateFieldSet(breadcrumbObj, _SirioBreadcrumb_isResizing, false, "f");
                }, 200);
            }
        });
    }
}
exports.SirioBreadcrumb = SirioBreadcrumb;
_SirioBreadcrumb_breadcrumbEl = new WeakMap(), _SirioBreadcrumb_breadcrumbComponentEl = new WeakMap(), _SirioBreadcrumb_breadcrumbItems = new WeakMap(), _SirioBreadcrumb_expandedBreadCrumbItems = new WeakMap(), _SirioBreadcrumb_truncated = new WeakMap(), _SirioBreadcrumb_isResizing = new WeakMap(), _SirioBreadcrumb_instances = new WeakSet(), _SirioBreadcrumb_determineBreadcrumbVisibility = function _SirioBreadcrumb_determineBreadcrumbVisibility() {
    if (__classPrivateFieldGet(this, _SirioBreadcrumb_breadcrumbItems, "f").length >= 3) {
        let firstItemDistanceFromTop = __classPrivateFieldGet(this, _SirioBreadcrumb_breadcrumbItems, "f")[0].getBoundingClientRect().top;
        let lastItemDistanceFromTop = __classPrivateFieldGet(this, _SirioBreadcrumb_breadcrumbItems, "f")[__classPrivateFieldGet(this, _SirioBreadcrumb_breadcrumbItems, "f").length - 1].getBoundingClientRect().top;
        if (firstItemDistanceFromTop < lastItemDistanceFromTop) {
            __classPrivateFieldGet(this, _SirioBreadcrumb_instances, "m", _SirioBreadcrumb_truncate).call(this);
        }
    }
}, _SirioBreadcrumb_truncate = function _SirioBreadcrumb_truncate() {
    if (!this.isTruncated()) {
        __classPrivateFieldGet(this, _SirioBreadcrumb_breadcrumbEl, "f").setAttribute("data-sirio-visible", "truncate");
        if (__classPrivateFieldGet(this, _SirioBreadcrumb_breadcrumbItems, "f").length >= 3) {
            let buttonItem = document.createElement("li");
            let buttonEl = document.createElement("button");
            buttonEl.title = "Apri il breadcrumb completo";
            buttonEl.setAttribute("aria-label", "Apri il breadcrumb completo");
            buttonEl.setAttribute("data-sirio-toggle", "breadcrumb");
            let spanEl = document.createElement("span");
            spanEl.setAttribute("aria-hidden", "true");
            buttonEl.appendChild(spanEl);
            buttonEl.textContent = "...";
            buttonEl.addEventListener("click", () => {
                __classPrivateFieldGet(this, _SirioBreadcrumb_instances, "m", _SirioBreadcrumb_expand).call(this);
            });
            buttonItem.appendChild(buttonEl);
            if (__classPrivateFieldGet(this, _SirioBreadcrumb_breadcrumbItems, "f")[1] != buttonItem) {
                __classPrivateFieldGet(this, _SirioBreadcrumb_breadcrumbItems, "f").splice(1, __classPrivateFieldGet(this, _SirioBreadcrumb_breadcrumbItems, "f").length - 2, buttonItem);
            }
            __classPrivateFieldGet(this, _SirioBreadcrumb_breadcrumbEl, "f").innerHTML = "";
            __classPrivateFieldGet(this, _SirioBreadcrumb_breadcrumbItems, "f").forEach((breadcrumbItem) => {
                __classPrivateFieldGet(this, _SirioBreadcrumb_breadcrumbEl, "f").appendChild(breadcrumbItem);
            });
            __classPrivateFieldSet(this, _SirioBreadcrumb_truncated, true, "f");
        }
    }
}, _SirioBreadcrumb_expand = function _SirioBreadcrumb_expand() {
    if (this.isTruncated()) {
        __classPrivateFieldGet(this, _SirioBreadcrumb_breadcrumbEl, "f").innerHTML = "";
        __classPrivateFieldGet(this, _SirioBreadcrumb_expandedBreadCrumbItems, "f").forEach((breadcrumbItem) => {
            __classPrivateFieldGet(this, _SirioBreadcrumb_breadcrumbEl, "f").appendChild(breadcrumbItem);
        });
        __classPrivateFieldGet(this, _SirioBreadcrumb_breadcrumbEl, "f").setAttribute("data-sirio-visible", "visible");
        __classPrivateFieldSet(this, _SirioBreadcrumb_truncated, false, "f");
    }
};
SirioBreadcrumb.breadcrumbs = new Map();


/***/ }),

/***/ 157:
/***/ (function(__unused_webpack_module, exports) {


var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SirioChip_chipElement, _SirioChip_onDismiss;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SirioChip = void 0;
class SirioChip {
    constructor(chip, label, dismissElement, onDismiss) {
        _SirioChip_chipElement.set(this, void 0);
        _SirioChip_onDismiss.set(this, void 0);
        __classPrivateFieldSet(this, _SirioChip_chipElement, chip, "f");
        __classPrivateFieldSet(this, _SirioChip_onDismiss, onDismiss, "f");
        dismissElement.addEventListener("click", () => {
            this.dismiss();
        });
    }
    dismiss() {
        __classPrivateFieldGet(this, _SirioChip_onDismiss, "f").call(this);
        __classPrivateFieldGet(this, _SirioChip_chipElement, "f").remove();
    }
}
exports.SirioChip = SirioChip;
_SirioChip_chipElement = new WeakMap(), _SirioChip_onDismiss = new WeakMap();


/***/ }),

/***/ 291:
/***/ (function(__unused_webpack_module, exports) {


var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SirioDialog_instances, _SirioDialog_id, _SirioDialog_dialogElement, _SirioDialog_triggerElements, _SirioDialog_dismissElements, _SirioDialog_static, _SirioDialog_onShow, _SirioDialog_onShown, _SirioDialog_onHide, _SirioDialog_onHidden, _SirioDialog_triggerHandler, _SirioDialog_addTriggerElement, _SirioDialog_dismissHandler, _SirioDialog_addDismissElement, _SirioDialog_disableScrolling, _SirioDialog_enableScrolling, _SirioDialog_handleEscape, _SirioDialog_handleClick, _SirioDialog_handleTab, _SirioDialog_trapFocus, _SirioDialog_isHidden;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SirioDialog = void 0;
class SirioDialog {
    constructor(id, trigger, onShow, onHide, onShown, onHidden) {
        var _a, _b;
        _SirioDialog_instances.add(this);
        _SirioDialog_id.set(this, void 0);
        _SirioDialog_dialogElement.set(this, void 0);
        _SirioDialog_triggerElements.set(this, void 0);
        _SirioDialog_dismissElements.set(this, void 0);
        _SirioDialog_static.set(this, void 0);
        _SirioDialog_onShow.set(this, void 0);
        _SirioDialog_onShown.set(this, void 0);
        _SirioDialog_onHide.set(this, void 0);
        _SirioDialog_onHidden.set(this, void 0);
        _SirioDialog_triggerHandler.set(this, (event) => {
            event.preventDefault();
            this.show();
        });
        _SirioDialog_dismissHandler.set(this, (event) => {
            event.preventDefault();
            this.hide();
        });
        _SirioDialog_handleEscape.set(this, (event) => {
            let key = event.key.toLowerCase();
            if (key == "escape") {
                this.hide();
                event.preventDefault();
            }
        });
        _SirioDialog_handleClick.set(this, (event) => {
            let target = event.target || event.currentTarget;
            if (__classPrivateFieldGet(this, _SirioDialog_dialogElement, "f") == target) {
                this.hide();
                event.preventDefault();
            }
        });
        _SirioDialog_handleTab.set(this, (event, firstFocusableEl, lastFocusableEl) => {
            let key = event.key.toLowerCase();
            if (key == "tab") {
                if (event.shiftKey) {
                    if (document.activeElement === firstFocusableEl) {
                        lastFocusableEl.focus();
                        event.preventDefault();
                    }
                }
                else {
                    if (document.activeElement === lastFocusableEl) {
                        firstFocusableEl.focus();
                        event.preventDefault();
                    }
                }
            }
        });
        if (SirioDialog.isDialog(id)) {
            __classPrivateFieldSet(this, _SirioDialog_id, id, "f");
            __classPrivateFieldSet(this, _SirioDialog_dialogElement, document.getElementById(id), "f");
            __classPrivateFieldSet(this, _SirioDialog_triggerElements, [], "f");
            __classPrivateFieldSet(this, _SirioDialog_dismissElements, [], "f");
            __classPrivateFieldSet(this, _SirioDialog_onShow, onShow, "f");
            __classPrivateFieldSet(this, _SirioDialog_onShown, onShown, "f");
            __classPrivateFieldSet(this, _SirioDialog_onHidden, onHidden, "f");
            let staticString = (_a = __classPrivateFieldGet(this, _SirioDialog_dialogElement, "f")) === null || _a === void 0 ? void 0 : _a.getAttribute("data-sirio-backdrop");
            if (staticString == "static") {
                __classPrivateFieldSet(this, _SirioDialog_static, true, "f");
            }
            else {
                __classPrivateFieldSet(this, _SirioDialog_static, false, "f");
            }
            if (trigger)
                __classPrivateFieldGet(this, _SirioDialog_instances, "m", _SirioDialog_addTriggerElement).call(this, trigger);
            else
                __classPrivateFieldSet(this, _SirioDialog_triggerElements, [], "f");
            let dismissElements = Array.prototype.slice.call((_b = __classPrivateFieldGet(this, _SirioDialog_dialogElement, "f")) === null || _b === void 0 ? void 0 : _b.querySelectorAll(`[data-sirio-dismiss="dialog"]`));
            dismissElements = dismissElements.filter((node) => {
                var _a;
                let n = node;
                let id = (_a = n.closest(`[data-sirio-component=dialog]`)) === null || _a === void 0 ? void 0 : _a.id;
                return id === __classPrivateFieldGet(this, _SirioDialog_id, "f");
            });
            dismissElements === null || dismissElements === void 0 ? void 0 : dismissElements.forEach((trigger) => {
                __classPrivateFieldGet(this, _SirioDialog_instances, "m", _SirioDialog_addDismissElement).call(this, trigger);
            });
        }
        else
            throw TypeError(`HTML element with id="'${id}'" is not a valid Sirio-Dialog.`);
    }
    static init() {
        SirioDialog.dialogs = {};
        let triggerElements = document.querySelectorAll(`[data-sirio-toggle="dialog"]`);
        triggerElements.forEach(function (trigger) {
            SirioDialog.initComponent(trigger);
        });
    }
    static initComponent(trigger) {
        var _a, _b;
        var _c;
        let targetId = undefined;
        switch (trigger.tagName.toLowerCase()) {
            case "button":
                targetId = (_a = trigger.getAttribute("data-sirio-target")) === null || _a === void 0 ? void 0 : _a.substring(1); //substring per togliere il #
                break;
            case "a":
                targetId = (_b = trigger.getAttribute("href")) === null || _b === void 0 ? void 0 : _b.substring(1);
                break;
            default:
        }
        if (targetId != undefined) {
            let dialogObj;
            if (!(targetId in SirioDialog.dialogs))
                dialogObj = new SirioDialog(targetId, trigger);
            else {
                dialogObj = SirioDialog.dialogs[targetId];
                __classPrivateFieldGet((_c = dialogObj), _SirioDialog_instances, "m", _SirioDialog_addTriggerElement).call(_c, trigger);
            }
            if (dialogObj != undefined)
                SirioDialog.dialogs[targetId] = dialogObj;
        }
    }
    static destroy(id) {
        if (id in SirioDialog.dialogs) {
            let dialogObj = SirioDialog.dialogs[id];
            dialogObj.removeEventListeners();
            delete SirioDialog.dialogs[id];
            dialogObj = null;
        }
    }
    static isDialog(id) {
        const validRoles = ["dialog", "alertdialog"];
        const dialogElement = document.getElementById(id);
        if (dialogElement != null) {
            let role = dialogElement.getAttribute("role");
            if (typeof role === "string") {
                if (validRoles.includes(role))
                    return true;
                else
                    return false;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    static getDialogById(id) {
        return SirioDialog.dialogs[id];
    }
    getDialogElement() {
        return __classPrivateFieldGet(this, _SirioDialog_dialogElement, "f");
    }
    getTriggerElements() {
        return __classPrivateFieldGet(this, _SirioDialog_triggerElements, "f");
    }
    getDismissElements() {
        return __classPrivateFieldGet(this, _SirioDialog_dismissElements, "f");
    }
    setOnShow(callback) {
        __classPrivateFieldSet(this, _SirioDialog_onShow, callback, "f");
    }
    setOnShown(callback) {
        __classPrivateFieldSet(this, _SirioDialog_onShown, callback, "f");
    }
    setOnHide(callback) {
        __classPrivateFieldSet(this, _SirioDialog_onHide, callback, "f");
    }
    setOnHidden(callback) {
        __classPrivateFieldSet(this, _SirioDialog_onHidden, callback, "f");
    }
    show() {
        if (__classPrivateFieldGet(this, _SirioDialog_dialogElement, "f") != null) {
            if (__classPrivateFieldGet(this, _SirioDialog_onShow, "f") != undefined) {
                __classPrivateFieldGet(this, _SirioDialog_onShow, "f").call(this);
            }
            __classPrivateFieldGet(this, _SirioDialog_dialogElement, "f").setAttribute("data-sirio-visible", "true");
            __classPrivateFieldGet(this, _SirioDialog_dialogElement, "f").setAttribute("aria-modal", "true");
            __classPrivateFieldGet(this, _SirioDialog_dialogElement, "f").setAttribute("tabindex", "0");
            __classPrivateFieldGet(this, _SirioDialog_dialogElement, "f").focus();
            SirioDialog.nDialogsOpen++;
            __classPrivateFieldGet(this, _SirioDialog_instances, "m", _SirioDialog_disableScrolling).call(this);
            document.addEventListener("keyup", __classPrivateFieldGet(this, _SirioDialog_handleEscape, "f"));
            if (!__classPrivateFieldGet(this, _SirioDialog_static, "f")) {
                document.addEventListener("click", __classPrivateFieldGet(this, _SirioDialog_handleClick, "f"));
            }
            __classPrivateFieldGet(this, _SirioDialog_instances, "m", _SirioDialog_trapFocus).call(this, __classPrivateFieldGet(this, _SirioDialog_dialogElement, "f"));
            if (__classPrivateFieldGet(this, _SirioDialog_onShown, "f") != undefined) {
                __classPrivateFieldGet(this, _SirioDialog_onShown, "f").call(this);
            }
        }
    }
    hide() {
        if (__classPrivateFieldGet(this, _SirioDialog_dialogElement, "f") != null) {
            if (__classPrivateFieldGet(this, _SirioDialog_onHide, "f") != undefined) {
                __classPrivateFieldGet(this, _SirioDialog_onHide, "f").call(this);
            }
            __classPrivateFieldGet(this, _SirioDialog_dialogElement, "f").removeAttribute("aria-modal");
            __classPrivateFieldGet(this, _SirioDialog_dialogElement, "f").setAttribute("data-sirio-visible", "false");
            __classPrivateFieldGet(this, _SirioDialog_dialogElement, "f").setAttribute("tabindex", "-1");
            SirioDialog.nDialogsOpen--;
            if (SirioDialog.nDialogsOpen == 0)
                __classPrivateFieldGet(this, _SirioDialog_instances, "m", _SirioDialog_enableScrolling).call(this);
            if (__classPrivateFieldGet(this, _SirioDialog_onHidden, "f") != undefined) {
                __classPrivateFieldGet(this, _SirioDialog_onHidden, "f").call(this);
            }
        }
    }
    toggle() {
        let hidden = __classPrivateFieldGet(this, _SirioDialog_instances, "m", _SirioDialog_isHidden).call(this);
        if (hidden) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    removeEventListeners() {
        var _a, _b;
        (_a = this.getTriggerElements()) === null || _a === void 0 ? void 0 : _a.forEach((trigger) => {
            trigger.removeEventListener("click", __classPrivateFieldGet(this, _SirioDialog_triggerHandler, "f"));
        });
        (_b = this.getDismissElements()) === null || _b === void 0 ? void 0 : _b.forEach((dismiss) => {
            dismiss.removeEventListener("click", __classPrivateFieldGet(this, _SirioDialog_dismissHandler, "f"));
        });
        document.removeEventListener("keyup", __classPrivateFieldGet(this, _SirioDialog_handleEscape, "f"));
        if (!__classPrivateFieldGet(this, _SirioDialog_static, "f")) {
            document.removeEventListener("click", __classPrivateFieldGet(this, _SirioDialog_handleClick, "f"));
        }
        let firstFocusableEl = null;
        let lastFocusableEl = null;
        document.removeEventListener("keydown", (event) => {
            __classPrivateFieldGet(this, _SirioDialog_handleTab, "f").call(this, event, firstFocusableEl, lastFocusableEl);
        });
    }
}
exports.SirioDialog = SirioDialog;
_SirioDialog_id = new WeakMap(), _SirioDialog_dialogElement = new WeakMap(), _SirioDialog_triggerElements = new WeakMap(), _SirioDialog_dismissElements = new WeakMap(), _SirioDialog_static = new WeakMap(), _SirioDialog_onShow = new WeakMap(), _SirioDialog_onShown = new WeakMap(), _SirioDialog_onHide = new WeakMap(), _SirioDialog_onHidden = new WeakMap(), _SirioDialog_triggerHandler = new WeakMap(), _SirioDialog_dismissHandler = new WeakMap(), _SirioDialog_handleEscape = new WeakMap(), _SirioDialog_handleClick = new WeakMap(), _SirioDialog_handleTab = new WeakMap(), _SirioDialog_instances = new WeakSet(), _SirioDialog_addTriggerElement = function _SirioDialog_addTriggerElement(element) {
    if (!__classPrivateFieldGet(this, _SirioDialog_triggerElements, "f").includes(element)) {
        __classPrivateFieldGet(this, _SirioDialog_triggerElements, "f").push(element);
        element.addEventListener("click", __classPrivateFieldGet(this, _SirioDialog_triggerHandler, "f"));
    }
}, _SirioDialog_addDismissElement = function _SirioDialog_addDismissElement(element) {
    var _a;
    if (!__classPrivateFieldGet(this, _SirioDialog_dismissElements, "f").includes(element)) {
        (_a = __classPrivateFieldGet(this, _SirioDialog_dismissElements, "f")) === null || _a === void 0 ? void 0 : _a.push(element);
        element.addEventListener("click", __classPrivateFieldGet(this, _SirioDialog_dismissHandler, "f"));
    }
}, _SirioDialog_disableScrolling = function _SirioDialog_disableScrolling() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    document.documentElement.style.overflow = "hidden";
    window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
    };
}, _SirioDialog_enableScrolling = function _SirioDialog_enableScrolling() {
    window.onscroll = function () { };
    document.documentElement.style.overflow = "auto";
}, _SirioDialog_trapFocus = function _SirioDialog_trapFocus(element) {
    let focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
    let firstFocusableEl = focusableEls[0];
    let lastFocusableEl = focusableEls[focusableEls.length - 1];
    document.addEventListener("keydown", (event) => {
        __classPrivateFieldGet(this, _SirioDialog_handleTab, "f").call(this, event, firstFocusableEl, lastFocusableEl);
    });
}, _SirioDialog_isHidden = function _SirioDialog_isHidden() {
    if (__classPrivateFieldGet(this, _SirioDialog_dialogElement, "f") != null) {
        if (__classPrivateFieldGet(this, _SirioDialog_dialogElement, "f").getAttribute("data-sirio-visible") == "false")
            return true;
        else
            return false;
    }
    return null;
};
SirioDialog.nDialogsOpen = 0;


/***/ }),

/***/ 193:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SirioDropdownAutocomplete_instances, _SirioDropdownAutocomplete_triggerId, _SirioDropdownAutocomplete_trigger, _SirioDropdownAutocomplete_dropdown, _SirioDropdownAutocomplete_menu, _SirioDropdownAutocomplete_options, _SirioDropdownAutocomplete_filteredOptions, _SirioDropdownAutocomplete_currentlyFocused, _SirioDropdownAutocomplete_filterStart, _SirioDropdownAutocomplete_defaultVPos, _SirioDropdownAutocomplete_checkVPosTimeout, _SirioDropdownAutocomplete_onInput, _SirioDropdownAutocomplete_clickHandler, _SirioDropdownAutocomplete_inputHandler, _SirioDropdownAutocomplete_keydownHandler, _SirioDropdownAutocomplete_scrollHandler, _SirioDropdownAutocomplete_resizeHandler, _SirioDropdownAutocomplete_handleKeys, _SirioDropdownAutocomplete_setVisualFocus, _SirioDropdownAutocomplete_filter, _SirioDropdownAutocomplete_adjustPosition, _SirioDropdownAutocomplete_adjustVerticalPosition, _SirioDropdownAutocomplete_checkTopPosition, _SirioDropdownAutocomplete_checkBottomPosition;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SirioDropdownAutocomplete = void 0;
const Constants_1 = __webpack_require__(738);
const Utils_1 = __webpack_require__(675);
class SirioDropdownAutocomplete {
    constructor(id, autocomplete, onInput) {
        _SirioDropdownAutocomplete_instances.add(this);
        _SirioDropdownAutocomplete_triggerId.set(this, void 0);
        _SirioDropdownAutocomplete_trigger.set(this, void 0);
        _SirioDropdownAutocomplete_dropdown.set(this, void 0);
        _SirioDropdownAutocomplete_menu.set(this, void 0);
        _SirioDropdownAutocomplete_options.set(this, void 0);
        _SirioDropdownAutocomplete_filteredOptions.set(this, void 0);
        _SirioDropdownAutocomplete_currentlyFocused.set(this, void 0);
        _SirioDropdownAutocomplete_filterStart.set(this, void 0);
        _SirioDropdownAutocomplete_defaultVPos.set(this, void 0);
        _SirioDropdownAutocomplete_checkVPosTimeout.set(this, void 0);
        _SirioDropdownAutocomplete_onInput.set(this, void 0);
        _SirioDropdownAutocomplete_clickHandler.set(this, (event) => {
            if (__classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").value.length >= __classPrivateFieldGet(this, _SirioDropdownAutocomplete_filterStart, "f"))
                this.toggle();
        });
        _SirioDropdownAutocomplete_inputHandler.set(this, (event) => {
            let inputEvent = event;
            if (__classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").value.length >= __classPrivateFieldGet(this, _SirioDropdownAutocomplete_filterStart, "f")) {
                if (inputEvent.inputType == "insertText" || __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").value == "") {
                    __classPrivateFieldGet(this, _SirioDropdownAutocomplete_instances, "m", _SirioDropdownAutocomplete_filter).call(this, true);
                }
                else {
                    __classPrivateFieldGet(this, _SirioDropdownAutocomplete_instances, "m", _SirioDropdownAutocomplete_filter).call(this, false);
                }
                if (__classPrivateFieldGet(this, _SirioDropdownAutocomplete_onInput, "f"))
                    __classPrivateFieldGet(this, _SirioDropdownAutocomplete_onInput, "f").call(this, __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").value.substring(0, __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").selectionStart || 0));
            }
            else if (!this.isHidden())
                this.hide();
        });
        _SirioDropdownAutocomplete_keydownHandler.set(this, (event) => {
            __classPrivateFieldGet(this, _SirioDropdownAutocomplete_instances, "m", _SirioDropdownAutocomplete_handleKeys).call(this, event);
        });
        _SirioDropdownAutocomplete_scrollHandler.set(this, (event) => {
            __classPrivateFieldGet(this, _SirioDropdownAutocomplete_instances, "m", _SirioDropdownAutocomplete_adjustPosition).call(this);
        });
        _SirioDropdownAutocomplete_resizeHandler.set(this, (event) => {
            __classPrivateFieldGet(this, _SirioDropdownAutocomplete_instances, "m", _SirioDropdownAutocomplete_adjustPosition).call(this);
        });
        if (SirioDropdownAutocomplete.isDropdownAutocomplete(id)) {
            let dropdown = document.createElement("div");
            dropdown.setAttribute("data-sirio-component", "dropdown");
            dropdown.classList.add("sirio-dropdown");
            autocomplete.parentNode.replaceChild(dropdown, autocomplete);
            dropdown.appendChild(autocomplete);
            __classPrivateFieldSet(this, _SirioDropdownAutocomplete_dropdown, dropdown, "f");
            __classPrivateFieldSet(this, _SirioDropdownAutocomplete_triggerId, id, "f");
            let ariaControl = id + (0, Utils_1.makeid)(6) + "listbox";
            autocomplete.setAttribute("data-sirio-init", "false");
            autocomplete.setAttribute("role", "combobox");
            autocomplete.setAttribute("aria-autocomplete", "both");
            autocomplete.setAttribute("data-sirio-toggle", "dropdown");
            autocomplete.setAttribute("aria-expanded", "false");
            autocomplete.setAttribute("aria-controls", ariaControl);
            autocomplete.removeAttribute("aria-activedescendant");
            __classPrivateFieldSet(this, _SirioDropdownAutocomplete_trigger, autocomplete, "f");
            __classPrivateFieldSet(this, _SirioDropdownAutocomplete_onInput, onInput, "f");
            let menu = document.createElement("ul");
            menu.classList.add(Constants_1.sirioPrefix + "dropdown-menu");
            menu.setAttribute("role", "listbox");
            menu.setAttribute("aria-label", "Lista risultati trovati");
            menu.id = ariaControl;
            menu.tabIndex = -1;
            menu.setAttribute("data-sirio-visible", "false");
            __classPrivateFieldSet(this, _SirioDropdownAutocomplete_menu, menu, "f");
            dropdown.appendChild(menu);
            autocomplete.removeAttribute("data-sirio-init");
            __classPrivateFieldSet(this, _SirioDropdownAutocomplete_defaultVPos, "bottom", "f");
            __classPrivateFieldSet(this, _SirioDropdownAutocomplete_checkVPosTimeout, null, "f");
            __classPrivateFieldSet(this, _SirioDropdownAutocomplete_options, [], "f");
            __classPrivateFieldSet(this, _SirioDropdownAutocomplete_filteredOptions, __classPrivateFieldGet(this, _SirioDropdownAutocomplete_options, "f"), "f");
            __classPrivateFieldSet(this, _SirioDropdownAutocomplete_currentlyFocused, null, "f");
            __classPrivateFieldSet(this, _SirioDropdownAutocomplete_filterStart, 3, "f");
            __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").addEventListener("click", __classPrivateFieldGet(this, _SirioDropdownAutocomplete_clickHandler, "f"));
            __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").addEventListener("input", __classPrivateFieldGet(this, _SirioDropdownAutocomplete_inputHandler, "f"));
            document.addEventListener("keydown", __classPrivateFieldGet(this, _SirioDropdownAutocomplete_keydownHandler, "f"));
            window.addEventListener("scroll", __classPrivateFieldGet(this, _SirioDropdownAutocomplete_scrollHandler, "f"));
            window.addEventListener("resize", __classPrivateFieldGet(this, _SirioDropdownAutocomplete_resizeHandler, "f"));
            let data = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").getAttribute("data-sirio-list");
            if (data) {
                let options = JSON.parse(data);
                this.setOptionElements(options);
            }
        }
        else
            throw TypeError(`HTML element with id="'${id}'" is not a valid Sirio-Dropdown-Autocomplete.`);
    }
    static init() {
        SirioDropdownAutocomplete.autocompletes = {};
        let autocompleteElements = Array.from(document.querySelectorAll(`[data-sirio-component="autocomplete"]`));
        autocompleteElements.forEach(function (autocomplete) {
            SirioDropdownAutocomplete.initComponent(autocomplete);
        });
    }
    static initComponent(autocomplete) {
        if ((autocomplete === null || autocomplete === void 0 ? void 0 : autocomplete.tagName.toLowerCase()) == "input") {
            let id = autocomplete === null || autocomplete === void 0 ? void 0 : autocomplete.id;
            if (id != null && !(id in SirioDropdownAutocomplete.autocompletes)) {
                let dropdownAutocompleteObj = new SirioDropdownAutocomplete(id, autocomplete);
                if (dropdownAutocompleteObj != undefined)
                    SirioDropdownAutocomplete.autocompletes[id] = dropdownAutocompleteObj;
            }
        }
        else {
            return;
        }
    }
    static destroy(id) {
        if (id in SirioDropdownAutocomplete.autocompletes) {
            let autocomplete = SirioDropdownAutocomplete.autocompletes[id];
            autocomplete.removeEventListeners();
            delete SirioDropdownAutocomplete.autocompletes[id];
            autocomplete = null;
        }
    }
    static isDropdownAutocomplete(id) {
        if (id)
            return true;
        else
            return false;
    }
    static getAutocompleteById(id) {
        return SirioDropdownAutocomplete.autocompletes[id];
    }
    isHidden() {
        if (__classPrivateFieldGet(this, _SirioDropdownAutocomplete_menu, "f").getAttribute("data-sirio-visible") == "false")
            return true;
        else
            return false;
    }
    toggle() {
        let hidden = this.isHidden();
        if (hidden) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    show() {
        if (__classPrivateFieldGet(this, _SirioDropdownAutocomplete_options, "f").length > 0) {
            __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").setAttribute("aria-expanded", "true");
            __classPrivateFieldGet(this, _SirioDropdownAutocomplete_menu, "f").setAttribute("data-sirio-visible", "true");
            document.addEventListener("click", SirioDropdownAutocomplete.handleClick);
        }
        __classPrivateFieldGet(this, _SirioDropdownAutocomplete_instances, "m", _SirioDropdownAutocomplete_adjustPosition).call(this);
    }
    hide() {
        var _a;
        (_a = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_currentlyFocused, "f")) === null || _a === void 0 ? void 0 : _a.classList.remove("hover");
        __classPrivateFieldSet(this, _SirioDropdownAutocomplete_currentlyFocused, null, "f");
        __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").setAttribute("aria-expanded", "false");
        __classPrivateFieldGet(this, _SirioDropdownAutocomplete_menu, "f").setAttribute("data-sirio-visible", "false");
        __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").removeAttribute("aria-activedescendant");
    }
    getTriggerElement() {
        return __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f");
    }
    getMenuElement() {
        return __classPrivateFieldGet(this, _SirioDropdownAutocomplete_menu, "f");
    }
    getOptionElements() {
        return __classPrivateFieldGet(this, _SirioDropdownAutocomplete_options, "f");
    }
    getFilteredOptionElements() {
        return __classPrivateFieldGet(this, _SirioDropdownAutocomplete_filteredOptions, "f");
    }
    getFilterStart() {
        return __classPrivateFieldGet(this, _SirioDropdownAutocomplete_filterStart, "f");
    }
    setFilterStart(newFilterStart) {
        return (__classPrivateFieldSet(this, _SirioDropdownAutocomplete_filterStart, newFilterStart, "f"));
    }
    setOptionElements(options) {
        __classPrivateFieldGet(this, _SirioDropdownAutocomplete_menu, "f").innerHTML = "";
        let index = 0;
        let optionEls = [];
        options.forEach((option) => {
            let optionEl = document.createElement("li");
            optionEl.textContent = option;
            optionEl.setAttribute("role", "option");
            optionEl.classList.add(Constants_1.sirioPrefix + "dropdown-item");
            optionEl.id = (0, Utils_1.makeid)(6) + __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").id + "-" + index.toString();
            optionEl.onclick = () => {
                __classPrivateFieldGet(this, _SirioDropdownAutocomplete_instances, "m", _SirioDropdownAutocomplete_setVisualFocus).call(this, optionEl);
                __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").value = optionEl.textContent;
                this.hide();
            };
            optionEls.push(optionEl);
            __classPrivateFieldGet(this, _SirioDropdownAutocomplete_menu, "f").appendChild(optionEl);
            __classPrivateFieldSet(this, _SirioDropdownAutocomplete_options, Array.from(optionEls), "f");
            __classPrivateFieldSet(this, _SirioDropdownAutocomplete_filteredOptions, __classPrivateFieldGet(this, _SirioDropdownAutocomplete_options, "f"), "f");
            index++;
        });
        __classPrivateFieldGet(this, _SirioDropdownAutocomplete_instances, "m", _SirioDropdownAutocomplete_filter).call(this, true);
    }
    addOptionElements(options) {
        let index = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_menu, "f").children.length;
        options.forEach((option) => {
            let optionEl = document.createElement("li");
            optionEl.textContent = option;
            optionEl.setAttribute("role", "option");
            optionEl.classList.add(Constants_1.sirioPrefix + "dropdown-item");
            optionEl.id = (0, Utils_1.makeid)(6) + __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").id + "-" + index.toString();
            optionEl.onclick = () => {
                __classPrivateFieldGet(this, _SirioDropdownAutocomplete_instances, "m", _SirioDropdownAutocomplete_setVisualFocus).call(this, optionEl);
                __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").value = optionEl.textContent;
                this.hide();
            };
            __classPrivateFieldGet(this, _SirioDropdownAutocomplete_options, "f").push(optionEl);
            __classPrivateFieldGet(this, _SirioDropdownAutocomplete_menu, "f").appendChild(optionEl);
            __classPrivateFieldSet(this, _SirioDropdownAutocomplete_filteredOptions, __classPrivateFieldGet(this, _SirioDropdownAutocomplete_options, "f"), "f");
            index++;
        });
        __classPrivateFieldGet(this, _SirioDropdownAutocomplete_instances, "m", _SirioDropdownAutocomplete_filter).call(this, true);
    }
    setOnInput(callback) {
        __classPrivateFieldSet(this, _SirioDropdownAutocomplete_onInput, callback, "f");
    }
    static handleClick(e) {
        let autocompletes = Object.values(SirioDropdownAutocomplete.autocompletes), i = 0;
        autocompletes.forEach((input) => {
            if (!input.isHidden()) {
                if (!__classPrivateFieldGet(input, _SirioDropdownAutocomplete_dropdown, "f").contains(e.target)) {
                    input.hide();
                    i++;
                }
            }
            else
                i++;
        });
        if (i == autocompletes.length)
            document.removeEventListener("click", SirioDropdownAutocomplete.handleClick);
    }
    removeEventListeners() {
        __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").removeEventListener("click", __classPrivateFieldGet(this, _SirioDropdownAutocomplete_clickHandler, "f"));
        __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").removeEventListener("input", __classPrivateFieldGet(this, _SirioDropdownAutocomplete_inputHandler, "f"));
        document.removeEventListener("keydown", __classPrivateFieldGet(this, _SirioDropdownAutocomplete_keydownHandler, "f"));
        window.removeEventListener("scroll", __classPrivateFieldGet(this, _SirioDropdownAutocomplete_scrollHandler, "f"));
        window.removeEventListener("resize", __classPrivateFieldGet(this, _SirioDropdownAutocomplete_resizeHandler, "f"));
        document.removeEventListener("click", SirioDropdownAutocomplete.handleClick);
    }
}
exports.SirioDropdownAutocomplete = SirioDropdownAutocomplete;
_SirioDropdownAutocomplete_triggerId = new WeakMap(), _SirioDropdownAutocomplete_trigger = new WeakMap(), _SirioDropdownAutocomplete_dropdown = new WeakMap(), _SirioDropdownAutocomplete_menu = new WeakMap(), _SirioDropdownAutocomplete_options = new WeakMap(), _SirioDropdownAutocomplete_filteredOptions = new WeakMap(), _SirioDropdownAutocomplete_currentlyFocused = new WeakMap(), _SirioDropdownAutocomplete_filterStart = new WeakMap(), _SirioDropdownAutocomplete_defaultVPos = new WeakMap(), _SirioDropdownAutocomplete_checkVPosTimeout = new WeakMap(), _SirioDropdownAutocomplete_onInput = new WeakMap(), _SirioDropdownAutocomplete_clickHandler = new WeakMap(), _SirioDropdownAutocomplete_inputHandler = new WeakMap(), _SirioDropdownAutocomplete_keydownHandler = new WeakMap(), _SirioDropdownAutocomplete_scrollHandler = new WeakMap(), _SirioDropdownAutocomplete_resizeHandler = new WeakMap(), _SirioDropdownAutocomplete_instances = new WeakSet(), _SirioDropdownAutocomplete_handleKeys = function _SirioDropdownAutocomplete_handleKeys(event) {
    var _a;
    let activeElement = document.activeElement;
    if (activeElement == __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f")) {
        let key = event.key.toLowerCase();
        switch (key) {
            case "arrowdown":
                if (__classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").value.length >= __classPrivateFieldGet(this, _SirioDropdownAutocomplete_filterStart, "f") && __classPrivateFieldGet(this, _SirioDropdownAutocomplete_currentlyFocused, "f") == null && __classPrivateFieldGet(this, _SirioDropdownAutocomplete_filteredOptions, "f").length > 0) {
                    this.show();
                    if (!event.altKey) {
                        __classPrivateFieldGet(this, _SirioDropdownAutocomplete_instances, "m", _SirioDropdownAutocomplete_setVisualFocus).call(this, __classPrivateFieldGet(this, _SirioDropdownAutocomplete_filteredOptions, "f")[0]);
                        __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").value = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_filteredOptions, "f")[0].textContent;
                        __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").selectionStart = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").value.length;
                    }
                }
                else if (__classPrivateFieldGet(this, _SirioDropdownAutocomplete_currentlyFocused, "f") != null) {
                    event.preventDefault();
                    let index = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_filteredOptions, "f").indexOf(__classPrivateFieldGet(this, _SirioDropdownAutocomplete_currentlyFocused, "f"));
                    if (index != -1) {
                        index++;
                        if (index == __classPrivateFieldGet(this, _SirioDropdownAutocomplete_filteredOptions, "f").length)
                            index = 0;
                        __classPrivateFieldGet(this, _SirioDropdownAutocomplete_instances, "m", _SirioDropdownAutocomplete_setVisualFocus).call(this, __classPrivateFieldGet(this, _SirioDropdownAutocomplete_filteredOptions, "f")[index]);
                        let selectionStart = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").value.length;
                        __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").value = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_filteredOptions, "f")[index].textContent;
                        if (selectionStart != 0) {
                            __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").selectionStart = selectionStart;
                        }
                        else {
                            __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").selectionStart = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").value.length;
                        }
                    }
                }
                break;
            case "arrowup":
                if (__classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").value.length >= __classPrivateFieldGet(this, _SirioDropdownAutocomplete_filterStart, "f") && this.isHidden() && __classPrivateFieldGet(this, _SirioDropdownAutocomplete_filteredOptions, "f").length > 0) {
                    this.show();
                    __classPrivateFieldGet(this, _SirioDropdownAutocomplete_instances, "m", _SirioDropdownAutocomplete_setVisualFocus).call(this, __classPrivateFieldGet(this, _SirioDropdownAutocomplete_filteredOptions, "f")[__classPrivateFieldGet(this, _SirioDropdownAutocomplete_filteredOptions, "f").length - 1]);
                    __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").value = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_filteredOptions, "f")[__classPrivateFieldGet(this, _SirioDropdownAutocomplete_filteredOptions, "f").length - 1].textContent;
                    __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").selectionStart = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").value.length;
                    event.preventDefault();
                }
                else if (__classPrivateFieldGet(this, _SirioDropdownAutocomplete_currentlyFocused, "f") != null) {
                    event.preventDefault();
                    let index = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_filteredOptions, "f").indexOf(__classPrivateFieldGet(this, _SirioDropdownAutocomplete_currentlyFocused, "f"));
                    if (index != -1) {
                        index--;
                        if (index == -1)
                            index = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_filteredOptions, "f").length - 1;
                        __classPrivateFieldGet(this, _SirioDropdownAutocomplete_instances, "m", _SirioDropdownAutocomplete_setVisualFocus).call(this, __classPrivateFieldGet(this, _SirioDropdownAutocomplete_filteredOptions, "f")[index]);
                        __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").value = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_filteredOptions, "f")[index].textContent;
                        let selectionStart = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").value.length;
                        if (selectionStart != 0) {
                            __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").selectionStart = selectionStart;
                        }
                        else {
                            __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").selectionStart = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").value.length;
                        }
                    }
                }
                else {
                    event.preventDefault();
                }
                break;
            case "arrowleft":
            case "arrowright":
                (_a = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_currentlyFocused, "f")) === null || _a === void 0 ? void 0 : _a.classList.remove("hover");
                __classPrivateFieldSet(this, _SirioDropdownAutocomplete_currentlyFocused, null, "f");
                break;
            case "enter":
                __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").selectionStart = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").value.length;
                this.hide();
                break;
            case "escape":
                if (this.isHidden()) {
                    __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").value = "";
                }
                else {
                    this.hide();
                }
                break;
            case "backspace":
                if (__classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").selectionStart != __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").value.length) {
                    __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").selectionStart--;
                }
                if (__classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").selectionStart == 0) {
                    __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").value = "";
                    __classPrivateFieldGet(this, _SirioDropdownAutocomplete_menu, "f").innerHTML = "";
                    __classPrivateFieldSet(this, _SirioDropdownAutocomplete_filteredOptions, __classPrivateFieldGet(this, _SirioDropdownAutocomplete_options, "f"), "f");
                    __classPrivateFieldGet(this, _SirioDropdownAutocomplete_options, "f").forEach((option) => {
                        __classPrivateFieldGet(this, _SirioDropdownAutocomplete_menu, "f").appendChild(option);
                    });
                }
                break;
            case "tab":
                if (!this.isHidden())
                    this.hide();
                break;
        }
    }
}, _SirioDropdownAutocomplete_setVisualFocus = function _SirioDropdownAutocomplete_setVisualFocus(el) {
    var _a;
    (_a = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_currentlyFocused, "f")) === null || _a === void 0 ? void 0 : _a.classList.remove("hover");
    if (!el.classList.contains("active")) {
        __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").setAttribute("aria-activedescendant", el.id);
        __classPrivateFieldSet(this, _SirioDropdownAutocomplete_currentlyFocused, el, "f");
        __classPrivateFieldGet(this, _SirioDropdownAutocomplete_menu, "f").scrollTop = el.offsetTop;
        el.classList.add("hover");
    }
}, _SirioDropdownAutocomplete_filter = function _SirioDropdownAutocomplete_filter(autocomplete) {
    this.hide();
    __classPrivateFieldGet(this, _SirioDropdownAutocomplete_menu, "f").innerHTML = "";
    __classPrivateFieldSet(this, _SirioDropdownAutocomplete_filteredOptions, [], "f");
    let endOfFilter = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").selectionStart;
    let filter = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").value.toLowerCase().substring(0, endOfFilter);
    if (filter != "") {
        __classPrivateFieldGet(this, _SirioDropdownAutocomplete_options, "f").forEach((option) => {
            var _a;
            if ((_a = option.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase().startsWith(filter)) {
                __classPrivateFieldGet(this, _SirioDropdownAutocomplete_filteredOptions, "f").push(option);
                __classPrivateFieldGet(this, _SirioDropdownAutocomplete_menu, "f").appendChild(option);
            }
        });
        if (__classPrivateFieldGet(this, _SirioDropdownAutocomplete_filteredOptions, "f").length > 0) {
            __classPrivateFieldGet(this, _SirioDropdownAutocomplete_instances, "m", _SirioDropdownAutocomplete_setVisualFocus).call(this, __classPrivateFieldGet(this, _SirioDropdownAutocomplete_filteredOptions, "f")[0]);
            if (autocomplete) {
                __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").value = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_filteredOptions, "f")[0].textContent;
                __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").selectionStart = filter.length;
            }
            this.show();
        }
    }
}, _SirioDropdownAutocomplete_adjustPosition = function _SirioDropdownAutocomplete_adjustPosition() {
    if (!this.isHidden()) {
        __classPrivateFieldGet(this, _SirioDropdownAutocomplete_instances, "m", _SirioDropdownAutocomplete_adjustVerticalPosition).call(this);
    }
}, _SirioDropdownAutocomplete_adjustVerticalPosition = function _SirioDropdownAutocomplete_adjustVerticalPosition() {
    if (__classPrivateFieldGet(this, _SirioDropdownAutocomplete_checkVPosTimeout, "f"))
        clearTimeout(__classPrivateFieldGet(this, _SirioDropdownAutocomplete_checkVPosTimeout, "f"));
    __classPrivateFieldSet(this, _SirioDropdownAutocomplete_checkVPosTimeout, setTimeout(() => {
        const menuHeight = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_menu, "f").offsetHeight;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        let currentVerticalPos = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_menu, "f").classList.contains("sirio-dropdown-menu-top") ? "top" : "bottom";
        if (__classPrivateFieldGet(this, _SirioDropdownAutocomplete_menu, "f")) {
            const rect = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_menu, "f").getBoundingClientRect();
            if (currentVerticalPos == __classPrivateFieldGet(this, _SirioDropdownAutocomplete_defaultVPos, "f")) {
                if (currentVerticalPos == "bottom" && rect.bottom > windowHeight) {
                    if (__classPrivateFieldGet(this, _SirioDropdownAutocomplete_instances, "m", _SirioDropdownAutocomplete_checkTopPosition).call(this, menuHeight))
                        __classPrivateFieldGet(this, _SirioDropdownAutocomplete_menu, "f").classList.add("sirio-dropdown-menu-top");
                }
                else if (currentVerticalPos == "top" && rect.top < 0) {
                    if (__classPrivateFieldGet(this, _SirioDropdownAutocomplete_instances, "m", _SirioDropdownAutocomplete_checkBottomPosition).call(this, menuHeight, windowHeight))
                        __classPrivateFieldGet(this, _SirioDropdownAutocomplete_menu, "f").classList.remove("sirio-dropdown-menu-top");
                }
            }
            else {
                if (currentVerticalPos == "top" && __classPrivateFieldGet(this, _SirioDropdownAutocomplete_instances, "m", _SirioDropdownAutocomplete_checkBottomPosition).call(this, menuHeight, windowHeight))
                    __classPrivateFieldGet(this, _SirioDropdownAutocomplete_menu, "f").classList.remove("sirio-dropdown-menu-top");
                else if (currentVerticalPos == "bottom" && __classPrivateFieldGet(this, _SirioDropdownAutocomplete_instances, "m", _SirioDropdownAutocomplete_checkTopPosition).call(this, menuHeight))
                    __classPrivateFieldGet(this, _SirioDropdownAutocomplete_menu, "f").classList.add("sirio-dropdown-menu-top");
            }
        }
    }, 50), "f");
}, _SirioDropdownAutocomplete_checkTopPosition = function _SirioDropdownAutocomplete_checkTopPosition(menuHeight) {
    let style = window.getComputedStyle(__classPrivateFieldGet(this, _SirioDropdownAutocomplete_menu, "f")), matrix = new WebKitCSSMatrix(style.transform), translateY = matrix.m41;
    let btnTopPos = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").getBoundingClientRect().top;
    if (btnTopPos - (translateY + menuHeight) > 0)
        return true;
    return false;
}, _SirioDropdownAutocomplete_checkBottomPosition = function _SirioDropdownAutocomplete_checkBottomPosition(menuHeight, windowHeight) {
    let style = window.getComputedStyle(__classPrivateFieldGet(this, _SirioDropdownAutocomplete_menu, "f")), matrix = new WebKitCSSMatrix(style.transform), translateY = matrix.m41;
    let btnBottomPos = __classPrivateFieldGet(this, _SirioDropdownAutocomplete_trigger, "f").getBoundingClientRect().bottom;
    if (btnBottomPos + translateY + menuHeight < windowHeight)
        return true;
    return false;
};


/***/ }),

/***/ 541:
/***/ (function(__unused_webpack_module, exports) {


var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SirioDropdownMenu_instances, _SirioDropdownMenu_triggerId, _SirioDropdownMenu_trigger, _SirioDropdownMenu_menu, _SirioDropdownMenu_items, _SirioDropdownMenu_dropdown, _SirioDropdownMenu_defaultVPos, _SirioDropdownMenu_defaultHPos, _SirioDropdownMenu_checkVPosTimeout, _SirioDropdownMenu_checkHPosTimeout, _SirioDropdownMenu_clickHandler, _SirioDropdownMenu_keydownHandler, _SirioDropdownMenu_itemKeydownHandler, _SirioDropdownMenu_itemClickHandler, _SirioDropdownMenu_adjustPosition, _SirioDropdownMenu_adjustVerticalPosition, _SirioDropdownMenu_adjustHorizontalPosition, _SirioDropdownMenu_checkTopPosition, _SirioDropdownMenu_checkBottomPosition, _SirioDropdownMenu_checkLeftPosition, _SirioDropdownMenu_checkRightPosition;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SirioDropdownMenu = void 0;
class SirioDropdownMenu {
    constructor(id, menu, dropdown) {
        _SirioDropdownMenu_instances.add(this);
        _SirioDropdownMenu_triggerId.set(this, void 0);
        _SirioDropdownMenu_trigger.set(this, void 0);
        _SirioDropdownMenu_menu.set(this, void 0);
        _SirioDropdownMenu_items.set(this, void 0);
        _SirioDropdownMenu_dropdown.set(this, void 0);
        _SirioDropdownMenu_defaultVPos.set(this, void 0);
        _SirioDropdownMenu_defaultHPos.set(this, void 0);
        _SirioDropdownMenu_checkVPosTimeout.set(this, void 0);
        _SirioDropdownMenu_checkHPosTimeout.set(this, void 0);
        _SirioDropdownMenu_clickHandler.set(this, (event) => {
            this.toggle();
        });
        _SirioDropdownMenu_keydownHandler.set(this, (event) => {
            let key = event.key.toLowerCase();
            if (!this.isHidden()) {
                __classPrivateFieldGet(this, _SirioDropdownMenu_items, "f")[0].focus();
                if (key == "escape") {
                    this.hide();
                }
                else if (key == "tab") {
                    __classPrivateFieldGet(this, _SirioDropdownMenu_items, "f")[0].focus();
                    event.preventDefault();
                }
                else if (key == "arrowdown") {
                    __classPrivateFieldGet(this, _SirioDropdownMenu_items, "f")[0].focus();
                    event.preventDefault();
                }
            }
            else {
                if (key == "arrowdown") {
                    this.show();
                    __classPrivateFieldGet(this, _SirioDropdownMenu_items, "f")[0].focus();
                    event.preventDefault();
                }
            }
        });
        _SirioDropdownMenu_itemKeydownHandler.set(this, (event) => {
            let key = event.key.toLowerCase();
            if (!this.isHidden()) {
                let index = __classPrivateFieldGet(this, _SirioDropdownMenu_items, "f").indexOf(event.target);
                if (key == "arrowdown") {
                    if (index < __classPrivateFieldGet(this, _SirioDropdownMenu_items, "f").length - 1)
                        __classPrivateFieldGet(this, _SirioDropdownMenu_items, "f")[index + 1].focus();
                    event.preventDefault();
                }
                else if (key == "arrowup") {
                    if (index > 0)
                        __classPrivateFieldGet(this, _SirioDropdownMenu_items, "f")[index - 1].focus();
                    event.preventDefault();
                }
                else if (key == "enter") {
                    event.preventDefault();
                    __classPrivateFieldGet(this, _SirioDropdownMenu_items, "f")[index].click();
                }
                else if (key == "escape") {
                    this.hide();
                }
                else if (key == "tab" && index == __classPrivateFieldGet(this, _SirioDropdownMenu_items, "f").length - 1) {
                    this.hide();
                }
            }
        });
        _SirioDropdownMenu_itemClickHandler.set(this, (event, item) => {
            if (item.classList.contains("active")) {
                item.classList.remove("active");
            }
            else {
                __classPrivateFieldGet(this, _SirioDropdownMenu_items, "f").forEach((item) => {
                    item.classList.remove("active");
                });
                item.classList.add("active");
            }
            this.hide();
        });
        if (SirioDropdownMenu.isDropdownMenu(id)) {
            __classPrivateFieldSet(this, _SirioDropdownMenu_triggerId, id, "f");
            __classPrivateFieldSet(this, _SirioDropdownMenu_trigger, document.getElementById(id), "f");
            __classPrivateFieldSet(this, _SirioDropdownMenu_menu, menu, "f");
            __classPrivateFieldGet(this, _SirioDropdownMenu_menu, "f").setAttribute("data-sirio-visible", "false");
            __classPrivateFieldGet(this, _SirioDropdownMenu_trigger, "f").setAttribute("aria-expanded", "false");
            __classPrivateFieldSet(this, _SirioDropdownMenu_items, Array.from(menu.querySelectorAll("li > a")), "f");
            __classPrivateFieldSet(this, _SirioDropdownMenu_dropdown, dropdown, "f");
            __classPrivateFieldSet(this, _SirioDropdownMenu_defaultVPos, __classPrivateFieldGet(this, _SirioDropdownMenu_menu, "f").classList.contains("sirio-dropdown-menu-top") ? "top" : "bottom", "f");
            __classPrivateFieldSet(this, _SirioDropdownMenu_defaultHPos, __classPrivateFieldGet(this, _SirioDropdownMenu_menu, "f").classList.contains("sirio-dropdown-menu-right") ? "right" : "left", "f");
            __classPrivateFieldSet(this, _SirioDropdownMenu_checkVPosTimeout, null, "f");
            __classPrivateFieldSet(this, _SirioDropdownMenu_checkHPosTimeout, null, "f");
            __classPrivateFieldGet(this, _SirioDropdownMenu_trigger, "f").addEventListener("click", __classPrivateFieldGet(this, _SirioDropdownMenu_clickHandler, "f"));
            __classPrivateFieldGet(this, _SirioDropdownMenu_trigger, "f").addEventListener("keydown", __classPrivateFieldGet(this, _SirioDropdownMenu_keydownHandler, "f"));
            __classPrivateFieldGet(this, _SirioDropdownMenu_items, "f").forEach((item) => {
                item.addEventListener("keydown", __classPrivateFieldGet(this, _SirioDropdownMenu_itemKeydownHandler, "f"));
                item.addEventListener("click", (event) => __classPrivateFieldGet(this, _SirioDropdownMenu_itemClickHandler, "f").call(this, event, item));
            });
            window.addEventListener("scroll", () => {
                __classPrivateFieldGet(this, _SirioDropdownMenu_instances, "m", _SirioDropdownMenu_adjustPosition).call(this);
            });
            window.addEventListener("resize", () => {
                __classPrivateFieldGet(this, _SirioDropdownMenu_instances, "m", _SirioDropdownMenu_adjustPosition).call(this);
            });
        }
        else
            throw TypeError(`HTML element with id="'${id}'" is not a valid Sirio-Dropdown-Menu.`);
    }
    static init() {
        SirioDropdownMenu.menus = {};
        let dropdownElements = Array.from(document.querySelectorAll(`[data-sirio-component="dropdown"]`));
        dropdownElements.forEach(function (dropdown) {
            SirioDropdownMenu.initComponent(dropdown);
        });
    }
    static initComponent(dropdown) {
        let trigger = dropdown.querySelector(`[data-sirio-toggle="dropdown"]`);
        if (trigger && trigger.tagName === "BUTTON") {
            let id = trigger === null || trigger === void 0 ? void 0 : trigger.id;
            let menuElementsSelects = Array.from(dropdown.getElementsByTagName("SELECT")).filter((node) => node.parentNode == dropdown);
            if (menuElementsSelects.length > 0)
                return;
            let menuElementsAutocomplete = Array.from(dropdown.getElementsByTagName("INPUT")).filter((node) => node.parentNode == dropdown);
            if (menuElementsAutocomplete.length > 0)
                return;
            let menuElementsUL = Array.from(dropdown.getElementsByTagName("UL")).filter((node) => node.parentNode == dropdown);
            if (menuElementsUL.length == 1 && id != null) {
                let menu = menuElementsUL[0];
                let dropdownMenuObj = new SirioDropdownMenu(id, menu, dropdown);
                if (dropdownMenuObj != undefined)
                    SirioDropdownMenu.menus[id] = dropdownMenuObj;
                return;
            }
            let menuElementsOL = Array.from(dropdown.getElementsByTagName("OL")).filter((node) => node.parentNode == dropdown);
            if (menuElementsOL.length == 1 && id != null) {
                let menu = menuElementsOL[0];
                let dropdownMenuObj = new SirioDropdownMenu(id, menu, dropdown);
                if (dropdownMenuObj != undefined)
                    SirioDropdownMenu.menus[id] = dropdownMenuObj;
                return;
            }
            let menuElementsDIV = Array.from(dropdown.querySelectorAll("div.sirio-dropdown-menu")).filter((node) => node.parentNode == dropdown);
            if (menuElementsDIV.length == 1 && id != null) {
                let menu = menuElementsDIV[0];
                let dropdownMenuObj = new SirioDropdownMenu(id, menu, dropdown);
                if (dropdownMenuObj != undefined)
                    SirioDropdownMenu.menus[id] = dropdownMenuObj;
                return;
            }
        }
    }
    static destroy(id) {
        if (id in SirioDropdownMenu.menus) {
            let menu = SirioDropdownMenu.menus[id];
            menu.removeEventListeners();
            delete SirioDropdownMenu.menus[id];
            menu = null;
        }
    }
    static isDropdownMenu(id) {
        const menuElement = document.getElementById(id);
        if (menuElement != null) {
            if (menuElement.tagName == "BUTTON")
                return true;
            else
                return false;
        }
        else {
            return false;
        }
    }
    static getMenuById(id) {
        return SirioDropdownMenu.menus[id];
    }
    getTriggerElement() {
        return __classPrivateFieldGet(this, _SirioDropdownMenu_trigger, "f");
    }
    getMenuElement() {
        return __classPrivateFieldGet(this, _SirioDropdownMenu_menu, "f");
    }
    getItemElements() {
        return __classPrivateFieldGet(this, _SirioDropdownMenu_items, "f");
    }
    isHidden() {
        if (__classPrivateFieldGet(this, _SirioDropdownMenu_menu, "f").getAttribute("data-sirio-visible") == "false")
            return true;
        else
            return false;
    }
    toggle() {
        let hidden = this.isHidden();
        if (hidden) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    show() {
        __classPrivateFieldGet(this, _SirioDropdownMenu_trigger, "f").setAttribute("aria-expanded", "true");
        __classPrivateFieldGet(this, _SirioDropdownMenu_menu, "f").setAttribute("data-sirio-visible", "true");
        document.addEventListener("click", SirioDropdownMenu.handleClick);
        __classPrivateFieldGet(this, _SirioDropdownMenu_instances, "m", _SirioDropdownMenu_adjustPosition).call(this);
    }
    hide() {
        __classPrivateFieldGet(this, _SirioDropdownMenu_trigger, "f").setAttribute("aria-expanded", "false");
        __classPrivateFieldGet(this, _SirioDropdownMenu_menu, "f").setAttribute("data-sirio-visible", "false");
    }
    static handleClick(e) {
        let menus = Object.values(SirioDropdownMenu.menus), i = 0;
        menus.forEach((menu) => {
            if (!menu.isHidden()) {
                if (!__classPrivateFieldGet(menu, _SirioDropdownMenu_dropdown, "f").contains(e.target)) {
                    menu.hide();
                    i++;
                }
            }
            else
                i++;
        });
        if (i == menus.length)
            document.removeEventListener("click", SirioDropdownMenu.handleClick);
    }
    removeEventListeners() {
        __classPrivateFieldGet(this, _SirioDropdownMenu_trigger, "f").removeEventListener("click", __classPrivateFieldGet(this, _SirioDropdownMenu_clickHandler, "f"));
        __classPrivateFieldGet(this, _SirioDropdownMenu_trigger, "f").removeEventListener("keydown", __classPrivateFieldGet(this, _SirioDropdownMenu_keydownHandler, "f"));
        __classPrivateFieldGet(this, _SirioDropdownMenu_items, "f").forEach((item) => {
            item.removeEventListener("keydown", __classPrivateFieldGet(this, _SirioDropdownMenu_itemKeydownHandler, "f"));
            item.removeEventListener("click", (event) => __classPrivateFieldGet(this, _SirioDropdownMenu_itemClickHandler, "f").call(this, event, item));
        });
        document.removeEventListener("click", SirioDropdownMenu.handleClick);
        window.addEventListener("scroll", () => {
            __classPrivateFieldGet(this, _SirioDropdownMenu_instances, "m", _SirioDropdownMenu_adjustPosition).call(this);
        });
        window.addEventListener("resize", () => {
            __classPrivateFieldGet(this, _SirioDropdownMenu_instances, "m", _SirioDropdownMenu_adjustPosition).call(this);
        });
    }
}
exports.SirioDropdownMenu = SirioDropdownMenu;
_SirioDropdownMenu_triggerId = new WeakMap(), _SirioDropdownMenu_trigger = new WeakMap(), _SirioDropdownMenu_menu = new WeakMap(), _SirioDropdownMenu_items = new WeakMap(), _SirioDropdownMenu_dropdown = new WeakMap(), _SirioDropdownMenu_defaultVPos = new WeakMap(), _SirioDropdownMenu_defaultHPos = new WeakMap(), _SirioDropdownMenu_checkVPosTimeout = new WeakMap(), _SirioDropdownMenu_checkHPosTimeout = new WeakMap(), _SirioDropdownMenu_clickHandler = new WeakMap(), _SirioDropdownMenu_keydownHandler = new WeakMap(), _SirioDropdownMenu_itemKeydownHandler = new WeakMap(), _SirioDropdownMenu_itemClickHandler = new WeakMap(), _SirioDropdownMenu_instances = new WeakSet(), _SirioDropdownMenu_adjustPosition = function _SirioDropdownMenu_adjustPosition() {
    if (!this.isHidden()) {
        __classPrivateFieldGet(this, _SirioDropdownMenu_instances, "m", _SirioDropdownMenu_adjustVerticalPosition).call(this);
        __classPrivateFieldGet(this, _SirioDropdownMenu_instances, "m", _SirioDropdownMenu_adjustHorizontalPosition).call(this);
    }
}, _SirioDropdownMenu_adjustVerticalPosition = function _SirioDropdownMenu_adjustVerticalPosition() {
    if (__classPrivateFieldGet(this, _SirioDropdownMenu_checkVPosTimeout, "f"))
        clearTimeout(__classPrivateFieldGet(this, _SirioDropdownMenu_checkVPosTimeout, "f"));
    __classPrivateFieldSet(this, _SirioDropdownMenu_checkVPosTimeout, setTimeout(() => {
        const menuHeight = __classPrivateFieldGet(this, _SirioDropdownMenu_menu, "f").offsetHeight;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        let currentVerticalPos = __classPrivateFieldGet(this, _SirioDropdownMenu_menu, "f").classList.contains("sirio-dropdown-menu-top") ? "top" : "bottom";
        const rect = __classPrivateFieldGet(this, _SirioDropdownMenu_menu, "f").getBoundingClientRect();
        if (currentVerticalPos == __classPrivateFieldGet(this, _SirioDropdownMenu_defaultVPos, "f")) {
            if (currentVerticalPos == "bottom" && rect.bottom > windowHeight) {
                if (__classPrivateFieldGet(this, _SirioDropdownMenu_instances, "m", _SirioDropdownMenu_checkTopPosition).call(this, menuHeight))
                    __classPrivateFieldGet(this, _SirioDropdownMenu_menu, "f").classList.add("sirio-dropdown-menu-top");
            }
            else if (currentVerticalPos == "top" && rect.top < 0) {
                if (__classPrivateFieldGet(this, _SirioDropdownMenu_instances, "m", _SirioDropdownMenu_checkBottomPosition).call(this, menuHeight, windowHeight))
                    __classPrivateFieldGet(this, _SirioDropdownMenu_menu, "f").classList.remove("sirio-dropdown-menu-top");
            }
        }
        else {
            if (currentVerticalPos == "top" && __classPrivateFieldGet(this, _SirioDropdownMenu_instances, "m", _SirioDropdownMenu_checkBottomPosition).call(this, menuHeight, windowHeight))
                __classPrivateFieldGet(this, _SirioDropdownMenu_menu, "f").classList.remove("sirio-dropdown-menu-top");
            else if (currentVerticalPos == "bottom" && __classPrivateFieldGet(this, _SirioDropdownMenu_instances, "m", _SirioDropdownMenu_checkTopPosition).call(this, menuHeight))
                __classPrivateFieldGet(this, _SirioDropdownMenu_menu, "f").classList.add("sirio-dropdown-menu-top");
        }
    }, 25), "f");
}, _SirioDropdownMenu_adjustHorizontalPosition = function _SirioDropdownMenu_adjustHorizontalPosition() {
    if (__classPrivateFieldGet(this, _SirioDropdownMenu_checkHPosTimeout, "f"))
        clearTimeout(__classPrivateFieldGet(this, _SirioDropdownMenu_checkHPosTimeout, "f"));
    __classPrivateFieldSet(this, _SirioDropdownMenu_checkHPosTimeout, setTimeout(() => {
        const menuWidth = __classPrivateFieldGet(this, _SirioDropdownMenu_menu, "f").offsetWidth;
        const windowWidth = document.documentElement.clientWidth;
        let currentHorizontalPos = __classPrivateFieldGet(this, _SirioDropdownMenu_menu, "f").classList.contains("sirio-dropdown-menu-right") ? "right" : "left";
        const rect = __classPrivateFieldGet(this, _SirioDropdownMenu_menu, "f").getBoundingClientRect();
        if (currentHorizontalPos == __classPrivateFieldGet(this, _SirioDropdownMenu_defaultHPos, "f")) {
            if (currentHorizontalPos == "left" && rect.right > windowWidth) {
                if (__classPrivateFieldGet(this, _SirioDropdownMenu_instances, "m", _SirioDropdownMenu_checkRightPosition).call(this, menuWidth))
                    __classPrivateFieldGet(this, _SirioDropdownMenu_menu, "f").classList.add("sirio-dropdown-menu-right");
            }
            else if (currentHorizontalPos == "right" && rect.left < 0) {
                if (__classPrivateFieldGet(this, _SirioDropdownMenu_instances, "m", _SirioDropdownMenu_checkLeftPosition).call(this, menuWidth, windowWidth))
                    __classPrivateFieldGet(this, _SirioDropdownMenu_menu, "f").classList.remove("sirio-dropdown-menu-right");
            }
        }
        else {
            if (currentHorizontalPos == "left" && __classPrivateFieldGet(this, _SirioDropdownMenu_instances, "m", _SirioDropdownMenu_checkRightPosition).call(this, menuWidth))
                __classPrivateFieldGet(this, _SirioDropdownMenu_menu, "f").classList.add("sirio-dropdown-menu-right");
            else if (currentHorizontalPos == "right" && __classPrivateFieldGet(this, _SirioDropdownMenu_instances, "m", _SirioDropdownMenu_checkLeftPosition).call(this, menuWidth, windowWidth))
                __classPrivateFieldGet(this, _SirioDropdownMenu_menu, "f").classList.remove("sirio-dropdown-menu-right");
        }
    }, 25), "f");
}, _SirioDropdownMenu_checkTopPosition = function _SirioDropdownMenu_checkTopPosition(menuHeight) {
    let style = window.getComputedStyle(__classPrivateFieldGet(this, _SirioDropdownMenu_menu, "f")), matrix = new WebKitCSSMatrix(style.transform), translateY = matrix.m41;
    let btnTopPos = __classPrivateFieldGet(this, _SirioDropdownMenu_trigger, "f").getBoundingClientRect().top;
    if (btnTopPos - (translateY + menuHeight) > 0)
        return true;
    return false;
}, _SirioDropdownMenu_checkBottomPosition = function _SirioDropdownMenu_checkBottomPosition(menuHeight, windowHeight) {
    let style = window.getComputedStyle(__classPrivateFieldGet(this, _SirioDropdownMenu_menu, "f")), matrix = new WebKitCSSMatrix(style.transform), translateY = matrix.m41;
    let btnBottomPos = __classPrivateFieldGet(this, _SirioDropdownMenu_trigger, "f").getBoundingClientRect().bottom;
    if (btnBottomPos + translateY + menuHeight < windowHeight)
        return true;
    return false;
}, _SirioDropdownMenu_checkLeftPosition = function _SirioDropdownMenu_checkLeftPosition(menuWidth, windowWidth) {
    let btnTopPos = __classPrivateFieldGet(this, _SirioDropdownMenu_trigger, "f").getBoundingClientRect().left;
    if (btnTopPos + menuWidth <= windowWidth)
        return true;
    return false;
}, _SirioDropdownMenu_checkRightPosition = function _SirioDropdownMenu_checkRightPosition(menuWidth) {
    let btnTopPos = __classPrivateFieldGet(this, _SirioDropdownMenu_trigger, "f").getBoundingClientRect().right;
    if (btnTopPos - menuWidth >= 0) {
        return true;
    }
    return false;
};


/***/ }),

/***/ 514:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SirioDropdownSelect_instances, _SirioDropdownSelect_triggerId, _SirioDropdownSelect_trigger, _SirioDropdownSelect_select, _SirioDropdownSelect_placeholder, _SirioDropdownSelect_multiple, _SirioDropdownSelect_dropdown, _SirioDropdownSelect_numSelected, _SirioDropdownSelect_selectedValues, _SirioDropdownSelect_selectedContent, _SirioDropdownSelect_menu, _SirioDropdownSelect_items, _SirioDropdownSelect_searchString, _SirioDropdownSelect_searching, _SirioDropdownSelect_searchIndex, _SirioDropdownSelect_searchReset, _SirioDropdownSelect_disabled, _SirioDropdownSelect_onChange, _SirioDropdownSelect_defaultVPos, _SirioDropdownSelect_checkVPosTimeout, _SirioDropdownSelect_onBlur, _SirioDropdownSelect_handleKeys, _SirioDropdownSelect_handleSearch, _SirioDropdownSelect_search, _SirioDropdownSelect_handleItems, _SirioDropdownSelect_handleItemClick, _SirioDropdownSelect_selectItem, _SirioDropdownSelect_unselectItem, _SirioDropdownSelect_setSelectedOption, _SirioDropdownSelect_setNotSelectedOption, _SirioDropdownSelect_adjustPosition, _SirioDropdownSelect_adjustVerticalPosition, _SirioDropdownSelect_checkTopPosition, _SirioDropdownSelect_checkBottomPosition, _SirioDropdownSelect_createOptionElement;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SirioDropdownSelect = void 0;
const Constants_1 = __webpack_require__(738);
const Utils_1 = __webpack_require__(675);
class SirioDropdownSelect {
    constructor(selectId, select) {
        var _a;
        _SirioDropdownSelect_instances.add(this);
        _SirioDropdownSelect_triggerId.set(this, void 0);
        _SirioDropdownSelect_trigger.set(this, void 0);
        _SirioDropdownSelect_select.set(this, void 0);
        _SirioDropdownSelect_placeholder.set(this, void 0);
        _SirioDropdownSelect_multiple.set(this, void 0);
        _SirioDropdownSelect_dropdown.set(this, void 0);
        _SirioDropdownSelect_numSelected.set(this, void 0);
        _SirioDropdownSelect_selectedValues.set(this, void 0);
        _SirioDropdownSelect_selectedContent.set(this, void 0);
        _SirioDropdownSelect_menu.set(this, void 0);
        _SirioDropdownSelect_items.set(this, void 0);
        _SirioDropdownSelect_searchString.set(this, void 0);
        _SirioDropdownSelect_searching.set(this, void 0);
        _SirioDropdownSelect_searchIndex.set(this, void 0);
        _SirioDropdownSelect_searchReset.set(this, void 0);
        _SirioDropdownSelect_disabled.set(this, void 0);
        _SirioDropdownSelect_onChange.set(this, void 0);
        _SirioDropdownSelect_defaultVPos.set(this, void 0);
        _SirioDropdownSelect_checkVPosTimeout.set(this, void 0);
        if (SirioDropdownSelect.isDropdownSelect(selectId)) {
            let dropdown = document.createElement("div");
            dropdown.setAttribute("data-sirio-component", "dropdown");
            dropdown.classList.add("sirio-dropdown");
            (_a = select.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(dropdown, select);
            dropdown.appendChild(select);
            __classPrivateFieldSet(this, _SirioDropdownSelect_select, select, "f");
            __classPrivateFieldSet(this, _SirioDropdownSelect_dropdown, dropdown, "f");
            __classPrivateFieldSet(this, _SirioDropdownSelect_searching, false, "f");
            __classPrivateFieldSet(this, _SirioDropdownSelect_searchIndex, 0, "f");
            __classPrivateFieldSet(this, _SirioDropdownSelect_searchReset, null, "f");
            __classPrivateFieldSet(this, _SirioDropdownSelect_multiple, __classPrivateFieldGet(this, _SirioDropdownSelect_select, "f").hasAttribute("multiple") ? true : false, "f");
            __classPrivateFieldGet(this, _SirioDropdownSelect_select, "f").setAttribute("data-sirio-visible", "false");
            __classPrivateFieldGet(this, _SirioDropdownSelect_select, "f").setAttribute("aria-hidden", "true");
            let button = document.createElement("button");
            let id = (0, Utils_1.makeid)(6) + select.id;
            button.classList.add(Constants_1.sirioPrefix + "dropdown-select", Constants_1.sirioPrefix + "form-control");
            button.type = "button";
            button.setAttribute("aria-label", "Apri lista selezione");
            button.id = id;
            button.setAttribute("data-sirio-toggle", "dropdown");
            button.ariaExpanded = "false";
            __classPrivateFieldSet(this, _SirioDropdownSelect_disabled, false, "f");
            if (__classPrivateFieldGet(this, _SirioDropdownSelect_select, "f").hasAttribute("disabled")) {
                button.setAttribute("disabled", "true");
                __classPrivateFieldSet(this, _SirioDropdownSelect_disabled, true, "f");
            }
            let span = document.createElement("span");
            span.setAttribute("data-sirio-option", selectId);
            button.appendChild(span);
            __classPrivateFieldSet(this, _SirioDropdownSelect_trigger, button, "f");
            __classPrivateFieldSet(this, _SirioDropdownSelect_triggerId, id, "f");
            dropdown.appendChild(button);
            let menu = document.createElement("ul");
            menu.classList.add(Constants_1.sirioPrefix + "dropdown-menu");
            menu.setAttribute("role", "listbox");
            menu.id = select.id + "-listbox";
            menu.setAttribute("aria-labelledby", id);
            menu.tabIndex = -1;
            menu.setAttribute("data-sirio-visible", "false");
            let options = Array.from(select.children);
            __classPrivateFieldSet(this, _SirioDropdownSelect_placeholder, __classPrivateFieldGet(this, _SirioDropdownSelect_select, "f").title, "f");
            __classPrivateFieldSet(this, _SirioDropdownSelect_numSelected, 0, "f");
            if (!this.isMultiple())
                __classPrivateFieldSet(this, _SirioDropdownSelect_numSelected, 1, "f");
            __classPrivateFieldSet(this, _SirioDropdownSelect_selectedValues, [], "f");
            __classPrivateFieldSet(this, _SirioDropdownSelect_selectedContent, __classPrivateFieldGet(this, _SirioDropdownSelect_trigger, "f").getElementsByTagName("span")[0], "f");
            __classPrivateFieldGet(this, _SirioDropdownSelect_selectedContent, "f").textContent = __classPrivateFieldGet(this, _SirioDropdownSelect_placeholder, "f") || "";
            __classPrivateFieldSet(this, _SirioDropdownSelect_searchString, "", "f");
            __classPrivateFieldSet(this, _SirioDropdownSelect_items, [], "f");
            options.forEach((option, i) => {
                let item = document.createElement("li"), value = option.getAttribute("value");
                item.setAttribute("role", "option");
                item.id = id + "-" + i;
                item.classList.add(Constants_1.sirioPrefix + "dropdown-item");
                item.ariaSelected = "false";
                item.textContent = option.textContent;
                item.tabIndex = 0;
                if (value)
                    item.setAttribute("data-sirio-option-value", value);
                menu.appendChild(item);
                __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f").push(item);
                if (option.selected)
                    __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_handleItemClick).call(this, item, true);
            });
            dropdown.appendChild(menu);
            __classPrivateFieldSet(this, _SirioDropdownSelect_menu, menu, "f");
            __classPrivateFieldSet(this, _SirioDropdownSelect_defaultVPos, __classPrivateFieldGet(this, _SirioDropdownSelect_menu, "f").classList.contains("sirio-dropdown-menu-top") ? "top" : "bottom", "f");
            __classPrivateFieldSet(this, _SirioDropdownSelect_checkVPosTimeout, null, "f");
            __classPrivateFieldGet(this, _SirioDropdownSelect_trigger, "f").addEventListener("click", () => this.toggle());
            document.addEventListener("keydown", (event) => {
                __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_handleKeys).call(this, event);
            });
            __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_handleItems).call(this);
            window.addEventListener("scroll", () => {
                __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_adjustPosition).call(this);
            });
            window.addEventListener("resize", () => {
                __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_adjustPosition).call(this);
            });
            __classPrivateFieldGet(this, _SirioDropdownSelect_select, "f").addEventListener("focus", (event) => {
                __classPrivateFieldGet(this, _SirioDropdownSelect_select, "f").tabIndex = -1;
                __classPrivateFieldGet(this, _SirioDropdownSelect_trigger, "f").focus();
            });
            document.addEventListener("focus", () => __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_onBlur).call(this), true);
            (() => {
                SirioDropdownSelect.selects[selectId] = this;
            })();
        }
        else
            throw TypeError(`HTML element with id="'${selectId}'" is not a valid Sirio-Dropdown-Select.`);
    }
    static init() {
        SirioDropdownSelect.selects = {};
        let selectElements = Array.from(document.querySelectorAll(`[data-sirio-component="select"]`));
        selectElements.forEach(function (select) {
            SirioDropdownSelect.initComponent(select);
        });
    }
    static initComponent(select) {
        let id = select.id;
        if (select != null && !(id in SirioDropdownSelect.selects)) {
            try {
                new SirioDropdownSelect(id, select);
            }
            catch (e) {
            }
        }
    }
    static destroy(id) {
        if (id in SirioDropdownSelect.selects) {
            let select = SirioDropdownSelect.selects[id];
            select.removeEventListeners();
            delete SirioDropdownSelect.selects[id];
            select = null;
        }
    }
    static isDropdownSelect(id) {
        if (id)
            return true;
        return false;
    }
    static getSelectById(id) {
        return SirioDropdownSelect.selects[id];
    }
    isHidden() {
        if (__classPrivateFieldGet(this, _SirioDropdownSelect_menu, "f").getAttribute("data-sirio-visible") == "false")
            return true;
        else
            return false;
    }
    toggle() {
        let hidden = this.isHidden();
        if (hidden) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    show() {
        for (let key in SirioDropdownSelect.selects) {
            let select = SirioDropdownSelect.selects[key];
            if (!select.isHidden() && select != this) {
                select.hide();
            }
        }
        __classPrivateFieldGet(this, _SirioDropdownSelect_trigger, "f").setAttribute("aria-expanded", "true");
        __classPrivateFieldGet(this, _SirioDropdownSelect_menu, "f").setAttribute("data-sirio-visible", "true");
        document.addEventListener("click", SirioDropdownSelect.handleClick);
        __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_adjustPosition).call(this);
    }
    hide() {
        __classPrivateFieldGet(this, _SirioDropdownSelect_trigger, "f").setAttribute("aria-expanded", "false");
        __classPrivateFieldGet(this, _SirioDropdownSelect_menu, "f").setAttribute("data-sirio-visible", "false");
        __classPrivateFieldSet(this, _SirioDropdownSelect_searchIndex, 0, "f");
    }
    static handleClick(e) {
        let select = Object.values(SirioDropdownSelect.selects), i = 0;
        select.forEach((select) => {
            if (!select.isHidden()) {
                if (!__classPrivateFieldGet(select, _SirioDropdownSelect_dropdown, "f").contains(e.target)) {
                    select.hide();
                    i++;
                }
            }
            else
                i++;
        });
        if (i == select.length)
            document.removeEventListener("click", SirioDropdownSelect.handleClick);
    }
    getTriggerElement() {
        return __classPrivateFieldGet(this, _SirioDropdownSelect_trigger, "f");
    }
    getSelectElement() {
        return __classPrivateFieldGet(this, _SirioDropdownSelect_select, "f");
    }
    getMenuElement() {
        return __classPrivateFieldGet(this, _SirioDropdownSelect_menu, "f");
    }
    getItemElements() {
        return __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f");
    }
    getSelectedValues() {
        return __classPrivateFieldGet(this, _SirioDropdownSelect_selectedValues, "f");
    }
    isMultiple() {
        return __classPrivateFieldGet(this, _SirioDropdownSelect_multiple, "f");
    }
    enable() {
        __classPrivateFieldGet(this, _SirioDropdownSelect_select, "f").removeAttribute("disabled");
        __classPrivateFieldGet(this, _SirioDropdownSelect_trigger, "f").removeAttribute("disabled");
    }
    disable() {
        __classPrivateFieldGet(this, _SirioDropdownSelect_select, "f").setAttribute("disabled", "true");
        __classPrivateFieldGet(this, _SirioDropdownSelect_trigger, "f").setAttribute("disabled", "true");
    }
    setOptionElements(options) {
        let forceSelected = false;
        this.clearOptionElements();
        this.addOptionElements(options);
        if (!this.isMultiple())
            __classPrivateFieldSet(this, _SirioDropdownSelect_numSelected, 1, "f");
        options.forEach(option => {
            if (option.selected === true)
                forceSelected = true;
        });
        if (!forceSelected)
            __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_handleItemClick).call(this, __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f")[0], true);
    }
    addOptionElements(options) {
        let select = __classPrivateFieldGet(this, _SirioDropdownSelect_select, "f");
        options.forEach((option) => {
            var optionElement = document.createElement("option");
            optionElement.value = option.value;
            optionElement.text = option.text;
            optionElement.selected = option.selected;
            select.appendChild(optionElement);
            __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_createOptionElement).call(this, optionElement);
        });
        __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_handleItems).call(this);
    }
    clearOptionElements() {
        __classPrivateFieldGet(this, _SirioDropdownSelect_select, "f").innerHTML = "";
        __classPrivateFieldGet(this, _SirioDropdownSelect_menu, "f").innerHTML = "";
        __classPrivateFieldSet(this, _SirioDropdownSelect_items, [], "f");
        __classPrivateFieldSet(this, _SirioDropdownSelect_numSelected, 0, "f");
        __classPrivateFieldSet(this, _SirioDropdownSelect_selectedValues, [], "f");
        __classPrivateFieldGet(this, _SirioDropdownSelect_selectedContent, "f").textContent = __classPrivateFieldGet(this, _SirioDropdownSelect_placeholder, "f") || "";
    }
    setOnChange(onChange) {
        __classPrivateFieldSet(this, _SirioDropdownSelect_onChange, onChange, "f");
    }
    reset() {
        if (this.isMultiple()) {
            __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f").forEach((item) => {
                let value = item.getAttribute("data-sirio-option-value");
                __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_unselectItem).call(this, item, value || "");
            });
            __classPrivateFieldGet(this, _SirioDropdownSelect_selectedContent, "f").textContent = __classPrivateFieldGet(this, _SirioDropdownSelect_select, "f").title;
        }
        else {
            if (__classPrivateFieldGet(this, _SirioDropdownSelect_items, "f").length > 0)
                __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_handleItemClick).call(this, __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f")[0]);
        }
    }
    removeEventListeners() {
        __classPrivateFieldGet(this, _SirioDropdownSelect_trigger, "f").removeEventListener("click", () => this.toggle());
        document.removeEventListener("keydown", (event) => {
            __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_handleKeys).call(this, event);
        });
        window.removeEventListener("scroll", () => {
            __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_adjustPosition).call(this);
        });
        window.removeEventListener("resize", () => {
            __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_adjustPosition).call(this);
        });
        __classPrivateFieldGet(this, _SirioDropdownSelect_select, "f").removeEventListener("focus", (event) => {
            __classPrivateFieldGet(this, _SirioDropdownSelect_select, "f").tabIndex = -1;
            __classPrivateFieldGet(this, _SirioDropdownSelect_trigger, "f").focus();
        });
        document.removeEventListener("focus", () => __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_onBlur).call(this), true);
        document.removeEventListener("click", SirioDropdownSelect.handleClick);
    }
}
exports.SirioDropdownSelect = SirioDropdownSelect;
_SirioDropdownSelect_triggerId = new WeakMap(), _SirioDropdownSelect_trigger = new WeakMap(), _SirioDropdownSelect_select = new WeakMap(), _SirioDropdownSelect_placeholder = new WeakMap(), _SirioDropdownSelect_multiple = new WeakMap(), _SirioDropdownSelect_dropdown = new WeakMap(), _SirioDropdownSelect_numSelected = new WeakMap(), _SirioDropdownSelect_selectedValues = new WeakMap(), _SirioDropdownSelect_selectedContent = new WeakMap(), _SirioDropdownSelect_menu = new WeakMap(), _SirioDropdownSelect_items = new WeakMap(), _SirioDropdownSelect_searchString = new WeakMap(), _SirioDropdownSelect_searching = new WeakMap(), _SirioDropdownSelect_searchIndex = new WeakMap(), _SirioDropdownSelect_searchReset = new WeakMap(), _SirioDropdownSelect_disabled = new WeakMap(), _SirioDropdownSelect_onChange = new WeakMap(), _SirioDropdownSelect_defaultVPos = new WeakMap(), _SirioDropdownSelect_checkVPosTimeout = new WeakMap(), _SirioDropdownSelect_instances = new WeakSet(), _SirioDropdownSelect_onBlur = function _SirioDropdownSelect_onBlur() {
    if (!__classPrivateFieldGet(this, _SirioDropdownSelect_dropdown, "f").contains(document.activeElement)) {
        __classPrivateFieldGet(this, _SirioDropdownSelect_select, "f").removeAttribute("tabindex");
        __classPrivateFieldGet(this, _SirioDropdownSelect_dropdown, "f").removeEventListener("blur", __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_onBlur));
    }
}, _SirioDropdownSelect_handleKeys = function _SirioDropdownSelect_handleKeys(event) {
    let activeElement = document.activeElement;
    let key = event.key.toLowerCase();
    if (activeElement == __classPrivateFieldGet(this, _SirioDropdownSelect_trigger, "f")) {
        if (this.isHidden()) {
            if ((key == "arrowdown" && event.altKey) || key == "arrowup") {
                event.preventDefault();
                this.show();
            }
            else if ((key == "arrowdown" && !event.altKey) || key == "home") {
                event.preventDefault();
                this.show();
                __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f")[0].focus();
            }
            else if (key == "end") {
                event.preventDefault();
                this.show();
                __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f")[__classPrivateFieldGet(this, _SirioDropdownSelect_items, "f").length - 1].focus();
            }
        }
        else {
            if (key == "arrowdown") {
                event.preventDefault();
                __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f")[0].focus();
            }
            else if (key == "tab") {
                this.hide();
            }
        }
    }
    if (__classPrivateFieldGet(this, _SirioDropdownSelect_items, "f").includes(activeElement) && !this.isHidden()) {
        let index = __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f").indexOf(activeElement);
        switch (key) {
            case "arrowdown":
                event.preventDefault();
                if (index < __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f").length - 1) {
                    __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f")[index + 1].focus();
                }
                break;
            case "arrowup":
                event.preventDefault();
                if (index > 0) {
                    __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f")[index - 1].focus();
                }
                break;
            case "tab":
                this.hide();
                break;
            case "enter":
                event.preventDefault();
                __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f")[index].click();
                break;
            case "home":
                event.preventDefault();
                __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f")[0].focus();
                break;
            case "end":
                event.preventDefault();
                __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f")[__classPrivateFieldGet(this, _SirioDropdownSelect_items, "f").length - 1].focus();
                break;
        }
    }
    if (activeElement == __classPrivateFieldGet(this, _SirioDropdownSelect_trigger, "f") || __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f").includes(activeElement)) {
        __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_handleSearch).call(this, key);
    }
    if (!this.isHidden()) {
        event.preventDefault();
        switch (key) {
            case "escape":
                this.hide();
                break;
            case " ":
                activeElement.click();
                if (!this.isMultiple()) {
                    __classPrivateFieldGet(this, _SirioDropdownSelect_trigger, "f").focus();
                    this.hide();
                }
                break;
        }
    }
}, _SirioDropdownSelect_handleSearch = function _SirioDropdownSelect_handleSearch(key) {
    if (__classPrivateFieldGet(this, _SirioDropdownSelect_searchReset, "f"))
        clearInterval(__classPrivateFieldGet(this, _SirioDropdownSelect_searchReset, "f"));
    if (Constants_1.alphabeth.indexOf(key) != -1) {
        this.show();
        if (__classPrivateFieldGet(this, _SirioDropdownSelect_searchString, "f").length == 1) {
            if (__classPrivateFieldGet(this, _SirioDropdownSelect_searchString, "f").charAt(0) != key) {
                __classPrivateFieldSet(this, _SirioDropdownSelect_searchString, __classPrivateFieldSet(this, _SirioDropdownSelect_searchString, __classPrivateFieldGet(this, _SirioDropdownSelect_searchString, "f") + key, "f"), "f");
                __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_search).call(this);
            }
            else {
                __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_search).call(this, true);
            }
        }
        else {
            __classPrivateFieldSet(this, _SirioDropdownSelect_searchString, __classPrivateFieldSet(this, _SirioDropdownSelect_searchString, __classPrivateFieldGet(this, _SirioDropdownSelect_searchString, "f") + key, "f"), "f");
            __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_search).call(this);
        }
        __classPrivateFieldSet(this, _SirioDropdownSelect_searchReset, setTimeout(() => {
            __classPrivateFieldSet(this, _SirioDropdownSelect_searchString, "", "f");
            __classPrivateFieldSet(this, _SirioDropdownSelect_searchIndex, 0, "f");
        }, 600), "f");
    }
}, _SirioDropdownSelect_search = function _SirioDropdownSelect_search(sameKey = false) {
    var _a, _b;
    var _c, _d;
    let found = false;
    while (__classPrivateFieldGet(this, _SirioDropdownSelect_searching, "f"))
        ;
    if (!sameKey) {
        __classPrivateFieldSet(this, _SirioDropdownSelect_searchIndex, 0, "f");
        while (__classPrivateFieldGet(this, _SirioDropdownSelect_searchIndex, "f") < __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f").length) {
            if ((_a = __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f")[__classPrivateFieldGet(this, _SirioDropdownSelect_searchIndex, "f")].textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase().startsWith(__classPrivateFieldGet(this, _SirioDropdownSelect_searchString, "f"))) {
                __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f")[__classPrivateFieldGet(this, _SirioDropdownSelect_searchIndex, "f")].focus();
                found = true;
            }
            __classPrivateFieldSet(this, _SirioDropdownSelect_searchIndex, (_c = __classPrivateFieldGet(this, _SirioDropdownSelect_searchIndex, "f"), _c++, _c), "f");
            if (found) {
                __classPrivateFieldSet(this, _SirioDropdownSelect_searching, false, "f");
                break;
            }
        }
    }
    else {
        let startIndex = __classPrivateFieldGet(this, _SirioDropdownSelect_searchIndex, "f") - 1;
        while (__classPrivateFieldGet(this, _SirioDropdownSelect_searchIndex, "f") != startIndex) {
            if ((_b = __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f")[__classPrivateFieldGet(this, _SirioDropdownSelect_searchIndex, "f")].textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase().startsWith(__classPrivateFieldGet(this, _SirioDropdownSelect_searchString, "f"))) {
                __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f")[__classPrivateFieldGet(this, _SirioDropdownSelect_searchIndex, "f")].focus();
                found = true;
            }
            __classPrivateFieldSet(this, _SirioDropdownSelect_searchIndex, (_d = __classPrivateFieldGet(this, _SirioDropdownSelect_searchIndex, "f"), _d++, _d), "f");
            if (__classPrivateFieldGet(this, _SirioDropdownSelect_searchIndex, "f") == __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f").length)
                __classPrivateFieldSet(this, _SirioDropdownSelect_searchIndex, 0, "f");
            if (found) {
                __classPrivateFieldSet(this, _SirioDropdownSelect_searching, false, "f");
                break;
            }
        }
    }
}, _SirioDropdownSelect_handleItems = function _SirioDropdownSelect_handleItems() {
    __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f").forEach((item) => {
        item.onclick = (event) => {
            event.preventDefault();
            __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_handleItemClick).call(this, item);
        };
    });
}, _SirioDropdownSelect_handleItemClick = function _SirioDropdownSelect_handleItemClick(item, init = false) {
    let value = item.getAttribute("data-sirio-option-value");
    if (__classPrivateFieldGet(this, _SirioDropdownSelect_multiple, "f")) {
        if (item.classList.contains("active")) {
            __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_unselectItem).call(this, item, value || "");
            __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_setNotSelectedOption).call(this, value);
            __classPrivateFieldGet(this, _SirioDropdownSelect_selectedContent, "f").textContent = __classPrivateFieldGet(this, _SirioDropdownSelect_selectedContent, "f").textContent.replace(", " + item.textContent, "");
            __classPrivateFieldGet(this, _SirioDropdownSelect_selectedContent, "f").textContent = __classPrivateFieldGet(this, _SirioDropdownSelect_selectedContent, "f").textContent.replace(item.textContent + ", ", "");
            __classPrivateFieldGet(this, _SirioDropdownSelect_selectedContent, "f").textContent = __classPrivateFieldGet(this, _SirioDropdownSelect_selectedContent, "f").textContent.replace(item.textContent + "", "");
            if (__classPrivateFieldGet(this, _SirioDropdownSelect_numSelected, "f") == 0) {
                let placeholder = __classPrivateFieldGet(this, _SirioDropdownSelect_select, "f").title;
                __classPrivateFieldGet(this, _SirioDropdownSelect_selectedContent, "f").textContent = placeholder;
            }
        }
        else {
            __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_selectItem).call(this, item);
            __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_setSelectedOption).call(this, value);
            if (value) {
                if (__classPrivateFieldGet(this, _SirioDropdownSelect_numSelected, "f") > 1)
                    __classPrivateFieldGet(this, _SirioDropdownSelect_selectedContent, "f").textContent += ", " + item.textContent;
                else
                    __classPrivateFieldGet(this, _SirioDropdownSelect_selectedContent, "f").textContent = item.textContent;
            }
        }
    }
    else {
        __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f").forEach((item) => __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_unselectItem).call(this, item, value || ""));
        __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_selectItem).call(this, item);
        __classPrivateFieldGet(this, _SirioDropdownSelect_selectedValues, "f")[0] = value || "";
        __classPrivateFieldGet(this, _SirioDropdownSelect_select, "f").value = value || "";
        __classPrivateFieldGet(this, _SirioDropdownSelect_selectedContent, "f").textContent = item.textContent;
        if (!init) {
            __classPrivateFieldGet(this, _SirioDropdownSelect_trigger, "f").focus();
            this.hide();
        }
    }
    if (__classPrivateFieldGet(this, _SirioDropdownSelect_onChange, "f"))
        __classPrivateFieldGet(this, _SirioDropdownSelect_onChange, "f").call(this);
}, _SirioDropdownSelect_selectItem = function _SirioDropdownSelect_selectItem(item) {
    item.classList.add("active");
    item.setAttribute("aria-selected", "true");
}, _SirioDropdownSelect_unselectItem = function _SirioDropdownSelect_unselectItem(item, value) {
    var _a;
    item.classList.remove("active");
    item.setAttribute("aria-selected", "false");
    (_a = __classPrivateFieldGet(this, _SirioDropdownSelect_select, "f").querySelector(`option[value="${value}"]`)) === null || _a === void 0 ? void 0 : _a.removeAttribute("selected");
}, _SirioDropdownSelect_setSelectedOption = function _SirioDropdownSelect_setSelectedOption(value) {
    var _a;
    let option = __classPrivateFieldGet(this, _SirioDropdownSelect_select, "f").querySelector("option[value='" + value + "']");
    if (option) {
        option.setAttribute("selected", "true");
        option.selected = true;
    }
    if (value) {
        __classPrivateFieldGet(this, _SirioDropdownSelect_selectedValues, "f").push(value);
        __classPrivateFieldSet(this, _SirioDropdownSelect_numSelected, (_a = __classPrivateFieldGet(this, _SirioDropdownSelect_numSelected, "f"), _a++, _a), "f");
    }
}, _SirioDropdownSelect_setNotSelectedOption = function _SirioDropdownSelect_setNotSelectedOption(value) {
    var _a;
    let option = __classPrivateFieldGet(this, _SirioDropdownSelect_select, "f").querySelector('option[value="' + value + '"]');
    if (option) {
        option.removeAttribute("selected");
        option.selected = false;
    }
    if (value) {
        let toRemoveIndex = __classPrivateFieldGet(this, _SirioDropdownSelect_selectedValues, "f").indexOf(value);
        __classPrivateFieldGet(this, _SirioDropdownSelect_selectedValues, "f").splice(toRemoveIndex, 1);
        __classPrivateFieldSet(this, _SirioDropdownSelect_numSelected, (_a = __classPrivateFieldGet(this, _SirioDropdownSelect_numSelected, "f"), _a--, _a), "f");
    }
}, _SirioDropdownSelect_adjustPosition = function _SirioDropdownSelect_adjustPosition() {
    if (!this.isHidden()) {
        __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_adjustVerticalPosition).call(this);
    }
}, _SirioDropdownSelect_adjustVerticalPosition = function _SirioDropdownSelect_adjustVerticalPosition() {
    if (__classPrivateFieldGet(this, _SirioDropdownSelect_checkVPosTimeout, "f"))
        clearTimeout(__classPrivateFieldGet(this, _SirioDropdownSelect_checkVPosTimeout, "f"));
    __classPrivateFieldSet(this, _SirioDropdownSelect_checkVPosTimeout, setTimeout(() => {
        const menuHeight = __classPrivateFieldGet(this, _SirioDropdownSelect_menu, "f").offsetHeight;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        let currentVerticalPos = __classPrivateFieldGet(this, _SirioDropdownSelect_menu, "f").classList.contains("sirio-dropdown-menu-top") ? "top" : "bottom";
        const rect = __classPrivateFieldGet(this, _SirioDropdownSelect_menu, "f").getBoundingClientRect();
        if (currentVerticalPos == __classPrivateFieldGet(this, _SirioDropdownSelect_defaultVPos, "f")) {
            if (currentVerticalPos == "bottom" && rect.bottom > windowHeight) {
                if (__classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_checkTopPosition).call(this, menuHeight))
                    __classPrivateFieldGet(this, _SirioDropdownSelect_menu, "f").classList.add("sirio-dropdown-menu-top");
            }
            else if (currentVerticalPos == "top" && rect.top < 0) {
                if (__classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_checkBottomPosition).call(this, menuHeight, windowHeight))
                    __classPrivateFieldGet(this, _SirioDropdownSelect_menu, "f").classList.remove("sirio-dropdown-menu-top");
            }
        }
        else {
            if (currentVerticalPos == "top" && __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_checkBottomPosition).call(this, menuHeight, windowHeight))
                __classPrivateFieldGet(this, _SirioDropdownSelect_menu, "f").classList.remove("sirio-dropdown-menu-top");
            else if (currentVerticalPos == "bottom" && __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_checkTopPosition).call(this, menuHeight))
                __classPrivateFieldGet(this, _SirioDropdownSelect_menu, "f").classList.add("sirio-dropdown-menu-top");
        }
    }, 50), "f");
}, _SirioDropdownSelect_checkTopPosition = function _SirioDropdownSelect_checkTopPosition(menuHeight) {
    let style = window.getComputedStyle(__classPrivateFieldGet(this, _SirioDropdownSelect_menu, "f")), matrix = new WebKitCSSMatrix(style.transform), translateY = matrix.m41;
    let btnTopPos = __classPrivateFieldGet(this, _SirioDropdownSelect_trigger, "f").getBoundingClientRect().top;
    if (btnTopPos - (translateY + menuHeight) > 0)
        return true;
    return false;
}, _SirioDropdownSelect_checkBottomPosition = function _SirioDropdownSelect_checkBottomPosition(menuHeight, windowHeight) {
    let style = window.getComputedStyle(__classPrivateFieldGet(this, _SirioDropdownSelect_menu, "f")), matrix = new WebKitCSSMatrix(style.transform), translateY = matrix.m41;
    let btnBottomPos = __classPrivateFieldGet(this, _SirioDropdownSelect_trigger, "f").getBoundingClientRect().bottom;
    if (btnBottomPos + translateY + menuHeight < windowHeight)
        return true;
    return false;
}, _SirioDropdownSelect_createOptionElement = function _SirioDropdownSelect_createOptionElement(option) {
    let item = document.createElement("li"), value = option.getAttribute("value");
    item.setAttribute("role", "option");
    item.id = __classPrivateFieldGet(this, _SirioDropdownSelect_select, "f").id + "-" + __classPrivateFieldGet(this, _SirioDropdownSelect_menu, "f").childElementCount;
    item.classList.add(Constants_1.sirioPrefix + "dropdown-item");
    item.ariaSelected = "false";
    item.textContent = option.textContent;
    item.tabIndex = 0;
    if (value)
        item.setAttribute("data-sirio-option-value", value);
    __classPrivateFieldGet(this, _SirioDropdownSelect_menu, "f").appendChild(item);
    __classPrivateFieldGet(this, _SirioDropdownSelect_items, "f").push(item);
    if (option.selected)
        __classPrivateFieldGet(this, _SirioDropdownSelect_instances, "m", _SirioDropdownSelect_handleItemClick).call(this, item, true);
};


/***/ }),

/***/ 171:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SirioFileUpload_instances, _SirioFileUpload_inputElementId, _SirioFileUpload_inputElement, _SirioFileUpload_upload, _SirioFileUpload_fileListElement, _SirioFileUpload_multiple, _SirioFileUpload_maxFiles, _SirioFileUpload_fileDictionary, _SirioFileUpload_createFileListElement, _SirioFileUpload_createFileChip, _SirioFileUpload_onDismiss;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SirioFileUpload = void 0;
const Constants_1 = __webpack_require__(738);
const SirioChip_1 = __webpack_require__(157);
class SirioFileUpload {
    constructor(id, upload) {
        _SirioFileUpload_instances.add(this);
        _SirioFileUpload_inputElementId.set(this, void 0);
        _SirioFileUpload_inputElement.set(this, void 0);
        _SirioFileUpload_upload.set(this, void 0);
        _SirioFileUpload_fileListElement.set(this, void 0);
        _SirioFileUpload_multiple.set(this, void 0);
        _SirioFileUpload_maxFiles.set(this, void 0);
        _SirioFileUpload_fileDictionary.set(this, void 0);
        if (SirioFileUpload.isFileUpload(id)) {
            __classPrivateFieldSet(this, _SirioFileUpload_inputElementId, id, "f");
            __classPrivateFieldSet(this, _SirioFileUpload_upload, upload, "f");
            __classPrivateFieldSet(this, _SirioFileUpload_inputElement, document.getElementById(id), "f");
            __classPrivateFieldSet(this, _SirioFileUpload_fileListElement, null, "f");
            __classPrivateFieldSet(this, _SirioFileUpload_fileDictionary, {}, "f");
            __classPrivateFieldSet(this, _SirioFileUpload_multiple, __classPrivateFieldGet(this, _SirioFileUpload_inputElement, "f").getAttribute('multiple') ? true : false, "f");
            if (__classPrivateFieldGet(this, _SirioFileUpload_inputElement, "f").hasAttribute('data-sirio-maxfiles')) {
                let maxFiles = __classPrivateFieldGet(this, _SirioFileUpload_inputElement, "f").getAttribute('data-sirio-maxfiles');
                if (typeof maxFiles === 'string')
                    __classPrivateFieldSet(this, _SirioFileUpload_maxFiles, parseInt(maxFiles), "f");
            }
            __classPrivateFieldGet(this, _SirioFileUpload_inputElement, "f").onchange = (event) => {
                var _a, _b;
                let length = ((_a = __classPrivateFieldGet(this, _SirioFileUpload_inputElement, "f").files) === null || _a === void 0 ? void 0 : _a.length) + Object.keys(__classPrivateFieldGet(this, _SirioFileUpload_fileDictionary, "f")).length;
                if (__classPrivateFieldGet(this, _SirioFileUpload_multiple, "f") && __classPrivateFieldGet(this, _SirioFileUpload_maxFiles, "f") && length > __classPrivateFieldGet(this, _SirioFileUpload_maxFiles, "f"))
                    length = __classPrivateFieldGet(this, _SirioFileUpload_maxFiles, "f") - Object.keys(__classPrivateFieldGet(this, _SirioFileUpload_fileDictionary, "f")).length;
                else
                    length = (_b = __classPrivateFieldGet(this, _SirioFileUpload_inputElement, "f").files) === null || _b === void 0 ? void 0 : _b.length;
                for (let i = 0; i < length; i++) {
                    if (!__classPrivateFieldGet(this, _SirioFileUpload_fileListElement, "f"))
                        __classPrivateFieldGet(this, _SirioFileUpload_instances, "m", _SirioFileUpload_createFileListElement).call(this);
                    let fileName = __classPrivateFieldGet(this, _SirioFileUpload_inputElement, "f").files[i].name;
                    if (__classPrivateFieldGet(this, _SirioFileUpload_fileDictionary, "f")[fileName] == null) {
                        __classPrivateFieldGet(this, _SirioFileUpload_instances, "m", _SirioFileUpload_createFileChip).call(this, fileName);
                    }
                    __classPrivateFieldGet(this, _SirioFileUpload_fileDictionary, "f")[fileName] = __classPrivateFieldGet(this, _SirioFileUpload_inputElement, "f").files[i];
                }
                __classPrivateFieldGet(this, _SirioFileUpload_inputElement, "f").value = '';
            };
        }
        else
            throw TypeError(`HTML element with id="'${id}'" is not a valid Sirio-File-Upload.`);
    }
    static init() {
        SirioFileUpload.fileUploads = {};
        let uploadElements = Array.from(document.querySelectorAll(`[data-sirio-component="upload"]`));
        uploadElements.forEach(function (upload) {
            SirioFileUpload.initComponent(upload);
        });
    }
    static initComponent(upload) {
        let inputElement = upload.getElementsByTagName("input")[0];
        if ((inputElement === null || inputElement === void 0 ? void 0 : inputElement.type.toLowerCase()) == "file") {
            let id = inputElement === null || inputElement === void 0 ? void 0 : inputElement.id;
            if (id != null) {
                let fileUploadObj = new SirioFileUpload(id, upload);
                if (fileUploadObj != undefined)
                    SirioFileUpload.fileUploads[id] = fileUploadObj;
            }
        }
        else {
            return;
        }
    }
    static destroy(id) {
        if (id in SirioFileUpload.fileUploads) {
            let fileUpload = SirioFileUpload.getFileUploadById(id);
            let inputElement = fileUpload.getInputElement();
            if (inputElement != null)
                inputElement.onchange = null;
            delete SirioFileUpload.fileUploads[id];
            fileUpload = null;
        }
    }
    static isFileUpload(id) {
        const validTypes = ["file"];
        const triggerElement = document.getElementById(id);
        if (triggerElement != null) {
            let type = triggerElement.getAttribute("type");
            if (typeof type === "string") {
                if (validTypes.includes(type))
                    return true;
                else
                    return false;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    static getFileUploadById(id) {
        return SirioFileUpload.fileUploads[id];
    }
    getInputElement() {
        return __classPrivateFieldGet(this, _SirioFileUpload_inputElement, "f");
    }
    getFileListElement() {
        return __classPrivateFieldGet(this, _SirioFileUpload_fileListElement, "f");
    }
    getUploadedFiles() {
        return Object.values(__classPrivateFieldGet(this, _SirioFileUpload_fileDictionary, "f"));
    }
}
exports.SirioFileUpload = SirioFileUpload;
_SirioFileUpload_inputElementId = new WeakMap(), _SirioFileUpload_inputElement = new WeakMap(), _SirioFileUpload_upload = new WeakMap(), _SirioFileUpload_fileListElement = new WeakMap(), _SirioFileUpload_multiple = new WeakMap(), _SirioFileUpload_maxFiles = new WeakMap(), _SirioFileUpload_fileDictionary = new WeakMap(), _SirioFileUpload_instances = new WeakSet(), _SirioFileUpload_createFileListElement = function _SirioFileUpload_createFileListElement() {
    let ul = document.createElement("ul");
    ul.classList.add(Constants_1.sirioPrefix + "upload-file-list");
    __classPrivateFieldGet(this, _SirioFileUpload_upload, "f").appendChild(ul);
    __classPrivateFieldSet(this, _SirioFileUpload_fileListElement, ul, "f");
}, _SirioFileUpload_createFileChip = function _SirioFileUpload_createFileChip(fileName) {
    var _a;
    let li = document.createElement("li");
    let chip = document.createElement("div");
    chip.classList.add(Constants_1.sirioPrefix + "chip");
    let label = document.createElement("span");
    label.classList.add(Constants_1.sirioPrefix + "chip-label");
    label.textContent = fileName;
    let dismissButton = document.createElement("button");
    dismissButton.classList.add(Constants_1.sirioPrefix + "btn");
    dismissButton.classList.add(Constants_1.sirioPrefix + "btn-primary");
    dismissButton.setAttribute("data-sirio-dismiss", "file");
    let dismissButtonIcon = document.createElement("span");
    dismissButtonIcon.classList.add("fas");
    dismissButtonIcon.classList.add("fa-times");
    dismissButtonIcon.setAttribute("aria-hidden", "true");
    let dismissButtonLabel = document.createElement("span");
    dismissButtonLabel.classList.add("sr-only");
    dismissButtonLabel.textContent = "Elimina file";
    dismissButton.appendChild(dismissButtonIcon);
    dismissButton.appendChild(dismissButtonLabel);
    chip.appendChild(label);
    chip.appendChild(dismissButton);
    li.appendChild(chip);
    (_a = __classPrivateFieldGet(this, _SirioFileUpload_fileListElement, "f")) === null || _a === void 0 ? void 0 : _a.appendChild(li);
    try {
        new SirioChip_1.SirioChip(li, fileName, dismissButton, () => __classPrivateFieldGet(this, _SirioFileUpload_instances, "m", _SirioFileUpload_onDismiss).call(this, fileName));
    }
    catch (e) {
    }
}, _SirioFileUpload_onDismiss = function _SirioFileUpload_onDismiss(fileName) {
    var _a;
    delete __classPrivateFieldGet(this, _SirioFileUpload_fileDictionary, "f")[fileName];
    if (Object.keys(__classPrivateFieldGet(this, _SirioFileUpload_fileDictionary, "f")).length == 0) {
        (_a = __classPrivateFieldGet(this, _SirioFileUpload_fileListElement, "f")) === null || _a === void 0 ? void 0 : _a.remove();
        __classPrivateFieldSet(this, _SirioFileUpload_fileListElement, null, "f");
    }
};


/***/ }),

/***/ 686:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SirioPopover_instances, _SirioPopover_isResizing, _SirioPopover_handleClick, _SirioPopover_handleResize, _SirioPopover_toggle, _SirioPopover_handleTriggerTab, _SirioPopover_handlePopoverTab;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SirioPopover = void 0;
const SirioTooltip_1 = __webpack_require__(713);
class SirioPopover extends SirioTooltip_1.SirioTooltip {
    constructor() {
        super(...arguments);
        _SirioPopover_instances.add(this);
        _SirioPopover_isResizing.set(this, false);
        _SirioPopover_handleClick.set(this, (event) => {
            let target = event.target;
            if (!this.element.contains(target) && !this.triggerElement.contains(target)) {
                this.hide();
            }
        });
        _SirioPopover_handleResize.set(this, (event) => {
            var _a;
            if (!__classPrivateFieldGet(this, _SirioPopover_isResizing, "f") && !((_a = this.element) === null || _a === void 0 ? void 0 : _a.hidden)) {
                this.showElement("popover", true);
            }
        });
    }
    static init() {
        let triggerElements = document.querySelectorAll(`[data-sirio-toggle="popover"]`);
        triggerElements.forEach(function (trigger) {
            SirioPopover.initComponent(trigger);
        });
    }
    static initComponent(trigger) {
        let popover = new SirioPopover(trigger, 0);
        trigger.addEventListener("click", function (event) {
            event.preventDefault();
            __classPrivateFieldGet(popover, _SirioPopover_instances, "m", _SirioPopover_toggle).call(popover);
        });
        window.addEventListener("keydown", function (event) {
            if (event.key === "Escape" || event.key === "Esc") {
                popover.hide();
            }
        });
        SirioPopover.popovers.set(trigger, popover);
    }
    static destroy(trigger) {
        let popover = SirioPopover.popovers.get(trigger);
        if (popover) {
            popover.removeEventListeners();
            SirioPopover.popovers.delete(trigger);
            popover = null;
        }
    }
    static getPopoverByElement(element) {
        return SirioPopover.popovers.get(element) || null;
    }
    show() {
        this.showElement("popover");
        if (this.triggerElement)
            this.triggerElement.addEventListener("keydown", (event) => __classPrivateFieldGet(this, _SirioPopover_instances, "m", _SirioPopover_handleTriggerTab).call(this, event));
        document.addEventListener("click", __classPrivateFieldGet(this, _SirioPopover_handleClick, "f"));
        window.addEventListener("resize", __classPrivateFieldGet(this, _SirioPopover_handleResize, "f"));
    }
    hide() {
        var _a;
        if (!this.hidden) {
            this.triggerElement.addEventListener("keydown", (event) => __classPrivateFieldGet(this, _SirioPopover_instances, "m", _SirioPopover_handleTriggerTab).call(this, event));
            this.triggerElement.removeAttribute("style");
            this.triggerElement.removeAttribute("aria-describedby");
            (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
            this.element = null;
            this.hidden = true;
            document.removeEventListener("click", __classPrivateFieldGet(this, _SirioPopover_handleClick, "f"));
            window.removeEventListener("resize", __classPrivateFieldGet(this, _SirioPopover_handleResize, "f"));
        }
    }
    removeEventListeners() {
        let popover = this;
        this.triggerElement.removeEventListener("click", function (event) {
            event.preventDefault();
            __classPrivateFieldGet(popover, _SirioPopover_instances, "m", _SirioPopover_toggle).call(popover);
        });
        window.removeEventListener("keydown", function (event) {
            if (event.key === "Escape" || event.key === "Esc") {
                popover.hide();
            }
        });
        this.triggerElement.removeEventListener("keydown", (event) => __classPrivateFieldGet(this, _SirioPopover_instances, "m", _SirioPopover_handleTriggerTab).call(this, event));
        document.removeEventListener("click", __classPrivateFieldGet(this, _SirioPopover_handleClick, "f"));
        window.removeEventListener("resize", __classPrivateFieldGet(this, _SirioPopover_handleResize, "f"));
    }
}
exports.SirioPopover = SirioPopover;
_SirioPopover_isResizing = new WeakMap(), _SirioPopover_handleClick = new WeakMap(), _SirioPopover_handleResize = new WeakMap(), _SirioPopover_instances = new WeakSet(), _SirioPopover_toggle = function _SirioPopover_toggle() {
    if (this.hidden) {
        this.show();
    }
    else {
        this.hide();
    }
}, _SirioPopover_handleTriggerTab = function _SirioPopover_handleTriggerTab(event) {
    var _a, _b;
    let e = event;
    let key = e.key.toLowerCase();
    if (key === "tab" && event.shiftKey) {
        this.hide();
    }
    else if (key === "tab") {
        if (!this.hidden && this.element) {
            this.element.tabIndex = 0;
            (_a = this.element) === null || _a === void 0 ? void 0 : _a.focus();
            this.element.removeAttribute("tabIndex");
            (_b = this.element) === null || _b === void 0 ? void 0 : _b.addEventListener("keydown", (event) => __classPrivateFieldGet(this, _SirioPopover_instances, "m", _SirioPopover_handlePopoverTab).call(this, event));
            if (this.triggerElement)
                this.triggerElement.removeEventListener("keydown", (event) => __classPrivateFieldGet(this, _SirioPopover_instances, "m", _SirioPopover_handleTriggerTab).call(this, event));
        }
    }
}, _SirioPopover_handlePopoverTab = function _SirioPopover_handlePopoverTab(event, dispatchEvent = true) {
    var _a, _b;
    if (!this.hidden && this.element) {
        let focusableEls = this.element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
        let key = event.key.toLowerCase();
        if (key === "tab" && event.shiftKey) {
            if (document.activeElement === focusableEls[0]) {
                this.triggerElement.focus();
                this.hide();
                (_a = this.element) === null || _a === void 0 ? void 0 : _a.removeEventListener("keydown", (event) => __classPrivateFieldGet(this, _SirioPopover_instances, "m", _SirioPopover_handlePopoverTab).call(this, event, false));
                event.preventDefault();
            }
        }
        else if (key === "tab") {
            if (document.activeElement === focusableEls[focusableEls.length - 1]) {
                this.triggerElement.focus();
                this.hide();
                (_b = this.element) === null || _b === void 0 ? void 0 : _b.removeEventListener("keydown", (event) => __classPrivateFieldGet(this, _SirioPopover_instances, "m", _SirioPopover_handlePopoverTab).call(this, event, false));
            }
        }
    }
};
SirioPopover.popovers = new Map();


/***/ }),

/***/ 223:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SirioSlider_instances, _SirioSlider_sliderEl, _SirioSlider_inputNumberEl, _SirioSlider_rangeEl, _SirioSlider_minValue, _SirioSlider_maxValue, _SirioSlider_updateSlider, _SirioSlider_updateInputNumber;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SirioSlider = void 0;
const Constants_1 = __webpack_require__(738);
class SirioSlider {
    constructor(sliderEl, inputNumberEl, rangeEl) {
        _SirioSlider_instances.add(this);
        _SirioSlider_sliderEl.set(this, void 0);
        _SirioSlider_inputNumberEl.set(this, void 0);
        _SirioSlider_rangeEl.set(this, void 0);
        _SirioSlider_minValue.set(this, void 0);
        _SirioSlider_maxValue.set(this, void 0);
        __classPrivateFieldSet(this, _SirioSlider_sliderEl, sliderEl, "f");
        __classPrivateFieldSet(this, _SirioSlider_inputNumberEl, inputNumberEl, "f");
        __classPrivateFieldSet(this, _SirioSlider_rangeEl, rangeEl, "f");
        let minString = __classPrivateFieldGet(this, _SirioSlider_sliderEl, "f").getAttribute("min");
        let maxString = __classPrivateFieldGet(this, _SirioSlider_sliderEl, "f").getAttribute("max");
        let valueString = __classPrivateFieldGet(this, _SirioSlider_sliderEl, "f").value;
        let numbers = "0123456789";
        if (minString == null)
            throw TypeError("SirioSlider: min value is missing");
        if (maxString == null)
            throw TypeError("SirioSlider: max value is missing");
        minString = minString.trim();
        for (let i = 0; i < minString.length; i++) {
            if (i == 0 && minString[i] == "-")
                continue; // numero negativo
            if (minString[i] == " ") {
                minString = minString.substring(0, i); // ignora tutto quello che c'è dopo lo spazio
                break;
            }
            else if (!numbers.includes(minString[i]))
                throw TypeError("SirioSlider: min value is not a number");
        }
        if (minString == "")
            throw TypeError("SirioSlider: min value is missing");
        if (minString == "-")
            throw TypeError("SirioSlider: min value is not a number");
        maxString = maxString.trim();
        for (let i = 0; i < maxString.length; i++) {
            if (i == 0 && maxString[i] == "-")
                continue;
            if (maxString[i] == " ") {
                maxString = maxString.substring(0, i);
                break;
            }
            else if (!numbers.includes(maxString[i]))
                throw TypeError("SirioSlider: max value is not a number");
        }
        if (maxString == "")
            throw TypeError("SirioSlider: max value is missing");
        if (maxString == "-")
            throw TypeError("SirioSlider: max value is not a number");
        __classPrivateFieldSet(this, _SirioSlider_minValue, parseInt(minString), "f");
        __classPrivateFieldSet(this, _SirioSlider_maxValue, parseInt(maxString), "f");
        if (valueString == null) {
            valueString = __classPrivateFieldGet(this, _SirioSlider_minValue, "f").toFixed().toString();
            sliderEl.style.setProperty("--val", valueString);
            inputNumberEl.value = valueString;
        }
        else {
            valueString = valueString.trim();
            for (let i = 0; i < valueString.length; i++) {
                if (i == 0 && valueString[i] == "-")
                    continue;
                if (valueString[i] == " ") {
                    valueString = valueString.substring(0, i);
                    break;
                }
                else if (!numbers.includes(valueString[i]))
                    throw TypeError("SirioSlider: value is not a number");
            }
        }
        if (valueString == "" || valueString == "-") {
            valueString = __classPrivateFieldGet(this, _SirioSlider_minValue, "f").toFixed().toString();
            sliderEl.style.setProperty("--val", valueString);
            inputNumberEl.value = valueString;
        }
        rangeEl.innerHTML = `<span>${minString}</span><span>${maxString}</span>`;
        sliderEl.style.setProperty("--min", minString);
        sliderEl.style.setProperty("--max", maxString);
        sliderEl.style.setProperty("--val", valueString);
        inputNumberEl.value = valueString;
        __classPrivateFieldGet(this, _SirioSlider_inputNumberEl, "f").addEventListener("input", (event) => {
            event.preventDefault();
            __classPrivateFieldGet(this, _SirioSlider_instances, "m", _SirioSlider_updateSlider).call(this);
        });
        __classPrivateFieldGet(this, _SirioSlider_sliderEl, "f").addEventListener("input", (event) => {
            event.preventDefault();
            __classPrivateFieldGet(this, _SirioSlider_instances, "m", _SirioSlider_updateInputNumber).call(this);
        });
        __classPrivateFieldGet(this, _SirioSlider_sliderEl, "f").addEventListener("click", (event) => {
            event.preventDefault();
            __classPrivateFieldGet(this, _SirioSlider_instances, "m", _SirioSlider_updateInputNumber).call(this);
        });
    }
    static init() {
        SirioSlider.sliders = {};
        let sliderComponentElements = Array.from(document.querySelectorAll(`[data-sirio-component="slider"]`));
        sliderComponentElements.forEach(function (sliderComponentEl) {
            SirioSlider.initComponent(sliderComponentEl);
        });
    }
    static initComponent(sliderComponentEl) {
        let sliderEl = null;
        let inputNumberEl = null;
        let inputEls = Array.from(sliderComponentEl.getElementsByTagName("input"));
        inputEls.forEach(function (inputEl) {
            let type = inputEl.getAttribute("type");
            switch (type) {
                case "range":
                    sliderEl = inputEl;
                    break;
                case "number":
                    inputNumberEl = inputEl;
                    break;
            }
        });
        let rangeLabelsEls = sliderComponentEl.getElementsByClassName(Constants_1.sirioPrefix + "slider-range");
        if (rangeLabelsEls.length > 0 && sliderEl != null && inputNumberEl != null) {
            let id = sliderEl.id;
            let rangeLabelEl = rangeLabelsEls[0];
            let sirioSliderObj = new SirioSlider(sliderEl, inputNumberEl, rangeLabelEl);
            SirioSlider.sliders[id] = sirioSliderObj;
        }
    }
    static destroy(id) {
        let sirioSliderObj = SirioSlider.getSliderById(id);
        sirioSliderObj.removeEventListeners();
        delete SirioSlider.sliders[id];
        sirioSliderObj = null;
    }
    static getSliderById(id) {
        return SirioSlider.sliders[id];
    }
    getMinValue() {
        return __classPrivateFieldGet(this, _SirioSlider_minValue, "f");
    }
    getMaxValue() {
        return __classPrivateFieldGet(this, _SirioSlider_maxValue, "f");
    }
    getInputNumberEl() {
        return __classPrivateFieldGet(this, _SirioSlider_inputNumberEl, "f");
    }
    getSliderEl() {
        return __classPrivateFieldGet(this, _SirioSlider_sliderEl, "f");
    }
    getMinMaxEl() {
        return __classPrivateFieldGet(this, _SirioSlider_rangeEl, "f");
    }
    getValue() {
        return parseInt(__classPrivateFieldGet(this, _SirioSlider_sliderEl, "f").value);
    }
    setValue(value) {
        let stringValue;
        if (value < __classPrivateFieldGet(this, _SirioSlider_minValue, "f")) {
            stringValue = __classPrivateFieldGet(this, _SirioSlider_minValue, "f").toString();
        }
        else if (value > __classPrivateFieldGet(this, _SirioSlider_maxValue, "f")) {
            stringValue = __classPrivateFieldGet(this, _SirioSlider_maxValue, "f").toString();
        }
        else {
            stringValue = value.toString();
        }
        __classPrivateFieldGet(this, _SirioSlider_sliderEl, "f").style.setProperty("--val", stringValue);
        __classPrivateFieldGet(this, _SirioSlider_inputNumberEl, "f").value = stringValue;
        __classPrivateFieldGet(this, _SirioSlider_sliderEl, "f").value = stringValue;
    }
    removeEventListeners() {
        __classPrivateFieldGet(this, _SirioSlider_sliderEl, "f").removeEventListener("input", (event) => {
            event.preventDefault();
            __classPrivateFieldGet(this, _SirioSlider_instances, "m", _SirioSlider_updateInputNumber).call(this);
        });
        __classPrivateFieldGet(this, _SirioSlider_sliderEl, "f").removeEventListener("click", (event) => {
            event.preventDefault();
            __classPrivateFieldGet(this, _SirioSlider_instances, "m", _SirioSlider_updateInputNumber).call(this);
        });
        __classPrivateFieldGet(this, _SirioSlider_inputNumberEl, "f").removeEventListener("input", (event) => {
            event.preventDefault();
            __classPrivateFieldGet(this, _SirioSlider_instances, "m", _SirioSlider_updateSlider).call(this);
        });
    }
}
exports.SirioSlider = SirioSlider;
_SirioSlider_sliderEl = new WeakMap(), _SirioSlider_inputNumberEl = new WeakMap(), _SirioSlider_rangeEl = new WeakMap(), _SirioSlider_minValue = new WeakMap(), _SirioSlider_maxValue = new WeakMap(), _SirioSlider_instances = new WeakSet(), _SirioSlider_updateSlider = function _SirioSlider_updateSlider() {
    let newValue = parseInt(__classPrivateFieldGet(this, _SirioSlider_inputNumberEl, "f").value);
    if (newValue < __classPrivateFieldGet(this, _SirioSlider_minValue, "f")) {
        __classPrivateFieldGet(this, _SirioSlider_sliderEl, "f").style.setProperty("--val", __classPrivateFieldGet(this, _SirioSlider_minValue, "f").toString());
        __classPrivateFieldGet(this, _SirioSlider_inputNumberEl, "f").value = __classPrivateFieldGet(this, _SirioSlider_minValue, "f").toString();
    }
    else if (newValue > __classPrivateFieldGet(this, _SirioSlider_maxValue, "f")) {
        __classPrivateFieldGet(this, _SirioSlider_sliderEl, "f").style.setProperty("--val", __classPrivateFieldGet(this, _SirioSlider_maxValue, "f").toString());
        __classPrivateFieldGet(this, _SirioSlider_inputNumberEl, "f").value = __classPrivateFieldGet(this, _SirioSlider_maxValue, "f").toString();
    }
    else {
        __classPrivateFieldGet(this, _SirioSlider_sliderEl, "f").style.setProperty("--val", __classPrivateFieldGet(this, _SirioSlider_inputNumberEl, "f").value);
    }
    __classPrivateFieldGet(this, _SirioSlider_sliderEl, "f").value = __classPrivateFieldGet(this, _SirioSlider_inputNumberEl, "f").value;
}, _SirioSlider_updateInputNumber = function _SirioSlider_updateInputNumber() {
    __classPrivateFieldGet(this, _SirioSlider_sliderEl, "f").style.setProperty("--val", __classPrivateFieldGet(this, _SirioSlider_inputNumberEl, "f").value);
    __classPrivateFieldGet(this, _SirioSlider_inputNumberEl, "f").value = __classPrivateFieldGet(this, _SirioSlider_sliderEl, "f").value;
};
SirioSlider.sliders = {};


/***/ }),

/***/ 181:
/***/ (function(__unused_webpack_module, exports) {


var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SirioSticky_instances, _SirioSticky_stickyContainer, _SirioSticky_wrapper, _SirioSticky_isSticky, _SirioSticky_checkToSticky, _SirioSticky_checkToUnsticky, _SirioSticky_setSticky, _SirioSticky_unsetSticky, _SirioSticky_getUnstickyStartTrigger;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SirioSticky = void 0;
class SirioSticky {
    constructor(stickyContainer) {
        _SirioSticky_instances.add(this);
        _SirioSticky_stickyContainer.set(this, void 0);
        _SirioSticky_wrapper.set(this, void 0);
        _SirioSticky_isSticky.set(this, void 0);
        __classPrivateFieldSet(this, _SirioSticky_stickyContainer, stickyContainer, "f");
        __classPrivateFieldSet(this, _SirioSticky_wrapper, null, "f");
        __classPrivateFieldSet(this, _SirioSticky_isSticky, false, "f");
    }
    static init() {
        window.removeEventListener("scroll", SirioSticky.handleScroll);
        window.removeEventListener("resize", SirioSticky.handleResize);
        SirioSticky.stickys = new Map();
        SirioSticky.lastScrollTop = 0;
        SirioSticky.cumulativeHeight = 0;
        let styckyElements = document.querySelectorAll(`[data-sirio-component="sticky"]`);
        styckyElements.forEach(function (sticky) {
            SirioSticky.initComponent(sticky);
        });
        window.addEventListener("scroll", SirioSticky.handleScroll);
        window.addEventListener("resize", SirioSticky.handleResize);
    }
    static initComponent(sticky) {
        let stickyObj = new SirioSticky(sticky);
        if (stickyObj != undefined)
            SirioSticky.stickys.set(sticky, stickyObj);
    }
    static handleScroll() {
        var st = window.scrollY || document.documentElement.scrollTop;
        if (st > SirioSticky.lastScrollTop) {
            SirioSticky.stickys.forEach((sticky) => {
                SirioSticky.cumulativeHeight += __classPrivateFieldGet(sticky, _SirioSticky_instances, "m", _SirioSticky_checkToSticky).call(sticky, SirioSticky.cumulativeHeight);
            });
        }
        else {
            Array.from(SirioSticky.stickys.values())
                .slice()
                .reverse()
                .forEach((sticky) => {
                SirioSticky.cumulativeHeight += __classPrivateFieldGet(sticky, _SirioSticky_instances, "m", _SirioSticky_checkToUnsticky).call(sticky, SirioSticky.cumulativeHeight);
            });
        }
        SirioSticky.lastScrollTop = st <= 0 ? 0 : st;
    }
    static handleResize() {
        SirioSticky.unsetAllSticky();
        SirioSticky.cumulativeHeight = 0;
        SirioSticky.stickys.forEach((sticky) => {
            SirioSticky.cumulativeHeight += __classPrivateFieldGet(sticky, _SirioSticky_instances, "m", _SirioSticky_checkToSticky).call(sticky, SirioSticky.cumulativeHeight);
        });
    }
    static unsetAllSticky() {
        SirioSticky.stickys.forEach((sticky) => {
            __classPrivateFieldGet(sticky, _SirioSticky_instances, "m", _SirioSticky_unsetSticky).call(sticky);
        });
    }
    static getStickyByElement(element) {
        return SirioSticky.stickys.get(element) || null;
    }
}
exports.SirioSticky = SirioSticky;
_SirioSticky_stickyContainer = new WeakMap(), _SirioSticky_wrapper = new WeakMap(), _SirioSticky_isSticky = new WeakMap(), _SirioSticky_instances = new WeakSet(), _SirioSticky_checkToSticky = function _SirioSticky_checkToSticky(cumulativeHeight) {
    if (!__classPrivateFieldGet(this, _SirioSticky_isSticky, "f")) {
        let startTrigger = window.scrollY + __classPrivateFieldGet(this, _SirioSticky_stickyContainer, "f").getBoundingClientRect().top + __classPrivateFieldGet(this, _SirioSticky_stickyContainer, "f").offsetHeight;
        if (window.scrollY + cumulativeHeight > startTrigger) {
            __classPrivateFieldGet(this, _SirioSticky_instances, "m", _SirioSticky_setSticky).call(this, cumulativeHeight);
            return +__classPrivateFieldGet(this, _SirioSticky_stickyContainer, "f").offsetHeight;
        }
    }
    return 0;
}, _SirioSticky_checkToUnsticky = function _SirioSticky_checkToUnsticky(cumulativeHeight) {
    if (__classPrivateFieldGet(this, _SirioSticky_isSticky, "f")) {
        let startTrigger = window.scrollY + __classPrivateFieldGet(this, _SirioSticky_instances, "m", _SirioSticky_getUnstickyStartTrigger).call(this);
        if (window.scrollY + cumulativeHeight <= startTrigger) {
            let offsetHeight = __classPrivateFieldGet(this, _SirioSticky_stickyContainer, "f").offsetHeight;
            __classPrivateFieldGet(this, _SirioSticky_instances, "m", _SirioSticky_unsetSticky).call(this);
            return -offsetHeight;
        }
    }
    return 0;
}, _SirioSticky_setSticky = function _SirioSticky_setSticky(cumulativeHeight) {
    var _a;
    let wrapper = document.createElement("DIV");
    wrapper.style.height = __classPrivateFieldGet(this, _SirioSticky_stickyContainer, "f").offsetHeight + "px";
    (_a = __classPrivateFieldGet(this, _SirioSticky_stickyContainer, "f").parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(wrapper, __classPrivateFieldGet(this, _SirioSticky_stickyContainer, "f"));
    __classPrivateFieldGet(this, _SirioSticky_stickyContainer, "f").setAttribute("data-sirio-toggle", "true");
    __classPrivateFieldGet(this, _SirioSticky_stickyContainer, "f").style.top = cumulativeHeight + "px";
    __classPrivateFieldSet(this, _SirioSticky_wrapper, wrapper, "f");
    __classPrivateFieldSet(this, _SirioSticky_isSticky, true, "f");
}, _SirioSticky_unsetSticky = function _SirioSticky_unsetSticky() {
    var _a;
    __classPrivateFieldGet(this, _SirioSticky_stickyContainer, "f").setAttribute("data-sirio-toggle", "false");
    __classPrivateFieldGet(this, _SirioSticky_stickyContainer, "f").style.top = "";
    (_a = __classPrivateFieldGet(this, _SirioSticky_wrapper, "f")) === null || _a === void 0 ? void 0 : _a.remove();
    __classPrivateFieldSet(this, _SirioSticky_isSticky, false, "f");
}, _SirioSticky_getUnstickyStartTrigger = function _SirioSticky_getUnstickyStartTrigger() {
    let current = __classPrivateFieldGet(this, _SirioSticky_stickyContainer, "f").getAttribute("data-sirio-toggle");
    __classPrivateFieldGet(this, _SirioSticky_stickyContainer, "f").setAttribute("data-sirio-toggle", "false");
    let startTrigger = __classPrivateFieldGet(this, _SirioSticky_stickyContainer, "f").getBoundingClientRect().top + __classPrivateFieldGet(this, _SirioSticky_stickyContainer, "f").offsetHeight;
    __classPrivateFieldGet(this, _SirioSticky_stickyContainer, "f").setAttribute("data-sirio-toggle", current || "false");
    return startTrigger;
};
SirioSticky.stickys = new Map();
SirioSticky.lastScrollTop = 0;
SirioSticky.cumulativeHeight = 0;


/***/ }),

/***/ 768:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SirioTab_instances, _SirioTab_tabGroup, _SirioTab_vertical, _SirioTab_tabsList, _SirioTab_scrollLeft, _SirioTab_scrollRight, _SirioTab_observer, _SirioTab_handleOverflow, _SirioTab_activeScrollButtons, _SirioTab_scrollRightHandler, _SirioTab_scrollLeftHandler, _SirioTabElement_instances, _SirioTabElement_index, _SirioTabElement_id, _SirioTabElement_triggerId, _SirioTabElement_triggerElement, _SirioTabElement_tabsGroup, _SirioTabElement_tabPanel, _SirioTabElement_disabled, _SirioTabElement_show, _SirioTabElement_hide;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SirioTab = void 0;
const Utils_1 = __webpack_require__(675);
class SirioTab {
    constructor(group) {
        _SirioTab_instances.add(this);
        _SirioTab_tabGroup.set(this, void 0);
        _SirioTab_vertical.set(this, void 0);
        _SirioTab_tabsList.set(this, void 0);
        _SirioTab_scrollLeft.set(this, null);
        _SirioTab_scrollRight.set(this, null);
        _SirioTab_observer.set(this, null);
        if (SirioTab.isValidTabGroup(group)) {
            __classPrivateFieldSet(this, _SirioTab_tabsList, [], "f");
            __classPrivateFieldSet(this, _SirioTab_tabGroup, group, "f");
            __classPrivateFieldSet(this, _SirioTab_vertical, __classPrivateFieldGet(this, _SirioTab_tabGroup, "f").getAttribute("aria-orientation") == "vertical" ? true : false, "f");
            this.activeTab = null;
            let tabElements = __classPrivateFieldGet(this, _SirioTab_tabGroup, "f").querySelectorAll(`[data-sirio-toggle="tab"]`);
            let i = 0;
            tabElements.forEach((tab) => {
                let targetId = tab.getAttribute("aria-controls");
                if (targetId != null) {
                    let newTab = new SirioTabElement(i++, targetId, tab, this);
                    __classPrivateFieldGet(this, _SirioTab_tabsList, "f").push(newTab);
                }
            });
            if (!__classPrivateFieldGet(this, _SirioTab_vertical, "f") && __classPrivateFieldGet(this, _SirioTab_tabGroup, "f").parentElement) {
                let tabComponent = __classPrivateFieldGet(this, _SirioTab_tabGroup, "f").parentElement.querySelector('div.sirio-tab-control');
                if (tabComponent) {
                    let scrollBtns = Array.from(tabComponent.querySelectorAll('button'));
                    if ((scrollBtns === null || scrollBtns === void 0 ? void 0 : scrollBtns.length) >= 2) {
                        __classPrivateFieldSet(this, _SirioTab_scrollLeft, scrollBtns[0], "f");
                        __classPrivateFieldSet(this, _SirioTab_scrollRight, scrollBtns[1], "f");
                        __classPrivateFieldGet(this, _SirioTab_scrollRight, "f").addEventListener("click", () => __classPrivateFieldGet(this, _SirioTab_instances, "m", _SirioTab_scrollRightHandler).call(this));
                        __classPrivateFieldGet(this, _SirioTab_scrollLeft, "f").addEventListener("click", () => __classPrivateFieldGet(this, _SirioTab_instances, "m", _SirioTab_scrollLeftHandler).call(this));
                        __classPrivateFieldGet(this, _SirioTab_instances, "m", _SirioTab_handleOverflow).call(this);
                        __classPrivateFieldGet(this, _SirioTab_tabGroup, "f").addEventListener("scroll", () => __classPrivateFieldGet(this, _SirioTab_instances, "m", _SirioTab_activeScrollButtons).call(this));
                        window.addEventListener("resize", () => __classPrivateFieldGet(this, _SirioTab_instances, "m", _SirioTab_handleOverflow).call(this));
                        __classPrivateFieldSet(this, _SirioTab_observer, (0, Utils_1.onVisible)(__classPrivateFieldGet(this, _SirioTab_tabGroup, "f"), __classPrivateFieldGet(this, _SirioTab_instances, "m", _SirioTab_handleOverflow).bind(this)), "f");
                    }
                }
            }
            if (typeof this.activeTab === "string")
                SirioTab.tabs[this.activeTab].select(false);
            SirioTab.setActiveTabByLocation();
        }
        else
            throw TypeError(`HTML element is not a valid Sirio-Tab.`);
    }
    static init() {
        let triggerElementsGroups = document.querySelectorAll(`[data-sirio-component="tab"] > ul`);
        triggerElementsGroups.forEach(function (group) {
            SirioTab.initComponent(group);
        });
        window.addEventListener("hashchange", () => SirioTab.setActiveTabByLocation());
    }
    static initComponent(group) {
        let newTabGroup = group;
        try {
            let tabGroup = new SirioTab(newTabGroup);
            SirioTab.tabsGroup.set(newTabGroup, tabGroup);
        }
        catch (e) {
        }
    }
    static destroy(group) {
        let tabElements = group.querySelectorAll(`[data-sirio-toggle="tab"]`);
        tabElements.forEach((tab) => {
            let targetId = tab.id;
            if (SirioTab.tabs[targetId]) {
                let tab = SirioTab.tabs[targetId];
                tab.removeEventListeners();
                delete SirioTab.tabs[targetId];
                tab = null;
            }
            let tabGroup = SirioTab.tabsGroup.get(group);
            if (tabGroup) {
                tabGroup.removeEventListeners();
                SirioTab.tabsGroup.delete(group);
                tabGroup = null;
            }
        });
    }
    static isValidTabGroup(group) {
        const validGroupRoles = ["tablist"];
        if (group != null) {
            let tabGroupRole = group.getAttribute("role");
            if (typeof tabGroupRole === "string") {
                if (validGroupRoles.includes(tabGroupRole))
                    return true;
                else
                    return false;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    static getTabGroupByElement(element) {
        return SirioTab.tabsGroup.get(element) || null;
    }
    isVertical() {
        return __classPrivateFieldGet(this, _SirioTab_vertical, "f");
    }
    getTabGroup() {
        return __classPrivateFieldGet(this, _SirioTab_tabGroup, "f");
    }
    getTabsList() {
        return __classPrivateFieldGet(this, _SirioTab_tabsList, "f");
    }
    getFirstActiveTab() {
        let tabs = __classPrivateFieldGet(this, _SirioTab_tabsList, "f");
        for (let i = 0; i < tabs.length; i++) {
            if (!tabs[i].isDisabled())
                return tabs[i];
        }
        return null;
    }
    getLastActiveTab() {
        let tabs = __classPrivateFieldGet(this, _SirioTab_tabsList, "f");
        for (let i = tabs.length - 1; i >= 0; i--) {
            if (!tabs[i].isDisabled())
                return tabs[i];
        }
        return null;
    }
    getNextTab(loop = true) {
        if (this.activeTab) {
            let currentTab = SirioTab.tabs[this.activeTab], lastTab = this.getLastActiveTab();
            if (currentTab) {
                if (loop && currentTab === lastTab) {
                    return this.getFirstActiveTab();
                }
                else {
                    let tabs = __classPrivateFieldGet(this, _SirioTab_tabsList, "f"), i = tabs.indexOf(currentTab);
                    for (i++; i < tabs.length; i++) {
                        if (!tabs[i].isDisabled())
                            return tabs[i];
                    }
                }
            }
        }
        return null;
    }
    getPreviousTab(loop = true) {
        if (this.activeTab) {
            let currentTab = SirioTab.tabs[this.activeTab], firstTab = this.getFirstActiveTab();
            if (currentTab) {
                if (loop && currentTab === firstTab) {
                    return this.getLastActiveTab();
                }
                else {
                    let tabs = __classPrivateFieldGet(this, _SirioTab_tabsList, "f"), i = tabs.indexOf(currentTab);
                    for (i--; i >= 0; i--) {
                        if (!tabs[i].isDisabled())
                            return tabs[i];
                    }
                }
            }
        }
        return null;
    }
    adjustScrollActiveTab(index) {
        var _a;
        let cumulativeWidth = 0;
        for (let i = 0; i < __classPrivateFieldGet(this, _SirioTab_tabsList, "f").length; i++) {
            let tabElement = (_a = __classPrivateFieldGet(this, _SirioTab_tabsList, "f")[i].getTabElement()) === null || _a === void 0 ? void 0 : _a.parentElement;
            if (tabElement) {
                let style = window.getComputedStyle(tabElement);
                let tabWidth = Math.ceil(tabElement.getBoundingClientRect().width);
                if (i === index && cumulativeWidth < __classPrivateFieldGet(this, _SirioTab_tabGroup, "f").scrollLeft) {
                    __classPrivateFieldGet(this, _SirioTab_tabGroup, "f").scrollLeft = cumulativeWidth - parseInt(style.marginRight, 10);
                    break;
                }
                cumulativeWidth += tabWidth + parseInt(style.marginRight, 10);
                if (i === index && cumulativeWidth >= __classPrivateFieldGet(this, _SirioTab_tabGroup, "f").scrollLeft + __classPrivateFieldGet(this, _SirioTab_tabGroup, "f").offsetWidth) {
                    __classPrivateFieldGet(this, _SirioTab_tabGroup, "f").scrollLeft = cumulativeWidth - __classPrivateFieldGet(this, _SirioTab_tabGroup, "f").offsetWidth;
                    break;
                }
            }
        }
        __classPrivateFieldGet(this, _SirioTab_instances, "m", _SirioTab_activeScrollButtons).call(this);
    }
    static getTabById(id) {
        return SirioTab.tabs[id];
    }
    static setActiveTabByLocation() {
        let activeTabPath = window.location.hash.substring(1);
        if (activeTabPath != "") {
            let activeTab = SirioTab.tabs[activeTabPath];
            if (activeTab != null && !activeTab.isDisabled()) {
                activeTab.select();
            }
        }
    }
    removeEventListeners() {
        var _a, _b, _c;
        (_a = __classPrivateFieldGet(this, _SirioTab_scrollRight, "f")) === null || _a === void 0 ? void 0 : _a.removeEventListener("click", () => __classPrivateFieldGet(this, _SirioTab_instances, "m", _SirioTab_scrollRightHandler).call(this));
        (_b = __classPrivateFieldGet(this, _SirioTab_scrollLeft, "f")) === null || _b === void 0 ? void 0 : _b.removeEventListener("click", () => __classPrivateFieldGet(this, _SirioTab_instances, "m", _SirioTab_scrollLeftHandler).call(this));
        __classPrivateFieldGet(this, _SirioTab_tabGroup, "f").removeEventListener("scroll", () => __classPrivateFieldGet(this, _SirioTab_instances, "m", _SirioTab_activeScrollButtons).call(this));
        window.removeEventListener("resize", () => __classPrivateFieldGet(this, _SirioTab_instances, "m", _SirioTab_handleOverflow).call(this));
        (_c = __classPrivateFieldGet(this, _SirioTab_observer, "f")) === null || _c === void 0 ? void 0 : _c.disconnect();
    }
}
exports.SirioTab = SirioTab;
_SirioTab_tabGroup = new WeakMap(), _SirioTab_vertical = new WeakMap(), _SirioTab_tabsList = new WeakMap(), _SirioTab_scrollLeft = new WeakMap(), _SirioTab_scrollRight = new WeakMap(), _SirioTab_observer = new WeakMap(), _SirioTab_instances = new WeakSet(), _SirioTab_handleOverflow = function _SirioTab_handleOverflow() {
    var _a, _b;
    if (__classPrivateFieldGet(this, _SirioTab_tabGroup, "f").offsetWidth < __classPrivateFieldGet(this, _SirioTab_tabGroup, "f").scrollWidth) {
        (_a = __classPrivateFieldGet(this, _SirioTab_tabGroup, "f").parentElement) === null || _a === void 0 ? void 0 : _a.classList.add("sirio-tab-scroll");
    }
    else {
        (_b = __classPrivateFieldGet(this, _SirioTab_tabGroup, "f").parentElement) === null || _b === void 0 ? void 0 : _b.classList.remove("sirio-tab-scroll");
    }
    __classPrivateFieldGet(this, _SirioTab_instances, "m", _SirioTab_activeScrollButtons).call(this);
}, _SirioTab_activeScrollButtons = function _SirioTab_activeScrollButtons() {
    var _a, _b, _c, _d, _e, _f;
    if (this.activeTab) {
        if (((_a = this.getFirstActiveTab()) === null || _a === void 0 ? void 0 : _a.getTabElement()) === SirioTab.tabs[this.activeTab].getTabElement())
            (_b = __classPrivateFieldGet(this, _SirioTab_scrollLeft, "f")) === null || _b === void 0 ? void 0 : _b.setAttribute("disabled", "true");
        else
            (_c = __classPrivateFieldGet(this, _SirioTab_scrollLeft, "f")) === null || _c === void 0 ? void 0 : _c.removeAttribute("disabled");
        if (((_d = this.getLastActiveTab()) === null || _d === void 0 ? void 0 : _d.getTabElement()) === SirioTab.tabs[this.activeTab].getTabElement())
            (_e = __classPrivateFieldGet(this, _SirioTab_scrollRight, "f")) === null || _e === void 0 ? void 0 : _e.setAttribute("disabled", "true");
        else
            (_f = __classPrivateFieldGet(this, _SirioTab_scrollRight, "f")) === null || _f === void 0 ? void 0 : _f.removeAttribute("disabled");
    }
}, _SirioTab_scrollRightHandler = function _SirioTab_scrollRightHandler() {
    var _a;
    let tab = this.getNextTab(false);
    if (tab)
        tab.select();
    else {
        let availableWidth = __classPrivateFieldGet(this, _SirioTab_tabGroup, "f").offsetWidth + __classPrivateFieldGet(this, _SirioTab_tabGroup, "f").scrollLeft;
        let cumulativeWidth = 0;
        for (let i = 0; i < __classPrivateFieldGet(this, _SirioTab_tabsList, "f").length; i++) {
            let tabElement = (_a = __classPrivateFieldGet(this, _SirioTab_tabsList, "f")[i].getTabElement()) === null || _a === void 0 ? void 0 : _a.parentElement;
            if (tabElement) {
                let tabWidth = Math.ceil(tabElement.getBoundingClientRect().width);
                let style = window.getComputedStyle(tabElement);
                cumulativeWidth += tabWidth + parseInt(style.marginRight, 10);
                if (cumulativeWidth > availableWidth) {
                    __classPrivateFieldGet(this, _SirioTab_tabGroup, "f").scrollLeft += cumulativeWidth - availableWidth;
                    return;
                }
            }
        }
        ;
    }
}, _SirioTab_scrollLeftHandler = function _SirioTab_scrollLeftHandler() {
    var _a;
    let tab = this.getPreviousTab(false);
    if (tab)
        tab.select();
    else {
        let cumulativeWidth = 0;
        for (let i = 0; i < __classPrivateFieldGet(this, _SirioTab_tabsList, "f").length; i++) {
            let tabElement = (_a = __classPrivateFieldGet(this, _SirioTab_tabsList, "f")[i].getTabElement()) === null || _a === void 0 ? void 0 : _a.parentElement;
            if (tabElement) {
                let tabWidth = Math.ceil(tabElement.getBoundingClientRect().width);
                cumulativeWidth += tabWidth;
                if (cumulativeWidth >= __classPrivateFieldGet(this, _SirioTab_tabGroup, "f").scrollLeft) {
                    __classPrivateFieldGet(this, _SirioTab_tabGroup, "f").scrollLeft -= tabWidth - (cumulativeWidth - __classPrivateFieldGet(this, _SirioTab_tabGroup, "f").scrollLeft);
                    return;
                }
            }
        }
        ;
    }
};
SirioTab.tabsGroup = new Map();
SirioTab.tabs = {};
class SirioTabElement {
    constructor(index, id, trigger, group) {
        _SirioTabElement_instances.add(this);
        _SirioTabElement_index.set(this, void 0);
        _SirioTabElement_id.set(this, void 0);
        _SirioTabElement_triggerId.set(this, void 0);
        _SirioTabElement_triggerElement.set(this, void 0);
        _SirioTabElement_tabsGroup.set(this, void 0);
        _SirioTabElement_tabPanel.set(this, void 0);
        _SirioTabElement_disabled.set(this, void 0);
        if (SirioTabElement.isTab(id, trigger)) {
            __classPrivateFieldSet(this, _SirioTabElement_index, index, "f");
            __classPrivateFieldSet(this, _SirioTabElement_id, id, "f");
            __classPrivateFieldSet(this, _SirioTabElement_triggerId, trigger.id, "f");
            __classPrivateFieldSet(this, _SirioTabElement_triggerElement, trigger, "f");
            __classPrivateFieldSet(this, _SirioTabElement_tabsGroup, group, "f");
            __classPrivateFieldSet(this, _SirioTabElement_tabPanel, document.getElementById(id), "f");
            trigger.tabIndex = -1;
            trigger.setAttribute("aria-selected", "false");
            if (trigger.classList.contains("disabled")) {
                __classPrivateFieldSet(this, _SirioTabElement_disabled, true, "f");
            }
            else {
                __classPrivateFieldSet(this, _SirioTabElement_disabled, false, "f");
                trigger.addEventListener("keydown", this.onKeydown.bind(this));
                trigger.addEventListener("click", this.onClick.bind(this));
                let visible = __classPrivateFieldGet(this, _SirioTabElement_tabPanel, "f").getAttribute("data-sirio-visible");
                if (visible == "true")
                    __classPrivateFieldGet(this, _SirioTabElement_tabsGroup, "f").activeTab = __classPrivateFieldGet(this, _SirioTabElement_triggerId, "f");
            }
            (() => {
                SirioTab.tabs[__classPrivateFieldGet(this, _SirioTabElement_triggerId, "f")] = this;
            })();
        }
        else
            throw TypeError(`HTML element with id="'${id}'" is not a valid Sirio-Tab.`);
    }
    static isTab(id, trigger) {
        const validTriggerRoles = ["tab"];
        const validTabRoles = ["tabpanel"];
        const tabElement = document.getElementById(id);
        if (tabElement != null && trigger != null) {
            let tabRole = tabElement.getAttribute("role");
            let triggerRole = trigger.getAttribute("role");
            if (typeof tabRole === "string" && typeof triggerRole === "string") {
                if (validTriggerRoles.includes(triggerRole) && validTabRoles.includes(tabRole))
                    return true;
                else
                    return false;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    select(setFocus = true) {
        let currentTab = this, tabsList = __classPrivateFieldGet(this, _SirioTabElement_tabsGroup, "f").getTabsList();
        tabsList.forEach((tab) => {
            if (!tab.isDisabled()) {
                let trigger = __classPrivateFieldGet(tab, _SirioTabElement_triggerElement, "f");
                if (currentTab === tab) {
                    trigger.setAttribute("aria-selected", "true");
                    trigger.removeAttribute("tabindex");
                    __classPrivateFieldGet(tab, _SirioTabElement_instances, "m", _SirioTabElement_show).call(tab);
                    if (setFocus)
                        __classPrivateFieldGet(tab, _SirioTabElement_triggerElement, "f").focus();
                    __classPrivateFieldGet(currentTab, _SirioTabElement_tabsGroup, "f").activeTab = __classPrivateFieldGet(this, _SirioTabElement_triggerId, "f");
                    __classPrivateFieldGet(this, _SirioTabElement_tabsGroup, "f").adjustScrollActiveTab(__classPrivateFieldGet(this, _SirioTabElement_index, "f"));
                }
                else {
                    trigger.setAttribute("aria-selected", "false");
                    trigger.tabIndex = -1;
                    __classPrivateFieldGet(tab, _SirioTabElement_instances, "m", _SirioTabElement_hide).call(tab);
                }
            }
        });
    }
    onKeydown(event) {
        let tab;
        switch (event.key) {
            case "ArrowLeft":
                tab = __classPrivateFieldGet(this, _SirioTabElement_tabsGroup, "f").isVertical() ? null : __classPrivateFieldGet(this, _SirioTabElement_tabsGroup, "f").getPreviousTab();
                break;
            case "ArrowRight":
                tab = __classPrivateFieldGet(this, _SirioTabElement_tabsGroup, "f").isVertical() ? null : __classPrivateFieldGet(this, _SirioTabElement_tabsGroup, "f").getNextTab();
                break;
            case "ArrowUp":
                tab = __classPrivateFieldGet(this, _SirioTabElement_tabsGroup, "f").isVertical() ? __classPrivateFieldGet(this, _SirioTabElement_tabsGroup, "f").getPreviousTab() : null;
                break;
            case "ArrowDown":
                tab = __classPrivateFieldGet(this, _SirioTabElement_tabsGroup, "f").isVertical() ? __classPrivateFieldGet(this, _SirioTabElement_tabsGroup, "f").getNextTab() : null;
                break;
            case "Home":
                tab = __classPrivateFieldGet(this, _SirioTabElement_tabsGroup, "f").getFirstActiveTab();
                break;
            case "End":
                tab = __classPrivateFieldGet(this, _SirioTabElement_tabsGroup, "f").getLastActiveTab();
                break;
            default:
                return;
        }
        if (tab)
            tab.select();
        event.stopPropagation();
        event.preventDefault();
    }
    onClick(event) {
        this.select();
        event.preventDefault();
    }
    isDisabled() {
        return __classPrivateFieldGet(this, _SirioTabElement_disabled, "f");
    }
    enable() {
        __classPrivateFieldGet(this, _SirioTabElement_triggerElement, "f").classList.remove("disable");
        __classPrivateFieldSet(this, _SirioTabElement_disabled, false, "f");
    }
    disable() {
        __classPrivateFieldGet(this, _SirioTabElement_triggerElement, "f").classList.add("disable");
        __classPrivateFieldSet(this, _SirioTabElement_disabled, true, "f");
    }
    getTabPanel() {
        return __classPrivateFieldGet(this, _SirioTabElement_tabPanel, "f");
    }
    getTabElement() {
        return __classPrivateFieldGet(this, _SirioTabElement_triggerElement, "f");
    }
    getGroupElement() {
        return __classPrivateFieldGet(this, _SirioTabElement_tabsGroup, "f").getTabGroup();
    }
    removeEventListeners() {
        __classPrivateFieldGet(this, _SirioTabElement_triggerElement, "f").removeEventListener("keydown", this.onKeydown);
        __classPrivateFieldGet(this, _SirioTabElement_triggerElement, "f").removeEventListener("click", this.onClick.bind(this));
    }
}
_SirioTabElement_index = new WeakMap(), _SirioTabElement_id = new WeakMap(), _SirioTabElement_triggerId = new WeakMap(), _SirioTabElement_triggerElement = new WeakMap(), _SirioTabElement_tabsGroup = new WeakMap(), _SirioTabElement_tabPanel = new WeakMap(), _SirioTabElement_disabled = new WeakMap(), _SirioTabElement_instances = new WeakSet(), _SirioTabElement_show = function _SirioTabElement_show() {
    if (__classPrivateFieldGet(this, _SirioTabElement_tabPanel, "f") != null) {
        __classPrivateFieldGet(this, _SirioTabElement_tabPanel, "f").setAttribute("data-sirio-visible", "true");
        __classPrivateFieldGet(this, _SirioTabElement_triggerElement, "f").setAttribute("aria-selected", "true");
    }
}, _SirioTabElement_hide = function _SirioTabElement_hide() {
    if (__classPrivateFieldGet(this, _SirioTabElement_tabPanel, "f") != null) {
        __classPrivateFieldGet(this, _SirioTabElement_triggerElement, "f").setAttribute("aria-selected", "false");
        __classPrivateFieldGet(this, _SirioTabElement_tabPanel, "f").setAttribute("data-sirio-visible", "false");
    }
};


/***/ }),

/***/ 353:
/***/ (function(__unused_webpack_module, exports) {


var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SirioTable_instances, _SirioTable_tableEl, _SirioTable_containerEl, _SirioTable_responsive, _SirioTable_isResizing, _SirioTable_determineTableVisibility, _SirioTable_isResponsive, _SirioTable_isOverflowed, _SirioTable_expand, _SirioTable_overflow, _SirioTable_handleScroll, _SirioTable_handleLoad, _SirioTable_handleResize;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SirioTable = void 0;
class SirioTable {
    constructor(tableEl) {
        _SirioTable_instances.add(this);
        _SirioTable_tableEl.set(this, void 0);
        _SirioTable_containerEl.set(this, void 0);
        _SirioTable_responsive.set(this, void 0);
        _SirioTable_isResizing.set(this, false);
        __classPrivateFieldSet(this, _SirioTable_tableEl, tableEl, "f");
        __classPrivateFieldSet(this, _SirioTable_containerEl, tableEl.parentElement, "f");
        if (__classPrivateFieldGet(this, _SirioTable_containerEl, "f").classList.contains("sirio-table-responsive")) {
            __classPrivateFieldSet(this, _SirioTable_responsive, true, "f");
        }
        else {
            __classPrivateFieldSet(this, _SirioTable_responsive, false, "f");
        }
    }
    static init() {
        let tableElements = Array.from(document.getElementsByClassName("sirio-table"));
        tableElements.forEach(function (tableEl) {
            SirioTable.initComponent(tableEl);
        });
    }
    static initComponent(tableEl) {
        let tableObj = new SirioTable(tableEl);
        if (__classPrivateFieldGet(tableObj, _SirioTable_instances, "m", _SirioTable_isResponsive).call(tableObj)) {
            __classPrivateFieldGet(tableObj, _SirioTable_containerEl, "f").addEventListener("scroll", () => __classPrivateFieldGet(tableObj, _SirioTable_instances, "m", _SirioTable_handleScroll).call(tableObj));
            window.addEventListener("load", () => __classPrivateFieldGet(tableObj, _SirioTable_instances, "m", _SirioTable_handleLoad).call(tableObj));
            window.addEventListener("resize", () => __classPrivateFieldGet(tableObj, _SirioTable_instances, "m", _SirioTable_handleResize).call(tableObj));
            SirioTable.tables.set(tableEl, tableObj);
        }
    }
    static destroy(tableEl) {
        let tableObj = SirioTable.tables.get(tableEl);
        if (tableObj != null) {
            tableObj.removeEventListeners();
            SirioTable.tables.delete(tableEl);
            tableObj = null;
        }
    }
    static getTableByElement(element) {
        return SirioTable.tables.get(element) || null;
    }
    getTableEl() {
        return __classPrivateFieldGet(this, _SirioTable_tableEl, "f");
    }
    getContainerEl() {
        return __classPrivateFieldGet(this, _SirioTable_containerEl, "f");
    }
    removeEventListeners() {
        let tableObj = this;
        __classPrivateFieldGet(tableObj, _SirioTable_containerEl, "f").removeEventListener("scroll", () => __classPrivateFieldGet(tableObj, _SirioTable_instances, "m", _SirioTable_handleScroll).call(tableObj));
        window.removeEventListener("load", () => __classPrivateFieldGet(tableObj, _SirioTable_instances, "m", _SirioTable_handleLoad).call(tableObj));
        window.removeEventListener("resize", () => __classPrivateFieldGet(tableObj, _SirioTable_instances, "m", _SirioTable_handleResize).call(tableObj));
    }
}
exports.SirioTable = SirioTable;
_SirioTable_tableEl = new WeakMap(), _SirioTable_containerEl = new WeakMap(), _SirioTable_responsive = new WeakMap(), _SirioTable_isResizing = new WeakMap(), _SirioTable_instances = new WeakSet(), _SirioTable_determineTableVisibility = function _SirioTable_determineTableVisibility() {
    let tableWidth = __classPrivateFieldGet(this, _SirioTable_tableEl, "f").offsetWidth;
    let containerWidth = __classPrivateFieldGet(this, _SirioTable_containerEl, "f").offsetWidth;
    if (containerWidth < tableWidth) {
        __classPrivateFieldGet(this, _SirioTable_instances, "m", _SirioTable_overflow).call(this);
    }
}, _SirioTable_isResponsive = function _SirioTable_isResponsive() {
    return __classPrivateFieldGet(this, _SirioTable_responsive, "f");
}, _SirioTable_isOverflowed = function _SirioTable_isOverflowed() {
    return __classPrivateFieldGet(this, _SirioTable_containerEl, "f").classList.contains("sirio-table-overflow-end") || __classPrivateFieldGet(this, _SirioTable_containerEl, "f").classList.contains("sirio-table-overflow-start");
}, _SirioTable_expand = function _SirioTable_expand() {
    if (__classPrivateFieldGet(this, _SirioTable_instances, "m", _SirioTable_isOverflowed).call(this)) {
        __classPrivateFieldGet(this, _SirioTable_containerEl, "f").classList.remove("sirio-table-overflow-end");
        __classPrivateFieldGet(this, _SirioTable_containerEl, "f").classList.remove("sirio-table-overflow-start");
    }
}, _SirioTable_overflow = function _SirioTable_overflow() {
    if (!__classPrivateFieldGet(this, _SirioTable_instances, "m", _SirioTable_isOverflowed).call(this)) {
        __classPrivateFieldGet(this, _SirioTable_containerEl, "f").classList.add("sirio-table-overflow-end");
    }
}, _SirioTable_handleScroll = function _SirioTable_handleScroll() {
    let maxScroll = __classPrivateFieldGet(this, _SirioTable_containerEl, "f").scrollWidth - __classPrivateFieldGet(this, _SirioTable_containerEl, "f").clientWidth;
    if (__classPrivateFieldGet(this, _SirioTable_containerEl, "f").scrollLeft > 0) {
        __classPrivateFieldGet(this, _SirioTable_containerEl, "f").classList.add("sirio-table-overflow-start");
        if (Math.ceil(__classPrivateFieldGet(this, _SirioTable_containerEl, "f").scrollLeft) >= maxScroll) {
            __classPrivateFieldGet(this, _SirioTable_containerEl, "f").classList.remove("sirio-table-overflow-end");
        }
        else {
            if (!__classPrivateFieldGet(this, _SirioTable_containerEl, "f").classList.contains("sirio-table-overflow-end")) {
                __classPrivateFieldGet(this, _SirioTable_containerEl, "f").classList.add("sirio-table-overflow-end");
            }
        }
    }
    else {
        __classPrivateFieldGet(this, _SirioTable_containerEl, "f").classList.remove("sirio-table-overflow-start");
    }
}, _SirioTable_handleLoad = function _SirioTable_handleLoad() {
    __classPrivateFieldGet(this, _SirioTable_instances, "m", _SirioTable_determineTableVisibility).call(this);
}, _SirioTable_handleResize = function _SirioTable_handleResize() {
    if (!__classPrivateFieldGet(this, _SirioTable_isResizing, "f")) {
        __classPrivateFieldSet(this, _SirioTable_isResizing, true, "f");
        setTimeout(() => {
            __classPrivateFieldGet(this, _SirioTable_instances, "m", _SirioTable_expand).call(this);
            __classPrivateFieldGet(this, _SirioTable_instances, "m", _SirioTable_determineTableVisibility).call(this);
            __classPrivateFieldSet(this, _SirioTable_isResizing, false, "f");
        }, 200);
    }
};
SirioTable.tables = new Map();


/***/ }),

/***/ 708:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SirioTimePicker_instances, _SirioTimePicker_textInputEl, _SirioTimePicker_componentEl, _SirioTimePicker_dropdownEl, _SirioTimePicker_incrementHourButton, _SirioTimePicker_inputHour, _SirioTimePicker_decrementHourButton, _SirioTimePicker_incrementMinuteButton, _SirioTimePicker_inputMinute, _SirioTimePicker_decrementMinuteButton, _SirioTimePicker_defaultVPos, _SirioTimePicker_checkVPosTimeout, _SirioTimePicker_handleClick, _SirioTimePicker_handleKeysHour, _SirioTimePicker_handleKeysMinute, _SirioTimePicker_handleKeysInput, _SirioTimePicker_incrementHour, _SirioTimePicker_incrementMinute, _SirioTimePicker_decrementHour, _SirioTimePicker_decrementMinute, _SirioTimePicker_adjustPosition, _SirioTimePicker_adjustVerticalPosition, _SirioTimePicker_checkTopPosition, _SirioTimePicker_checkBottomPosition, _SirioTimePicker_setInputHourValue, _SirioTimePicker_setInputMinuteValue, _SirioTimePicker_handleInputHour, _SirioTimePicker_handleInputMinute;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SirioTimePicker = void 0;
const Utils_1 = __webpack_require__(675);
class SirioTimePicker {
    constructor(id) {
        _SirioTimePicker_instances.add(this);
        _SirioTimePicker_textInputEl.set(this, void 0);
        _SirioTimePicker_componentEl.set(this, void 0);
        _SirioTimePicker_dropdownEl.set(this, void 0);
        _SirioTimePicker_incrementHourButton.set(this, void 0);
        _SirioTimePicker_inputHour.set(this, void 0);
        _SirioTimePicker_decrementHourButton.set(this, void 0);
        _SirioTimePicker_incrementMinuteButton.set(this, void 0);
        _SirioTimePicker_inputMinute.set(this, void 0);
        _SirioTimePicker_decrementMinuteButton.set(this, void 0);
        _SirioTimePicker_defaultVPos.set(this, void 0);
        _SirioTimePicker_checkVPosTimeout.set(this, void 0);
        _SirioTimePicker_handleClick.set(this, (event) => {
            let target = (event.target || event.currentTarget);
            if (target != null) {
                if (!(0, Utils_1.isDescendant)(__classPrivateFieldGet(this, _SirioTimePicker_componentEl, "f"), target)) {
                    this.hide();
                    event.preventDefault();
                }
            }
        });
        _SirioTimePicker_handleKeysHour.set(this, (event) => {
            var _a, _b;
            let key = event.key;
            let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            let length = __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value.length + 1;
            if (numbers.includes(key)) {
                if (length == 1) {
                    __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = "0" + key + ":" + __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value;
                }
                else if (length == 2) {
                    __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputHourValue).call(this, __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value + key);
                    __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value + ":" + __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value;
                    event.preventDefault();
                }
                else {
                    if (((_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.toString().length) == 0 && __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value[0] !== "0")
                        event.preventDefault();
                }
            }
            else {
                switch (key) {
                    case "ArrowUp":
                        event.preventDefault();
                        __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_incrementHour).call(this);
                        break;
                    case "ArrowDown":
                        event.preventDefault();
                        __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_decrementHour).call(this);
                        break;
                    case "Enter":
                        if (length == 2 || length == 3) {
                            __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputHourValue).call(this, __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value);
                            __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value + ":" + __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value;
                        }
                        else if (length > 3) {
                            __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputHourValue).call(this, "23");
                            __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = "23:" + __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value;
                        }
                        break;
                    case "Tab":
                        break;
                    //     if (length == 1) {
                    //         this.#setInputHourValue("00");
                    //         this.#textInputEl.value = this.#inputHour.value + ":" + this.#inputMinute.value;
                    //     } else if (length == 2 || length == 3) {
                    //         this.#setInputHourValue(this.#inputHour.value);
                    //         this.#textInputEl.value = this.#inputHour.value + ":" + this.#inputMinute.value;
                    //     } else if (length > 3) {
                    //         this.#setInputHourValue("23");
                    //         this.#textInputEl.value = "23:" + this.#inputMinute.value;
                    //     }
                    //     break;
                    case "Backspace":
                        const selectedText = (_b = window.getSelection()) === null || _b === void 0 ? void 0 : _b.toString();
                        if (__classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value == selectedText || __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value == "00" || __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value == "" || __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value == undefined) {
                            __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = "";
                            __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value = "";
                        }
                        break;
                    default:
                        event.preventDefault();
                        break;
                }
            }
        });
        _SirioTimePicker_handleKeysMinute.set(this, (event) => {
            var _a, _b;
            let key = event.key;
            let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            let length = __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value.length + 1;
            if (numbers.includes(key)) {
                if (length == 1) {
                    __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value.substring(0, 3) + "0" + key;
                }
                else if (length == 2) {
                    __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputMinuteValue).call(this, __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value + key);
                    __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value + ":" + __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value;
                    event.preventDefault();
                }
                else {
                    if (((_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.toString().length) == 0 && __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value[0] !== "0")
                        event.preventDefault();
                }
            }
            else {
                switch (key) {
                    case "ArrowUp":
                        event.preventDefault();
                        if (parseInt(__classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value) > 59) {
                            __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputMinuteValue).call(this, "59");
                        }
                        else
                            __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_incrementMinute).call(this);
                        if (__classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value.length > 1)
                            __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value + ":" + __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value;
                        break;
                    case "ArrowDown":
                        event.preventDefault();
                        if (parseInt(__classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value) > 59) {
                            __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputMinuteValue).call(this, "59");
                        }
                        else
                            __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_decrementMinute).call(this);
                        if (__classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value.length > 1)
                            __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value + ":" + __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value;
                        ;
                        break;
                    case "Enter":
                        if (length == 2 || length == 3) {
                            __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputMinuteValue).call(this, __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value);
                            __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value + ":" + __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value;
                        }
                        break;
                    case "Tab":
                        // if(this.#inputHour.value.length < 2) {
                        //     this.#textInputEl.value = "";
                        // } else if (length == 1) {
                        //     this.#setInputMinuteValue("");
                        //     this.#textInputEl.value = this.#inputHour.value + ":" + this.#inputMinute.value;
                        // }
                        // } else if (length == 2) {
                        //     this.#setInputMinuteValue(this.#inputMinute.value);
                        //     this.#textInputEl.value = this.#inputHour.value + ":" + this.#inputMinute.value;
                        // }
                        if (!event.shiftKey) {
                            this.hide();
                        }
                        break;
                    case "Backspace":
                        const selectedText = (_b = window.getSelection()) === null || _b === void 0 ? void 0 : _b.toString();
                        if (__classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value == selectedText || __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value == "00" || __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value == "" || __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value == undefined) {
                            __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = "";
                            __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value = "";
                        }
                        break;
                    default:
                        event.preventDefault();
                        break;
                }
            }
        });
        _SirioTimePicker_handleKeysInput.set(this, (event) => {
            let key = event.key;
            let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            let permittedKeys = ["Backspace", "Escape", "Tab", "Enter", ":"];
            let length = __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value.length + 1;
            if (length < 7 && this.isHidden()) {
                this.show();
            }
            if (numbers.includes(key)) {
                let newValue = __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value + key;
                switch (length) {
                    case 1:
                        __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputHourValue).call(this, newValue);
                        break;
                    case 2:
                        __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputHourValue).call(this, newValue);
                        __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value;
                        event.preventDefault();
                        break;
                    case 3:
                        __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value += ":" + key;
                        __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputMinuteValue).call(this, key);
                        event.preventDefault();
                        break;
                    case 4:
                        __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputMinuteValue).call(this, newValue[3]);
                        break;
                    case 5:
                        __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputMinuteValue).call(this, newValue.substring(3, 5));
                        __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value + ":" + __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value;
                        event.preventDefault();
                        break;
                    default:
                        event.preventDefault();
                }
            }
            else if (permittedKeys.includes(key)) {
                switch (key) {
                    case ":":
                        if (length < 3) {
                            __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = (0, Utils_1.padStartWithZeros)(__classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value, 2);
                            __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value = __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value;
                        }
                        else if (length > 3) {
                            event.preventDefault();
                        }
                        break;
                    case "Enter":
                        switch (length) {
                            case 1:
                                __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value + ":" + __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value;
                                break;
                            case 2:
                                __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputHourValue).call(this, __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value);
                                __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputMinuteValue).call(this, "00");
                                __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value + ":" + __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value;
                                break;
                            case 3:
                                __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputHourValue).call(this, __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value);
                                __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputMinuteValue).call(this, "00");
                                __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value + ":" + __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value;
                                break;
                            case 4:
                                __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputHourValue).call(this, __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value.substring(0, 2));
                                __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputMinuteValue).call(this, "00");
                                __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value + ":" + __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value;
                                break;
                            case 5:
                                __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputHourValue).call(this, __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value.substring(0, 2));
                                __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputMinuteValue).call(this, __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value[3]);
                                __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value + ":" + __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value;
                                break;
                            case 6:
                                __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputHourValue).call(this, __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value.substring(0, 2));
                                __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputMinuteValue).call(this, __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value.substring(3, 5));
                                __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value + ":" + __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value;
                                break;
                            default:
                                event.preventDefault();
                                break;
                        }
                        this.hide();
                        break;
                    case "Escape":
                        __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").blur();
                        this.hide();
                        break;
                    case "Tab":
                        if (event.shiftKey) {
                            this.hide();
                        }
                        break;
                    default:
                        break;
                }
            }
            else {
                event.preventDefault();
            }
        });
        __classPrivateFieldSet(this, _SirioTimePicker_textInputEl, document.getElementById(id), "f");
        let componentEl = document.createElement("div");
        componentEl.setAttribute("class", "sirio-dropdown");
        componentEl.setAttribute("data-sirio-component", "dropdown");
        __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").parentNode.insertBefore(componentEl, __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f"));
        componentEl.appendChild(__classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f"));
        __classPrivateFieldSet(this, _SirioTimePicker_componentEl, componentEl, "f");
        let dropdownEl = document.createElement("div");
        dropdownEl.setAttribute("class", "sirio-dropdown-menu sirio-dropdown-timepicker");
        dropdownEl.setAttribute("data-sirio-visible", "false");
        componentEl.appendChild(dropdownEl);
        __classPrivateFieldSet(this, _SirioTimePicker_dropdownEl, dropdownEl, "f");
        let hourDiv = document.createElement("div");
        hourDiv.setAttribute("class", "sirio-dropdown-timepicker-hour");
        dropdownEl.appendChild(hourDiv);
        let incrementHourButton = document.createElement("button");
        incrementHourButton.setAttribute("class", "sirio-btn sirio-btn-icon");
        incrementHourButton.id = (0, Utils_1.makeid)(5) + "iduph";
        incrementHourButton.title = "Incrementa ora";
        incrementHourButton.tabIndex = -1;
        incrementHourButton.setAttribute("aria-hidden", "true");
        let incrementButtonSpan = document.createElement("span");
        incrementButtonSpan.setAttribute("class", "fas fa-angle-up");
        incrementButtonSpan.setAttribute("aria-hidden", "true");
        incrementHourButton.appendChild(incrementButtonSpan);
        hourDiv.appendChild(incrementHourButton);
        __classPrivateFieldSet(this, _SirioTimePicker_incrementHourButton, incrementHourButton, "f");
        let inputHour = document.createElement("input");
        inputHour.id = (0, Utils_1.makeid)(5) + "input-timepicker-hour";
        inputHour.type = "text";
        inputHour.setAttribute("aria-label", "Scegli ora");
        inputHour.setAttribute("role", "spinbutton");
        inputHour.setAttribute("aria-valuemin", "0");
        inputHour.setAttribute("aria-valuemax", "23");
        inputHour.setAttribute("aria-valuenow", "00");
        hourDiv.appendChild(inputHour);
        __classPrivateFieldSet(this, _SirioTimePicker_inputHour, inputHour, "f");
        let decrementHourButton = document.createElement("button");
        decrementHourButton.setAttribute("class", "sirio-btn sirio-btn-icon");
        decrementHourButton.id = (0, Utils_1.makeid)(5) + "iddownh";
        decrementHourButton.title = "Decrementa ora";
        decrementHourButton.tabIndex = -1;
        decrementHourButton.setAttribute("aria-hidden", "true");
        let decrementButtonSpan = document.createElement("span");
        decrementButtonSpan.setAttribute("class", "fas fa-angle-down");
        decrementButtonSpan.setAttribute("aria-hidden", "true");
        decrementHourButton.appendChild(decrementButtonSpan);
        hourDiv.appendChild(decrementHourButton);
        __classPrivateFieldSet(this, _SirioTimePicker_decrementHourButton, decrementHourButton, "f");
        let separatorDiv = document.createElement("div");
        separatorDiv.setAttribute("class", "sirio-dropdown-timepicker-sep");
        separatorDiv.setAttribute("aria-hidden", "true");
        dropdownEl.appendChild(separatorDiv);
        let minuteDiv = document.createElement("div");
        minuteDiv.setAttribute("class", "sirio-dropdown-timepicker-min");
        dropdownEl.appendChild(minuteDiv);
        let incrementMinuteButton = document.createElement("button");
        incrementMinuteButton.setAttribute("class", "sirio-btn sirio-btn-icon");
        incrementMinuteButton.id = (0, Utils_1.makeid)(5) + "idupm";
        incrementMinuteButton.title = "Incrementa minuti";
        incrementMinuteButton.tabIndex = -1;
        incrementMinuteButton.setAttribute("aria-hidden", "true");
        let incrementMinuteButtonSpan = document.createElement("span");
        incrementMinuteButtonSpan.setAttribute("class", "fas fa-angle-up");
        incrementMinuteButtonSpan.setAttribute("aria-hidden", "true");
        incrementMinuteButton.appendChild(incrementMinuteButtonSpan);
        minuteDiv.appendChild(incrementMinuteButton);
        __classPrivateFieldSet(this, _SirioTimePicker_incrementMinuteButton, incrementMinuteButton, "f");
        let inputMinute = document.createElement("input");
        inputMinute.id = (0, Utils_1.makeid)(5) + "input-timepicker-minute";
        inputMinute.type = "text";
        inputMinute.setAttribute("aria-label", "Scegli minuti");
        inputMinute.setAttribute("role", "spinbutton");
        inputMinute.setAttribute("aria-valuemin", "0");
        inputMinute.setAttribute("aria-valuemax", "59");
        inputMinute.setAttribute("aria-valuenow", "00");
        minuteDiv.appendChild(inputMinute);
        __classPrivateFieldSet(this, _SirioTimePicker_inputMinute, inputMinute, "f");
        let decrementMinuteButton = document.createElement("button");
        decrementMinuteButton.setAttribute("class", "sirio-btn sirio-btn-icon");
        decrementMinuteButton.id = (0, Utils_1.makeid)(5) + "iddownm";
        decrementMinuteButton.title = "Decrementa minuti";
        decrementMinuteButton.tabIndex = -1;
        decrementMinuteButton.setAttribute("aria-hidden", "true");
        let decrementMinuteButtonSpan = document.createElement("span");
        decrementMinuteButtonSpan.setAttribute("class", "fas fa-angle-down");
        decrementMinuteButtonSpan.setAttribute("aria-hidden", "true");
        decrementMinuteButton.appendChild(decrementMinuteButtonSpan);
        minuteDiv.appendChild(decrementMinuteButton);
        __classPrivateFieldSet(this, _SirioTimePicker_decrementMinuteButton, decrementMinuteButton, "f");
        __classPrivateFieldSet(this, _SirioTimePicker_defaultVPos, __classPrivateFieldGet(this, _SirioTimePicker_componentEl, "f").classList.contains("sirio-dropdown-menu-top") ? "top" : "bottom", "f");
        __classPrivateFieldSet(this, _SirioTimePicker_checkVPosTimeout, null, "f");
        __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").addEventListener("click", (event) => {
            event.preventDefault();
            if (this.isHidden()) {
                this.show();
            }
        });
        __classPrivateFieldGet(this, _SirioTimePicker_incrementHourButton, "f").addEventListener("click", () => __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_incrementHour).call(this));
        __classPrivateFieldGet(this, _SirioTimePicker_incrementMinuteButton, "f").addEventListener("click", () => __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_incrementMinute).call(this));
        __classPrivateFieldGet(this, _SirioTimePicker_decrementHourButton, "f").addEventListener("click", () => __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_decrementHour).call(this));
        __classPrivateFieldGet(this, _SirioTimePicker_decrementMinuteButton, "f").addEventListener("click", () => __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_decrementMinute).call(this));
        __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").addEventListener("keydown", __classPrivateFieldGet(this, _SirioTimePicker_handleKeysHour, "f"));
        __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").addEventListener("keydown", __classPrivateFieldGet(this, _SirioTimePicker_handleKeysMinute, "f"));
        __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").addEventListener("keydown", __classPrivateFieldGet(this, _SirioTimePicker_handleKeysInput, "f"));
        __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").addEventListener("input", () => __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_handleInputHour).call(this));
        __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").addEventListener("input", () => __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_handleInputMinute).call(this));
        __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").addEventListener("focus", () => {
            if (this.isHidden()) {
                this.show();
            }
        });
        window.addEventListener("scroll", () => {
            __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_adjustPosition).call(this);
        });
        window.addEventListener("resize", () => {
            __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_adjustPosition).call(this);
        });
    }
    static init() {
        SirioTimePicker.timePickers = {};
        let inputs = Array.from(document.querySelectorAll(`[data-sirio-component="timepicker"]`));
        inputs.forEach(function (input) {
            SirioTimePicker.initComponent(input);
        });
    }
    static initComponent(input) {
        let id = input.id;
        if (SirioTimePicker.isTimePicker(id)) {
            let timePicker = new SirioTimePicker(id);
            SirioTimePicker.timePickers[id] = timePicker;
        }
    }
    static destroy(id) {
        if (id in SirioTimePicker.timePickers) {
            let timePicker = SirioTimePicker.timePickers[id];
            timePicker.removeEventListeners();
            delete SirioTimePicker.timePickers[id];
            timePicker = null;
        }
    }
    static isTimePicker(id) {
        let input = document.getElementById(id);
        if (input != null && !(id in SirioTimePicker.timePickers)) {
            if (input.tagName.toLowerCase() == "input" && input.getAttribute("type") == "text" && input.classList.contains("sirio-form-control")) {
                return true;
            }
            else
                return false;
        }
        else
            return false;
    }
    static getTimePickerById(id) {
        return SirioTimePicker.timePickers[id];
    }
    getTextInputEl() {
        return __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f");
    }
    getSelectedTime() {
        return __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value;
    }
    getSelectedHour() {
        if (__classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value.length > 1)
            return parseInt(__classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value.split(":")[0]);
        return null;
    }
    getSelectedMinute() {
        if (__classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value.length > 4)
            return parseInt(__classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value.split(":")[1]);
        return null;
    }
    getDropdownEl() {
        return __classPrivateFieldGet(this, _SirioTimePicker_dropdownEl, "f");
    }
    getInputTextElement() {
        return __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f");
    }
    getInputHour() {
        return __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f");
    }
    getInputMinute() {
        return __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f");
    }
    getIncrementHourButton() {
        return __classPrivateFieldGet(this, _SirioTimePicker_incrementHourButton, "f");
    }
    getDecrementHourButton() {
        return __classPrivateFieldGet(this, _SirioTimePicker_decrementHourButton, "f");
    }
    getIncrementMinuteButton() {
        return __classPrivateFieldGet(this, _SirioTimePicker_incrementMinuteButton, "f");
    }
    getDecrementMinuteButton() {
        return __classPrivateFieldGet(this, _SirioTimePicker_decrementMinuteButton, "f");
    }
    show() {
        __classPrivateFieldGet(this, _SirioTimePicker_dropdownEl, "f").setAttribute("data-sirio-visible", "true");
        document.addEventListener("click", __classPrivateFieldGet(this, _SirioTimePicker_handleClick, "f"));
        if (__classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value == "") {
            let currentDate = new Date();
            let currentHour = (0, Utils_1.padStartWithZeros)(currentDate.getHours().toString(), 2);
            let currentMinutes = (0, Utils_1.padStartWithZeros)(currentDate.getMinutes().toString(), 2);
            __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value = currentHour;
            __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value = currentMinutes;
        }
        __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_adjustPosition).call(this);
    }
    hide() {
        __classPrivateFieldGet(this, _SirioTimePicker_dropdownEl, "f").setAttribute("data-sirio-visible", "false");
        document.removeEventListener("click", __classPrivateFieldGet(this, _SirioTimePicker_handleClick, "f"));
    }
    isHidden() {
        return __classPrivateFieldGet(this, _SirioTimePicker_dropdownEl, "f").getAttribute("data-sirio-visible") == "false";
    }
    removeEventListeners() {
        __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").removeEventListener("click", (event) => {
            event.preventDefault();
            if (this.isHidden()) {
                this.show();
            }
        });
        __classPrivateFieldGet(this, _SirioTimePicker_incrementHourButton, "f").removeEventListener("click", () => __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_incrementHour).call(this));
        __classPrivateFieldGet(this, _SirioTimePicker_incrementMinuteButton, "f").removeEventListener("click", () => __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_incrementMinute).call(this));
        __classPrivateFieldGet(this, _SirioTimePicker_decrementHourButton, "f").removeEventListener("click", () => __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_decrementHour).call(this));
        __classPrivateFieldGet(this, _SirioTimePicker_decrementMinuteButton, "f").removeEventListener("click", () => __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_decrementMinute).call(this));
        __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").removeEventListener("keydown", __classPrivateFieldGet(this, _SirioTimePicker_handleKeysHour, "f"));
        __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").removeEventListener("keydown", __classPrivateFieldGet(this, _SirioTimePicker_handleKeysMinute, "f"));
        __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").removeEventListener("keydown", __classPrivateFieldGet(this, _SirioTimePicker_handleKeysInput, "f"));
        __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").removeEventListener("input", () => __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_handleInputHour).call(this));
        __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").removeEventListener("input", () => __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_handleInputMinute).call(this));
        __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").removeEventListener("focus", () => {
            if (this.isHidden()) {
                this.show();
            }
        });
        window.removeEventListener("scroll", () => {
            __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_adjustPosition).call(this);
        });
        window.removeEventListener("resize", () => {
            __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_adjustPosition).call(this);
        });
    }
}
exports.SirioTimePicker = SirioTimePicker;
_SirioTimePicker_textInputEl = new WeakMap(), _SirioTimePicker_componentEl = new WeakMap(), _SirioTimePicker_dropdownEl = new WeakMap(), _SirioTimePicker_incrementHourButton = new WeakMap(), _SirioTimePicker_inputHour = new WeakMap(), _SirioTimePicker_decrementHourButton = new WeakMap(), _SirioTimePicker_incrementMinuteButton = new WeakMap(), _SirioTimePicker_inputMinute = new WeakMap(), _SirioTimePicker_decrementMinuteButton = new WeakMap(), _SirioTimePicker_defaultVPos = new WeakMap(), _SirioTimePicker_checkVPosTimeout = new WeakMap(), _SirioTimePicker_handleClick = new WeakMap(), _SirioTimePicker_handleKeysHour = new WeakMap(), _SirioTimePicker_handleKeysMinute = new WeakMap(), _SirioTimePicker_handleKeysInput = new WeakMap(), _SirioTimePicker_instances = new WeakSet(), _SirioTimePicker_incrementHour = function _SirioTimePicker_incrementHour() {
    let currentValue = parseInt(__classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value);
    let newValue;
    if (currentValue < 23) {
        newValue = currentValue + 1;
    }
    else {
        newValue = 0;
    }
    __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value = (0, Utils_1.padStartWithZeros)(newValue.toString(), 2);
    __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value + ":" + __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value;
}, _SirioTimePicker_incrementMinute = function _SirioTimePicker_incrementMinute() {
    let currentValue = parseInt(__classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value);
    let newValue;
    if (currentValue < 59) {
        newValue = currentValue + 1;
    }
    else {
        newValue = 0;
        if (currentValue == 59)
            __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_incrementHour).call(this);
    }
    __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value = (0, Utils_1.padStartWithZeros)(newValue.toString(), 2);
    if (__classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value.length > 3)
        __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value + ":" + __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value;
}, _SirioTimePicker_decrementHour = function _SirioTimePicker_decrementHour() {
    let currentValue = parseInt(__classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value);
    let newValue;
    if (currentValue > 0) {
        newValue = currentValue - 1;
    }
    else {
        newValue = 23;
    }
    __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value = (0, Utils_1.padStartWithZeros)(newValue.toString(), 2);
    __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value + ":" + __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value;
}, _SirioTimePicker_decrementMinute = function _SirioTimePicker_decrementMinute() {
    let currentValue = parseInt(__classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value);
    let newValue;
    if (currentValue > 0) {
        newValue = currentValue - 1;
    }
    else {
        newValue = 59;
        __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_decrementHour).call(this);
    }
    __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value = (0, Utils_1.padStartWithZeros)(newValue.toString(), 2);
    if (__classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value.length > 3)
        __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value + ":" + __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value;
}, _SirioTimePicker_adjustPosition = function _SirioTimePicker_adjustPosition() {
    if (!this.isHidden()) {
        __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_adjustVerticalPosition).call(this);
    }
}, _SirioTimePicker_adjustVerticalPosition = function _SirioTimePicker_adjustVerticalPosition() {
    if (__classPrivateFieldGet(this, _SirioTimePicker_checkVPosTimeout, "f"))
        clearTimeout(__classPrivateFieldGet(this, _SirioTimePicker_checkVPosTimeout, "f"));
    __classPrivateFieldSet(this, _SirioTimePicker_checkVPosTimeout, setTimeout(() => {
        const menuHeight = __classPrivateFieldGet(this, _SirioTimePicker_dropdownEl, "f").offsetHeight;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        let currentVerticalPos = __classPrivateFieldGet(this, _SirioTimePicker_dropdownEl, "f").classList.contains("sirio-dropdown-menu-top") ? "top" : "bottom";
        const rect = __classPrivateFieldGet(this, _SirioTimePicker_dropdownEl, "f").getBoundingClientRect();
        if (currentVerticalPos == __classPrivateFieldGet(this, _SirioTimePicker_defaultVPos, "f")) {
            if (currentVerticalPos == "bottom" && rect.bottom > windowHeight) {
                if (__classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_checkTopPosition).call(this, menuHeight))
                    __classPrivateFieldGet(this, _SirioTimePicker_dropdownEl, "f").classList.add("sirio-dropdown-menu-top");
            }
            else if (currentVerticalPos == "top" && rect.top < 0) {
                if (__classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_checkBottomPosition).call(this, menuHeight, windowHeight))
                    __classPrivateFieldGet(this, _SirioTimePicker_dropdownEl, "f").classList.remove("sirio-dropdown-menu-top");
            }
        }
        else {
            if (currentVerticalPos == "top" && __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_checkBottomPosition).call(this, menuHeight, windowHeight))
                __classPrivateFieldGet(this, _SirioTimePicker_dropdownEl, "f").classList.remove("sirio-dropdown-menu-top");
            else if (currentVerticalPos == "bottom" && __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_checkTopPosition).call(this, menuHeight))
                __classPrivateFieldGet(this, _SirioTimePicker_dropdownEl, "f").classList.add("sirio-dropdown-menu-top");
        }
    }, 50), "f");
}, _SirioTimePicker_checkTopPosition = function _SirioTimePicker_checkTopPosition(menuHeight) {
    let style = window.getComputedStyle(__classPrivateFieldGet(this, _SirioTimePicker_dropdownEl, "f")), matrix = new WebKitCSSMatrix(style.transform), translateY = matrix.m41;
    let btnTopPos = __classPrivateFieldGet(this, _SirioTimePicker_componentEl, "f").getBoundingClientRect().top;
    if (btnTopPos - (translateY + menuHeight) > 0)
        return true;
    return false;
}, _SirioTimePicker_checkBottomPosition = function _SirioTimePicker_checkBottomPosition(menuHeight, windowHeight) {
    let style = window.getComputedStyle(__classPrivateFieldGet(this, _SirioTimePicker_dropdownEl, "f")), matrix = new WebKitCSSMatrix(style.transform), translateY = matrix.m41;
    let btnBottomPos = __classPrivateFieldGet(this, _SirioTimePicker_componentEl, "f").getBoundingClientRect().bottom;
    if (btnBottomPos + translateY + menuHeight < windowHeight)
        return true;
    return false;
}, _SirioTimePicker_setInputHourValue = function _SirioTimePicker_setInputHourValue(value) {
    if (parseInt(value) < 23) {
        __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value = (0, Utils_1.padStartWithZeros)(value, 2);
    }
    else {
        __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value = "23";
    }
}, _SirioTimePicker_setInputMinuteValue = function _SirioTimePicker_setInputMinuteValue(value) {
    if (parseInt(value) < 59) {
        __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value = (0, Utils_1.padStartWithZeros)(value, 2);
    }
    else {
        __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value = "59";
    }
}, _SirioTimePicker_handleInputHour = function _SirioTimePicker_handleInputHour() {
    if (__classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value.length == 1) {
        __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputHourValue).call(this, "0" + __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value);
        __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value + ":" + __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value;
    }
    else if (__classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value.length > 1) {
        if (parseInt(__classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value) > 23)
            __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputHourValue).call(this, "23");
        else
            __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputHourValue).call(this, parseInt(__classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value).toString());
        __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value + ":" + __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value;
    }
}, _SirioTimePicker_handleInputMinute = function _SirioTimePicker_handleInputMinute() {
    if (__classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value.length == 1) {
        __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputMinuteValue).call(this, "0" + __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value);
        __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value + ":" + __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value;
    }
    else if (__classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value.length > 1) {
        if (parseInt(__classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value) > 59)
            __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputMinuteValue).call(this, "59");
        else
            __classPrivateFieldGet(this, _SirioTimePicker_instances, "m", _SirioTimePicker_setInputMinuteValue).call(this, parseInt(__classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value).toString());
        __classPrivateFieldGet(this, _SirioTimePicker_textInputEl, "f").value = __classPrivateFieldGet(this, _SirioTimePicker_inputHour, "f").value + ":" + __classPrivateFieldGet(this, _SirioTimePicker_inputMinute, "f").value;
    }
};


/***/ }),

/***/ 419:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SirioToast_instances, _SirioToast_toastEl, _SirioToast_dismissEl, _SirioToast_hidden, _SirioToast_delay, _SirioToast_toastType, _SirioToast_onShow, _SirioToast_onShown, _SirioToast_onHide, _SirioToast_onHidden, _SirioToast_checkType;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SirioToast = void 0;
class SirioToast {
    constructor(toastEl, onShow, onHide, onShown, onHidden) {
        _SirioToast_instances.add(this);
        _SirioToast_toastEl.set(this, void 0);
        _SirioToast_dismissEl.set(this, void 0);
        _SirioToast_hidden.set(this, void 0);
        _SirioToast_delay.set(this, void 0);
        _SirioToast_toastType.set(this, void 0);
        _SirioToast_onShow.set(this, void 0);
        _SirioToast_onShown.set(this, void 0);
        _SirioToast_onHide.set(this, void 0);
        _SirioToast_onHidden.set(this, void 0);
        if (SirioToast.isToast(toastEl)) {
            __classPrivateFieldSet(this, _SirioToast_toastEl, toastEl, "f");
            __classPrivateFieldSet(this, _SirioToast_onShow, onShow, "f");
            __classPrivateFieldSet(this, _SirioToast_onHide, onHide, "f");
            __classPrivateFieldSet(this, _SirioToast_onShown, onShown, "f");
            __classPrivateFieldSet(this, _SirioToast_onHidden, onHidden, "f");
            __classPrivateFieldSet(this, _SirioToast_delay, parseInt(toastEl.getAttribute("data-sirio-delay") || "5000"), "f");
            __classPrivateFieldSet(this, _SirioToast_dismissEl, toastEl.querySelector(`[data-sirio-dismiss="toast"]`), "f");
            __classPrivateFieldGet(this, _SirioToast_dismissEl, "f").addEventListener("click", (event) => {
                event.preventDefault();
                this.hide();
            });
            __classPrivateFieldSet(this, _SirioToast_toastType, __classPrivateFieldGet(this, _SirioToast_instances, "m", _SirioToast_checkType).call(this), "f");
            __classPrivateFieldSet(this, _SirioToast_hidden, true, "f");
            this.show();
        }
        else
            throw TypeError(`HTML element" '${toastEl}'" is not a valid Sirio-Toast.`);
    }
    static isToast(toastEl) {
        const validRoles = ["alert"];
        if (toastEl != null) {
            let role = toastEl.getAttribute("role");
            if (typeof role === "string") {
                if (validRoles.includes(role))
                    return true;
            }
        }
        return false;
    }
    getToastEl() {
        return __classPrivateFieldGet(this, _SirioToast_toastEl, "f");
    }
    getToastType() {
        return __classPrivateFieldGet(this, _SirioToast_toastType, "f");
    }
    getDismissEl() {
        return __classPrivateFieldGet(this, _SirioToast_dismissEl, "f");
    }
    getDismissDelay() {
        return __classPrivateFieldGet(this, _SirioToast_delay, "f");
    }
    setOnShow(onShow) {
        __classPrivateFieldSet(this, _SirioToast_onShow, onShow, "f");
    }
    setOnHide(onHide) {
        __classPrivateFieldSet(this, _SirioToast_onHide, onHide, "f");
    }
    setOnShown(onShown) {
        __classPrivateFieldSet(this, _SirioToast_onShown, onShown, "f");
    }
    setOnHidden(onHidden) {
        __classPrivateFieldSet(this, _SirioToast_onHidden, onHidden, "f");
    }
    isHidden() {
        return __classPrivateFieldGet(this, _SirioToast_hidden, "f");
    }
    setDismissDelay(delay) {
        __classPrivateFieldSet(this, _SirioToast_delay, delay, "f");
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isHidden()) {
                if (__classPrivateFieldGet(this, _SirioToast_onShow, "f") != null)
                    yield __classPrivateFieldGet(this, _SirioToast_onShow, "f").call(this);
                __classPrivateFieldSet(this, _SirioToast_hidden, false, "f");
                __classPrivateFieldGet(this, _SirioToast_toastEl, "f").setAttribute("data-sirio-visible", "true");
                if (__classPrivateFieldGet(this, _SirioToast_onShown, "f") != null)
                    __classPrivateFieldGet(this, _SirioToast_onShown, "f").call(this);
                setTimeout(() => {
                    this.hide();
                }, __classPrivateFieldGet(this, _SirioToast_delay, "f"));
            }
        });
    }
    hide() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isHidden()) {
                if (__classPrivateFieldGet(this, _SirioToast_onHide, "f") != null)
                    yield __classPrivateFieldGet(this, _SirioToast_onHide, "f").call(this);
                __classPrivateFieldSet(this, _SirioToast_hidden, true, "f");
                __classPrivateFieldGet(this, _SirioToast_toastEl, "f").setAttribute("data-sirio-visible", "false");
                if (__classPrivateFieldGet(this, _SirioToast_onHidden, "f") != null)
                    __classPrivateFieldGet(this, _SirioToast_onHidden, "f").call(this);
            }
        });
    }
    dispose() {
        __classPrivateFieldGet(this, _SirioToast_toastEl, "f").remove();
    }
}
exports.SirioToast = SirioToast;
_SirioToast_toastEl = new WeakMap(), _SirioToast_dismissEl = new WeakMap(), _SirioToast_hidden = new WeakMap(), _SirioToast_delay = new WeakMap(), _SirioToast_toastType = new WeakMap(), _SirioToast_onShow = new WeakMap(), _SirioToast_onShown = new WeakMap(), _SirioToast_onHide = new WeakMap(), _SirioToast_onHidden = new WeakMap(), _SirioToast_instances = new WeakSet(), _SirioToast_checkType = function _SirioToast_checkType() {
    if (__classPrivateFieldGet(this, _SirioToast_toastEl, "f").classList.contains("sirio-toast-danger"))
        return "danger";
    else if (__classPrivateFieldGet(this, _SirioToast_toastEl, "f").classList.contains("sirio-toast-error"))
        return "error";
    else if (__classPrivateFieldGet(this, _SirioToast_toastEl, "f").classList.contains("sirio-toast-info"))
        return "info";
    else if (__classPrivateFieldGet(this, _SirioToast_toastEl, "f").classList.contains("sirio-toast-warning"))
        return "warning";
    else if (__classPrivateFieldGet(this, _SirioToast_toastEl, "f").classList.contains("sirio-toast-success"))
        return "success";
    else
        return undefined;
};


/***/ }),

/***/ 713:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SirioTooltip_instances, _SirioTooltip_placement, _SirioTooltip_title, _SirioTooltip_content, _SirioTooltip_margin, _SirioTooltip_createHTMLElement, _SirioTooltip_calculatePosition, _SirioTooltip_calculateXY, _SirioTooltip_handleMouseOver, _SirioTooltip_handleMouseOut, _SirioTooltip_handleMouseOutTrigger, _SirioTooltip_handleBlur, _SirioTooltip_handleClick, _SirioTooltip_handleKeyDown, _SirioTooltip_handleFocus;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SirioTooltip = void 0;
const Constants_1 = __webpack_require__(738);
const Utils_1 = __webpack_require__(675);
class SirioTooltip {
    constructor(triggerElement, margin = 10) {
        _SirioTooltip_instances.add(this);
        _SirioTooltip_placement.set(this, void 0);
        _SirioTooltip_title.set(this, void 0);
        _SirioTooltip_content.set(this, void 0);
        _SirioTooltip_margin.set(this, void 0);
        let dataSirioToggle = triggerElement.getAttribute("data-sirio-toggle");
        this.triggerElement = triggerElement;
        __classPrivateFieldSet(this, _SirioTooltip_placement, triggerElement.getAttribute("data-sirio-placement") || "top", "f");
        __classPrivateFieldSet(this, _SirioTooltip_title, triggerElement.getAttribute("title"), "f");
        __classPrivateFieldSet(this, _SirioTooltip_content, triggerElement.getAttribute("data-sirio-content"), "f");
        this.hidden = true;
        this.element = null;
        __classPrivateFieldSet(this, _SirioTooltip_margin, margin, "f");
        if (dataSirioToggle === "tooltip") {
            this.triggerElement.addEventListener("mouseout", (event) => __classPrivateFieldGet(this, _SirioTooltip_instances, "m", _SirioTooltip_handleMouseOut).call(this, event));
            this.triggerElement.addEventListener("blur", (event) => __classPrivateFieldGet(this, _SirioTooltip_instances, "m", _SirioTooltip_handleBlur).call(this, event));
        }
    }
    static init() {
        let triggerElements = document.querySelectorAll(`[data-sirio-toggle="tooltip"]`);
        triggerElements.forEach(function (trigger) {
            SirioTooltip.initComponent(trigger);
        });
    }
    static initComponent(trigger) {
        let tooltip = new SirioTooltip(trigger);
        trigger.addEventListener("mouseover", (event) => __classPrivateFieldGet(tooltip, _SirioTooltip_instances, "m", _SirioTooltip_handleMouseOver).call(tooltip, event));
        trigger.addEventListener("focus", (event) => __classPrivateFieldGet(tooltip, _SirioTooltip_instances, "m", _SirioTooltip_handleFocus).call(tooltip, event));
        window.addEventListener("keydown", (event) => __classPrivateFieldGet(tooltip, _SirioTooltip_instances, "m", _SirioTooltip_handleKeyDown).call(tooltip, event));
        SirioTooltip.tooltips.set(trigger, tooltip);
    }
    static destroy(trigger) {
        let tooltip = SirioTooltip.tooltips.get(trigger);
        if (tooltip) {
            tooltip.removeEventListeners();
            SirioTooltip.tooltips.delete(trigger);
            tooltip = null;
        }
    }
    static getTooltipByElement(element) {
        return SirioTooltip.tooltips.get(element) || null;
    }
    getTriggerElement() {
        return this.triggerElement;
    }
    show() {
        this.showElement();
    }
    showElement(idName = "tooltip", forceRepositioning = false) {
        let tooltipElement;
        if (this.hidden) {
            tooltipElement = __classPrivateFieldGet(this, _SirioTooltip_instances, "m", _SirioTooltip_createHTMLElement).call(this, idName);
            document.body.appendChild(tooltipElement);
            if (idName === "tooltip") {
                tooltipElement.addEventListener("mouseout", (event) => __classPrivateFieldGet(this, _SirioTooltip_instances, "m", _SirioTooltip_handleMouseOutTrigger).call(this, event));
                tooltipElement.addEventListener("click", (event) => __classPrivateFieldGet(this, _SirioTooltip_instances, "m", _SirioTooltip_handleClick).call(this, event));
            }
        }
        if (this.hidden || forceRepositioning) {
            tooltipElement = tooltipElement || this.element;
            let [x, y] = __classPrivateFieldGet(this, _SirioTooltip_instances, "m", _SirioTooltip_calculatePosition).call(this, tooltipElement);
            tooltipElement.style.transform = `translate(${x}px, ${y}px)`;
            this.element = tooltipElement;
        }
        this.hidden = false;
    }
    hide() {
        var _a;
        if (!this.hidden) {
            this.triggerElement.removeAttribute("aria-describedby");
            this.triggerElement.removeAttribute("style");
            (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
            this.element = null;
            this.hidden = true;
        }
    }
    setMargin(margin) {
        __classPrivateFieldSet(this, _SirioTooltip_margin, margin, "f");
    }
    removeEventListeners() {
        var _a, _b;
        let trigger = this.triggerElement;
        if (trigger !== null) {
            let tooltip = this;
            trigger.removeEventListener("mouseover", (event) => __classPrivateFieldGet(tooltip, _SirioTooltip_instances, "m", _SirioTooltip_handleMouseOver).call(tooltip, event));
            trigger.removeEventListener("focus", (event) => __classPrivateFieldGet(tooltip, _SirioTooltip_instances, "m", _SirioTooltip_handleFocus).call(tooltip, event));
            window.removeEventListener("keydown", (event) => __classPrivateFieldGet(tooltip, _SirioTooltip_instances, "m", _SirioTooltip_handleKeyDown).call(tooltip, event));
            let dataSirioToggle = this.triggerElement.getAttribute("data-sirio-toggle");
            if (dataSirioToggle === "tooltip") {
                this.triggerElement.removeEventListener("mouseout", (event) => __classPrivateFieldGet(this, _SirioTooltip_instances, "m", _SirioTooltip_handleMouseOut).call(this, event));
                this.triggerElement.removeEventListener("blur", (event) => __classPrivateFieldGet(this, _SirioTooltip_instances, "m", _SirioTooltip_handleBlur).call(this, event));
                (_a = this.element) === null || _a === void 0 ? void 0 : _a.removeEventListener("mouseout", (event) => __classPrivateFieldGet(this, _SirioTooltip_instances, "m", _SirioTooltip_handleMouseOutTrigger).call(this, event));
                (_b = this.element) === null || _b === void 0 ? void 0 : _b.removeEventListener("click", (event) => __classPrivateFieldGet(this, _SirioTooltip_instances, "m", _SirioTooltip_handleClick).call(this, event));
            }
        }
        return;
    }
}
exports.SirioTooltip = SirioTooltip;
_SirioTooltip_placement = new WeakMap(), _SirioTooltip_title = new WeakMap(), _SirioTooltip_content = new WeakMap(), _SirioTooltip_margin = new WeakMap(), _SirioTooltip_instances = new WeakSet(), _SirioTooltip_createHTMLElement = function _SirioTooltip_createHTMLElement(idName) {
    let tooltipElement = document.createElement("div");
    tooltipElement.classList.add(Constants_1.sirioPrefix + "tooltip");
    tooltipElement.setAttribute("role", "tooltip");
    let randomPart = (0, Utils_1.makeNumberId)(5);
    tooltipElement.id = idName + randomPart;
    tooltipElement.tabIndex = -1;
    this.triggerElement.setAttribute("aria-describedby", tooltipElement.id);
    let titleElement = document.createElement("strong");
    titleElement.textContent = __classPrivateFieldGet(this, _SirioTooltip_title, "f");
    if (__classPrivateFieldGet(this, _SirioTooltip_content, "f") == null) {
        tooltipElement.appendChild(titleElement);
    }
    else {
        let tooltipInnerElement = document.createElement("div");
        tooltipInnerElement.classList.add(Constants_1.sirioPrefix + "tooltip-inner");
        let titleSectionElement = document.createElement("p");
        titleSectionElement.appendChild(titleElement);
        tooltipInnerElement.appendChild(titleSectionElement);
        tooltipInnerElement.innerHTML += __classPrivateFieldGet(this, _SirioTooltip_content, "f");
        tooltipElement.appendChild(tooltipInnerElement);
    }
    tooltipElement.style.position = "absolute";
    tooltipElement.style.top = "0";
    tooltipElement.style.left = "0";
    tooltipElement.style.willChange = "transform";
    return tooltipElement;
}, _SirioTooltip_calculatePosition = function _SirioTooltip_calculatePosition(tooltipElement) {
    let triggerPosition = this.triggerElement.getBoundingClientRect(), triggerX = triggerPosition.x + document.documentElement.scrollLeft, triggerY = triggerPosition.y + document.documentElement.scrollTop;
    let thisCyclePosition = cyclePositions[__classPrivateFieldGet(this, _SirioTooltip_placement, "f")];
    for (let i = 0; i < thisCyclePosition.length; i++) {
        try {
            let [x, y] = __classPrivateFieldGet(this, _SirioTooltip_instances, "m", _SirioTooltip_calculateXY).call(this, thisCyclePosition[i], tooltipElement.offsetWidth, tooltipElement.offsetHeight, triggerX, triggerY, this.triggerElement.offsetWidth, this.triggerElement.offsetHeight);
            return [x, y];
        }
        catch (err) { }
    }
    return __classPrivateFieldGet(this, _SirioTooltip_instances, "m", _SirioTooltip_calculateXY).call(this, __classPrivateFieldGet(this, _SirioTooltip_placement, "f"), tooltipElement.offsetWidth, tooltipElement.offsetHeight, triggerX, triggerY, this.triggerElement.offsetWidth, this.triggerElement.offsetHeight, true);
}, _SirioTooltip_calculateXY = function _SirioTooltip_calculateXY(placement, tooltipWidth, tooltipHeight, triggerX, triggerY, triggerWidth, triggerHeight, force = false) {
    let x = 0, y = 0;
    switch (placement) {
        case "top-start":
            x = triggerX;
            y = triggerY - tooltipHeight - __classPrivateFieldGet(this, _SirioTooltip_margin, "f");
            break;
        case "top":
            x = triggerX + triggerWidth / 2 - tooltipWidth / 2;
            y = triggerY - tooltipHeight - __classPrivateFieldGet(this, _SirioTooltip_margin, "f");
            break;
        case "top-end":
            x = triggerX + triggerWidth - tooltipWidth;
            y = triggerY - tooltipHeight - __classPrivateFieldGet(this, _SirioTooltip_margin, "f");
            break;
        case "left":
            x = triggerX - tooltipWidth - __classPrivateFieldGet(this, _SirioTooltip_margin, "f");
            y = triggerY + triggerHeight / 2 - tooltipHeight / 2;
            break;
        case "right":
            x = triggerX + triggerWidth + __classPrivateFieldGet(this, _SirioTooltip_margin, "f");
            y = triggerY + triggerHeight / 2 - tooltipHeight / 2;
            break;
        case "bottom-start":
            x = triggerX;
            y = triggerY + triggerHeight + __classPrivateFieldGet(this, _SirioTooltip_margin, "f");
            break;
        case "bottom":
            x = triggerX + triggerWidth / 2 - tooltipWidth / 2;
            y = triggerY + triggerHeight + __classPrivateFieldGet(this, _SirioTooltip_margin, "f");
            break;
        case "bottom-end":
            x = triggerX + triggerWidth - tooltipWidth;
            y = triggerY + triggerHeight + __classPrivateFieldGet(this, _SirioTooltip_margin, "f");
            break;
    }
    if (!force &&
        (x < 0 ||
            y < 0 ||
            x + tooltipWidth > document.body.offsetWidth ||
            y + tooltipHeight > document.body.offsetHeight))
        throw "Element is outside document";
    return [x, y];
}, _SirioTooltip_handleMouseOver = function _SirioTooltip_handleMouseOver(event) {
    event.preventDefault();
    this.showElement();
}, _SirioTooltip_handleMouseOut = function _SirioTooltip_handleMouseOut(event) {
    var _a;
    event.preventDefault();
    let newTarget = event.relatedTarget;
    if (newTarget && !((_a = this.element) === null || _a === void 0 ? void 0 : _a.contains(newTarget)))
        this.hide();
}, _SirioTooltip_handleMouseOutTrigger = function _SirioTooltip_handleMouseOutTrigger(event) {
    var _a;
    event.preventDefault();
    let newTarget = event.relatedTarget;
    if (newTarget &&
        !(this.triggerElement.contains(newTarget) ||
            ((_a = this.element) === null || _a === void 0 ? void 0 : _a.contains(newTarget))))
        this.hide();
}, _SirioTooltip_handleBlur = function _SirioTooltip_handleBlur(event) {
    var _a;
    event.preventDefault();
    let target = event.relatedTarget;
    if (target &&
        !(this.triggerElement.contains(target) || ((_a = this.element) === null || _a === void 0 ? void 0 : _a.contains(target))))
        this.hide();
}, _SirioTooltip_handleClick = function _SirioTooltip_handleClick(event) {
    event.preventDefault();
    this.triggerElement.focus();
}, _SirioTooltip_handleKeyDown = function _SirioTooltip_handleKeyDown(event) {
    if (event.key === "Escape" || event.key === "Esc") {
        this.hide();
    }
}, _SirioTooltip_handleFocus = function _SirioTooltip_handleFocus(event) {
    event.preventDefault();
    this.showElement();
};
SirioTooltip.tooltips = new Map();
var cyclePositions = {
    top: [
        "top",
        "bottom",
        "top-start",
        "top-end",
        "bottom-start",
        "bottom-end",
        "left",
        "right",
    ],
    bottom: [
        "bottom",
        "top",
        "bottom-start",
        "bottom-end",
        "top-start",
        "top-end",
        "left",
        "right",
    ],
    left: [
        "left",
        "right",
        "top",
        "bottom",
        "top-start",
        "bottom-start",
        "top-end",
        "bottom-end",
    ],
    right: [
        "right",
        "left",
        "top",
        "bottom",
        "top-end",
        "bottom-end",
        "top-start",
        "bottom-start",
    ],
    "top-start": [
        "top-start",
        "bottom-start",
        "top",
        "bottom",
        "top-end",
        "bottom-end",
        "left",
        "right",
    ],
    "bottom-start": [
        "bottom-start",
        "top-start",
        "bottom",
        "top",
        "bottom-end",
        "top-end",
        "left",
        "right",
    ],
    "top-end": [
        "top-end",
        "bottom-end",
        "top",
        "bottom",
        "top-start",
        "bottom-start",
        "left",
        "right",
    ],
    "bottom-end": [
        "bottom-end",
        "top-end",
        "bottom",
        "top",
        "bottom-start",
        "top-start",
        "left",
        "right",
    ],
};


/***/ }),

/***/ 675:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.onVisible = exports.querySelectorAllIncludeSelf = exports.padStartWithZeros = exports.isDescendant = exports.makeNumberId = exports.dataSirioKeyboardHandler = exports.makeid = void 0;
function makeid(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(cryptoRandom() * charactersLength));
    }
    return result + "-";
}
exports.makeid = makeid;
function dataSirioKeyboardHandler() {
    document.body.addEventListener("keydown", (event) => {
        let key = event.key.toLowerCase();
        if (key == "tab")
            document.body.setAttribute("data-sirio-keyboard", "true");
    });
    document.body.addEventListener("click", (event) => {
        if (document.body.getAttribute("data-sirio-keyboard"))
            document.body.removeAttribute("data-sirio-keyboard");
    });
}
exports.dataSirioKeyboardHandler = dataSirioKeyboardHandler;
function makeNumberId(length) {
    var result = "";
    var characters = "0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(cryptoRandom() * charactersLength));
    }
    return result;
}
exports.makeNumberId = makeNumberId;
function isDescendant(parent, child) {
    let node = child.parentNode;
    while (node) {
        if (node === parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}
exports.isDescendant = isDescendant;
function padStartWithZeros(toPad, length) {
    while (toPad.length < length) {
        toPad = "0" + toPad;
    }
    return toPad;
}
exports.padStartWithZeros = padStartWithZeros;
function querySelectorAllIncludeSelf(element, selectors) {
    if (element && element instanceof HTMLElement)
        return [element, ...element.querySelectorAll(selectors)].filter((el) => el.matches(selectors));
    return [];
}
exports.querySelectorAllIncludeSelf = querySelectorAllIncludeSelf;
function cryptoRandom() {
    const typedArray = new Uint8Array(1);
    const randomValue = crypto.getRandomValues(typedArray)[0];
    const randomFloat = randomValue / Math.pow(2, 8);
    return randomFloat;
}
function onVisible(element, callback) {
    var observerObj = null;
    new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                callback(element);
                observerObj = observer;
            }
        });
    }).observe(element);
    return observerObj;
}
exports.onVisible = onVisible;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SirioDialog = exports.SirioToast = exports.SirioAlert = exports.getComponentByElement = exports.getComponentById = void 0;
const SirioPopover_1 = __webpack_require__(686);
const SirioAccordion_1 = __webpack_require__(376);
const SirioDialog_1 = __webpack_require__(291);
Object.defineProperty(exports, "SirioDialog", ({ enumerable: true, get: function () { return SirioDialog_1.SirioDialog; } }));
const SirioDropdownAutocomplete_1 = __webpack_require__(193);
const SirioDropdownMenu_1 = __webpack_require__(541);
const SirioDropdownSelect_1 = __webpack_require__(514);
const SirioFileUpload_1 = __webpack_require__(171);
const SirioTab_1 = __webpack_require__(768);
const SirioTooltip_1 = __webpack_require__(713);
const Utils_1 = __webpack_require__(675);
const SirioBreadcrumb_1 = __webpack_require__(991);
const SirioSlider_1 = __webpack_require__(223);
const SirioAlert_1 = __webpack_require__(832);
Object.defineProperty(exports, "SirioAlert", ({ enumerable: true, get: function () { return SirioAlert_1.SirioAlert; } }));
const SirioToast_1 = __webpack_require__(419);
Object.defineProperty(exports, "SirioToast", ({ enumerable: true, get: function () { return SirioToast_1.SirioToast; } }));
const SirioTable_1 = __webpack_require__(353);
const SirioTimePicker_1 = __webpack_require__(708);
const SirioSticky_1 = __webpack_require__(181);
const Utils_2 = __webpack_require__(675);
function initialize() {
    SirioDialog_1.SirioDialog.init();
    SirioAccordion_1.SirioAccordion.init();
    SirioTab_1.SirioTab.init();
    SirioDropdownMenu_1.SirioDropdownMenu.init();
    SirioDropdownSelect_1.SirioDropdownSelect.init();
    SirioDropdownAutocomplete_1.SirioDropdownAutocomplete.init();
    SirioFileUpload_1.SirioFileUpload.init();
    SirioTooltip_1.SirioTooltip.init();
    SirioPopover_1.SirioPopover.init();
    SirioBreadcrumb_1.SirioBreadcrumb.init();
    SirioSlider_1.SirioSlider.init();
    SirioTable_1.SirioTable.init();
    SirioTimePicker_1.SirioTimePicker.init();
    SirioSticky_1.SirioSticky.init();
}
(0, Utils_1.dataSirioKeyboardHandler)();
initialize();
function getComponentById(id, type) {
    switch (type) {
        case "dialog":
            return SirioDialog_1.SirioDialog.getDialogById(id);
        case "dropdown-menu":
            return SirioDropdownMenu_1.SirioDropdownMenu.getMenuById(id);
        case "dropdown-select":
            return SirioDropdownSelect_1.SirioDropdownSelect.getSelectById(id);
        case "dropdown-autocomplete":
            return SirioDropdownAutocomplete_1.SirioDropdownAutocomplete.getAutocompleteById(id);
        case "file-upload":
            return SirioFileUpload_1.SirioFileUpload.getFileUploadById(id);
        case "slider":
            return SirioSlider_1.SirioSlider.getSliderById(id);
        case "timepicker":
            return SirioTimePicker_1.SirioTimePicker.getTimePickerById(id);
        case "tab":
            return SirioTab_1.SirioTab.getTabById(id);
        default:
            throw TypeError(`Component of type '${type}' cannot be managed.`);
    }
}
exports.getComponentById = getComponentById;
function getComponentByElement(element, type) {
    switch (type) {
        case 'accordion':
            return SirioAccordion_1.SirioAccordion.getAccordionByElement(element);
        case 'breadcrumb':
            return SirioBreadcrumb_1.SirioBreadcrumb.getBreadcrumbByElement(element);
        case 'popover':
            return SirioPopover_1.SirioPopover.getPopoverByElement(element);
        case 'tooltip':
            return SirioTooltip_1.SirioTooltip.getTooltipByElement(element);
        case 'tab':
            return SirioTab_1.SirioTab.getTabGroupByElement(element);
        case 'table':
            return SirioTable_1.SirioTable.getTableByElement(element);
        case 'sticky':
            return SirioSticky_1.SirioSticky.getStickyByElement(element);
        default:
            throw TypeError(`Component of type '${type}' cannot be managed.`);
    }
}
exports.getComponentByElement = getComponentByElement;
function handleAddedNodes(addedNodes) {
    addedNodes.forEach(function (node) {
        if (node instanceof Element) {
            // Breadcrumb
            let breadcrumbComponentElements = (0, Utils_2.querySelectorAllIncludeSelf)(node, `[data-sirio-component="breadcrumb"]`);
            breadcrumbComponentElements.forEach(function (breadcrumbComponentEl) {
                SirioBreadcrumb_1.SirioBreadcrumb.initComponent(breadcrumbComponentEl);
            });
            // Dropdown menu
            let dropdownElements = (0, Utils_2.querySelectorAllIncludeSelf)(node, `[data-sirio-component="dropdown"]`);
            dropdownElements.forEach(function (dropdown) {
                SirioDropdownMenu_1.SirioDropdownMenu.initComponent(dropdown);
            });
            // Tab
            let tabGroups = (0, Utils_2.querySelectorAllIncludeSelf)(node, `[data-sirio-component="tab"] > ul`);
            tabGroups.forEach(function (group) {
                SirioTab_1.SirioTab.initComponent(group);
            });
            // Accordion
            let accordionElements = (0, Utils_2.querySelectorAllIncludeSelf)(node, `[data-sirio-toggle="collapse"]`);
            accordionElements.forEach(function (trigger) {
                SirioAccordion_1.SirioAccordion.initComponent(trigger);
            });
            // Table
            let tableElements = (0, Utils_2.querySelectorAllIncludeSelf)(node, ".sirio-table");
            tableElements.forEach(function (tableEl) {
                SirioTable_1.SirioTable.initComponent(tableEl);
            });
            // Dialogs
            let triggerElements = (0, Utils_2.querySelectorAllIncludeSelf)(node, `[data-sirio-toggle="dialog"]`);
            triggerElements.forEach(function (trigger) {
                SirioDialog_1.SirioDialog.initComponent(trigger);
            });
            // Tooltip
            let tooltipElements = (0, Utils_2.querySelectorAllIncludeSelf)(node, `[data-sirio-toggle="tooltip"]`);
            tooltipElements.forEach(function (trigger) {
                SirioTooltip_1.SirioTooltip.initComponent(trigger);
            });
            // Popover
            let popoverElements = (0, Utils_2.querySelectorAllIncludeSelf)(node, `[data-sirio-toggle="popover"]`);
            popoverElements.forEach(function (trigger) {
                SirioPopover_1.SirioPopover.initComponent(trigger);
            });
            // Sticky
            let stickyElements = (0, Utils_2.querySelectorAllIncludeSelf)(node, `[data-sirio-component="sticky"]`);
            if (stickyElements.length > 0)
                SirioSticky_1.SirioSticky.init();
            // Dropdown select
            let selectElements = (0, Utils_2.querySelectorAllIncludeSelf)(node, `[data-sirio-component="select"]`);
            selectElements.forEach(function (select) {
                SirioDropdownSelect_1.SirioDropdownSelect.initComponent(select);
            });
            // Dropdown autocomplete
            let autocompleteElements = (0, Utils_2.querySelectorAllIncludeSelf)(node, `[data-sirio-component="autocomplete"]`);
            autocompleteElements.forEach(function (autocomplete) {
                SirioDropdownAutocomplete_1.SirioDropdownAutocomplete.initComponent(autocomplete);
            });
            // File upload
            let uploadElements = (0, Utils_2.querySelectorAllIncludeSelf)(node, `[data-sirio-component="upload"]`);
            uploadElements.forEach(function (upload) {
                SirioFileUpload_1.SirioFileUpload.initComponent(upload);
            });
            // Slider
            let sliderComponentElements = (0, Utils_2.querySelectorAllIncludeSelf)(node, `[data-sirio-component="slider"]`);
            sliderComponentElements.forEach(function (sliderComponentEl) {
                SirioSlider_1.SirioSlider.initComponent(sliderComponentEl);
            });
            // Timepicker
            let timepickers = (0, Utils_2.querySelectorAllIncludeSelf)(node, `[data-sirio-component="timepicker"]`);
            timepickers.forEach(function (input) {
                SirioTimePicker_1.SirioTimePicker.initComponent(input);
            });
        }
    });
}
function handleRemovedNodes(removedNodes) {
    removedNodes.forEach(function (node) {
        // Accordion
        let accordionElements = (0, Utils_2.querySelectorAllIncludeSelf)(node, `[data-sirio-toggle="collapse"]`);
        accordionElements.forEach(function (trigger) {
            SirioAccordion_1.SirioAccordion.destroy(trigger);
        });
        // Dialogs
        let dialogElements = (0, Utils_2.querySelectorAllIncludeSelf)(node, `[data-sirio-toggle="dialog"]`);
        dialogElements.forEach(function (trigger) {
            var _a, _b;
            let targetId;
            switch (trigger.tagName.toLowerCase()) {
                case "button":
                    targetId = (_a = trigger.getAttribute("data-sirio-target")) === null || _a === void 0 ? void 0 : _a.substring(1); //substring per togliere il #
                    break;
                case "a":
                    targetId = (_b = trigger.getAttribute("href")) === null || _b === void 0 ? void 0 : _b.substring(1);
                    break;
                default:
            }
            if (targetId != undefined) {
                SirioDialog_1.SirioDialog.destroy(targetId);
            }
        });
        // SirioDropdown
        let dropdownElement = (0, Utils_2.querySelectorAllIncludeSelf)(node, `[data-sirio-component="dropdown"]`);
        dropdownElement.forEach(function (dropdown) {
            // Autocomplete
            let autocompleteElements = (0, Utils_2.querySelectorAllIncludeSelf)(dropdown, `[data-sirio-component="autocomplete"]`);
            autocompleteElements.forEach(function (autocomplete) {
                if ((autocomplete === null || autocomplete === void 0 ? void 0 : autocomplete.tagName.toLowerCase()) == "input") {
                    let id = autocomplete === null || autocomplete === void 0 ? void 0 : autocomplete.id;
                    SirioDropdownAutocomplete_1.SirioDropdownAutocomplete.destroy(id);
                }
            });
            // Dropdown
            let dropdownTriggers = (0, Utils_2.querySelectorAllIncludeSelf)(dropdown, `[data-sirio-toggle="dropdown"]`);
            dropdownTriggers.forEach(function (trigger) {
                if (trigger && trigger.tagName === "BUTTON") {
                    let id = trigger.id;
                    SirioDropdownMenu_1.SirioDropdownMenu.destroy(id);
                }
            });
            // Select
            let selectElements = (0, Utils_2.querySelectorAllIncludeSelf)(dropdown, `[data-sirio-component="select"]`);
            selectElements.forEach(function (select) {
                if ((select === null || select === void 0 ? void 0 : select.tagName.toLowerCase()) == "select") {
                    let id = select === null || select === void 0 ? void 0 : select.id;
                    SirioDropdownSelect_1.SirioDropdownSelect.destroy(id);
                }
            });
            // Timepicker
            let timepickers = (0, Utils_2.querySelectorAllIncludeSelf)(dropdown, `[data-sirio-component="timepicker"]`);
            timepickers.forEach(function (input) {
                SirioTimePicker_1.SirioTimePicker.destroy(input.id);
            });
        });
        // File upload
        let fileUploadElements = (0, Utils_2.querySelectorAllIncludeSelf)(node, `[data-sirio-component="upload"]`);
        fileUploadElements.forEach(function (fileUpload) {
            let input = fileUpload.querySelector("input");
            if (input) {
                let id = input.id;
                SirioFileUpload_1.SirioFileUpload.destroy(id);
            }
        });
        // Popover
        let popoverTriggers = (0, Utils_2.querySelectorAllIncludeSelf)(node, `[data-sirio-toggle="popover"]`);
        popoverTriggers.forEach(function (trigger) {
            SirioPopover_1.SirioPopover.destroy(trigger);
        });
        // Tooltip
        let tooltipElements = (0, Utils_2.querySelectorAllIncludeSelf)(node, `[data-sirio-toggle="tooltip"]`);
        tooltipElements.forEach(function (trigger) {
            SirioTooltip_1.SirioTooltip.destroy(trigger);
        });
        // Slider
        let sliderElements = (0, Utils_2.querySelectorAllIncludeSelf)(node, `[data-sirio-component="slider"]`);
        sliderElements.forEach(function (sliderComponentEl) {
            let sliderEl = sliderComponentEl.getElementsByTagName("input")[0];
            SirioSlider_1.SirioSlider.destroy(sliderEl.id);
        });
        // Breadcrumb
        let breadcrumbElements = (0, Utils_2.querySelectorAllIncludeSelf)(node, `[data-sirio-component="breadcrumb"]`);
        breadcrumbElements.forEach(function (breadcrumbComponentEl) {
            SirioBreadcrumb_1.SirioBreadcrumb.destroy(breadcrumbComponentEl);
        });
        // Tab
        let tabElementsGroups = (0, Utils_2.querySelectorAllIncludeSelf)(node, `[data-sirio-component="tab"] > ul`);
        tabElementsGroups.forEach(function (group) {
            SirioTab_1.SirioTab.destroy(group);
        });
        // Table
        let tableElements = (0, Utils_2.querySelectorAllIncludeSelf)(node, ".sirio-table");
        tableElements.forEach(function (table) {
            SirioTable_1.SirioTable.destroy(table);
        });
        // Sticky
        let stickyElements = (0, Utils_2.querySelectorAllIncludeSelf)(node, `[data-sirio-component="sticky"]`);
        if (stickyElements.length > 0)
            SirioSticky_1.SirioSticky.init();
    });
}
const observer = new MutationObserver(function (mutations_list) {
    mutations_list.forEach(function (mutation) {
        if (mutation.addedNodes.length > 0)
            handleAddedNodes(mutation.addedNodes);
        if (mutation.removedNodes.length > 0)
            handleRemovedNodes(mutation.removedNodes);
    });
});
observer.observe(document, { subtree: true, childList: true });

})();

SirioLib = __webpack_exports__;
/******/ })()
;