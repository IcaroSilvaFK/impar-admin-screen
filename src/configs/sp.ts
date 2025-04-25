import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFx, spfi } from "@pnp/sp";
import "@pnp/sp/attachments";
import "@pnp/sp/batching";
import "@pnp/sp/files";
import "@pnp/sp/files/web";
import "@pnp/sp/folders";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import "@pnp/sp/lists/web";
import "@pnp/sp/presets/all";
import "@pnp/sp/profiles";
import "@pnp/sp/search";
import "@pnp/sp/site-users/web";
import "@pnp/sp/webs";


export function getSP(context: WebPartContext, siteUrl?: string) {
  return spfi(siteUrl).using(SPFx(context));
}