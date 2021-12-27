import { createServer, IncomingMessage, ServerResponse } from "http";
import { Routes } from "./routes";

class Server {
    req: IncomingMessage;
    res: ServerResponse;

    constructor() {
        this.server();
        this.req = null;
        this.res = null;
    }

    server() {
        createServer((req, res) => {
            this.req = req;
            this.res = res;

            new Routes(req, res);

        }).listen(3333, () => {
            console.log("Running  on port 3333")
        })
    }
}


new Server();