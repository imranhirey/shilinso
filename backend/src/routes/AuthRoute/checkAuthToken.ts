import { Request, Response } from "express";

function CheckToken(req: Request, res: Response) {

 res.send("CheckToken").end();
}

export default CheckToken;
