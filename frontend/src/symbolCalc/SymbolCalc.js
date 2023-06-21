import "./SymbolCalc.css"
import Pageheader from '../Pageheader';
import Symbol from './Symbol';
import Mission from './Mission';
import calculate from "./calculate";
import { useState } from 'react';

function SymbolCalc(){

let [vj,setVj] = useState( { lv:0, val:0, gain:0});
let [ccisland,setCcisland] = useState( { lv:0, val:0, gain:0});
let [lachelein,setLachelein] = useState( { lv:0, val:0, gain:0});
let [arcana,setArcana] = useState( { lv:0, val:0, gain:0});
let [morass,setMorass] = useState( { lv:0, val:0, gain:0});
let [esfera,setEsfera] = useState( { lv:0, val:0, gain:0});
let [cernium,setCernium] = useState( { lv:0, val:0, gain:0});
let [arcus,setArcus] = useState( { lv:0, val:0, gain:0});
let [odium,setOdium] = useState( { lv:0, val:0, gain:0});

let [vjActive,setVjActive] = useState( false );
let [ccislandActive,setCcislandActive] = useState( false );
let [lacheleinActive,setLacheleinActive] = useState( false );
let [arcanaActive,setArcanaActive] = useState( false );
let [morassActive,setMorassActive] = useState( false );
let [esferaActive,setEsferaActive] = useState( false );
let [cerniumActive,setCerniumActive] = useState( false );
let [arcusActive,setArcusActive] = useState( false );
let [odiumActive,setOdiumActive] = useState( false );

let [missionActive_vj,setMissionActive_vj] = useState( false );
let [missionActive_cc,setMissionActive_cc] = useState( false );
let [missionActive_lachelein,setMissionActive_lachelein] = useState( false );
let [missionActive_arcana,setMissionActive_arcana] = useState( false );
let [missionActive_morass,setMissionActive_morass] = useState( false );
let [missionActive_esfera,setMissionActive_esfera] = useState( false );


let [arcGoal, setArcGoal] = useState("");
let [autGoal, setAutGoal] = useState("");
let [arcReqLvUp, setArcReqLvUp] = useState(0);
let [autReqLvUp, setAutReqLvUp] = useState(0);
let [기타수치,set기타수치] = useState(0);


let countArcSymbols = ()=>{
    let symbols = 0;
    if( vj.lv > 0 ) symbols++;
    if( ccisland.lv > 0 ) symbols++;
    if( lachelein.lv > 0 ) symbols++;
    if( arcana.lv > 0 ) symbols++;
    if( morass.lv > 0 ) symbols++;
    if( esfera.lv > 0 ) symbols++;
    return symbols;
}
let countAutSymbols = ()=>{
    let symbols = 0;
    if( cernium.lv > 0 ) symbols++;
    if( arcus.lv > 0 ) symbols++;
    if( odium.lv > 0 ) symbols++;
    return symbols;
}

let totalArcLev = parseInt(vj.lv) + parseInt(ccisland.lv) + parseInt(lachelein.lv) + parseInt(arcana.lv) + parseInt(morass.lv) + parseInt(esfera.lv);
let arcaneForce = countArcSymbols()*20 + totalArcLev*10 + parseInt(기타수치);
let arcaneStat = countArcSymbols()*200 + totalArcLev*100;

let totalAutLev = parseInt(cernium.lv) + parseInt(arcus.lv) + parseInt(odium.lv);
let authenticForce = totalAutLev*10 ;
let authenticStat = countAutSymbols()*300 + totalAutLev*200;

let [arcGoalVal,setArcGoalVal] = useState(0);

let calArcLvUps = (val,type)=>{
    var result = 0;
    if( type == "force"){
        let req = val - arcaneForce ;
        result = Math.ceil(req/10);
    }
    if( type=="stat"){
        let req = val - arcaneStat;
        result = Math.ceil(req/100);
    }
    if( type=="master"){
        result = 120 - totalArcLev;
    }
    return result;
}

let calAutLvUps = (val,type)=>{
    var result = 0;
    if( type == "force"){
        let req = val - authenticForce ;
        result = Math.ceil(req/10);
    }
    if( type=="stat"){
        let req = val - authenticStat;
        result = Math.ceil(req/200);
    }
    if( type=="master"){
        result = 33 - totalAutLev;
    }
    return result;
}

return (
    <div className="SymbolCalc">
            <Pageheader 
            title ="심볼 계산기 (업데이트 중)"
            description = "아케인/어센틱 심볼의 수치를 바탕으로 레벨업 소요기간을 계산합니다."
            icon = "symbol_h"/>
        <div className="page_container flex half">
            <div className="page_section half">
                <div className="page_div">
                    <span className = "page_section_title">아케인심볼</span>
                    <span className = "page_section_description">보유중인 아케인심볼을 선택 후 레벨, 성장치, 일일 수급량을 입력합니다.</span>
                    <Symbol name = "vj" set = {setVj} symbol = {vj} active = {vjActive} setActive = {setVjActive}/>
                    <Symbol name = "ccisland" set = {setCcisland} symbol = {ccisland} active = {ccislandActive} setActive = {setCcislandActive}/>
                    <Symbol name = "lachelein" set = {setLachelein} symbol = {lachelein} active = {lacheleinActive} setActive = {setLacheleinActive}/>
                    <Symbol name = "arcana" set = {setArcana} symbol = {arcana} active = {arcanaActive} setActive = {setArcanaActive} />
                    <Symbol name = "morass" set = {setMorass} symbol = {morass} active = {morassActive} setActive = {setMorassActive} />
                    <Symbol name = "esfera" set = {setEsfera} symbol = {esfera} active = {esferaActive} setActive = {setEsferaActive} />
                </div>
                <div className="page_div">
                    <span className = "page_section_title">주간퀘스트</span>
                    <span className = "page_section_description">아케인리버 지역의 주간퀘스트 진행 여부를 입력합니다. <br/>현재 기준 7일마다 실행하는것으로 간주합니다.</span>
                    <Mission name = "vj" active = {missionActive_vj} setActive = {setMissionActive_vj}/>
                    <Mission name = "ccisland" active = {missionActive_cc} setActive = {setMissionActive_cc}/>
                    <Mission name = "lachelein" active = {missionActive_lachelein} setActive = {setMissionActive_lachelein}/>
                    <Mission name = "arcana" active = {missionActive_arcana} setActive = {setMissionActive_arcana} />
                    <Mission name = "morass" active = {missionActive_morass} setActive = {setMissionActive_morass} />
                    <Mission name = "esfera" active = {missionActive_esfera} setActive = {setMissionActive_esfera} />
                    
                </div>
                <div className="page_div">
                    <span className = "page_section_title">기타 추가 수치</span>
                    <span className = "page_section_description">길드스킬, 하이퍼스탯, 칭호, PC방훈장 등 외부에서 얻는 포스 수치를 합산 후 입력합니다.</span>
                    <input type="number" className="defense_input number" 
                            step="10" placeholder='추가 수치'
                            onChange = { (e)=>{set기타수치(e.target.value)}}
                            />
                </div>
            </div>
            
            <div className="page_section half">

                <div className="page_div">
                    <span className = "page_section_title">현재수치</span>
                    <span className = "page_section_paragraph">
                        아케인포스 : {arcaneForce}<br/>
                        주스탯 : {arcaneStat}
                    </span>
                </div>
                <div className="page_div">
                    <span className = "page_section_title">목표 설정</span>
                    <span className = "page_section_description">레벨 또는 주스탯, 포스 등 목표치를 설정합니다.</span>
                    <div 
                        className = {`symbolCalc_option ${arcGoal=="force"?"selected":""} noDrag`}
                        onClick={()=>{ setArcGoal(arcGoal=="force"?"":"force"); setArcReqLvUp(0) 
                    }}>
                        <span>포스</span>
                    </div>
                    <div 
                        className = {`symbolCalc_option ${arcGoal=="stat"?"selected":""} noDrag`}
                        onClick={()=>{ setArcGoal(arcGoal=="stat"?"":"stat"); setArcReqLvUp(0) 
                    }}>
                        <span>주스탯</span>
                    </div>
                    <div 
                        className = {`symbolCalc_option ${arcGoal=="master"?"selected":""} noDrag`}
                        onClick={()=>{ 
                            setArcGoal(arcGoal=="master"?"":"master")
                            setArcReqLvUp(arcGoal=="master"? 0: calArcLvUps(120,"master") )
                        }}>
                        <span>만렙</span>
                    </div>

                <span className = "page_section_description">
                    {   arcGoal == "force"? "목표 아케인포스 ":""}
                    {   arcGoal == "stat"? "목표 주스탯 상승치 (제논,데벤 ㅈㅅ) ":""}
                    {   arcGoal == "master"?"아케인심볼 만렙달성 ":""}
                    {   arcGoal == ""?"목표를 선택해주세요.":"까지의 레벨업을 계산합니다."}
                </span>

                    {   arcGoal == "force" ?
                        <input type="number" className="defense_input number" 
                        step="10" placeholder='목표 수치'
                        onChange ={ (e)=>{ setArcGoalVal(e.target.value); } }/>:""
                    }
                    {   arcGoal == "stat" ?
                        <input type="number" className="defense_input number" 
                                step="100" placeholder='목표 수치'
                                onChange ={ (e)=>{ setArcGoalVal(e.target.value); setArcReqLvUp( calArcLvUps(e.target.value,arcGoal) ) } }
                                />:""
                    }

                    { arcGoal!="" && ( calArcLvUps(arcGoalVal,arcGoal) ) > 0
                        ?<span className="page_section_description">{`목표치까지 ${( calArcLvUps(arcGoalVal,arcGoal) ) }레벨 업 남음`}</span>
                        :""}
                </div>
                <div className="page_div">
                    <span className = "page_section_title">결과</span>
                    <span className = "page_section_description">목표 달성까지의 최단 과정을 표시합니다.</span>
                    <div className = "symbolCalc_result">
                        { calculate([vj,ccisland,lachelein,arcana,morass,esfera],calArcLvUps(arcGoalVal,arcGoal),"arcane").result
                            .map( (index)=>{
                                return(
                                    <div>
                                        <span className={`region ${index.region}`}>{index.region}</span>
                                        <span className="lv">{index.lv}레벨 달성</span>
                                        <span className="info">
                                            ( {index.lvUps}레벨업, {index.durTime}일 소요 )
                                            </span>
                                    </div>
                                )
                            })
                        }
                        { calculate([vj,ccisland,lachelein,arcana,morass,esfera],calArcLvUps(arcGoalVal,arcGoal),"arcane").status
                            ?""
                            : <span className="alert">목표 레벨업 수치를 달성 할 수 없습니다.</span>
                        }
                    </div>

                </div>
            </div>
        </div>

        <div className="page_container flex half">
            <div className="page_section half">
                <div className="page_div">
                    <span className = "page_section_title">어센틱심볼</span>
                    <span className = "page_section_description">보유중인 어센틱심볼을 선택 후 레벨, 성장치, 일일 수급량을 입력합니다.</span>
                    
                    <Symbol name = "cernium" set = {setCernium} symbol = {cernium} active = {cerniumActive} setActive = {setCerniumActive} />
                    <Symbol name = "arcus" set = {setArcus} symbol = {arcus} active = {arcusActive} setActive = {setArcusActive} />
                    <Symbol name = "odium" set = {setOdium} symbol = {odium} active = {odiumActive} setActive = {setOdiumActive} />

                </div>
                <div className="page_div">
                    <span className = "page_section_title">현재수치</span>
                    <span className = "page_section_paragraph">
                        어센틱포스 : {authenticForce} <br/>
                        주스탯 : {authenticStat}
                    </span>
                </div>
            </div>
            
            <div className="page_section half">
                <div className="page_div">
                    <span className = "page_section_title">목표 설정</span>
                    <span className = "page_section_description">레벨 또는 주스탯, 포스 등 목표치를 설정합니다.</span>

                    <div className = {`symbolCalc_option ${autGoal=="force"?"selected":""} noDrag`}
                        onClick={()=>{ setAutGoal( autGoal=="force"?"":"force" ) }}>
                        <span>포스</span>
                    </div>
                    <div className = {`symbolCalc_option ${autGoal=="stat"?"selected":""} noDrag`}
                        onClick={()=>{ setAutGoal( autGoal=="stat"?"":"stat" ) }}>
                        <span>주스탯</span>
                    </div>
                    <div className = {`symbolCalc_option ${autGoal=="master"?"selected":""} noDrag`}
                        onClick={()=>{ 
                            setAutGoal( autGoal=="master"?"":"master" )
                            setAutReqLvUp( autGoal=="master"? 0: calAutLvUps(33,"master") )
                        }}>

                        <span>만렙</span>
                    </div>

                <span className = "page_section_description">
                    {   autGoal == "force"? "목표 어센틱포스 ":""}
                    {   autGoal == "stat"? "목표 주스탯 상승치 (제논,데벤 ㅈㅅ) ":""}
                    {   autGoal == "master"?"어센틱심볼 만렙달성 ":""}
                    {   autGoal == ""?"목표를 선택해주세요.":"까지의 레벨업을 계산합니다."}
                </span>

                    {   autGoal == "force" ?
                        <input type="number" className="defense_input number" 
                        step="10" placeholder='목표 수치'
                        onChange ={ (e)=>{ setAutReqLvUp( calAutLvUps(e.target.value,autGoal) ) } }/>:""
                    }
                    {   autGoal == "stat" ? 
                        <input type="number" className="defense_input number" 
                                step="100" placeholder='목표 수치'
                                onChange ={ (e)=>{ setAutReqLvUp( calAutLvUps(e.target.value,autGoal) ) } }
                                />:""
                    }

                    {autReqLvUp > 0
                        ?<span className="page_section_description">{`목표치까지 ${autReqLvUp}레벨 업 남음`}</span>
                        :""}
                </div>
                <div className="page_div">
                    <span className = "page_section_title">결과</span>
                    <span className = "page_section_description">목표 달성까지의 최단 과정을 표시합니다.</span>
                    <div className = "symbolCalc_result">
                        { calculate([cernium,arcus,odium],autReqLvUp,"authentic").result
                            .map( (index)=>{
                                return(
                                    <div>
                                        <span className={`region ${index.region}`}>{index.region}</span>
                                        <span className="lv">{index.lv}레벨 달성</span>
                                        <span className="info">
                                            ( {index.lvUps}레벨업, {index.durTime}일 소요 )
                                            </span>
                                    </div>
                                )
                            })
                        }
                        { calculate([cernium,arcus,odium],autReqLvUp,"authentic").status
                            ?""
                            : <span className="alert">목표 레벨업 수치를 달성 할 수 없습니다.</span>
                        }
                    </div>

                </div>
            </div>
        </div>
        <div className="page_footer"/>
    </div>
)}
export default SymbolCalc;