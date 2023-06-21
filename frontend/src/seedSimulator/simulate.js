const rank1st = require("./ringbox1st.json");
const rank2st = require("./ringbox2st.json");
const hidden = require("./ringboxHd.json");
const shiny = require("./ringboxBr.json");
const ringManual = require("./ringlist.json");

function range(i,ringlist){ // 리스트내 해당 인덱스번호의 반지까지의 확률수치를 모두 합하여
    var result = 0 ;
    for (let j = 0; j<=i; j++){
        result+=ringlist[j].chance;
    }
    return result; // 해당 반지의 확률범위 경계값 반환
}

function isRing( reward ){
    const extra = [ "깨진 상자 조각 5개", "시드 포인트 보따리 5개", "오션글로우 이어링", "경험치 2배 쿠폰(15분) 3개"]
    return !extra.includes( reward )
}

function ringlevel(type){ //반지 레벨 배정
    var num = Math.floor( Math.random()*100 );
    if (type == "빛반상"){
        if ( 0 <= num && num < 75) return 3
        if ( 75 <= num && num < 100) return 4
    }else{
        if ( 0 <= num && num < 41) return 1
        if ( 41 <= num && num < 69) return 2
        if ( 69 <= num && num < 89) return 3
        if ( 89 <= num && num < 100) return 4
    }
}


function isSpecial(ring){  //유효보상 획득 시 특수처리를 위한 보상체크
    var result = false;
    var list = [ // 해당 리스트에 포함된 보상은 유효보상 판정
        "리스트레인트 링 3레벨",
        "리스트레인트 링 4레벨",
        "웨폰퍼프 링 3레벨",
        "웨폰퍼프 링 4레벨",
        "리스크테이커 링 3레벨",
        "리스크테이커 링 4레벨",
        "오션글로우 이어링",
    ]
    list.forEach( (index)=>{
        if(index==ring)  result = true;
     })
     return result;
}

function simulate(type){
    var ringlist;
    if(type == "1급") ringlist = rank1st;
    if(type == "2급") ringlist = rank2st;
    if(type == "숨반상") ringlist = hidden;
    if(type == "빛반상") ringlist = shiny;

    var max = 0;

    var ringLv = ringlevel(type);
    ringlist.forEach( (i)=>{ max+=i.chance; }); // 반지 리스트 내 반지들 확률합산을통한 확률범위 연산
    var random = Math.floor( Math.random()*max ); // 확률범위가 정해졌으면, 해당 범위내의 난수 생성
    var rewardNum;

    for(let i = 1; i<ringlist.length; i++){ // 반지 리스트 반지끼리의 확률변수와 난수를 비교하여 어느반지의 범주에 해당하는지, 
        if( range(i-1, ringlist) <= random && random < range(i, ringlist) ){ // i-1번부터 i번쨰 반지의 확률까지 즉, i번 반지의 확률범위
            rewardNum = i; break; // 탐색이 끝나면 반복문 종료
        }
    }
    var reward = "";
    if ( isRing(ringlist[rewardNum].name) ){    //반지인지
        reward = `${ringlist[rewardNum].name} ${ringLv}레벨` //반지면 레벨부여
    }else{
        reward = ringlist[rewardNum].name+"" //반지가아니면 그냥 보냄
    }
    var ringId = ringlist[rewardNum].id;

    var effect = isRing(ringlist[rewardNum].name) 
    ? ringManual[ringId].effect[ringLv-1]
    : ringManual[ringId].effect[0];
    

    var result =  {
        name: reward,
        id: ringId, 
        special: isSpecial(reward),
        type: type,
        effect: effect
    }
    return result;
}  

export default simulate;