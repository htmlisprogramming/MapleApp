import React, { useState, useEffect } from 'react';
import './App.css';
import './Font.css';
import "./Page.css"
import Info from './info/Info';
import BossManage from './bossManage/BossManage';
import SeedSimulator from './seedSimulator/SeedSimulator';
import RebirthFlame from './equipment/RebirthFlame';
import Starforce from './equipment/Starforce';
import StarforceSimulator from './equipment/StarforceSimulator';
import EquipmentSet from './equipment/EquipmentSet';
import DefenseIgnore from './defenseIgnore/DefenseIgnore';
import SymbolCalc from './symbolCalc/SymbolCalc';
import LoginRequired from './LoginRequired';

import axios from 'axios';

let charlist = [
    "adele","angelicBuster","aran","ark",
    "cadena","cannonShooter","cygnusKnights",
    "dualBlade",
    "evan",
    "hoyoung",
    "illium",
    "kain","kaiser","kinesis",
    "lara","luminous",
    "mercedes","mihile",
    "pathfinder","phantom",
    "resistance",
    "shade",
    "zero"
]
let animation = charlist[ Math.floor(Math.random() * charlist.length) ]

function App() {

let [id,setId] = useState("");
let [login,setLogin] = useState(false); 
let [selectedTab,setSelectedTab] = useState(0);
let [fade,setFade] = useState(true);

useEffect(()=>{
    axios.get('http://www.maplesteam.kro.kr/isLoggedin')
    .then(result => { 
        if(result.data == "로그인안함") setLogin(false);
        else{ 
            setLogin(true); 
            setId(result.data); 
        }
    })
    .catch(err => console.log(err) ) 
},[])



let fadeIn = ()=>{
    setFade(false);
    setTimeout( ()=>setFade(true) , 1 )
}


return (
  <div className="App">
    
      <div id = "header">
        <div id="nav_title" className="noDrag" onClick={ ()=> setSelectedTab(0) }>
            <div className="icon logo"></div>
            <span className="">STEAM Maple</span>
        </div>
      </div>
{/* <div id="nav_idInfo" className = "noDrag">{id!=""?`${id}님님님`:""}</div> */}
    <div id = "navbar">
        <div className="nav_menu noDrag" onClick={ ()=> {setSelectedTab(1);fadeIn();} }>
            <div className="icon steam"></div><span className="">길드 소개</span>
        </div>
        <div className="nav_menu noDrag" onClick={ ()=> {setSelectedTab(2);fadeIn();} }>
            <div className="icon crystal"></div><span className="">보스 결정석 관리</span>
        </div>
        <div className="nav_menu noDrag" onClick={ ()=> {setSelectedTab(3);fadeIn();} }>
            <div className="icon star"></div><span className="">스타포스 시뮬레이터</span>
        </div>
        <div className="nav_menu noDrag" onClick={ ()=> {setSelectedTab(4);fadeIn();} }>
            <div className="icon ring"></div><span className="">시드상자 시뮬레이터</span>
        </div>
        {/* <div className="nav_menu noDrag" onClick={ ()=> {setSelectedTab(5);fadeIn();} }>
            <div className="icon rebirthflame"></div><span className="">환생의불꽃 시뮬레이터-</span>
        </div> */}
        <div className="nav_menu noDrag" onClick={ ()=> {setSelectedTab(6);fadeIn();} }>
            <div className="icon defense"></div><span className="">방어율무시 계산기</span>
        </div>
        {/* <div className="nav_menu noDrag" onClick={ ()=> {setSelectedTab(7);fadeIn();} }>
            <div className="icon equipment"></div><span className="">장비 템셋 계산기-</span>
        </div> */}
        <div className="nav_menu noDrag" onClick={ ()=> {setSelectedTab(8);fadeIn();} }>
            <div className="icon symbol"></div><span className="">심볼 계산기</span>
        </div>

        <div id="copyright">
            <img src="assets/icon/icon_reboot.svg"/>
            <span>
                ©2022, made for Maplestory <br/>Reboot Steam Guild.
            </span>
        </div>

    </div>
    <div id = "navbar2"></div>
    <div id = "main">
        
        {/* <img className = "page_animation" id = {animation} src = {"assets/animation/"+animation+".png"} /> */}
        <video className = "page_animation" id = {animation} src = {"assets/animation/"+animation+".mp4"} loop autoPlay playsInline muted></video>

        <div id = "content" className = {`fade${fade}`}>
            <div className={ selectedTab === 0 ? "" : "displayNone"}><Info /></div>
            <div className={ selectedTab === 1 ? "" : "displayNone"}><Info /></div>
            <div className={ selectedTab === 2 ? "" : "displayNone"}>{login?<BossManage id={id} login={login}/>:<LoginRequired setId = {setId} setLogin = {setLogin}/>}</div>
            <div className={ selectedTab === 3 ? "" : "displayNone"}><StarforceSimulator /></div>
            <div className={ selectedTab === 4 ? "" : "displayNone"}><SeedSimulator /></div>
            <div className={ selectedTab === 5 ? "" : "displayNone"}><RebirthFlame /></div>
            <div className={ selectedTab === 6 ? "" : "displayNone"}><DefenseIgnore /></div>
            <div className={ selectedTab === 7 ? "" : "displayNone"}><EquipmentSet /></div>
            <div className={ selectedTab === 8 ? "" : "displayNone"}><SymbolCalc /></div>
            {/* 로그인이 필요한 페이지들 */}
            <div className="">
    
            </div>

        </div>
    </div>
  </div>
  );
}


export default App;


