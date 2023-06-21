import Pageheader from '../Pageheader';
import "./DefenseIgnore.css"
import { useState } from 'react';

function DefenseIgnore(){

let [ignorance, setIgnorance] = useState(0);
let [list, setList] = useState([0]);
let [prompt,setPrompt] = useState("");
let [defRate,setDefRate] = useState(300);

let addList = ()=>{
    let vlist = [...list];
    vlist.push(0);
    setList(vlist);
}
let subList = ()=>{
    let vlist = [...list];
    vlist.pop();
    setList(vlist);
    }
let updateList = (input, i)=>{
    let vlist = [...list];
    vlist[i] = input;
    setList(vlist);
}
let makeList = (input, i)=>{
    let vlist = [...list];
    vlist[i] = input;
    return vlist;
}
let updatePrompt = ( ignorance, list )=>{
    var str = "";
    str += ignorance + " ";
    list.forEach( index => str += index + " ");
    setPrompt(str);
}
let parsePrompt = (input)=>{
    const args = input.split(" ");
    setIgnorance(args.shift());
    args.forEach( (index, i) =>{ 
        if(index == "") args.splice(i,1)
    }) // 배열에서 공백 삭제
    setList(args);
} 

let calculate = ( ignorance, list ) => {
    let defense = 1;
    defense *= ( 1 - ignorance / 100 );
    list.forEach((index , i )=>{
        defense *= ( 1 - index / 100 );
    })
    defense = Math.round((1 - defense) * 100 * 100) / 100 //소수에서 백분율로 나타내기
    return defense;
}

let dmgrate = ( monster , current ) => {
    let result = 100 - (monster - (monster * current / 100));
    result = Math.round(result* 100) / 100    
    return result < 0 ? 0 : result;
}


    return (
        <div className="DefenseIgnore">
            <Pageheader 
                title ="방어율무시 계산기"
                description = "현재와 추가 방무수치에 대한 결과와 보스에게 적용되는 실 데미지를 계산합니다."
                icon = "defense_h"/>
                
            <div className='page_container flex half'>
                <div className="page_section half">
                    <div className="page_div">
                        <span className = "page_section_title">현재 방무 수치 </span>
                        <span className = "page_section_description">현재 스탯창에 보이는 방무 수치를 입력합니다.</span>
                        <input type="number" className="defense_input number" 
                            step="1" placeholder='스탯창 방무'
                            onInput={(e)=>{setIgnorance(e.target.value); updatePrompt(e.target.value,list); }} value = { ignorance === 0 ? "" : ignorance }/>
                    </div>
                    <div className="page_div">
                        <span className = "page_section_title">추가 방무 수치</span>
                        <span className = "page_section_description">현재 스탯창에 보이는 방무 수치를 입력합니다.</span>
                        <div className="defense_plusBtn noDrag" onClick={ ()=>addList() } >추가하기</div>
                        <div className="defense_plusBtn noDrag" onClick={ ()=>subList() } >삭제하기</div>
                        
                        {list.map( (index,i)=>{return(
                            <input type="number" className="defense_input number" key={i}
                                step="1" placeholder={'추가 방무 '+(i+1)}
                                onInput={(e)=>{ updateList(e.target.value,i); updatePrompt(ignorance, makeList(e.target.value,i)); }} value = { list[i] === 0 ? "" : list[i] }/>
                            )})}
                    </div>
                    <div className="page_div">
                        <span className = "page_section_title">프롬프트 입력</span>
                        <span className = "page_section_description">전체 방무를 명령어로 입력합니다, 방무수치는 공백으로 구분합니다.</span>
                        <input type="text" className="defense_input text" 
                            placeholder='ex) 12.3 4 5 6' 
                            onInput={(e)=>{ parsePrompt(e.target.value); setPrompt(e.target.value) }} value={prompt}/>
                    </div>
                </div>
                <div className="page_section half">
                    <div className="page_div">
                        <span className = "page_section_title">결과 수치</span>
                        <span className = "page_section_description">입력된 방무수치와 추가수치에 따른 결과수치를 나타냅니다.</span>
                        
                        <input type="number" className="defense_input number" readOnly
                            step="1" placeholder='수치를 입력하세요' 
                            value = { calculate(ignorance,list) === 0 ? "" : calculate(ignorance,list)}  />
                        {/* <span className = "page_section_description">
                            {Math.round((calculate(ignorance,list)-ignorance) *100)/100} 증가.
                        </span> */}
                    </div>
                    <div className="page_div">
                        <span className = "page_section_title">방무 효율</span>
                        <span className = "page_section_description">현 방무수치를 기반으로, 보스에게 적용되는 실 데미지를 나타냅니다.</span>
                        <input type="number" className="defense_input number" placeholder='보스방어율 (300)'
                            onInput={(e)=> setDefRate(e.target.value) } value = { defRate === 300 ? "" : defRate }/>
                    </div>
                    <div className="page_div">
                        <div id="defense_dmg_frame">
                            <div id = "defense_dmg_graph" className ={`${dmgrate( defRate, calculate(ignorance,list) ) >= 70 ? "enough" : "e"}`} style={{ 'height': `${dmgrate( defRate, calculate(ignorance,list) )}%`}}>
                                    <img id="defense_dmg_img" src={`assets/animation/${dmgrate( defRate, calculate(ignorance,list) ) >= 70 ? "velum_bind.png" : "velum.gif"}` }></img>
                                <span className = "defense_dmg_rate">
                                    {
                                        dmgrate(calculate(ignorance,list)) > 0
                                        ?"수치를 입력하세요"
                                        :`실제 데미지의 ${dmgrate( defRate, calculate(ignorance,list) )}%`
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='page_container'>
                <div className="page_section full">
                    <div className="page_div">
                        <span className = "page_section_title">방어율무시란?</span>
                        <img id="velum" src="assets/animation/velum.gif"></img>
                        <span className = "page_section_paragraph">
                            '방어율'이란 플레이어가 몬스터에게 가한 데미지 중 일부를 감소시키는 비율이며,
                            <br/>
                            실제로는 몬스터가 몇 퍼센트의 데미지를 입는지 결정합니다.
                            <br />
                            몬스터의 방어율이 100% 이상일 때, 플레이어가 방어율을 무시할수 없으면 이때,
                            <br />
                             플레이어는 몬스터에게 데미지를 입힐 수 없습니다.
                            <br />
                            이러한 '방어율'을 가진 몬스터를 공격할 때, '방어율'을 감소시키고 실제 데미지를 증가시키는 스탯을 '몬스터 방어율 무시'라고 합니다.
                        </span>
                    </div>
                </div>
            </div>
            <div className="page_footer"/>
        </div>
    )}
export default DefenseIgnore;