import { Router } from "express"

class WebRoutes{

    public router: Router = Router()

    constructor(){
        this.config()
    }

    config(){
        this.router.get('/',        (req, res)=>res.render('index'))
        this.router.get('/nuevo',   (req, res)=>res.render('nuevo'))
    }

}
const webRoutes = new WebRoutes()
export default webRoutes.router