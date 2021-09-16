import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'
import { NavLink, Link } from 'react-router-dom'
import Web3 from 'web3'
import nft from '../abi/nft.json'
// import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'
// import {NavLink} from 'react-router-dom'
import { data1 } from './Pdata'
import img1 from '../img/atom.png'
import {addrs} from './address'
import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay, Lazy } from 'swiper/core';
import { Carousel } from 'react-bootstrap'
SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Lazy]);



function Caro(props) {
    const [colllist, setcolllist] = useState()
    const [assetist, setassetlist] = useState()
    const [allcolllist, allsetcolllist] = useState([])
    const [active, setactive] = useState('sales')
    const [alldata, setalldata] = useState([])
    const [show, setshow] = useState(false)
    const [aldatafil, setaldatafil] = useState(alldata)
    const [result, setresult] = useState([])
    const [spi, setspin] = useState()
    const [accountid, setaccountid] = useState()
    // useEffect(()=>{
    //     console.log('aas',props.sdata)
    //     if(props.data === "no data"){
    //         alert('data')
    //         setresult(alldata)

    //     }
    //     else{
    //         // console.log('main',ser)
    //         const fil = aldatafil.filter((c)=>{
    //            return Object.values(c).join(" ").toLowerCase().includes(props.data.toLowerCase());
    //         })
    //         // setmaindata(fil)
    //         // setresult(fil)
    //     }
    // },[props.sdata])
    // console.log('alkoiu', accountid)
    useEffect(async () => {
        const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setaccountid(accounts1)
        totalcolection()

    }, [])
    const totalcolection = async () => {

        if (window.ethereum) {
            setshow(true)

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.collectionform().call({ from: userwalletaddresss })
                .then((length) => {
                    setcolllist(length)
                    console.log('lklength', length)

                })
                .catch()

        }
    }
    useEffect(() => {
        for (let i = 1; i <= colllist; i++) {
            collectiondetails(i);
            setspin(i)
        }


    }, [colllist])
    const collectiondetails = async (id) => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.collectiondetails(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    // console.log("fff", fees);
                    setactive(id)
                    getalllist(fees)


                }).catch()

        }
    }

    const getalllist = (data) => {
        setalldata((old) => [
            ...old, data
        ])


    }
    console.log('aall', alldata)
    return (
        <div className="carosel">
            <div className="container">
                <h2>Collections</h2>
                <Swiper
                    slidesPerView={'auto'}  spaceBetween={30} pagination={{
                        "clickable": true
                    }}
                    navigation


                >
                    {
                        alldata.map((val) => {
                            return <>{
                                val[0]==="1"?null:
                            
                             <SwiperSlide>
                                <div className="carddiv ">
                                    
                                    <div className="img">
                                        <img src={`https://ipfs.infura.io/ipfs/${val ? val[6] : null}`} alt="img1" className="img-fluid" />
                                    </div>
                                    <div className="excarddetail">
                                        <p>{val ? val[2] : null}</p>
                                        <p>{val ? val[3] : null}</p>
                                        <div className="card_btn">
                                            <Link to={{
                                                pathname: `/savenft/${val ? val[0] : null}`,
                                                state: val ? val : null
                                            }} style={{ fontSize: '15px' }}><button className="one detailbtn">Details</button></Link>
                                            {/* <button className="buybtn">Buy Now</button> */}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>}
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

export default Caro
