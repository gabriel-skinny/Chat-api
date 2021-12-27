import { FirebaseAdpter } from "../Infra/FirebaseAdpter";

interface IUser {
    nome: string;
    email: string;
    password: string;
    timestamp: number;
}

class ListarUserService {
    async execute() {
        const snapShowVal = await new FirebaseAdpter().getUser();
        const users = Object.values(snapShowVal) as IUser[];
        users.forEach(user => delete user.password)
        
        users.sort((previus, now) => previus.timestamp - now.timestamp);

        return users;
    }
}

export { ListarUserService };