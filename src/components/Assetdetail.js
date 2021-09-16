import React, { useEffect, useState } from 'react'
import { BiImageAdd, BiChevronLeft } from "react-icons/bi";
import { NavLink, useParams, useHistory, useLocation } from 'react-router-dom';
import Adata from './Assetdata'
import Web3 from 'web3'
import nft from '../abi/nft.json'
import fromExponential from 'from-exponential'
import { Modal, Button, Spinner } from 'react-bootstrap'
import { MdCancel } from "react-icons/md";
import {addrs} from './address'
function Assetdetail(props) {
    const { assetid } = useParams()
    const getall = JSON.parse(localStorage.getItem(''))
    // const fildata = Adata.find(p => p.id === Number(assetid))
    console.log("fff", assetid)
    const history = useHistory()

    const location = useLocation()
    // const mainid = 
    const [value, setvalue] = useState()
    const [salevalue, setsalevalue] = useState()
    const [startvalue, setstartvalue] = useState()
    const [endvalue, setendvalue] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [tokenid, settokenid] = useState()
    const [pay, setpay] = useState()
    const [accountid, setaccountid] = useState()
    const [checkm, setcheckm] = useState()
    const [checkmfind, setcheckmfind] = useState()
    const [buyprice, setbuyprice] = useState()
    const [payvalue, setpayvalue] = useState()
    const [newpay, setnewpay] = useState()
    const [aucprice, setaucprice] = useState()
    const [time, settime] = useState()
    console.log('alget', show)
    const [auch, setauch] = useState()
    const [exprice, setexprice] = useState()

    useEffect(async () => {
        const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });

        setaccountid(accounts1[0].toLowerCase())
        salenft(fdata[0])
        timer(fdata[0])
        auctiondetail(fdata[0])

    }, [])
    // const [value, setvalue] = useState()

    const salenft = async (id) => {
        // console.log('2')
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.listofsalenft(id).call({ from: userwalletaddresss })
                .then((length) => {
                    // console.log('aaa', length[3]);
                    // setlist(length[0])
                    // setlist2(length[1])
                    // console.log('listone',length[0])
                    setbuyprice(Number(length[3]))
                    setcheckm(length[0])
                    var listlen = length[0]?.length
                    // console.log('bn',length)
                    setaucprice(Number(length[2]))


                })
                .catch()

        }
    }
    const timer = async (id) => {
        // console.log('saa',id)
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)


            swaping.methods.timing(id).call({ from: userwalletaddresss })
                .then((fees) => {

                    var day = Math.floor(fees / 86400)
                    var hr = Math.floor((fees - day * 86400) / 3600)
                    var minutesout = Math.floor((fees - day * 86400 - hr * 3600) / 60);
                    // console.log("hr",hr)
                    // console.log("day",day)
                    // console.log("min",minutesout)
                    settime({ id: id, d: day, h: hr, m: minutesout })


                }).catch()

        }
    }

    const fdata = location.state
    console.log("mmm", auch)
    const fixedsale = async (tokenid, price) => {
        // console.log('akhj', price)
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log(accounts);
            setnewpay('a')
            settokenid(accounts)
            setShow(true)
            setpay('')
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            let amount = window.web3.utils.toBN(fromExponential(((parseFloat(price)) * Math.pow(10, 18))));
            console.log('mainamout', amount)

            swaping.methods.fixedsales(tokenid, amount,false).send({ from: userwalletaddresss })
                .then((length) => {
                    console.log(length);
                    if (length.status === true) {
                        settokenid('')
                        setpay('suceess')
                        setShow(true)
                    } else {
                        alert('failed')
                    }
                })
                .catch((err) => {
                    settokenid('')
                    setShow(false)
                    setpay('')
                })

        }
    }









    const auction = async (tokenid, price, endday, endhours) =>
    // console.log('aa',price)
    {
        console.log('aaaa,', price)
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            setnewpay('a')
            settokenid(accounts)
            setShow(true)
            setpay('')
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            let amountIn = window.web3.utils.toBN(fromExponential((price) * Math.pow(10, 18)));

            swaping.methods.startauction(tokenid, amountIn, endday, endhours).send({ from: userwalletaddresss })
                .then((recipt) => {
                    console.log(recipt);
                    if (recipt.status === true) {
                        settokenid('')
                        setpay('suceess')
                        setShow(true)

                    } else {
                        alert('failed')
                    }

                })
                .catch(err => {
                    settokenid('')
                    setShow(false)
                    setpay('')

                })

        }
    }
    const auctiondetail = async (id) => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.auctiondetail(id).call({ from: userwalletaddresss })
                .then((value) => {
                    // console.log('assasacvbv',value);     
                    // localStorage.setItem(`highauc${id}`, value[0])
                    // localStorage.setItem(`highaucid${id}`, value[1])
                    var aucde = {
                        id: value[1],
                        val: value[0],
                        userid: id
                    }
                    setauch(aucde)
                }).catch()

        }
    }
    useEffect(async () => {
        const find = await checkm?.filter(p => p === fdata[0])
        // console.log('findone',find)
        setcheckmfind(find?.length)

    }, [fdata[0], checkm?.length])
    console.log('checkf', time)

    const buyfixednft = async (collectionid, tokenid, amount) => {
        console.log(collectionid, tokenid, amount)

        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            settokenid(accounts)
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            let amountIn = window.web3.utils.toBN(fromExponential((amount) * Math.pow(10, 18)));
            console.log('amout', amountIn)
            let address = '0x0000000000000000000000000000000000000000'
            swaping.methods.buynft(collectionid, tokenid,address).send({ from: userwalletaddresss, value: amountIn })
                .then((recipt) => {
                    // console.log(recipt);
                    setShow(false)

                    history.push('/mycollection')
                })
                .catch((err) => {
                    setShow(false)
                    settokenid('')
                })

        }
    }
    const buyauctionnft = async (tokenid, amount) => {
        console.log("tok", tokenid);
        console.log("amout", amount);
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            settokenid(accounts)

            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            let amountIn = window.web3.utils.toBN(fromExponential((amount) * Math.pow(10, 18)));
            swaping.methods.buyauction(tokenid).send({ from: userwalletaddresss, value: amountIn })
                .then((recipt) => {
                    // console.log(recipt);
                    setShow(false)
                    window.location.reload(true)
                })
                .catch((err) => {
                    setShow(false)
                    settokenid('')
                })
        }
    }
    const claimauctionnft = async (collectionid, tokenid) => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);

            settokenid(accounts)
            setShow(true)
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            // let amountIn = window.web3.utils.toBN(fromExponential((amount) * Math.pow(10,18)));
            swaping.methods.claim(collectionid, tokenid).send({ from: userwalletaddresss })
                .then((recipt) => {
                    // console.log(recipt);
                    window.location.reload(true)
                })
                .catch((err) => {
                    setShow(false)
                    settokenid('')
                })
        }
    }
    const deletenft = async (tokid, colid) => {
        console.log('aa', tokid)
        console.log('aaasss', colid)
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            swaping.methods.deletenft(tokid, colid).send({ from: userwalletaddresss })
                .then((fees) => {
                    console.log(fees);
                    history.push('/')
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
                                    <div className="weburl">
                                        <p>Template Id</p>
                                        <h3 >None</h3>
                                    </div>
                                    <div className="weburl">
                                        <p>Template Id</p>
                                        <h3 >None</h3>
                                    </div>
                                    { buyprice > 0 ?
                                        fdata[8].toLowerCase() === accountid ? null : <div className="colldes">
                                            <p>Price</p>
                                            <h3 style={{ color: '#EC892C', fontSize: '25px', fontWeight: 'bold' }}>{buyprice?.length > 21 ? buyprice / 1000000000000000000000000000000000000 : buyprice / 1000000000000000000} BNB = $ {buyprice?.length > 21 ? (buyprice / 1000000000000000000000000000000000000) * 487 : (buyprice / 1000000000000000000) * 487} </h3>
                                        </div> : null
                                    }
                                    {assetid === "auction" ?
                                        <div className="colldes">
                                            <p>Price</p>
                                            {
                                                Number(auch?.val) > aucprice ?
                                                    <> <h3 style={{ color: '#EC892C', fontSize: '25px', fontWeight: 'bold' }}>{Number(auch?.val)?.length > 21 ? Number(auch?.val) / 1000000000000000000000000000000000000 : Number(auch?.val) / 1000000000000000000} BNB = $ {Number(auch?.val)?.length > 21 ? (Number(auch?.val) / 1000000000000000000000000000000000000) * 487 : (Number(auch?.val) / 1000000000000000000) * 487} </h3> <p style={{ wordBreak: 'break-word' }}>id<br /> {auch?.id}</p></> :
                                                    <h3 style={{ color: '#EC892C', fontSize: '25px', fontWeight: 'bold' }}>{aucprice?.length > 21 ? aucprice / 1000000000000000000000000000000000000 : aucprice / 1000000000000000000} BNB = $ {aucprice?.length > 21 ? (aucprice / 1000000000000000000000000000000000000) * 487 : (aucprice / 1000000000000000000) * 487} </h3>
                                            }

                                        </div> : null
                                    }
                                    {assetid === "auction" ?
                                        <div className="colldes">
                                            <p>Time</p>
                                            <h3 style={{ color: '#EC892C', fontSize: '25px', fontWeight: 'bold' }}>{time?.d} Days {time?.h} Hrs {time?.m} Min</h3>
                                        </div> : null
                                    }

                                </div>
                                {
                                    assetid === "auction" ?
                                        (Number(time?.d) === 0 && Number(time.h) === 0 && Number(time.m) === 0) ?

                                            <div className="col-12">
                                                <button style={{ backgroundColor: '#EC892C', fontSize: '25px' }} className="onsalebtn" onClick={()=>claimauctionnft(fdata[7],fdata[0])} >Claim</button>
                                            </div> : <div className="col-12">
                                                <button style={{ backgroundColor: '#EC892C', fontSize: '25px' }} className="onsalebtn" onClick={() => {
                                                    // setmodaldatao(val ? val[3] : null)
                                                    // setmodaldatac(val ? val[4] : null)
                                                    // setmodaldatai(val ? val[6] : null)
                                                    // setmodaldataaa(val ? val[1] : null)
                                                    // // setmodaldatap(Number(localStorage.getItem(`auctonsale${newlist[id]}`)) / 1000000000000000000)
                                                    // setmodaldatacol(val ? val[7] : null)
                                                    // setmodaldatatok(val ? val[0] : null)




                                                    setexprice(Number(auch?.val) > Number(aucprice) ? Number(auch?.val) / 1000000000000000000 : Number(Number(aucprice?.length > 21 ? aucprice / 1000000000000000000000000000000000000 : aucprice / 1000000000000000000)))

                                                    setShow(true)

                                                }}>Bid</button>
                                            </div> : null
                                }
                                {assetid==="csdoge"?null: buyprice > 0 ?
                                    fdata[8].toLowerCase() === accountid ? null : <div className="col-12">
                                        <button style={{ backgroundColor: '#EC892C', fontSize: '25px' }} className="onsalebtn" onClick={() => buyfixednft(fdata[7], fdata[0], buyprice?.length > 21 ? buyprice / 1000000000000000000000000000000000000 : buyprice / 1000000000000000000)}>Buy</button>
                                    </div> : null
                                }



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
                        {/* {
                           checkm.find(p=>p===fdata)?null:
                        } */}
                        {
                            "0xcf02a6293aef1b5684af8b0e73c5c5b2b92c6f7f" === accountid ?
                            <div className="assetdetails1 assetdetails2" style={{ height: "200px" }}>
                            <button style={{ backgroundColor: 'red', borderRadius: '5px' }} onClick={() => deletenft(fdata[0], fdata[7])}>Delete</button>
                        </div>:null
                        }
                        

                        {
                            fdata[8].toLowerCase() === accountid ?




                                <div className="assetdetails1 assetdetails2">
                                    <form onSubmit={(e) => {
                                        e.preventDefault()

                                        console.log('inpuvalue', value)
                                        console.log('id', fdata[0])
                                        setnewpay(true)
                                        fixedsale(fdata[0], value)


                                    }}><div className="astdet">
                                            <h3>Fixed Value</h3>

                                            <input type="Number" placeholder="enter" step="any" onChange={(e) => setvalue(e.target.value)} required />
                                            <button type='submit' >Submit</button>
                                        </div>
                                    </form>
                                    <div>
                                        <form onSubmit={(e) => {
                                            e.preventDefault()
                                            console.log('1', salevalue)
                                            console.log('2', startvalue)
                                            console.log('3', endvalue)
                                            auction(fdata[0], salevalue, startvalue, endvalue)

                                        }}>
                                            <div className="astdet" style={{ paddingLeft: '20px' }}>
                                                <h3>Sale</h3>

                                                <input type="Number" placeholder="enter" step="any" onChange={(e) => setsalevalue(e.target.value)} required />
                                                <input type="Number" placeholder="Days" max="30" onChange={(e) => setstartvalue(e.target.value)} required />
                                                <input type="Number" placeholder="Time( Hours )" max="24" onChange={(e) => setendvalue(e.target.value)} required />
                                                <button type='submit'>Submit</button>
                                            </div>

                                        </form>
                                    </div>



                                </div> : null}

                    </div>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <form onSubmit={(e) => {
                            e.preventDefault()

                            // buyfixednft(fdata[7],fdata[0], payvalue)
                            buyauctionnft(fdata[0], payvalue)


                        }}>
                            {
                                newpay ? null :

                                    <Modal.Header >

                                        <h3><span>Mint Asset Summary</span> <MdCancel onClick={handleClose} /></h3>
                                        <div className="assetowner">
                                            <h4>Asset Owner:</h4>
                                            <h5>{fdata[3]}</h5>
                                        </div>
                                        <div className="assetowner">
                                            <h4>Copies:</h4>
                                            <h5>{fdata[4]}</h5>
                                        </div>
                                    </Modal.Header>
                            }

                            <Modal.Body>
                                <div className="row">

                                    {
                                        pay ? <h2>Listed Sucessfully</h2> : null
                                    }
                                    {
                                        newpay ? null :

                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="savenftcard">
                                                        <div className="savemnftcard">
                                                            <div className="img">
                                                                <img src={`https://ipfs.infura.io/ipfs/${fdata[6]}`} className="img-fuild" alt="ll" />
                                                            </div>
                                                            <div className="carddetails">
                                                                <p>{fdata[1]}</p>
                                                                {/* <h3>{assetname}</h3> */}
                                                                {/* <h4>{ownername}</h4> */}

                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <img src={displayimage} className="img-fluid" /> */}

                                                </div>
                                                <div className="col-6 attricard">
                                                    <div className="attributes">
                                                        {/* <p>pop{Number(modaldatap?.length)}</p> */}
                                                        <input type="Number" placeholder={`enter amount minval- ${exprice} BNB`} step="any" min={exprice} onChange={(e) => setpayvalue(e.target.value)} required />
                                                    </div>

                                                </div>
                                            </div>
                                    }

                                </div>
                                {
                                    tokenid ? <div style={{ display: 'flex' }}><h2 className="mx-5">Loading</h2> <Spinner animation="grow" variant="light" /></div> : null

                                }

                            </Modal.Body>
                            <Modal.Footer>
                                {/* {
                                        tokenid?null:<Button variant="primary" onClick={()=>history.goBack('/')} >Ok</Button>} */}

                                {
                                    pay ? <Button variant="primary" onClick={() => history.goBack()} >Ok</Button> : null
                                }
                                {
                                    newpay ? null : <Button type='submit' variant="primary" >Confirm</Button>
                                }

                            </Modal.Footer>
                        </form>
                    </Modal>
                </div>
            </div>
            {/* create assert  */}
            {/* <Assetsadd/> */}
            {/* <Nftsavecard data={Adata} type="asset" /> */}



        </div >
    )
}

export default Assetdetail
