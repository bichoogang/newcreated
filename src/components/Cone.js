import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'
import {NavLink} from 'react-router-dom'
import Web3 from 'web3' 
import nft from '../abi/nft.json'
import SwiperCore, { Navigation, Pagination, Scrollbar,Autoplay,Lazy } from 'swiper/core';
SwiperCore.use([Navigation, Pagination, Scrollbar,Autoplay,Lazy]);


function Cone(props) {
    const data = [1,2,3]
    const [colllist, setcolllist] = useState()
    const [assetist, setassetlist] = useState()
    const [allcolllist, allsetcolllist] = useState([])
    const [active, setactive] = useState('sales')
    const [alldata,setalldata] = useState([])
    const [show,setshow] = useState(false)
    const [aldatafil, setaldatafil] = useState(alldata)
    const [result, setresult] = useState([])
    useEffect(()=>{
        console.log('aas',props.sdata)
        if(props.data === "no data"){
            alert('data')
            setresult(alldata)

        }
        else{
            // console.log('main',ser)
            const fil = aldatafil.filter((c)=>{
               return Object.values(c).join(" ").toLowerCase().includes(props.data.toLowerCase());
            })
            // setmaindata(fil)
            // setresult(fil)
        }
    },[props.sdata])
    // console.log('alkoiu',alldata)
    useEffect(() => {
        totalcolection()

    }, [])
    const totalcolection = async () => {
        
        if (window.ethereum) {
            setshow(true)

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, '0x97352f19b1aAA73997037513034c01DC995F61fb')

            swaping.methods.collectionform().call({ from: userwalletaddresss })
                .then((length) => {
                    setcolllist(length)
                })
                .catch()

        }
    }
    useEffect(() => {
        for (let i = 1; i <= colllist; i++) {
            collectiondetails(i);
        }


    }, [colllist])
    const collectiondetails = async (id) => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, '0x97352f19b1aAA73997037513034c01DC995F61fb')

            swaping.methods.collectiondetails(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    // console.log("fff", fees);
                    setactive(id)
                    getalllist(fees)


                }).catch()

        }
    }
   
    const getalllist = (data)=>{
        setalldata((old)=>[
            ...old,data
        ])


    }
    
    console.log('alladata',aldatafil)
    
    
    return (
        <div className="carosel">
            <div className="container">
            <h2>{props.title}</h2>
             <Swiper
      slidesPerView={'auto'} centeredSlides={true} spaceBetween={30} pagination={{
        "clickable": true
      }}
      navigation
      
      loop={true}
    > { data.length>0?
        alldata?.map((val)=>{
            return <SwiperSlide>
            <div className="carddiv">
                {/* <div className="img">
                    <img src={val.pic} alt="img1" className="img-fluid"/>
                </div> */}
                <div className="carddetails">
                    {/* <h3>{val.name}</h3> */}
                    <h4>28.00 wax <span>($3.73)</span></h4>
                    <div className="card_btn">
                        {/* <NavLink to={`/detail/${val.id}`} ><button className="detailbtn">Detail</button></NavLink>  */}
                        <button className="buybtn">Buy Now</button>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        }):null
    }
      
  
      
    </Swiper>
            
        </div>
        </div>
    )
}

export default Cone
