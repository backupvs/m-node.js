"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRequired = void 0;
const loginRequired = (req, res, next) => {
    if (!req.session.user) {
        res.status(401).json({ error: "unauthorized" });
    }
    else {
        next();
    }
};
exports.loginRequired = loginRequired;
exports.default = exports.loginRequired;
