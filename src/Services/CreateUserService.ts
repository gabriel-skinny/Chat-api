import { hash } from "bcrypt"
import { FirebaseAdpter } from "../Infra/FirebaseAdpter";

interface IData {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: IData) {
    const firebaseAdpter = new FirebaseAdpter()

    const snapShotVal = await firebaseAdpter.getUser();
    const users = Object.values(snapShotVal) as IData[];

    if (users) {
      if (users.find(user => user.email === email)) throw new Error("User already created"); 
    } 

    hash(password, 2, async (err, hash) => {
      if (err) throw err;

      await firebaseAdpter.creteUser({
        name,
        email,
        password: hash
      })
    });

    return {
      name,
      email
    };
  }
}

export { CreateUserService };