import { Request, Response } from "express";
import { router } from "../index.js";
import TokenUtils from "../../utils/TokenUtils.js";
import Wallet from "../../models/walletModal.js";
import { log } from "console";
import { userInfo } from "os";

router.post("/getwalletinfo", async (req: Request, res: Response) => {
  // request body should contain  requester_userid , wallet_id,token

  const { requesterId, walletId, token } = req.body;

  console.log(req.body)

  if (!requesterId || !walletId || !token) {
    return res.status(400).send("Bad Request");
  }

  // check if the token is valid

  const tokenutils = new TokenUtils("access");

  try {
    const userid =  tokenutils.verifyToken(token).user_id
    const walletinfo = await Wallet.findOne({ walletId: walletId });
    log(walletinfo,userid,walletinfo?.userId,userid===walletinfo?.userId,userid==walletinfo?.userId)

    if (userid !== walletinfo?.userId) {
      return res.status(400).json({
        type: "error",
        message: "access denied",
      });
    }
    if (walletinfo?.userId !== requesterId) {
      return res.status(400).json({
        type: "error",
        message: "unusual request - blocking your account",
      });
    }

    return res.status(200).json({
        type:"success",
        walletinfo
    })
  } catch (error) {}
});



export default router