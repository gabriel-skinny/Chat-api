import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

interface IConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}


class Database {
  config: IConfig;

  constructor() {


    this.connect();
  }

  async connect() {
    const app = initializeApp(this.config);

    getDatabase(app);
  }

}

export { Database };
