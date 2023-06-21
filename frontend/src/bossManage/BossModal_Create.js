import { useState } from 'react';
import "./BossModal.css"


function BossModal_Create(props){

let insertOne = ()=>{
    var newCharlist = [...props.charlist]
    newCharlist.push(char);
    props.update(newCharlist);
    props.close();
}

let boss = [
    'zakum','hilla','pinkbean','cygnus',
    'pierre','vonbon','crimsonqueen','vellum',
    'magnus','papulatus','lotus','damien',
    'slime','lucid','will','dusk',
    'darknell','verushilla',
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
    blackmage     :['Hard'],

}

let [char,setChar] = useState({
    id: props.id,
    name: '이름좀써주지',
    zakum:        { onoff: 1, clear: 0, difficulty: 'Chaos', players: 1 },
    hilla:        { onoff: 1, clear: 0, difficulty: 'Hard', players: 1 },
    pinkbean:     { onoff: 1, clear: 0, difficulty: 'Chaos', players: 1 },
    cygnus:       { onoff: 1, clear: 0, difficulty: 'Easy', players: 1 },
    pierre:       { onoff: 1, clear: 0, difficulty: 'Chaos', players: 1 },
    vonbon:       { onoff: 1, clear: 0, difficulty: 'Chaos', players: 1 },
    crimsonqueen: { onoff: 1, clear: 0, difficulty: 'Chaos', players: 1 },
    vellum:       { onoff: 1, clear: 0, difficulty: 'Chaos', players: 1 },
    magnus:       { onoff: 1, clear: 0, difficulty: 'Hard', players: 1 },
    papulatus:    { onoff: 1, clear: 0, difficulty: 'Chaos', players: 1 },
    lotus:        { onoff: 1, clear: 0, difficulty: 'Normal', players: 1 },
    damien:       { onoff: 1, clear: 0, difficulty: 'Normal', players: 1 },
    slime:        { onoff: 1, clear: 0, difficulty: 'Normal', players: 1 },
    lucid:        { onoff: 1, clear: 0, difficulty: 'Easy', players: 1 },
    will:         { onoff: 1, clear: 0, difficulty: 'Easy', players: 1 },
    dusk:         { onoff: 1, clear: 0, difficulty: 'Normal', players: 1 },
    darknell:     { onoff: 1, clear: 0, difficulty: 'Normal', players: 1 },
    verushilla:   { onoff: 1, clear: 0, difficulty: 'Normal', players: 1 },
    memo: '메모한 내용이 없습니다.'
});

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
        memo:         char['memo']
    }
    return newChar;
}

let setName = (name)=>{
    let newChar = copyChar(char);
    newChar.name = name;
    setChar(newChar);
}

let setOnoff = (bossname)=>{
    let newChar = copyChar(char);
    if (newChar[bossname].onoff == 1) newChar[bossname].onoff = 0;
    else newChar[bossname].onoff = 1;
    setChar(newChar);
}
let setPlayers = (bossname)=>{
    let newChar = copyChar(char);
    if (newChar[bossname].players >= 6) newChar[bossname].players = 1;
    else newChar[bossname].players++;
    setChar(newChar);
}

const setDifficulty = (bossname) =>{
    let newchar = copyChar(char);
    let difficulties = difficulty[bossname] // 해당 보스 난이도 목록
    let current = newchar[bossname]['difficulty'] // 지금 설정돼있는 보스 난이도
    let currentIndex = difficulties.indexOf(current);//먼저 지금 보스난이도가 목록중 몇번째인지
    //해당번호가 마지막인지 아닌지
    if (currentIndex == difficulties.length-1){//마지막이면 첫번호로
        newchar[bossname]['difficulty'] = difficulty[bossname][0]
    }else{//마지막이 아니면 다음번호로
        newchar[bossname]['difficulty'] = difficulty[bossname][currentIndex+1]
    }
    setChar(newchar);
}
return (
    <div className="modalBg">
        <div className = "modal">
            <div>
                <input type="text" placeholder='캐릭터 명' onChange={(e)=>{setName(e.target.value)}}/>
            </div>
            <div>
                { boss.map( (index, i)=>{ return(
                    <div className="boss_iconContainer">
                        <div 
                            className = {`boss_icon ${index} noDrag ${char[index].onoff == 1 ? "" : "none"} pointer`} 
                            onClick = { ()=>{ setOnoff(index) } }
                        />
                        <div className={`boss_tag p${char[index].players} noDrag ${char[index].onoff == 1 ? "" : "none"} ${char[index].onoff == 1 ? "pointer" : ""}`}
                            onClick = { ()=>{ setPlayers(index) } }>
                            {char[index].players}p
                        </div>
                        <div className={`boss_tag ${char[index].difficulty} noDrag ${char[index].onoff == 1 ? "" : "none"} ${char[index].onoff == 1 ? "pointer" : ""}`}
                            onClick = { ()=>{ setDifficulty(index) } }
                        >{char[index].difficulty}</div>
                    </div>
                )})}

            </div>
            <div className="boss_btnContainer">
                <div className="noDrag" onClick={()=>{props.close()}}>취소</div>
                <div className="noDrag" onClick={()=>{insertOne()}}>생성</div>
            </div>
        </div>
    </div>
)}

export default BossModal_Create;
    