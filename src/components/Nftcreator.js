import React, { useEffect, useState } from 'react'
import { BsPlus } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import Nftsavecard from './Nftsavecard';
import Pdata from './Pdata'
import Web3 from 'web3'
import nft from '../abi/nft.json'
import data from './Pdata';
function Nftcreator() {
    const [userdata, setuserdata] = useState([])
    const [arratdata, setarraydata] = useState([])
    const [idmain, setid] = useState(0)
    const [listid, setlistid] = useState([])
    const [ newdata,setnewdata ] = useState()
    const [alldata, setalldata] = useState([])
  
    
    
    const userid = JSON.parse(localStorage.getItem('userid'))
    const getlist = userid?userid.length?userid[userid.length-1]:null:null
    console.log('assuserall',alldata)
    const userdataa = JSON.parse(localStorage.getItem(getlist))
    // console.log('aaa',userdataa)
    
    useEffect(() => {
        // alert('useeffcet1')
        
        collectionlist()

    }, [])

  
    const collectiondetails = async (id) => {
        console.log('4')
        if (window.ethereum) {


            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log("id",id);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, '0xBDE025C87B0851c50290531aa0F9D4800bb1e18A')

            swaping.methods.collectiondetails(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    // setuserdata(userdata+1)
                    localStorage.setItem(`${id}`, JSON.stringify(fees))
                    setnewdata(fees)
                    // alert('fun3')
                    setlistid(id)
                    savedata(fees)

                }).catch()

        }
    }
    const savedata = (data) =>{
        setalldata((old)=>[
            ...old,data
        ])
        
    }
   

    const usercollection = async (id) => {
        // console.log('idd', id)
        console.log('3')
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, '0xBDE025C87B0851c50290531aa0F9D4800bb1e18A')

            swaping.methods.userinfo(userwalletaddresss, id).call({ from: userwalletaddresss })
                .then((value) => {
                    // setlistid(value)
                    // setid([...setid,listid])
                    // console.log('idval',value)
                    localStorage.setItem(`${id}id`, value)
                    // alert('fun2')
                    
                    // nftlist(value);
                    collectiondetails(value); 
                })
                .catch()

        }
    }




    const collectionlist = async () => {
        console.log('2')
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, '0xBDE025C87B0851c50290531aa0F9D4800bb1e18A')
            
            swaping.methods.totalcollection(userwalletaddresss).call({ from: userwalletaddresss })
                .then((length) => {
                    localStorage.setItem('total', length)
                    for (let i = 0; i < length; i++) {
                        // console.log('idd',i)

                        // console.log(list)
                        // alert('fun1')
                        usercollection(i);
                    }
                })
                .catch()

        }
    }
    const total = localStorage.getItem('total')

   
    return ( 
        <div className="nftcreator">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-12 headingl">

                        <h2>My Collections</h2>
                        <h3>All NFTs live within collections. They’re like groups for NFTs that are of a similar theme.</h3>

                    </div>
                    <div className="col-md-4 col-12 headingr">

                    </div>

                </div>
                <div className="row">
                    <div className="col-12 col-md-3">
                        <div className="nftcard">
                            <NavLink to="/createcollection">
                                <div className="mnftcard">
                                    <BsPlus />
                                    <h3>Create New <br /> Collection</h3>


                                </div>

                            </NavLink>

                        </div>
                    </div> 
                    <Nftsavecard data={alldata} type="nftcard" total={total}  />

                </div>
            </div>
 
        </div>
    )
}

export default Nftcreator
