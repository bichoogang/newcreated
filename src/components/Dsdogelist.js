import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import nft from '../abi/nft.json'
import { NavLink, useLocation, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import { MdCancel } from "react-icons/md";
import fromExponential from 'from-exponential';
import ERC20 from '../abi/ERC20.json'
import { data1 } from './Pdata'
import { addrs } from './address'
import { BsFillStarFill } from "react-icons/bs";
import { RiCopyrightFill } from "react-icons/ri";
function Dsdogelist() {
    const [allfixed, setallfix] = useState([])
    const [allp, setallp] = useState([])
    const [active, setactive] = useState('sales')
    const [list, setlist] = useState([])
    const [list2, setlist2] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [newlist, setnewlist] = useState([])
    const [modcopies, setmodcopies] = useState()
    


    const location = useLocation()
    const [mainlist, setmainlist] = useState([])
    const [mainlistauc, setmainlistauc] = useState([])
    const [arr, setArr] = useState([]);
    const [arrauc, setArrauc] = useState([]);
    const [price, setprice] = useState([])
    const [pricelast, setpricelast] = useState([])
    const [pricearr, setpricearr] = useState()
    const [payvalue, setpayvalue] = useState()
    const [modaldatao, setmodaldatao] = useState()
    const [modaldatac, setmodaldatac] = useState()
    const [modaldatai, setmodaldatai] = useState()
    const [modaldataaa, setmodaldataaa] = useState()
    const [modaldatap, setmodaldatap] = useState()
    const [modaldatacol, setmodaldatacol] = useState()
    const [modaldatatok, setmodaldatatok] = useState()
    // const [allfixed, setallfix] = useState([])
    // const [allp, setallp] = useState([])
    const [spin, setspin] = useState()
    const [tokenid, settokenid] = useState()
    const [allprice, setallprice] = useState()
    const [cklist, setcklist] = useState([])
    const [accountid, setaccountid] = useState()
    const adminid= "0x6a17a6be25b2bbbd3f6dce4444ffc016aec77fc3"
    useEffect(async() => {
        nftidnew()
        const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setaccountid(accounts1[0])
       

    }, [])
    const nftidnew = async () => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.csdogenft().call({ from: userwalletaddresss })
                .then((id) => {
                    console.log("id", id);
                    var listlen = id?.length
                    // console.log('bn',length[0])
                    for (let i = 0; i < listlen; i++) {
                        // console.log(`akk${i}`,length[0][i])
                        console.log(id[i])
                        nftinfo(id[i])
                        salenftprie(id[i])
                        tokeninfo(id[i])


                    }
                })
                .catch()
        }
    }
    const nftinfo = async (id) => {
        // console.log('4')
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.nftinformation(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    // console.log(`detail${id}`,fees);
                    // setspin(fees)
                    savelist(fees)
                    // localStorage.setItem(`buylist${id}`, JSON.stringify(fees))
                    // setArr(id)
                    // salenftprie(fees[0])
                    console.log(fees)


                }).catch()

        }
    }
    const savelist = (data) => {
        setallfix((old) => [
            ...old, data
        ])


    }

    const salenftprie = async (id) => {
        // console.log('riht',id)
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.listofsalenft(id).call({ from: userwalletaddresss })
                .then((length) => {
                    const val = {
                        id: id, value: length[3]
                    }
                    console.log('aaaprice', length);
                    // setlist(length[1])
                    // setlist2(length[1])
                    // localStorage.setItem(`normasale${id}`, (length[3]))
                    // setpricearr(id)
                    getallprice(val)
                })
                .catch()

        }
    }
    const getallprice = (data) => {
        if (data.id === "0") {
            // console.log('notallowed',data)
        } else {
            // console.log('dataaallower',data)
            setallp((old) => [
                ...old, data
            ])

        }

    }
    const buyfixednft = async (collectionid, tokenid) => {
        console.log('buy nft fix')
        let amount = Number((allp.find(p => p.id === tokenid ? allp : null)).value)
        let ckamout = amount?.length > 21 ? amount / 1000000000000000000000000000000000000 : amount / 1000000000000000000
        

        if (window.ethereum && ckamout) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("ckamout", ckamout);
            settokenid(accounts)
            setShow(true)
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            let amountIn = window.web3.utils.toBN(fromExponential((ckamout) * Math.pow(10, 18)));
            console.log('amout', amountIn)
            let address = '0x0000000000000000000000000000000000000000'
            swaping.methods.buynft(collectionid, tokenid, address).send({ from: userwalletaddresss, value: amountIn })
                .then((recipt) => {
                    // console.log(recipt);
                    setShow(false)
                    localStorage.removeItem(`buylist${tokenid}`)
                    window.location.reload(true)
                })
                .catch((err) => {
                    setShow(false)
                    settokenid('')
                })

        }
    }
    console.log('price', pricelast)
    const tokeninfo = async (tokenid) => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            swaping.methods.csdogeinfo(tokenid).call({ from: userwalletaddresss })
                .then((fees) => {
                    const val = {
                        id: tokenid,
                        ck: fees[0],
                        copy: Number(fees[1]),
                        total:Number(fees[2])
                    }
                    checklist(val)


                })
                .catch()

        }
    }
    const checklist = (data) => {
        setcklist((old) => [
            ...old, data
        ])

    }
    console.log("listt", cklist)

    console.log(cklist)
    const buycsdoge = async (collectionid, tokenid) => {
        console.log('buy csdoe')

        let amount = Number((allp.find(p => p.id === tokenid ? allp : null)).value)
        let ckamout = amount?.length > 21 ? amount / 1000000000000000000000000000000000000 : amount / 1000000000000000000
        setShow(true)
        if (window.ethereum && ckamout) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            console.log('all', ckamout)

            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let tokenaddress = '0x323EF358D589F448289Bf84494F869DA869E4F4e';
            const ercContract = await new window.web3.eth.Contract(ERC20, tokenaddress);
            let amountADesired = window.web3.utils.toBN(fromExponential(parseInt((parseFloat(ckamout)) * Math.pow(10, 18))));
            ercContract.methods.approve(addrs, amountADesired).send({ from: userwalletaddresss })
                .then((res) => {
                    console.log(res);
                    let swaping = new window.web3.eth.Contract(nft, addrs)
                    swaping.methods.buynft(collectionid, tokenid, tokenaddress).send({ from: userwalletaddresss })
                        .then((fees) => {
                            console.log(fees);
                            window.location.reload()
                            setShow(false)
                        }).catch()
                })
                .catch(() => {
                    setShow(false)

                })
        }
    }
    const buycopiesnft = async (tokenid, boolvalue) => {
        console.log('buy copy')
        let amount = Number((allp.find(p => p.id === tokenid ? allp : null)).value)
        let ckamout = amount?.length > 21 ? amount / 1000000000000000000000000000000000000 : amount / 1000000000000000000
        setShow(true)
        
        if (window.ethereum && ckamout) {
            
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("copysale", ckamout);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            if (boolvalue) {
                let tokenaddress = '0x323EF358D589F448289Bf84494F869DA869E4F4e';
                const ercContract = await new window.web3.eth.Contract(ERC20, tokenaddress);
                let amountADesired = window.web3.utils.toBN(fromExponential(parseInt((parseFloat(ckamout)) * Math.pow(10, 18))));
                ercContract.methods.approve(addrs, amountADesired).send({ from: userwalletaddresss })
                    .then((res) => {
                        console.log(res);
                        let swaping = new window.web3.eth.Contract(nft, addrs)
                        swaping.methods.buycopies(tokenaddress, tokenid).send({ from: userwalletaddresss })
                            .then((fees) => {
                                console.log(fees);
                                window.location.reload()
                            }).catch()
                    })
                    .catch(() => {
                        alert('Transaction failed')

                    })
            }
            else {
                let amountIn = window.web3.utils.toBN(fromExponential((ckamout) * Math.pow(10, 18)));
                console.log('amout', amountIn)
                let tokenaddress = '0x0000000000000000000000000000000000000000'
                swaping.methods.buycopies(tokenaddress, tokenid).send({ from: userwalletaddresss, value: amountIn })
                    .then((recipt) => {
                        // console.log(recipt);
                        setShow(false)
                        localStorage.removeItem(`buylist${tokenid}`)
                        window.location.reload(true)
                    })
                    .catch((err) => {
                        setShow(false)
                        settokenid('')
                    })

            }
        }
    }
    const burncopiesnft = async (tokenid, copiesnumber) => {
        console.log("id", tokenid)
        console.log("cop", copiesnumber)
        setShow(true)
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.burncopies(copiesnumber, tokenid).send({ from: userwalletaddresss })
                .then((fees) => {
                    console.log(fees);
                    setShow(false)
                    window.location.reload()
                })
                .catch(()=>{
                    setShow(false)
                })

        }
    }

    return (



        <>
            {/* <button onClick={()=>tokeninfo(2)}>Button</button> */}

            {
                allfixed.map((val, id) => {



                    return <>


                        <div className="col-md-3 col-12 explore">
                            <div className="excard px-2">
                                <BsFillStarFill style={{color:'gold',margin:'5px'}}/>
                                <div className="excardimg">
                                    
                                    <img src={`https://ipfs.infura.io/ipfs/${val ? val[6] : null}`} className="img-fuild" alt="ll" />

                                </div>
                                <div className="excarddetail">
                                    <p>{val ? val[1] : null}</p>
                                    
                                        {
                                            cklist?.map((ck,i)=>{
                                                if(ck.id === val[0]){
                                                    return <h5>{ck.copy}/{ck.total} </h5>

                                                }
                                                
                                            })
                                        }
                                   
                                    <p style={{ display: 'flex' }}>
                                        {
                                            accountid===adminid?
                                        
                                        <form style={{ display: 'flex' }} onSubmit={(e) => {
                                            e.preventDefault()
                                            burncopiesnft(val[0], modcopies)

                                        }}>
                                            <input type="number" placeholder="Modify copies" min="0" onChange={(e) => setmodcopies(e.target.value)} required /> <button type="submit" style={{ backgroundColor: 'transparent', padding: '2px 6px', border: 'none', outline: 'none', color: 'white' }}>Submit</button>
                                        </form>:null}</p>

                                    {allp.map((vala) => {

                                        if (vala.id === val[0]) {
                                            return <p>{vala?.value?.length > 21 ? allp[id]?.value / 1000000000000000000000000000000000000 : vala?.value / 1000000000000000000} {cklist.map((vala) => {
                                                if (vala.id === val[0]) {
                                                    return <>
                                                        {
                                                            vala.ck ? "CSDOGE" : "BNB"
                                                        }
                                                    </>
                                                }
                                            })} </p>

                                        }


                                    })}
                                    {/* <p>{allp[id]?.value?.length > 21 ? allp[id]?.value / 1000000000000000000000000000000000000 : allp[id]?.value / 1000000000000000000} BNB = $ {allp[id]?.value?.length > 21 ? (allp[id]?.value / 1000000000000000000000000000000000000) * 487 : (allp[id]?.value / 1000000000000000000) * 487}</p> */}
                                    {/* <p>{allp[id]?.value?.length} ETH</p> */}
                                    {/* <p>{id}</p> */}
                                    {/* <p>{allp.find(p=>p.id==="4")?allp.find(p=>p.id==="4"):null}</p> */}

                                </div>
                                <div className="excardbtn">


                                    <Link to={{
                                        pathname: `/assetdetail/csdoge`,
                                        state: val
                                    }} style={{ fontSize: '15px' }}><button className="one">Detail</button></Link>

                                    {cklist.map((vala) => {
                                        if (vala.id === val[0]) {
                                            return <>
                                            {
                                                vala.copy===0?vala.ck ? <button className="two" onClick={() => buycsdoge(val[7], val[0])}>Buy</button> : <button className="two" onClick={() => buyfixednft(val[7], val[0])}>Buy</button>:vala.ck ? <button className="two" onClick={() => buycopiesnft(val[0], true)}>Buy</button> : <button className="two" onClick={() => buycopiesnft(val[0], false)}>Buy</button>
                                            }
                                                {
                                                    
                                                }
                                            </>
                                        }
                                    })}
                                </div>
                            </div>
                            
                        </div>
                      
                        <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <form >
                                    

                                            {/* <Modal.Header >
                                                <h3><span>Mint Asset Summary</span> <MdCancel onClick={handleClose} /></h3>
                                                <div className="assetowner">
                                                    <h4>Asset Owner:</h4>
                                                    <h5>{modaldatao}</h5>
                                                </div>
                                                <div className="assetowner">
                                                    <h4>Copies:</h4>
                                                    <h5>{modaldatac}</h5>
                                                </div>
                                            </Modal.Header> */}
                                    
                                    <Modal.Body>
                                         <div style={{ display: 'flex' }}><h3 className="mx-5">loading...</h3><Spinner animation="grow" variant="light" /></div> 


                                        

                                    </Modal.Body>
                                  
                                </form>
                            </Modal>


                    </>
                })
            })


        </>
    )
}

export default Dsdogelist
