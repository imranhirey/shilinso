import { Request, Response } from "express";
import { GetCountriesList, Getcitiesbycountry } from "../../data/countries.js";
import { log } from "console";
import Wallet from "../../models/walletModal.js";
import { router } from "../index.js";

// router.get("/countrylist",(req:Request,res:Response)=>{
//    try {
//     let countrylist=GetCountriesList()

//     res.json({
//         countrylist
//     }).status(200).end()
    
//    } catch (error) {

//     res.status(500).end()
    
//    }
// })

router.get('/cities/:countryname', (req:Request, res:Response) => {
    console.log("i got request ", 'somalia'==req.params.countryname.toLocaleLowerCase(),req.params.countryname)
  res.shouldKeepAlive=false
    res.setHeader("x-Powered-By","Shilino Ltd Adminstartion ")
    if (req.query.authkey !== "yaamaalik4321?"){
        return res.status(401).send("Unauthenticated Request ").end()
    }
    Getcitiesbycountry(req.params.countryname.toLocaleLowerCase()).then((cities)=>{
        console.log(cities)
        res.json({
            cities
        }).status(200).end()

    })
   .catch((e)=>{
    res.status(500).send("Server Error 500")
   })

  
});

router.post('/get/wallet/', async (req:Request, res:Response) => {
const walletid= req.body.walletid
const requestedusid= req.body.userid

if (!walletid || !requestedusid){
    return res.status(400).send("Bad Request")

}

const wallet = await Wallet.findOne({walletId:walletid})
if(wallet?.userId !=requestedusid){
    // block the request and the user by adding the user to the hold accounts
    return res.status(401).send("Unauthenticated Request").end()
}
if(wallet){
    return res.json({
        wallet
    }).status(200).end()
}
else {
    return res.status(404).send("Wallet Not Found")
}

})


export default router;