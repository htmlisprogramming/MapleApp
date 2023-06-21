import "./Info.css"
import Pageheader from '../Pageheader';
import { useState,useEffect } from 'react';
import axios from 'axios';
function Info(){

let [info, setInfo] = useState({});
let [memberList, setMemberList] = useState([]);
let [masterList, setMasterList] = useState([]);

useEffect(()=>{

    axios.get('http://www.maplesteam.kro.kr/getGuildInfo')
    .then(result => { 
        setInfo(result.data.info)
        setMasterList(result.data.masters); 
        setMemberList(result.data.members); 
    })
    .catch(err => console.log(err) ) 
        
    
},[])

    return (
        <div>
            <Pageheader 
                title ="길드 소개"
                description = "메이플스토리 리부트1 길드 Steam"
                icon = "steam_h"/>

            <div className="page_section full">
                <div className="page_div">
                    <span className = "page_section_title">STEAM</span>
                    <span className = "page_section_paragraph">
                        월드랭킹 {info.worldrank} 전체랭킹 {info.totalrank} 길드원수 {info.numbers} 길드포인트 {info.point}
                    </span>
                </div>
                <div className="page_div">
                    <span className = "page_section_title">인삿말</span>
                    <span className = "page_section_paragraph">
                        반갑습니다. 길드 마스터 용팔입니다.<br/>
                        우리 길드는 22.10.13 부터 준비하여 많은분들의 노력 덕분에 
                        22.10.17기준 노블포인트 43p를 단 4일만에 달성하였고. 
                        <br/>
                        이후 두번째 주 부터 노블포인트 47p를 유지 하고있습니다.
                        단기간 동안 길드 컨텐츠 참여로 기여 해주신 모든 분들께 감사드립니다.
                        <br/>
                    </span>
                </div>
            </div>

            <div className="page_section full">
                <div className= "page_div">
                    <span className = "page_section_title">마스터</span>
                    {masterList.map((index,i)=>{
                        return(
                            i==0?
                            <div className= "info_charSlot" key={i}>
                                <div>
                                    <img src={index.img} />
                                </div>
                                <span className = "info_charName">{index.name}</span>
                                <span className = "info_charLev">{index.lv}<br/>{index.ch}</span>
                            </div>
                            :""
                    )})}
                </div>
                <div className= "page_div">
                    <span className = "page_section_title">부마스터</span>
                    {masterList.map((index,i)=>{
                        return(
                            i>0?
                            <div className= "info_charSlot" key={i}>
                                <div>
                                    <img src={index.img} />
                                </div>
                                <span className = "info_charName">{index.name}</span>
                                <span className = "info_charLev">{index.lv}<br/>{index.ch}</span>
                            </div>
                            :""
                    )})}
                </div>
            </div>

            <div className="page_section full">
                <div className= "page_div">
                    <span className = "page_section_title">길드원</span>
                    {memberList.map((index,i)=>{
                        return(
                            <div className= "info_charSlot" key={i}>
                                <div>
                                    <img src={index.img} />
                                </div>
                                <span className = "info_charName">{index.name}</span>
                                <span className = "info_charLev">{index.lv}<br/>{index.ch}</span>
                            </div>
                    )})}
                </div>
            </div>
            <div className="page_footer"/>
        </div>
    )}
export default Info;