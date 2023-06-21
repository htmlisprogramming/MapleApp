import { useState } from 'react';

function Mission(props){







    return (
        <div className="symbolCalc_mission_div noDrag" >
            <div className = {`symbolCalc_mission ${props.name} ${props.active?"":"disabled"} pointer`}
                onClick = {()=>{props.setActive(!props.active);}}
                /> 
            <div className = {`symbolCalc_mission_description ${props.active?"":"disabled"} pointer`}
                onClick = {()=>{props.setActive(!props.active);}}
            >
                {props.name=="vj"?"에르다 스펙트럼":""}
                {props.name=="ccisland"?"배고픈 무토":""}
                {props.name=="lachelein"?"미드나잇 체이서":""}
                {props.name=="arcana"?"스피릿 세이비어":""}
                {props.name=="morass"?"엔하임 디펜스":""}
                {props.name=="esfera"?"프로텍트 에스페라":""}
            </div>
            <input type={`checkbox`}  className = {`${props.active?"":"displayNone"}`}disabled = {!props.active} ></input>
            <div className = {`symbolCalc_mission_description ${props.active?"":"displayNone"}`}>
                금주 클리어여부
            </div>
        </div>
    )
}

export default Mission;