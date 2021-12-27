import { createServer, IncomingMessage, ServerResponse } from "http";
import { Database } from "./Database/firebase";
import { Routes } from "./routes";

class Server {
    req: IncomingMessage;
    res: ServerResponse;

    constructor() {
        this.server();
        this.database();
        this.req = null;
        this.res = null;

    }

    database() {
        new Database();
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