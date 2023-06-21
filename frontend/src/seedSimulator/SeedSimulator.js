import "./SeedSimulator.css"
import Pageheader from '../Pageheader';
import { useState } from 'react';
import simulate from "./simulate";

function SeedSimulator(){

let [result,setResult] = useState({name: "", id: "", special: false, type: "", effect: ""});
let [list,setList] = useState([]);
let [fade,setFade] = useState(true);
let [showTooltip,setShowTooltip] = useState(false);

let fadeIn = ()=>{
    setFade(false);
    setTimeout( ()=>setFade(true) , 1 )
}
let addList = (ring)=>{
    let vlist = [...list];
    vlist.unshift(ring);
    if( vlist.length > 80) { vlist.pop() };
    setList(vlist);
}
let parseClass = (type)=>{
    if (type == "1급") return "box_1st"
    if (type == "2급") return "box_2nd"
    if (type == "숨반상") return "box_h"
    if (type == "빛반상") return "box_s"
}

    return (
        <div className="seedSimulator">
             <Pageheader 
                title ="시드상자 시뮬레이터"
                description = "시드 보상 상자를 가상으로 개봉합니다. 보상은 리부트 서버 기준으로 설정 되어 있습니다."
                icon = "ring_h"/>
            

            <div className="page_container">
                <span className = {"page_section_title "+`fade${fade}`}>
                    { result.name == "" ? "개봉할 상자를 선택하세요": 
                            `${result.name} 획득 !`
                        }
                </span>
            </div>
            <div className="page_container">
                <div className="page_div">
                    <div className = {`seedSim_showBox ${result.special?"special":""}`}>
                        { result.name == "" ? <></>: 
                            <div className = { `fade${fade}`}>
                            <div className = "seedSim_icon" onMouseOver={()=>{setShowTooltip(true)}} onMouseOut={()=>{setShowTooltip(false)}}>
                                <img className = "seedSim_reward" src={`./assets/item/item_seed_${result.id}.webp`}/>
                            </div>   
                            <span className = "seedSim_result">{result.name}</span>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className = {`seedSim_toolTip ${showTooltip}`}> 
                {result.effect == "" 
                    ?<></>
                    :<span>{result.effect}</span>
                }
            </div>
 
            <div className="page_container">
                <div className = "seedSim_option noDrag"
                    onClick={()=>{
                        let result = simulate("1급");
                        setResult(result);
                        fadeIn();
                        addList(result);
                    }
                }>
                    <div className = "seedSim_icon box_1st"/>
                    <span>1급상자</span>
                </div>

                <div className = "seedSim_option noDrag"
                    onClick={()=>{
                        let result = simulate("2급");
                        setResult(result);
                        fadeIn();
                        addList(result);
                    }
                }>
                    <div className = "seedSim_icon box_2nd"/>
                    <span>2급상자</span>
                </div>

                <div className = "seedSim_option noDrag"
                    onClick={()=>{
                        let result = simulate("숨반상");
                        setResult(result);
                        fadeIn();
                        addList(result);
                    }
                }>
                    <div className = "seedSim_icon box_h"/>
                    <span>숨반상</span>
                </div>

                <div className = "seedSim_option noDrag"
                    onClick={()=>{
                        let result = simulate("빛반상");
                        setResult(result);
                        fadeIn();
                        addList(result);
                    }
                }>
                    <div className = "seedSim_icon box_s"/>
                    <span>빛반상</span>
                </div>
            </div>
            <div className="page_container">
                <div className = "seedSim_resultList">
                    {list.map( (index)=>{ return (
                        <span className={`seedSim_resultItems ${index.special?"special":""}`}>
                            <span className={`seedSim_resultType noDrag ${parseClass(index.type)}`}>{index.type}</span>
                            {index.name}
                        </span>
                    )})}
                </div>
            </div>
            <div className="page_footer"/>
        </div>
    )}
export default SeedSimulator;