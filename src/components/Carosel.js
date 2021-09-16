import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'
import { NavLink, Link } from 'react-router-dom'
import Web3 from 'web3'
import nft from '../abi/nft.json'
import { coldata } from './Pdata'
import Spinner from 'react-bootstrap/Spinner'
// import { NavLink } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";
import {addrs} from './address'
import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay, Lazy } from 'swiper/core';
SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Lazy]);


function Carosel(props) {
    const [list, setlist] = useState([])
    const [list2, setlist2] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [newlist, setnewlist] = useState([])

    // const location = useLocation()
    const [mainlist, setmainlist] = useState([])
    const [mainlistauc, setmainlistauc] = useState([])
    const [arr, setArr] = useState([]);
    const [arrauc, setArrauc] = useState([]);
    const [price, setprice] = useState([])
    const [pricearr, setpricearr] = useState()
    const [payvalue, setpayvalue] = useState()
    const [modaldatao, setmodaldatao] = useState()
    const [modaldatac, setmodaldatac] = useState()
    const [modaldatai, setmodaldatai] = useState()
    const [modaldataaa, setmodaldataaa] = useState()
    const [modaldatap, setmodaldatap] = useState()
    const [modaldatacol, setmodaldatacol] = useState()
    const [modaldatatok, setmodaldatatok] = useState()
    const [allfixed, setallfix] = useState([])
    const [allp, setallp] = useState([])
    const [spin, setspin] = useState()
    const [tokenid, settokenid] = useState()
    const [allprice, setallprice] = useState()
    const [dogid,setdogid] = useState([])
    useEffect(() => {
        // console.log('1')

        salenft(0)
        nftidnew()

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
                    console.log("id",id);
                    setdogid(id)
                    var listlen = id?.length
                    // console.log('bn',length[0])
                    // for (let i = 0; i < listlen; i++) {
                    //     // console.log(`akk${i}`,length[0][i])
                    //     // console.log(id[i])
                    //     // nftinfo(id[i])
                    //     // salenftprie(id[i])
                        
                    // }
                })
                .catch()
        }
    }

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
                    // console.log('aaa', length);
                    setlist(length[0])
                    // setlist2(length[1])
                    console.log('listone', length[0])
                    var listlen = length[0]?.length
                    // console.log('bn',length[0])
                    for (let i = 0; i < listlen; i++) {
                        // console.log(`akk${i}`,length[0][i])
                        const ll = length[0][i]
                        nftinfo(ll)

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
                    console.log(`detail${id}`, fees);
                    setspin(fees)
                    savelist(fees)
                    localStorage.setItem(`buylist${id}`, JSON.stringify(fees))
                    setArr(id)
                    salenftprie(fees[0])


                }).catch()

        }
    }
    const savelist = (data) => {
        setallfix((old) => [
            ...old, data
        ])


    }
    // const nftinfo2 = async (id) => {
    console.log('alldata', allfixed)



    // useEffect(() => {
    //     // console.log('5')
    //     // console.log('lls',localStorage.getItem(`buylist1`))
    //     newlist.map((val, i) => {
    //         const pist = JSON.parse(localStorage.getItem(`buylist${val}`))
    //         // console.log('ppp',pist)
    //         setmainlist((old) => {
    //             return [...old, pist===mainlist?null:pist]
    //         })

    //     })
    // }, [arr])

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
                    // console.log('aaaprice',length);
                    // setlist(length[1])
                    // setlist2(length[1])
                    localStorage.setItem(`normasale${id}`, (length[3]))
                    setpricearr(id)
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
            setallprice(allp)
        }

    }
    console.log('popeice', allp)
    console.log('allpopeice', allprice)
    useEffect(() => {
        // console.log('5')
        // console.log('lls',localStorage.getItem(`buylist1`))
        newlist.map((val, i) => {
            const pist = localStorage.getItem(`normalsale${val}`)
            // console.log('ppp',pist)
            setprice((old) => {
                return [...old, pist]
            })


        })
    }, [arr, pricearr])



    return (
        <div className="carosel">
        <div className="container">
            <h2>Sale</h2>
            <Swiper
                slidesPerView={'auto'}  spaceBetween={30} pagination={{
                    "clickable": true
                }}
                navigation


            >
                {
                    allfixed.map((val,id) => { 
                        return <>
                        {
                               dogid.find(p=>p===val[0])?null:
                        
                         <SwiperSlide>
                            <div className="carddiv ">
                                
                                <div className="img">
                                    <img src={`https://ipfs.infura.io/ipfs/${val ? val[6] : null}`} alt="img1" className="img-fluid" />
                                </div>
                                <div className="excarddetail">
                                    <p>{val ? val[2] : null}</p>
                                    <p>{val ? val[3] : null}</p>
                                    {allp.map((vala) => {
                                                
                                                if (vala.id === val[0]) {
                                                    return <p>{vala?.value?.length > 21?allp[id]?.value / 1000000000000000000000000000000000000 : vala?.value / 1000000000000000000} BNB = $ {vala?.value?.length > 21 ? (vala?.value / 1000000000000000000000000000000000000) * 487 : (vala?.value / 1000000000000000000) * 487 } </p>

                                                }


                                            })}
                                    <div className="card_btn">
                                    <Link to={{
                                                pathname: `/assetdetail/${val ? val[0] : null}`,
                                                state: val
                                            }} style={{ fontSize: '15px' }}><button className="buybtn px-5">Buy</button></Link>
                                        {/* <button className="buybtn">Buy Now</button> */}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    }
                        </>
                    })
                }



            </Swiper>
           
            {/* <Carousel fade>
                {
                    alldata.map((val, i) => {
                        return <Carousel.Item>
                            <div className="col-md-6 col-xl-3 col-lg-4 col-12 my-2">
                            <div className="carddiv">
                                <div className="img">
                                    <img src={val.pic} alt="img1" className="img-fluid" />
                                </div>
                                <div className="carddetails">
                                    <h3>{val.name}</h3>
                                    <h4>28.00 wax <span>($3.73)</span></h4>
                                    <div className="card_btn">
                                        <NavLink to={`/detail/${val.id}`} ><button className="detailbtn">Detail</button></NavLink>
                                        <button className="buybtn">Buy Now</button>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </Carousel.Item>
                    })
                }



            </Carousel> */}

        </div>
    </div>
            )
}

            export default Carosel
