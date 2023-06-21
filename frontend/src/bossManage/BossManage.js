import Pageheader from '../Pageheader';
import BossModal_Create from './BossModal_Create';
import BossModal_Setting from './BossModal_Setting';
import BossModal_Toggle from './BossModal_Toggle';
import Charslot from './Charslot';
import "./BossManage.css"
import { useState, useEffect } from 'react';
import { CircularProgressbarWithChildren,buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';

function BossManage(props){

useEffect(()=>{
    if(props.id != ""){
        let today = new Date();
        let daynum = [3,4,5,6,0,1,2]
        setToday( daynum[today.getDay()] )
        axios.post('http://www.maplesteam.kro.kr/datatable',{_id:props.id})
        .then(result => {
            setCharlist(result.data.list)
        })
        .catch(err => {
            if(err) console.log(err)
        })
    }
},[props.id])


let [charlist, setCharlist] = useState([]);
let [modal,setModal] = useState(false);
let [modalType,setModalType] = useState(false);
let [today,setToday] = useState(0);
let [selected,setSelected] = useState(0);
let [selectedInfo,setSelectedInfo] = useState({name:"",img:"",lv:0, ch:""});

useEffect(()=>{
    let today = new Date();
    let daynum = [3,4,5,6,0,1,2]
    setToday( daynum[today.getDay()] )
},[charlist])

let boss = [
    'zakum','hilla','pinkbean','cygnus',
    'pierre','vonbon','crimsonqueen','vellum',
    'magnus','papulatus','lotus','damien',
    'slime','lucid','will','dusk',
    'darknell','verushilla','seren','kalos','kaling'
];

let mesotable = {
    zakum_Chaos         :48706425,
    hilla_Hard          :34682445,
    pinkbean_Chaos      :39615550,
    cygnus_Easy         :27466970,
    cygnus_Normal       :45195650,
    pierre_Chaos        :49194660,
    vonbon_Chaos        :49090770,
    crimsonqueen_Chaos  :49033900,
    vellum_Chaos        :92951010,
    magnus_Hard         :57895115,
    papulatus_Chaos     :133629685,
    lotus_Normal        :169712830,
    lotus_Hard          :591470690,
    damien_Normal       :177589265,
    damien_Hard         :562403065,
    slime_Normal        :234679370,
    slime_Chaos         :777460705,
    lucid_Easy          :240291595,
    lucid_Normal        :287513130,
    lucid_Hard          :655478275,
    will_Easy           :260695635,
    will_Normal         :331557315,
    will_Hard           :725192415,
    dusk_Normal         :355272810,
    dusk_Chaos          :800868760,
    verushilla_Normal   :740561880,
    verushilla_Hard     :950797260,
    darknell_Normal     :383007060,
    darknell_Hard       :843046400,
    seren_Normal        :984523760,
    seren_Hard          :1339128105,
    seren_Extreme       :5356512420,
    kalos_Chaos         :1500000000,
    kaling_Normal       :1750000000,
    blackmage_Hard      :0,
};

let calCrystal = (type)=>{
    var all = 0, clear = 0, result = 0, rate = 0;
    charlist.forEach(charname => {
        boss.forEach(bossname => {
            if(charname[bossname]){
                if(charname[bossname]['onoff'] == 1) all++;
                if(charname[bossname]['onoff'] == 1 && charname[bossname]['clear'] == 1) clear++;
            }
        })
    });
    if(all!=0 && clear!=0) rate = clear/all*100;
    if(type=="all") result = all;
    else if(type=="clear") result = clear;
    else if(type=="rate") result = rate == 100 || rate == 0 ? rate : rate.toFixed(1);
    return result;
}
let calCompletes = (type)=>{
    var all = 0, clear = 0, result = 0, rate = 0;
    charlist.forEach(charname => {
        boss.forEach(bossname => {
            if(charname[bossname]){
                if(charname[bossname]['onoff'] == 1) all++;
                if(charname[bossname]['onoff'] == 1 && charname[bossname]['clear'] == 1) clear++;
            }
        })
        if(all!=0 && clear!=0 && all == clear) result ++;
        all = 0; clear = 0;
    });
    if( charlist.length != 0) rate = result/charlist.length*100;
    if( type=="rate" ) result = rate == 100 || rate == 0 ? rate : rate.toFixed(1);
    return result;
}
const calMeso = (type)=>{
    var all = 0, clear = 0, result = 0, rate = 0;
    charlist.forEach(charname => {
        boss.forEach(bossname => {
            if(charname[bossname]){
                if(charname[bossname]['onoff'] == 1) all += parseInt( mesotable[bossname+"_"+charname[bossname]['difficulty']] / charname[bossname]['players'] );
                if(charname[bossname]['onoff'] == 1 && charname[bossname]['clear'] == 1) clear += parseInt( mesotable[bossname+"_"+charname[bossname]['difficulty']] / charname[bossname]['players'] );
            }
        })
    });
    if(all!=0 && clear!=0) rate = clear/all*100;
    if(type=="all") result = all;
    else if(type=="clear") result = clear;
    else if(type=="rate") result = rate == 100 || rate == 0 ? rate : rate.toFixed(1);
    return result;
}

const unit = (meso)=>{
    var stringmeso = meso.toString(),
        lastindex = stringmeso.length-1,
        result="";

    for (let i = 0; i < stringmeso.length; i++) {
        result+=stringmeso[i];
        if( i == lastindex-8 ) result += "억 "
        if( i == lastindex-4 ) result += "만 "
        
    }
    
    return result;
}

let Synchronize = (newchartable) =>{ 
    axios.post('http://www.maplesteam.kro.kr/update', {_id:props.id, list:newchartable})
    .then(result => { setCharlist(newchartable) })
    .catch(err => console.log(err) )
}


return (
    <div className = "bossManage">
        <Pageheader 
            title ="주간보스 결정석 관리"
            description = "캐릭터들의 주간보스 클리어 현황과 결정석 수량, 예상 메소 수익을 계산합니다. 리부트 서버 기준으로 설정 되어 있습니다."
            icon = "crystal_h"/>
            
        <div className='page_container flex trisect'>
                <div className="page_section trisect">
                        <span className = "page_section_title">캐릭터</span>
                        <span className = "page_section_description">총 {charlist.length}캐릭터</span>
                </div>
                <div className="page_section trisect">
                        <span className = "page_section_title">결정석</span>
                        <span className = "page_section_description">총 {calCrystal("all")}개</span>
                </div>
                <div className="page_section trisect">
                        <span className = "page_section_title">메소</span>
                        <span className = "page_section_description">총 {unit(calMeso("all"))}</span>
                </div>
        </div>
        <div className='page_container flex half'>
                <div className="page_section half">
                        <span className = "page_section_title">진행도 </span>
                        <span className = "page_section_description">
                            금주의 주간보스 진행도입니다.
                        </span>

                        <span className = "page_section_description">
                            캐릭터 : {calCompletes()} / {charlist.length}
                        </span>
                        <div className= "boss_progress">
                            <div className = "boss_progressIcon">
                                <img style={{ height: 26 }} src="./assets/icon/icon_char.png" alt="doge" />
                            </div>
                            <div className='boss_progressBar'>
                                <div className='boss_progressRatebar char' style = {{ "--percent1": `${ calCompletes("rate")}%`}} ></div>
                                <div className='boss_progressRate noDrag'>{calCompletes("rate")}%</div>
                            </div>
                        </div>

                        <span className = "page_section_description">
                            결정석 : {calCrystal("clear")}개
                        </span>
                        <div className= "boss_progress">
                            <div className = "boss_progressIcon">
                                <img style={{ height: 30 }} src="./assets/icon/icon_h_crystal.svg" alt="doge" />
                            </div>
                            <div className='boss_progressBar'>
                                <div className='boss_progressRatebar cryst' style = {{ "--percent2": `${ calCrystal("rate")}%`}} ></div>
                                <div className='boss_progressRate noDrag'>{calCrystal("rate")}%</div>
                            </div>
                        </div>

                        <span className = "page_section_description">
                            메소 : {unit(calMeso("clear"))}
                        </span>
                        <div className= "boss_progress">
                            <div className = "boss_progressIcon">
                                <img style={{ height: 26 }} src="./assets/icon/icon_meso.svg" alt="doge" />
                            </div>
                            <div className='boss_progressBar'>
                                <div className='boss_progressRatebar meso' style = {{ "--percent3": `${ calMeso("rate")}%`}} ></div>
                                <div className='boss_progressRate noDrag'>{calMeso("rate")}%</div>
                            </div>
                        </div>




                            {/* <div>
                                <CircularProgressbarWithChildren value={calCrystal("rate")}
                                    styles={buildStyles({
                                        pathColor: "#3db0d6",
                                        trailColor: "#ccc"
                                        })}>
                                    <img style={{ height: 30 }} src="./assets/icon/icon_h_crystal.svg" alt="doge" />
                                    <div style={{ fontSize: 12, marginTop: 5 }}>
                                        <strong>{calCrystal("rate")}%</strong>
                                    </div>
                                </CircularProgressbarWithChildren>
                            </div>
                            <div>
                                <CircularProgressbarWithChildren value={calMeso("rate")}
                                    styles={buildStyles({
                                        pathColor: "#ffbf1e",
                                        trailColor: "#ccc"
                                        })}>
                                    <img style={{ height: 30 }} src="./assets/icon/icon_meso.png" alt="doge" />
                                    <div style={{ fontSize: 12, marginTop: 5 }}>
                                        <strong>{calMeso("rate")}%</strong>
                                    </div>
                                </CircularProgressbarWithChildren>

                            </div> */}
                        <br/>
                </div>
                <div className="page_section half">
                    <div className="page_div">
                        <span className = "page_section_title">D - Day</span>
                        <span className = "page_section_description">초기화까지 {7 - today}일 남음</span>
                        <div className= "boss_dDay">
                            <img src="./assets/character/animated.gif" style = {{ "--percent4": `${14.28 * today}%`}}></img>
                            <div className= "boss_dayProgress"  >
                                <div style = {{ "--percent4": `${14.28 * today}%`}}></div>
                            </div>
                            <div className= "boss_days"  >
                                <span className = {`${today == 0? "today":""} ${today > 0? "passed":""}`}>목</span>
                                <span className = {`${today == 1? "today":""} ${today > 1? "passed":""}`}>금</span>
                                <span className = {`${today == 2? "today":""} ${today > 2? "passed":""}`}>토</span>
                                <span className = {`${today == 3? "today":""} ${today > 3? "passed":""}`}>일</span>
                                <span className = {`${today == 4? "today":""} ${today > 4? "passed":""}`}>월</span>
                                <span className = {`${today == 5? "today":""} ${today > 5? "passed":""}`}>화</span>
                                <span className = {`${today == 6? "today":""} ${today > 6? "passed":""}`}>수</span>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <table className = "boss_charList">
            <thead>
                <tr>
                    <td>
                        <div className = "boss_charInfo" >
                            <span>캐릭터</span>
                        </div>
                    </td>
                    <td>
                        <div className = "boss_charInfo" >
                            <span>진행도</span>
                        </div>
                    </td>
                    <td>
                        <div className = "boss_charInfo" >
                            <span>설정</span>
                        </div>
                    </td>
                    <td>
                        <div className = "boss_charInfo" >
                            <span></span>
                        </div>
                    </td>
                </tr>
            </thead>

            <tbody>
                {charlist.map( (index, i)=>{return(

                    <Charslot 
                        char = {index} charlist = {charlist} index = {i} 
                        update = {Synchronize} 
                        openSetting = {()=>{setModal(true); setModalType(2)}} 
                        openToggle = {()=>{setModal(true); setModalType(3)}} 
                        setSelected = {setSelected}
                        setSelectedInfo = {setSelectedInfo}
                        key = {i} 
                    />

                )})}

                <tr>
                    <td colSpan={4}>
                        <div className = "boss_charCreate"  onClick={()=>{setModal(true); setModalType(1)}}>
                            <div className = "boss_createBtn" />
                            <span>생성하기</span>
                        </div>
                    </td>
                </tr>

            </tbody>
        </table>

        {
            modal && modalType == 1
            ?
            <BossModal_Create close = {()=>{setModal(false)}} update = {Synchronize} charlist = {charlist} id = {props.id} />
            :<></>
        }
        {
            modal && modalType == 2
            ?
            <BossModal_Setting close = {()=>{setModal(false)}} update = {Synchronize} index = {selected} charlist = {charlist} />
            :<></>
        }
        {
            modal && modalType == 3
            ?
            <BossModal_Toggle close = {()=>{setModal(false)}} update = {Synchronize} index = {selected} charlist = {charlist} charInfo = {selectedInfo} />
            :<></>
        }

        <div className="page_footer"/> 
    </div>
)}


export default BossManage;
    