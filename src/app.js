import {Server} from './models/server.js';


const app = async()=>{
    const server = new Server();
    await server.listen();
}

app()