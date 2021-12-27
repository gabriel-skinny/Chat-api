import { IncomingMessage, ServerResponse } from "http";
import { CreateUserController } from "./Controllers/CreateUserController";
import { ListarUserController } from "./Controllers/ListarUsuariosController";

class Routes {
    constructor(private req: IncomingMessage, private res: ServerResponse) {
        this.formatFunction();
    }

    getUser() {
        new ListarUserController().handle(this.req, this.res);
    }

    postRegister(){
        new CreateUserController().handle(this.req, this.res);
    }

    formatFunction() {
        const [, routeName] = this.req.url.split("/");
        const functionName = this.req.method.toLocaleLowerCase() + routeName;
        if (!this[functionName]) return this.res.end("Route does not exists");

        this[functionName]();
    }
}

export { Routes };