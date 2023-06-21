import Pageheader from '../Pageheader';
import StarforceCount from './StarforceCount';
import "./StarforceSimulator.css"
import { useState } from 'react';

function StarforceSimulator(){

let [ resultState, setResultState ] = useState(0);
let [ animationSrc, setAnimationSrc ] = useState("");

let [limit, setLimit] = useState();
let [starForce, setStarForce] = useState(0);
let [event, setEvent] = useState("");
let [failStreak, setFailStreak] = useState(0);
let [chanceTime, setChanceTime] = useState(false);
let [protect, setProtect] = useState(false);
let [destroyed, setDestroyed] = useState(false);
let [totalMeso, setTotalMeso] = useState(0);

let chanceList = [ 95,90,85,85,80, 75,70,65,60,55, 50,45,40,35,30, 30,30,30,30,30, 30,30,3,2,1, 0 ]
let breakChance = [ 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 2.1,2.1,2.1,2.8,2.8, 7.0,7.0,19.4,29.4,39.6, 0]
let statTable = [ 2,2,2,2,2, 3,3,3,3,3, 3,3,3,3,3, 15,15,15,15,15, 15,15,0,0,0, 0 ]
let attackTable = [ 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 12,13,14,15,16 ,17,19,21,23,25, 0 ]

let mesoTable = [
    321000,
    641000,
    961000,
    1281000,
    1601000,
    1921000,
    2241000,
    2561000,
    2881000,
    3201000,
    12966500,
    16400100,
    20356300,
    24865300,
    29956500,
    71316500,
    83999600,
    98016700,
    113422300,
    130270000,
    148612400,
    168501500,
    189988600,
    213124000,
    237957700,
    0
]

if(event == "1516"){
    chanceList[5] = 100;
    chanceList[10] = 100;
    chanceList[15] = 100;
}

let gamble = (chance)=>{
    let ran = Math.floor(Math.random() * (10000)) / 100
    return ran <= chance;
}

let getResult = (starForce)=>{
    if(starForce < 25){
        var state = getState(starForce, protect);
        if( gamble(chanceList[starForce]) || chanceTime ){ // 확률을 뚫거나 찬스타임일때는 성공
            if( event == "1+1" && starForce == 10 ) showResult(1, 2)
            else showResult(1, 1)
            setFailStreak(0)
        }
        else{ // 못뚫으면 실패
            if( gamble(breakChance[starForce]) && !protect ){ // 확률을 뚫고, 파방설정이 안되어있으면 파괴
                showResult(3, 0) // 파괴
            }else{ // 파괴 아니면
                if( !state.dropable ){ // 실패시 하락이 아닌경우
                    showResult(2, 0)

                }else{ //실패시 하락인경우
                    showResult(2, -1) // 이외엔 그냥 하락
                    setFailStreak( 1 );

                }
            }
        }
    }
}

let getState = (starForce, protect )=>{ // 메시지창에 출력을위한 강화결과 상태를 반환하는 함수
    let result = { dropable: false, breakable: false };
    // 실패시 하락,유지여부 파괴,비파괴여부
    if( starForce <= 15 || starForce == 20){ // 완충구간인경우
        result.dropable = false; //10이하, 15, 20에선 하락 x
    }else{
        result.dropable = true;
    }
    if( breakChance[starForce] > 0 && !protect ){ // 12성 이후부터는 파괴방지가 없으면 강화실패시 파괴 가능
        result.breakable = true;
    }
    return result;
}

let showResult = (state, increment)=>{
    let src = ["../assets/animation/Effect_Success.gif","../assets/animation/Effect_Fail.gif","../assets/animation/Effect_Destroy.gif"]
    setResultState(state); // 애니메이션 상태변수 설정
    setAnimationSrc(src[state - 1]) 
    setTimeout(()=>{
        setAnimationSrc("");
        setResultState(0)
        setStarForce( starForce + increment );
        setDestroyed(false);
        setTotalMeso( (protect&&!chanceTime&&starForce>11&&starForce<17) ?  totalMeso + mesoTable[starForce]*2:  totalMeso + mesoTable[starForce] ) // 파방걸려있으면 메소 2배
        if(state == 1) {
            setChanceTime(false)  // 성공했으면 찬스타임 해제
        }
        if(state == 2) {
            if( failStreak >= 1 && increment == -1 ) { setChanceTime(true); }; // 2연속 하락하면 찬스타임 발동
        }
        if(state == 3) {
            setStarForce(12); // 파괴면 12성으로
            setFailStreak(0)
            setDestroyed(true);
        }
    }
        , 1100
    )
}

    return (
        <div className="starSimulator">
            <Pageheader 
                title ="스타포스 시뮬레이터 (업데이트중)"
                description = "스타포스 강화를 가상환경에서 실행합니다."
                icon = "star_h"/>
                
            <div className="page_container">

                <span className = "page_section_title ">
                    
                    { starForce < 25 && !destroyed && !chanceTime && !getState(starForce, protect).dropable && !getState(starForce,protect).breakable
                    ?<><span className="plus">메소</span>를 사용하여 장비를 강화합니다</>
                    :""
                    }

                    { starForce < 25 && !destroyed && !chanceTime && getState(starForce, protect).dropable && !getState(starForce,protect).breakable
                    ?<>실패 시 <span className="plus">강화 단계</span>가 <span className="plus">하락</span>됩니다.</>
                    :""
                    }

                    { starForce < 25 && !destroyed && !chanceTime && !getState(starForce, protect).dropable && getState(starForce,protect).breakable
                    ?<>실패 시 장비가 <span className="plus">파괴</span>될 수 있습니다.</>
                    :""
                    }
                    
                    { starForce < 25 && !destroyed && !chanceTime && getState(starForce, protect).dropable && getState(starForce,protect).breakable
                    ?<>실패 시 장비가 <span className="plus">파괴</span>되거나 <span className="plus">단계</span>가 <span className="plus">하락</span>될 수 있습니다.</>
                    :""
                    }
                    { starForce < 25 && !destroyed && chanceTime
                    ? <span className="star_chancetime"> CHANCE TIME!! </span>
                    : ""
                    }
                    { starForce < 25 && destroyed
                    ?<>강화에 <span className="destroyed">실패</span>하여 장비가 <span className="destroyed">파괴</span>되었습니다.</>
                    : ""
                    }
                    { starForce >= 25
                    ? <span className="star_chancetime"> 축하합니다!! 25성 달성!!</span>
                    : ""
                    }

                </span>

                <div className={"starSim_item"}>
                    <img src={`./assets/item/item_endlessTerror.webp`} className ={`starSim_itemImg ${destroyed?"destroyed":""}`}/>
                </div>

                <StarforceCount limit = "25" val = {starForce}/>

                <div className = {`starSim_toolTip`}> 
                    <div>
                        {starForce < 25 
                        ?
                        <span> {starForce}성 ＞ {starForce + 1}성</span>
                        :
                        <span> {starForce}성</span>
                        }
                    </div>
                    <br/>
                    <div>
                        <span>공격력: <span className="plus">+{attackTable[starForce]}</span></span>
                            <br/>
                        <span>올스탯: <span className="plus">+{statTable[starForce]}</span></span>
                    </div>
                    <br/>
                    <div>
                        <span>성공확률: <span className="plus">{ chanceTime ? 100 : chanceList[starForce]}% </span></span><br/>

                        { chanceTime || chanceList[starForce] == 100 
                        ? <><span></span><br/></>
                        : <><span> {"실패확률:"} <span className="plus"> {`${starForce < 25 ?100 - chanceList[starForce] :0}%`}  </span></span><br/></>
                        }
                        { chanceTime || chanceList[starForce] == 100 
                        ? <><span></span><br/></>
                        : <><span> {"파괴확률:"} <span className="plus"> {`${( protect&&starForce>=12&&starForce<17 )?0:breakChance[starForce]}%`}  </span></span><br/></>
                        }
                    </div>
                    <br/>
                    <div>
                        <span> 강화비용: <span className="plus">{ ((protect&&!chanceTime&&starForce>=12&&starForce<17)?mesoTable[starForce]*2:mesoTable[starForce]).toLocaleString('ko-KR') }</span></span>
                    </div>
                    <br/>
                    <div className="starSim_meso">
                        <img src="./assets/icon/icon_meso.png" /> 
                        <span >{totalMeso.toLocaleString('ko-KR')}</span>
                    </div>
                </div>
            </div>
            <div className="page_container">
                <span><input type="checkbox" /> 스타캐치 </span>
                <span> <input type="checkbox" onChange={(e)=>{ setProtect(e.target.checked) }} /> 파괴방지</span>
                <div className = "starSim_btn noDrag" onClick={ ()=>{ getResult(starForce) } }>강화하기</div>
                {/* 
                <div className = 'starSim_info'>
                    <div className = 'starSim_option'>
                    <input type="radio"/>
                        <span> 10성 이하에서 강화 시 1+1</span>
                    </div>
                    <div className = 'starSim_option'>
                    <input type="radio"/>
                        <span> 강화 비용 30% 할인</span>
                    </div>
                    <div className = 'starSim_option'>
                    <input type="radio"/>
                        <span> 5, 10, 15성에서 강화 시 성공확률 100%</span>
                    </div>
                    <div className = 'starSim_option'>
                        <input type="radio"/>
                        <span> 샤이닝 스타포스</span>
                    </div>
                </div> 
                */}
            </div>

            {
                resultState >= 1
                ?
                <div id="starSim_effect" className="noDrag">
                    <img src = {animationSrc}></img>
                </div>
                :<></>
            }


            <div className="page_footer"/>
        </div>
    )}
export default StarforceSimulator;