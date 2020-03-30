"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const child_process_1 = require("child_process");
class ServidorController {
    //CREATE
    async create(req, res) {
        const { nombre, descripcion, puerto, tipo } = req.body;
        const servidor = nombre.toLowerCase().split(" ").join("-");
        const packagePath = `./.temp/${servidor}/package.json`;
        child_process_1.exec(`
            unzip source_files.zip -d .temp/${servidor} && 
            mv .temp/${servidor}/src/databases/${tipo} .temp/${servidor}/src/database && 
            rm -rf .temp/${servidor}/src/databases &&
            mv .temp/${servidor}/src/models/Usuario.${tipo}.ts .temp/${servidor}/src/models/Usuario.ts &&
            echo "PORT=${puerto}" >> .temp/${servidor}/.env
        `, (err, sout, serr) => {
            if (sout || serr) {
                let packageJson = fs_extra_1.default.readJSONSync(packagePath);
                packageJson.name = servidor;
                packageJson.description = descripcion;
                switch (tipo) {
                    case 'basico':
                        delete packageJson.dependencies.mongoose;
                        delete packageJson.dependencies.sequelize;
                        delete packageJson.dependencies.mysql2;
                        break;
                    case 'mysql':
                        child_process_1.exec(`rm .temp/${servidor}/src/models/Usuario.mongodb.ts`);
                        delete packageJson.dependencies.mongoose;
                        break;
                    case 'mongodb':
                        child_process_1.exec(`rm .temp/${servidor}/src/models/Usuario.mysql.ts`);
                        delete packageJson.dependencies.sequelize;
                        delete packageJson.dependencies.mysql2;
                        break;
                }
                fs_extra_1.default.writeFile(packagePath, JSON.stringify(packageJson, null, '\t'), (err) => {
                    if (!err) {
                        let now = new Date().getTime();
                        child_process_1.exec(`cd .temp/${servidor} && 
                            zip -rm ../../.ziped/${servidor}-${now}.zip * .env .gitignore && 
                            cd ../ && rm -rf ${servidor}`);
                    }
                    else
                        throw err;
                });
            }
            else
                throw err;
        });
        res.json({ success: true, message: "Servidor creado satisfactoriamente" });
    }
    //READ
    async read(req, res) {
        res.json({ success: true, message: 'Accediendo al método LISTAR' });
    }
    //UPDATE
    async update(req, res) {
        res.json({ success: true, message: 'Accediendo al método ACTUALIZAR' });
    }
    //DELTE
    async delete(req, res) {
        res.json({ success: true, message: 'Accediendo al método BORRAR' });
    }
}
const servidorController = new ServidorController();
exports.default = servidorController;
