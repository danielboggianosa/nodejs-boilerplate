"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const servidor_controllers_1 = __importDefault(require("../controllers/servidor.controllers"));
class ServidorRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', servidor_controllers_1.default.create);
        this.router.get('/', servidor_controllers_1.default.read);
        this.router.put('/', servidor_controllers_1.default.update);
        this.router.delete('/', servidor_controllers_1.default.delete);
    }
}
const servidorRoutes = new ServidorRoutes();
exports.default = servidorRoutes.router;
