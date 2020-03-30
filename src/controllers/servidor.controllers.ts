import {Request, Response} from 'express';
import fs from 'fs-extra'
import { exec } from 'child_process'
import {google} from 'googleapis'

class ServidorController{
    
    
    //CREATE
    public async create(req:Request, res:Response): Promise<void>{
        const {nombre, descripcion, puerto, tipo} = req.body
        const servidor = nombre.toLowerCase().split(" ").join("-")
        const packagePath = `./.temp/${servidor}/package.json`
        exec(`
            unzip source_files.zip -d .temp/${servidor} && 
            mv .temp/${servidor}/src/databases/${tipo} .temp/${servidor}/src/database && 
            rm -rf .temp/${servidor}/src/databases &&
            mv .temp/${servidor}/src/models/Usuario.${tipo}.ts .temp/${servidor}/src/models/Usuario.ts &&
            echo "PORT=${puerto}" >> .temp/${servidor}/.env
        `, (err, sout, serr) => {
            if (sout || serr) {
                let packageJson = fs.readJSONSync(packagePath);
                packageJson.name = servidor;
                packageJson.description = descripcion;
                switch (tipo) {
                    case 'basico':
                        delete packageJson.dependencies.mongoose;
                        delete packageJson.dependencies.sequelize;
                        delete packageJson.dependencies.mysql2;
                        break;
                    case 'mysql':
                        exec(`rm .temp/${servidor}/src/models/Usuario.mongodb.ts`);
                        delete packageJson.dependencies.mongoose;
                        break;
                    case 'mongodb':
                        exec(`rm .temp/${servidor}/src/models/Usuario.mysql.ts`);
                        delete packageJson.dependencies.sequelize;
                        delete packageJson.dependencies.mysql2;
                        break;
                }
                fs.writeFile(packagePath, JSON.stringify(packageJson, null, '\t'), (err)=>{
                    if(!err){
                        let now = new Date().getTime()
                        exec(`cd .temp/${servidor} && 
                            zip -rm ../../.ziped/${servidor}-${now}.zip * .env .gitignore && 
                            cd ../ && rm -rf ${servidor}`)
                    }
                    else throw err
                });
            }
            else throw err
        }) 
        res.json({success: true,message:"Servidor creado satisfactoriamente"})
    }
    
    //READ
    public async read(req:Request, res:Response): Promise<void>{
        res.json({success:true,message: 'Accediendo al método LISTAR'});
    }
    
    //UPDATE
    public async update(req:Request, res:Response): Promise<void>{
        res.json({success:true,message: 'Accediendo al método ACTUALIZAR'});
    }
    
    //DELTE
    public async delete(req:Request, res:Response): Promise<void>{
        res.json({success:true,message: 'Accediendo al método BORRAR'});
    }
}
const servidorController = new ServidorController();
export default servidorController;
