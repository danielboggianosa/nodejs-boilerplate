"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const servidor_routes_1 = __importDefault(require("./routes/servidor.routes"));
const web_routes_1 = __importDefault(require("./routes/web.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
class Servidor {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        dotenv_1.default.config();
        this.app.set('port', /* process.env.PORT ||  */ 4500);
        this.app.set('view engine', 'pug');
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api', servidor_routes_1.default);
        this.app.use('/', web_routes_1.default);
        this.app.use('/public', express_1.default.static(__dirname + '.ziped'));
    }
    start() {
        this.app.listen(this.app.get('port'), () => console.log('Servidor en el puerto', this.app.get('port')));
    }
}
const servidor = new Servidor();
servidor.start();
