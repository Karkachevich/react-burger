//import * as Actions from "../../services/actions";
import { TServerFeedMessage } from "../../utils/interface/feed.interface";

export interface IProcessOrdersPayload {
  data: TServerFeedMessage;
  type: string
}


export type TFeedActionTypes = IProcessOrdersPayload;
