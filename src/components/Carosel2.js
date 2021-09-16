import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'
import { NavLink, Link } from 'react-router-dom'
import Web3 from 'web3'
import nft from '../abi/nft.json'
import { data1, data2 } from './Pdata'
import Spinner from 'react-bootstrap/Spinner'
import {addrs} from './address'
import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay, Lazy } from 'swiper/core';
SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Lazy]);

function Carosel2(props) {
    const [active, setactive] = useState('auction')
    const [list, setlist] = useState([])
    const [list2, setlist2] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [mainlist, setmainlist] = useState([])
    const [mainlistauc, setmainlistauc] = useState([])
    const [arr, setArr] = useState([]);
    const [arrauc, setArrauc] = useState([]);
    const [price, setprice] = useState([])
    const [pricearr, setpricearr] = useState()
    const [newlist, setnewlist] = useState([])
    const [payvalue, setpayvalue] = useState()
    const [highauc, sethighauc] = useState()
    const [highauid, sethighauid] = useState()
    const [modaldatao, setmodaldatao] = useState()
    const [modaldatac, setmodaldatac] = useState()
    const [modaldatai, setmodaldatai] = useState()
    const [modaldataaa, setmodaldataaa] = useState()
    const [modaldatap, setmodaldatap] = useState()
    const [modaldatacol, setmodaldatacol] = useState()
    const [modaldatatok, setmodaldatatok] = useState()
    const [exprice, setexprice] = useState()
    const [allfixed, setallfix] = useState([])
    const [allp, setallp] = useState([])
    const [allhighp, setallhighp] = useState([])
    const [timew, settimew] = useState([])
    const [p1, setp1] = useState()
    const [p2, setp2] = useState()
    const [tokenid, settokenid] = useState()




    useEffect(() => {

        salenft(0)

    }, [])


    const salenft = async (id) => {
        console.log('2')
        if (window.ethereum) {

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });


            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.listofsalenft(id).call({ from: userwalletaddresss })
                .then((length) => {
                    // console.log('listlist', length);
                    setlist(length[1])
                    // setlist2(length[1])
                    var listlen = length[1]?.length
                    // console.log('bnmm', listlen)
                    for (let i = 0; i < listlen; i++) {
                        // console.log('akk',length[0][i])
                        const ll = length[1][i]
                        nftinfo(ll)
                        // salenftprie(length[2])

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
                    // console.log('aafg', fees);
                    // localStorage.setItem(`buylistauc${id}`, JSON.stringify(fees))
                    setArr(id)
                    savelist(fees)
                    salenftprie(fees[0])


                }).catch()

        }
    }
    const savelist = (data) => {
        setallfix((old) => [
            ...old, data
        ])


    }
    console.log('lok', exprice)

    const salenftprie = async (id) => {
        // console.log('poij', id)
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.listofsalenft(id).call({ from: userwalletaddresss })
                .then((length) => {
                    // console.log('aaaprice', length);
                    const val = {
                        id: id, value: length[2]
                    }
                    // setlist(length[1])
                    // console.log('asas',val)
                    // setlist2(length[1])
                    // localStorage.setItem(`auctionsale${id}`, (length[2]))
                    setpricearr(id)
                    getallprice(val)
                    timer(id)
                    auctiondetail(id)
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
    console.log('popeice', allp)










    // useEffect(() => {
    //     const interval = setInterval(() => {
    //     //   console.log('This will run every second!');
    //       list?.map((val) => {
    //         timer(val)
    //         auctiondetail(val)
    //         // console.log('aaaaaaa')
    //     })
    //     }, 1000);
    //     return () => clearInterval(interval);
    //   }, [list,pricearr,price]);
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
    const settime = (data) => {
        settimew((old => [
            ...old, data
        ]))

    }
    console.log('jkijjh', timew)
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
                    getallhighprice(aucde)
                }).catch()

        }
    }
    const getallhighprice = (data) => {
        if (data.id === "0") {
            // console.log('notallowed',data)
        } else {
            // console.log('dataaallower',data)
            setallhighp((old) => [
                ...old, data
            ])
        }

    }
    console.log('popeicehigh', allhighp)

    return (
        <div className="carosel">
            <div className="container">
                <h2>Auction</h2>
                <Swiper
                    slidesPerView={'auto'} spaceBetween={30} pagination={{
                        "clickable": true
                    }}


                    navigation


                >
                    {
                        allfixed?.map((val) => {
                            return <SwiperSlide>
                                <div className="carddiv ">

                                    <div className="img">
                                        <img src={`https://ipfs.infura.io/ipfs/${val ? val[6] : null}`} alt="img1" className="img-fluid" />
                                    </div>
                                    <div className="excarddetail">
                                        <p>{val ? val[2] : null}</p>
                                        <p>{val ? val[3] : null}</p>
                                        {


                                            allhighp.map((u) => {

                                                if (u.userid === val[0]) {
                                                    return allp.map((vala) => {
                                                        if (vala.id === val[0]) {
                                                            return <>
                                                                {
                                                                    Number(u?.val) > Number(vala?.value) ? <> <p>{Number(u?.val) / 1000000000000000000} BNB = $ {(Number(u?.val) / 1000000000000000000) * 487} BNB </p><p style={{ fontSize: '10px' }}>{u?.id}</p></> :
                                                                        <p>{Number(Number(vala?.value?.length > 21 ? vala?.value / 1000000000000000000000000000000000000 : vala?.value / 1000000000000000000))}BNB =$ {(Number(Number(vala?.value?.length > 21 ? vala?.value / 1000000000000000000000000000000000000 : vala?.value / 1000000000000000000)) * 487)} </p>
                                                                }
                                                                {/* <p>{Number(u?.val) / 1000000000000000000} BNB = $ {(Number(u?.val) / 1000000000000000000) * 487} BNB </p> */}
                                                            </>

                                                        }
                                                    })




                                                }
                                            })

                                        }
                                        {
                                            timew.map((t) => {
                                                if (t.id === val[0]) {
                                                    return <p style={{ color: 'orange', fontSize: '12px' }}>{`${t?.d} Days ${t?.h} Hr ${t?.m} Min`}</p>
                                                }
                                            })

                                        }
                                        <div className="card_btn">
                                        <Link to={{
                                            pathname: `/assetdetail/auction`,
                                            state: val 
                                        }} style={{ fontSize: '15px' }}><button className="buybtn px-5">Bid</button></Link>
                                            {/* <button className="buybtn">Buy Now</button> */}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
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


export default Carosel2
