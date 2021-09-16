import React, { useEffect, useState } from 'react'
import { BsPlus } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import Dsdogelist from './Dsdogelist';
import {addrs} from './address'

function CSDoge() {  
    const [accountid,setaccountid] = useState() 
    useEffect(async()=>{
        const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setaccountid(accounts1[0]?.toLowerCase() )

    },[]) 
    const adminid= "0x6a17a6be25b2bbbd3f6dce4444ffc016aec77fc3"
    console.log(accountid)
    
    return (
        <div className="nftcreator">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-12 headingl">
                        
                            <h2>Create CSDoge</h2>
                       
                            
                        
                        

                    </div>
                    <div className="col-md-4 col-12 headingr">
                        

                    </div>

                </div>
                <div className="row mt-3">
                    {
                        accountid===adminid?
                    
                    
                  
                      <div className="col-12 col-md-3">
                        <div className="nftcard">
                           <NavLink to="/csdogecreate">
                                <div className="mnftcard">
                                    <BsPlus />
                                    <h3>Create New <br /> CSDoge</h3>


                                </div>
                                </NavLink>

                            

                        </div>
                        
                    </div>
                    :null
}
                 
                    
                    
                    <Dsdogelist/>
                    
                    

                </div>
                
            </div>
 
        </div>
    )
}

export default CSDoge
