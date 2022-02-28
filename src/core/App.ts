import express, { Application } from 'express';
import { json } from 'body-parser';
import ContentType from '../middlewares/ContentType';

class App {
  public server: Application;

  constructor() {
    this.server = express();
    this.initial();
  }

  private initial = () => {
    this.server.use(ContentType);
    this.server.use(json());
  };
}

export default App;
