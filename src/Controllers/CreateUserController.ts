import { createReadStream, createWriteStream } from "fs";
import { IncomingMessage, ServerResponse } from "http";
import { buffer } from "stream/consumers";
import { CreateUserService } from "../Services/CreateUserService";

class CreateUserController {
    async handle(req: IncomingMessage, res: ServerResponse) {
        const service = new CreateUserService();
        let buffers = [];
        
        for await (const chunk of req) {
            buffers.push(chunk);
        }
        const body =  Buffer.concat(buffers).toString();
      
        console.log(JSON.parse(body), "bodydepois");
      try {
        const response = await service.execute(JSON.parse(body));

        res.statusCode = 200;
        return res.end(response);
      }catch(err) {
        res.statusCode = 401;
        return res.end(JSON.stringify({ Error: err.message }));
      }
    }
}

export { CreateUserController };