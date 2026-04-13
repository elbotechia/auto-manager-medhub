export class MainController {
    constructor(){
        
    }

    async getIndex(req, res){
        res.sendFile('index.html', { root: 'public' });
    }
}