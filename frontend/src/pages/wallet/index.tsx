import { User } from '@/@types/user';
import Wallet from '@/api/wallet';
import Appsidebar from '@/components/share/Sidebar'
import { userState } from '@/store';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

function index() {
    const user: User = useSelector((state: userState) => state?.auth);
    const [walletinfo,setWalletinfo]=React.useState<any>()

    useEffect(()=>{
        const wallet= new Wallet(user.user.Walletid);
        const token= localStorage.getItem("token") || "";
        wallet.getwalletinfo(token,user.user.userId)
        .then((res)=>{
            console.log(res.data.walletinfo)
            setWalletinfo(res.data.walletinfo)
        
        })

        .catch((err)=>{
            console.log(err)
        })
    },[])

  return (
    <div>

        <Appsidebar>
        <h1>Wallet  {user.user.Walletid}</h1>
        <h1>
            your blance is {walletinfo?.balance}
        </h1>
        </Appsidebar>
      
    </div>
  )
}

export default index
