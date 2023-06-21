import { useState } from 'react';
import "./BossModal.css"


function BossModal_Toggle(props){

let updateOne = ()=>{
    var newCharlist = [...props.charlist]
    newCharlist[props.index] = char;
    props.update(newCharlist);
    props.close();
}

let boss = [
    'zakum','hilla','pinkbean','cygnus',
    'pierre','vonbon','crimsonqueen','vellum',
    'magnus','papulatus','lotus','damien',
    'slime','lucid','will','dusk',
    'darknell','verushilla','seren','kalos','kaling'
]

let difficulty = {
    zakum         :['Chaos'],
    hilla         :['Hard'],
    pinkbean      :['Chaos'],
    cygnus        :['Easy','Normal'],
    pierre        :['Chaos'],
    vonbon        :['Chaos'],
    crimsonqueen  :['Chaos'],
    vellum        :['Chaos'],
    magnus        :['Hard'],
    papulatus     :['Chaos'],
    lotus         :['Normal','Hard'],
    damien        :['Normal','Hard'],
    slime         :['Normal','Chaos'],
    lucid         :['Easy','Normal','Hard'],
    will          :['Easy','Normal','Hard'],
    dusk          :['Normal','Chaos'],
    verushilla    :['Normal','Hard'],
    darknell      :['Normal','Hard'],
    seren         :['Normal','Hard'],
    kalos         :['Chaos'],
    kaling        :['Normal'],
    blackmage     :['Hard'],
}


let copyChar = (char)=>{
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
        seren:        char['seren'] ? {...char['seren']} : { onoff: 0, clear: 0, difficulty: 'Normal', players: 1 },
        kalos:        char['kalos'] ? {...char['kalos']} : { onoff: 0, clear: 0, difficulty: 'Chaos', players: 1 },
        kaling:       char['kaling'] ? {...char['kaling']} : { onoff: 0, clear: 0, difficulty: 'Normal', players: 1 },
        memo:         char['memo']
    }
    return newChar;
}

let [char,setChar] = useState(copyChar(props.charlist[props.index]));


let setClear = (bossname)=>{
    let newChar = copyChar(char);
    if (newChar[bossname].clear == 1) newChar[bossname].clear = 0;
    else newChar[bossname].clear = 1;
    setChar(newChar);
}

return (
    <div className="modalBg">
        <div className = "modal">
            <div className = "modal_charInfo">
                <img src={props.charInfo.img}/>
                <div>
                    <span>{props.charInfo.name}</span>
                    <span>{props.charInfo.lv}</span>
                    <span>{props.charInfo.ch}</span>
                </div>
            </div>
            <div>
                { boss.map( (index, i)=>{ return(
                    <div key={i} className={`boss_iconContainer ${char[index].onoff == 1 ? "pointer" : ""}`}  onClick = { ()=>{ setClear(index) } }>
                        <div 
                            className = {`boss_icon ${index} noDrag ${char[index].onoff == 1 ? "" : "none"} ${char[index].clear == 1 ? "" : "off"}`} 
                        />
                        <div className={`boss_tag noDrag p${char[index].players} ${char[index].clear == 1 ? "" : "off"} ${char[index].onoff == 1 ? "" : "none"}`}
                            >
                            {char[index].players}p
                        </div>
                        <div className={`boss_tag noDrag ${char[index].difficulty} ${char[index].clear == 1 ? "" : "off"} ${char[index].onoff == 1 ? "" : "none"}`}
                        
                        >{char[index].difficulty}</div>
                    </div>
                )})}

            </div>
            <div className="boss_btnContainer">
                <div className="noDrag" onClick={()=>{props.close()}}>취소</div>
                <div className="noDrag" onClick={()=>{updateOne()}}>완료</div>
            </div>
        </div>
    </div>
)}

export default BossModal_Toggle;
    