import mongoose, { Schema, Document } from "mongoose";
import { CCLog } from "../types/api";

// TODO: 他に使うキー項目はあるか？（入金No、など）
// TODO: 変更前後のログをどう記録するか（detailesに、a => b、という風にするか）

interface CCLogInterface extends Document, CCLog { }

const CCLogSchema: Schema = new Schema({
  logId: { type: String, required: true },
  userId: { type: String, required: true },
  applicationId: { type: String, required: true },
  componentId: { type: String, required: true },
  functionId: { type: String, required: true },
  nokiyk: { type: String, required: false },
  nosqsy: { type: String, required: false },
  cdcstm: { type: String, required: false },
  nmcstm: { type: String, required: false },
  detail: { type: String, required: false },
  created: { type: Date, required: false },
  updated: { type: Date, required: false }
});

export const CCLogModel = mongoose.model<CCLogInterface>("CCLog", CCLogSchema);
