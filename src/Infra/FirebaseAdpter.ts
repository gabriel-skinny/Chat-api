import { getDatabase, get, child, ref, Database, set, update} from "firebase/database";
import { v4 as uuid } from "uuid";

interface IUser {
    name: string;
    email: string;
    password: string;
}

interface IMessage {
    user_id: number;
    message: string;
    name: string;
    email: string;
}

class FirebaseAdpter {
    db:Database;
    
    constructor() {
        this.db = getDatabase();
    }
    
    async getUser() {
        const snapShot = await get(child(ref(this.db), "users"));
        
        if (!(snapShot.exists())) throw new Error("No data on user");

        return snapShot.val();
    }

    async getMessages() {
        const snapShot = await get(child(ref(this.db), "messages"));
        
        if (!(snapShot.exists())) throw new Error("No data on messages");

        return snapShot.val();
    }

    async creteUser(data: IUser) {
        await set(ref(this.db, "users/" + uuid()), {
            ...data,
            timestamp: new Date().getTime()
        }); 
    }

    async creteMessage(data: IMessage) {
        await set(ref(this.db, "messages/" + uuid()), {
            ...data,
            timestamp: new Date().getTime()
        }); 
    }

    async updateUserPassword(email: string, password:string) {
        const usersJson = await this.getUser();
        const users = Object.values(usersJson) as IUser[];
        const ids = Object.keys(usersJson);

        const foundIndex = users.findIndex(user => user.email === email);

        if (foundIndex < 0) throw new Error("User doest not exists");

        const id = ids[foundIndex];
        const updates = {};
        updates["users/" + id] = {...users[foundIndex], password};

        update(ref(this.db), updates);
    }
}

export { FirebaseAdpter };