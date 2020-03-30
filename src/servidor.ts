import express from 'express'
import {Application} from 'express-serve-static-core'
import morgan from 'morgan'
import cors from 'cors'
import servidorRoutes from './routes/servidor.routes'
import webRoutes from './routes/web.routes'
import dotenv from 'dotenv'

class Servidor{
    public app: Application

    constructor(){
        this.app = express()
        this.config()
        this.routes()
    }
    
    config(){
        dotenv.config()
        this.app.set('port', /* process.env.PORT ||  */4500);
        this.app.set('view engine', 'pug');
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    }
    
    routes():void{
        this.app.use('/api', servidorRoutes);
        this.app.use('/', webRoutes)
        this.app.use('/public', express.static(__dirname+'.ziped'))
    }

    start():void{
        this.app.listen(this.app.get('port'), ()=>console.log('Servidor en el puerto', this.app.get('port')))
    }
}
const servidor = new Servidor()
servidor.start()