import { WebPartContext } from "@microsoft/sp-webpart-base";
import { LISTS } from "../common/lists";
import { BaseService } from "./base/base.service";

type ResponseDTO = {
  Title: string
  ID: number
  Description: string
  Category: string
  Link: string
}

export class AdminService extends BaseService {
  constructor(context: WebPartContext) {
    super(context, LISTS.admin);
  }

  async getAdminItems() {
    const result: ResponseDTO[] = await this.sp.web.getList(this.listUrl).items.select("Title", "ID", "Description", "Category", "Link").orderBy("Category")();

    return this.mapper(result);
  }

  private mapper(items: ResponseDTO[]): Map<string, ResponseDTO[]> {
    const map = new Map<string, ResponseDTO[]>();

    for (const item of items) {
      if (map.has(item.Category)) {
        map.get(item.Category)?.push(item);
        continue
      }
      map.set(item.Category, [item]);
    }
    return map;
  }
}