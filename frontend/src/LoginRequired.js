import { useState, KeyboardEvent  } from "react";
import axios from 'axios';

function LoginRequired(props){

let [inputId,setInputId] = useState("");
let [inputPw,setInputPw] = useState("");
let [loginFailed,setLoginFailed] = useState(false);

const handleKeyPress = e => {
    if (e.key === 'Enter') {
        tryLogin(inputId,inputPw);
    }
};

const tryLogin = (inputid,inputpw)=>{
    axios.post('http://www.maplesteam.kro.kr/login', {id:inputid, pw:inputpw})
    .then( result => { props.setLogin(true); props.setId(inputid)})
    .catch( err => setLoginFailed(true) )
  
}

return (
        <div className="LoginRequired">
            <span>Login Required</span>
            <img src="./assets/character/cry.png" alt=""/>
            <span>
                해당 기능은 Database를 사용하므로,
                사용을 위해 계정 로그인이 필요합니다.
            </span>
            <input type="text" placeholder="ID" onInput={(e)=>{setInputId(e.target.value)}} onKeyPress={handleKeyPress} />
            <input type="password" placeholder="Password" onInput={(e)=>{setInputPw(e.target.value)}} onKeyPress={handleKeyPress} />
            <div className="noDrag" 
                onClick={()=>{tryLogin(inputId,inputPw)}} 
                onKeyPress={handleKeyPress}>
                Login
            </div>
            {loginFailed ? <span>로그인 정보가 올바르지 않습니다.</span>:""}
        </div>
    )}
export default LoginRequired;