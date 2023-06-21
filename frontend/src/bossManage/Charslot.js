import { useState, useEffect } from 'react';
import axios from 'axios';

function Charslot(props){

useEffect(()=>{
    axios.post('http://www.maplesteam.kro.kr/searchInfo',{name:props.char.name})
    .then(result => { 
        if(result.data.img) setImgurl(result.data.img);
        else setImgurl("./assets/character/empty.png");
        if(result.data.lv) setLv(result.data.lv);
        else setLv("--");
        if(result.data.ch) setCh(result.data.ch);
        else setCh("--");
    })
    .catch(err => console.log(err) )

},[props.char])


let boss = [
    'zakum','hilla','pinkbean','cygnus',
    'pierre','vonbon','crimsonqueen','vellum',
    'magnus','papulatus','lotus','damien',
    'slime','lucid','will','dusk',
    'darknell','verushilla','seren'
]

let [imgurl, setImgurl] = useState("./assets/character/empty.png");
let [lv,setLv] = useState("--");
let [ch,setCh] = useState("--");


let bossState = (type)=>{
    var all = 0, clear = 0, result = 0, rate = 0;
        boss.forEach( bossname => {
            if(props.char[bossname]){
                if(props.char[bossname]['onoff'] == 1) all++;
                if(props.char[bossname]['onoff'] == 1 && props.char[bossname]['clear'] == 1) clear++;
            }
        })
    if(all!=0 && clear!=0) rate = clear/all*100;
    result = rate == 100 || rate == 0 ? rate : rate.toFixed(1);
    if(type=="all") result = all;
    else if(type=="clear") result = clear;
    else if(type=="rate") result = rate == 100 || rate == 0 ? rate : rate.toFixed(1);
    return result;
}

const copyChar = (char)=>{
    var newChar = 
    {
        id:           char['id'],
        name:         char['name'],
        zakum:        {...char['zakum']},
        hilla:        {...char['hilla']},
        pinkbean:     {...char['pinkbean']},
        cygnus:       {...char['cygnus']},
        pierre:       {...char['pierre']},
        vonbon:       {...char['vonbon']},
        crimsonqueen: {...char['crimsonqueen']},
        vellum:       {...char['vellum']},
        magnus:       {...char['magnus']},
        papulatus:    {...char['papulatus']},
        lotus:        {...char['lotus']},
        damien:       {...char['damien']},
        slime:        {...char['slime']},
        lucid:        {...char['lucid']},
        will:         {...char['will']},
        dusk:         {...char['dusk']},
        darknell:     {...char['darknell']},
        verushilla:   {...char['verushilla']},
        seren:   {...char['seren']},
        memo:         char['memo']
    }
    return newChar;
}
const updateState = (newchar)=>{
    var newCharlist = [...props.charlist]
    newCharlist[props.index] = newchar;
    props.update(newCharlist);
}

const toggleAll = ()=>{
    var newchar = copyChar(props.char);
    var allcleared = true;
    boss.forEach( bossname => {
        if(newchar[bossname]['clear'] == 0 && newchar[bossname]['onoff'] == 1 ) allcleared = false;
    })
    boss.forEach( bossname => {
        if(newchar[bossname]['onoff'] == 1) {
            allcleared
            ?newchar[bossname]['clear']= 0
            :newchar[bossname]['clear']= 1
        }
    })
    updateState(newchar);
}

return (
    <tr>
        <td>
            <table><tbody><tr className="tr">
                <td className="hdtd">
                    <div className = "boss_charImg" >
                        <img src={imgurl}/>
                    </div>
                </td>
                <td>
                    <div className = "boss_charInfo" >
                        <img src={imgurl}/>
                        <span>{props.char.name}</span>
                        <span>{lv}</span>
                        <span>{ch}</span>
                    </div>
                </td>
            </tr></tbody></table>
        </td>
        <td>
            <div className = "boss_charInfo" >
                <span></span>
                <span className={`boss_clearRate ${bossState("rate")==100?"cleared":""} ${bossState("rate")==0?"untouched":""}`}>{bossState("rate")}%</span>
                <span>{bossState("clear")}/{bossState("all")}</span>
            </div>
        </td>
        <td>
            <div className = "boss_clearBtn">
                <span className = "noDrag" onClick = { ()=>{toggleAll()} }>전체완료</span>
                <span className = "noDrag" onClick={()=>{
                        props.openToggle(); 
                        props.setSelected(props.index); 
                        props.setSelectedInfo({
                            name: props.char.name,
                            img: imgurl,
                            lv: lv,
                            ch: ch
                        }) 
                }} >
                    개별설정
                </span>
            </div>
        </td>
        <td>
            <div className = "boss_settingBtn noDrag" onClick={()=>{props.openSetting(); props.setSelected(props.index)}} />
        </td>
    </tr>
)}

export default Charslot;
    