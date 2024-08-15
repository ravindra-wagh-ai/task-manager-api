import { Router, Request, Response } from "express";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, "../app/browser");
const router = Router();
router.get("/", async (req: Request, res: Response) => {
  res.sendFile("home/index.html", { root: browserDistFolder });
});
export default router;
