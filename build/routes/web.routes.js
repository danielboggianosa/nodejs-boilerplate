"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class WebRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.render('index'));
        this.router.get('/nuevo', (req, res) => res.render('nuevo'));
    }
}
const webRoutes = new WebRoutes();
exports.default = webRoutes.router;
