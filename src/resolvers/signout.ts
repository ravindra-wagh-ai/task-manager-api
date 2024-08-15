import Cache from "node-cache";
export default async (_: any, args: any, ctx: any, info: any): Promise<any> => {
  let cache = new Cache();
  let authorization = ctx.req.headers["authorizaion"];
  let token = authorization.replace("Bearer", "").trim();
  cache.set(`bl_${token}`, token, 100);
  return true;
};
