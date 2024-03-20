import { Request, Response, Router } from "express";
import { GetCountriesList, Getcitiesbycountry } from "../../data/countries.js";
import { log } from "console";



let router= Router()


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


export default router;