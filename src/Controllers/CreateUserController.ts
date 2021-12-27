import { createReadStream, createWriteStream } from "fs";
import { IncomingMessage, ServerResponse } from "http";
import { buffer } from "stream/consumers";
import { CreateUserService } from "../Services/CreateUserService";

class CreateUserController {
    async handle(req: IncomingMessage, res: ServerResponse) {
        const service = new CreateUserService();
        let body = '';
        
        req.on("data", (chunk) => {
            body += chunk;
            /* console.log(body, "body") */
        })


      
        console.log(body, "bodydepois");
      try {
        /* const response = await service.execute(objectBody); */

        res.statusCode = 200;
        return res.end({ teste: "ok"});
      }catch(err) {
        res.statusCode = 401;
        return res.end(JSON.stringify({ Error: err.message }));
      }
    }
}

export { CreateUserController };