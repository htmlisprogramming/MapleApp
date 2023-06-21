import { useState } from 'react';

function Symbol(props){

let [lv,setLv] = useState( props.symbol.lv )
let [val,setVal] = useState( props.symbol.val )
let [gain,setGain] = useState( props.symbol.gain )

let setDisabled = (isDisabled)=>{
    let symbol = {};
    if( isDisabled ){
        symbol = {
            lv: 0,
            val: 0,
            gain: 0
        }
    }else{
        symbol = {
            lv: lv,
            val: val,
            gain: gain
        }
    }
    props.set(symbol);
}
let isGrandis = props.name == "arcus" || props.name == "odium";


    return (
        <div className="symbolCalc_div">
            <div className = {`symbolCalc_icon ${props.name} ${props.active?"":"disabled"} pointer noDrag`}
                onClick = {()=>{props.setActive(!props.active); setDisabled(props.active);}}
            />
            <input type="number" className={`symbolCalc_input number ${props.active?"":"disabled"}`}
                    step="1" placeholder='레벨'
                    onInput = { (e)=>{ 
                        setLv( e.target.value>0 ? e.target.value : 0); 
                        props.set({
                            lv: e.target.value>0 ? e.target.value : 0,
                            val: val,
                            gain: gain}) 
                    }}
                    disabled = {!props.active}
                    />
            <input type="number" className={`symbolCalc_input number ${props.active?"":"disabled"}`}
                    step="1" placeholder='성장치'
                    onInput = { (e)=>{ 
                        setVal(e.target.value>0?e.target.value:0); 
                        props.set({
                            lv: lv,
                            val: e.target.value>0 ? e.target.value : 0,
                            gain: gain}) 
                    }}
                    disabled = {!props.active}
                    />
            <input type="number" className={`symbolCalc_input number ${props.active?"":"disabled"}`}
                    step="1" placeholder='수급량'
                    onInput = { (e)=>{ 
                        setGain(e.target.value>0?e.target.value:0);  
                        props.set({
                            lv: lv,
                            val: val,
                            gain: e.target.value>0 ? e.target.value : 0}) 
                    }}
                    disabled = {!props.active}
                    />
        </div>
    )
}

export default Symbol;