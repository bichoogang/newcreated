import React, { useState } from 'react'
import { BiImageAdd, BiChevronLeft } from "react-icons/bi";
import { NavLink, useParams, useHistory, useLocation } from 'react-router-dom';
import Adata from './Assetdata'
import Web3 from 'web3'
import nft from '../abi/nft.json'
function Assetdetail(props) {
    const { assetid } = useParams()
    const getall = JSON.parse(localStorage.getItem(''))
    const fildata = Adata.find(p => p.id === Number(assetid))
    console.log("fff", fildata)
    const history = useHistory()
    console.log('alget', props.location)
    const location = useLocation()
    // const mainid = 
    const [value, setvalue] = useState()
    const [salevalue, setsalevalue] = useState()
    const [startvalue, setstartvalue] = useState()
    const [endvalue, setendvalue] = useState()
    // const [value, setvalue] = useState()

    const fdata = location.state
    console.log("mmm", fdata)
    const fixedsale = async (tokenid, price) => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, '0xBDE025C87B0851c50290531aa0F9D4800bb1e18A')

            swaping.methods.fixedsales(tokenid, price).send({ from: userwalletaddresss })
                .then((length) => {
                    console.log(length);
                    if(length.status===true){
                        history.goBack('/create') 
                    }  
                })
                .catch()

        }
    }
    const auction = async (tokenid,price,endday,endhours) =>
    // console.log('aa',price)
    {   console.log('aaaa,',price)
            if (window.ethereum)
            {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let  swaping = new window.web3.eth.Contract(nft,'0xBDE025C87B0851c50290531aa0F9D4800bb1e18A')
            
            swaping.methods.startauction(tokenid,price,endday,endhours).send({from:userwalletaddresss})
            .then((recipt)=>
            {
                         console.log(recipt);
                         if(recipt.status===true){
                            history.goBack('/create') 
                        }  
                         
            })
            .catch() 
            
            }
    }
    return (
        <div className="savecreatecollection assetdetail">
            <div className="container">
                <div className="row">
                    <div className="col-md-7 col-12 headingl">
                        <p onClick={() => history.goBack()} style={{ color: 'white', cursor: 'pointer', fontSize: '25px' }} ><BiChevronLeft /> Back</p>
                        <h2 style={{ fontSize: '30px', marginBottom: '15px' }}>Asset: #45202120212021 <span style={{ color: '#EC892C' }}>({fdata[1]})</span></h2>


                    </div>
                    <div className="col-md-7 col-12 headingr">

                    </div>

                </div>
                <div className="row">

                    <div className="col-md-3 col-12 mb-5">
                        <div className="nftcard">


                            <label for="actual-btn">
                                <div className="mnftcard ">
                                    <img src={`https://ipfs.infura.io/ipfs/${fdata[6]}`} className="img-fluid" />
                                    <p>{fdata[4]}</p>



                                </div>
                            </label>


                        </div>

                    </div>
                    <div className="col-md-9 col-12 px-5">






                        <div className="nftcreatecard">
                            <div className="row">
                                <div className="col-md-6 ">
                                    <div className="displayname">
                                        <p>Display Name</p>
                                        <h3>{fdata[1]}</h3>
                                    </div>
                                    <div className="weburl">
                                        <p>ID</p>
                                        <h3>#45202120212021</h3>
                                    </div>
                                    <div className="weburl">
                                        <p>Owner</p>
                                        <h3 style={{ color: '#EC892C' }}>{fdata[3]}</h3>
                                    </div>
                                    <div className="weburl">
                                        <p>Backend Token</p>
                                        <h3 >None</h3>
                                    </div>
                                </div>
                                <div className="col-md-6 ">
                                    <div className="colldes">
                                        <p>Collection Name</p>
                                        <h3 style={{ color: '#EC892C' }}>saksjajsasas</h3>
                                    </div>
                                    <div className="marketfee">
                                        <p>Schema Name</p>
                                        <h3 style={{ color: '#EC892C' }}>random</h3>
                                    </div>
                                    <div className="weburl">
                                        <p>Template Id</p>
                                        <h3 >None</h3>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="onsalebtn">This asset is on sale #296635</button>
                                </div>


                            </div>
                        </div>

                    </div>

                </div>
                <div className="row py-5">
                    <div className="col-md-6 col-12 px-5 ">
                        <div className="assetdetails1">
                            <p>immutable Attributes</p>
                            <div className="sub">
                                <h2>name</h2>
                                <h3>{fdata[1]}</h3>
                            </div>
                            <div className="sub">
                                <h2>img</h2>
                                <h3>{fdata[6]}</h3>
                            </div>
                            <div className="sub">
                                <h2>description</h2>
                                <h3>{fdata[5]}</h3>
                            </div>

                        </div>

                    </div>
                    <div className="col-md-6 col-12  px-5">
                        <div className="assetdetails1 assetdetails2">
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                
                                console.log('inpuvalue', value)
                                console.log('id', fdata[0])
                                fixedsale(fdata[0], value)

                            }}><div className="astdet">
                                    <h3>Fixed Value</h3>

                                    <input type="Number" placeholder="enter" onChange={(e) => setvalue(e.target.value)} required />
                                    <button type='submit'>Submit</button>
                                </div>
                            </form>
                            <div>
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    console.log('1', salevalue)
                                    console.log('2', startvalue)
                                    console.log('3', endvalue)
                                    auction(fdata[0],salevalue,startvalue,endvalue)

                                }}>
                                    <div className="astdet" style={{ paddingLeft: '20px' }}>
                                        <h3>Sale</h3>

                                        <input type="Number" placeholder="enter" onChange={(e) => setsalevalue(e.target.value)} required />
                                        <input type="Number" placeholder="Days" max="30" onChange={(e) => setstartvalue(e.target.value)} required />
                                        <input type="Number" placeholder="Time( Hours )" max="24" onChange={(e) => setendvalue(e.target.value)} required />
                                        <button type='submit'>Submit</button>
                                    </div>

                                </form>
                            </div>


                        </div>

                    </div>
                </div>
            </div>
            {/* create assert  */}
            {/* <Assetsadd/> */}
            {/* <Nftsavecard data={Adata} type="asset" /> */}



        </div>
    )
}

export default Assetdetail
