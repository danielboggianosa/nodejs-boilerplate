import {Router} from 'express';
import servidorController from '../controllers/servidor.controllers';

class ServidorRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.post('/', servidorController.create)
        this.router.get('/', servidorController.read)
        this.router.put('/', servidorController.update)
        this.router.delete('/', servidorController.delete)
    }
}
const servidorRoutes = new ServidorRoutes();
export default servidorRoutes.router;
