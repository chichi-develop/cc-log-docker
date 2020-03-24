import { Request, Response, NextFunction } from "express"
import { CCLogModel } from "../models/ccLog";
import moment from "moment";

export const showCCLogs = async (req: Request, res: Response) => {
  const queryObject = Object.assign(
    {},
    req.query.logId && { logId: req.query.logId },
    req.query.userId && { userId: req.query.userId },
    req.query.applicationId && { applicationId: req.query.applicationId },
    req.query.componentId && { componentId: req.query.componentId },
    req.query.functionId && { functionId: req.query.functionId },
    req.query.nokiyk && { nokiyk: req.query.nokiyk },
    req.query.nosqsy && { nosqsy: req.query.nosqsy },
    req.query.cdcstm && { cdcstm: req.query.cdcstm },
    req.query.created && { created: req.query.created },
    req.query.updated && { updated: req.query.updated },
  )
  console.log(queryObject)

  const operationObject = (logId: string) => {
    switch (logId) {
      case 'showCstmDetailLog':
        return { sort: { created: -1 }, limit: 30 }
      case 'editCstmDetailLog':
        return { sort: { created: -1 }, limit: 30 }
      default:
        return {};
    }
  };
  console.log(operationObject(req.query.logId))

  try {
    const cclogs = await CCLogModel.find(queryObject, null, operationObject(req.query.logId))
    res.send(cclogs);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const showCCLog = async (req: Request, res: Response) => {
  try {
    const cclog = await CCLogModel.findById(req.params.id)
    res.send(cclog);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const addCCLog = async (req: Request, res: Response) => {
  try {
    const cclog = await new CCLogModel(Object.assign({}, req.body, { created: moment(), updated: moment() }));
    await cclog.save()
    res.send(cclog);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateCCLog = async (req: Request, res: Response) => {
  try {
    let obj = Object.assign({}, req.body, { updated: moment() })
    delete obj.created;
    const cclog = await CCLogModel.findByIdAndUpdate(
      req.params.id,
      obj
    )
    res.send(cclog);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteCCLog = async (req: Request, res: Response) => {
  try {
    const cclog = await CCLogModel.deleteOne({ _id: req.params.id })
    if (!cclog) { res.status(404).send("No item found") } else {
      res.status(200).send("CCLog deleted from database");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteCCLogs = async (req: Request, res: Response) => {
  const queryObject = Object.assign(
    {},
    req.query.logId && { logId: req.query.logId },
    req.query.userId && { userId: req.query.userId },
    req.query.applicationId && { applicationId: req.query.applicationId },
    req.query.componentId && { componentId: req.query.componentId },
    req.query.functionId && { functionId: req.query.functionId },
    req.query.nokiyk && { nokiyk: req.query.nokiyk },
    req.query.nosqsy && { nosqsy: req.query.nosqsy },
    req.query.cdcstm && { cdcstm: req.query.cdcstm },
    req.query.created && { created: req.query.created },
    req.query.updated && { updated: req.query.updated },
  )
  console.log(queryObject)

  const operationObject = (logId: string) => {
    switch (logId) {
      case 'showCstmDetailLog':
        return { sort: { created: -1 }, skip: 20, limit: 1 }
      default:
        return {};
    }
  };
  console.log(operationObject(req.query.logId))

  try {
    const cclogs = await CCLogModel.find(queryObject, null, operationObject(req.query.logId))
    await CCLogModel.deleteMany(Object.assign(queryObject, { _id: { $lte: cclogs[0]._id } }))
    res.send({});
  } catch (err) {
    res.status(500).send(err);
  }
};
