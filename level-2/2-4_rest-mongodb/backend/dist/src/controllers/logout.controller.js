"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const logout = (req, res) => {
    delete req.session.userId;
    res.json({ ok: true });
};
exports.logout = logout;
exports.default = { logout: exports.logout };
