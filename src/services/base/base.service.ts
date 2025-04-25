import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFI } from "@pnp/sp";
import { IWeb } from "@pnp/sp/webs";
import { getSP } from "../../configs/sp";

export class BaseService {
  protected listUrl: string
  protected context: WebPartContext
  protected sp: SPFI
  protected web: IWeb
  constructor(context: WebPartContext, listName: string) {
    this.listUrl = `${context.pageContext.web.serverRelativeUrl}/Lists/${listName}`
    this.context = context;
    this.sp = getSP(context);
    this.web = this.sp.web;
  }
}