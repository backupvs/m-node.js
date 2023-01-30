"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const logout = (req, res) => {
    if (!req.session.userId) {
        res.status(400).json({ error: "already logged out" });
        return;
    }
    delete req.session.userId;
    res.json({ ok: true });
};
exports.logout = logout;
exports.default = { logout: exports.logout };
