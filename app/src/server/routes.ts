import Express from 'express'

import * as Controller from "./contoroler";

export default (app: Express.Application) => {

  app.get("/cclogs", Controller.showCCLogs);

  app.get("/cclogs/:id", Controller.showCCLog); // unused1

  app.post("/cclogs", Controller.addCCLog);

  app.patch("/cclogs/:id", Controller.updateCCLog); // unused1

  app.delete("/cclogs/:id", Controller.deleteCCLog); // unused1

  app.delete("/cclogs", Controller.deleteCCLogs);
}
