import { IncomingMessage, ServerResponse } from "http";
import { ListarUserService } from "../Services/ListarUserService";

class ListarUserController {
    async handle(req: IncomingMessage, res: ServerResponse) {
      const service = new ListarUserService();
      
      try {
        const response = await service.execute();

        res.statusCode = 200;
        return res.end(JSON.stringify(response));
      }catch(err) {
        res.statusCode = 401;
        return res.end(JSON.stringify({ Error: err.message }));
      }
    }
}

export { ListarUserController };