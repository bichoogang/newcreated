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
import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay, Lazy } from 'swiper/core';
import { Carousel } from 'react-bootstrap'
import {addrs} from './address'
SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, Lazy]);

function Allasset() {
    
    const [assetist, setassetlist] = useState()
    const [allcolllist, allsetcolllist] = useState([])
    const [show, setshow] = useState(false)
    const [spin, setspin] = useState()

    const [accountid, setaccountid] = useState()

    useEffect(async () => {
        const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setaccountid(accounts1)
        totalnft()
    }, [])

    const totalnft = async () => {
        if (window.ethereum) {
            setshow(true)
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.tokenidmint().call({ from: userwalletaddresss })
                .then((length) => {

                    setassetlist(length)
                    
                })
                .catch()

        }
    }
    useEffect(() => {
        for (let i = 1; i <= assetist; i++) {
            nftinfo(i);
            setspin(i)


        }


    }, [assetist])

    const nftinfo = async (id) => {
        console.log('four fun')
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.nftinformation(id).call({ from: userwalletaddresss })
                .then((fees) => {

                    getallasset(fees)

                }).catch()

        }
    }
    const getallasset = (data) => {
        allsetcolllist(old => [
            ...old, data
        ])

    }

    console.log('aasd', allcolllist)
    return (
        <div className="carosel">
        <div className="container">
            <h2>All Assest</h2>
            <Swiper
                slidesPerView={'auto'}  spaceBetween={30} pagination={{
                    "clickable": true
                }}
                navigation


            >
                {
                    allcolllist.map((val) => {
                        return <SwiperSlide>
                            <div className="carddiv ">
                                
                                <div className="img">
                                    <img src={`https://ipfs.infura.io/ipfs/${val ? val[6] : null}`} alt="img1" className="img-fluid" />
                                </div>
                                <div className="excarddetail">
                                    <p>{val ? val[2] : null}</p>
                                    <p>{val ? val[3] : null}</p>
                                    <div className="card_btn">
                                        <Link to={{
                                            pathname: `/assetdetail/${val ? val[0] : null}`,
                                            state: val ? val : null
                                        }} style={{ fontSize: '15px' }}><button className="one detailbtn">Details</button></Link>
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

export default Allasset
