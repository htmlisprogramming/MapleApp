function calTotalVal(num,type){
    var result = 0;
    if( type == "arcane"){
        for( let i = 1; i <= num; i++){
            result += (11 + i**2);
        }
    }else if(type="authentic"){
        for( let i = 1; i <= num; i++){
            result += i*20 + i**2*9;
        }
    }
    return result;
}

function calculate(array,reqLvUp,type){
    var vlist = [], result = [], area = [];
    var overlv = 0 , maxlv = 0;

    if(type=="arcane"){
        vlist = [
            {lv:array[0].lv , val:array[0].val , gain:array[0].gain },
            {lv:array[1].lv , val:array[1].val , gain:array[1].gain },
            {lv:array[2].lv , val:array[2].val , gain:array[2].gain },
            {lv:array[3].lv , val:array[3].val , gain:array[3].gain },
            {lv:array[4].lv , val:array[4].val , gain:array[4].gain },
            {lv:array[5].lv , val:array[5].val , gain:array[5].gain },
        ]
        result = [
            {lvups:0, totalTimes:0, remainder:0},
            {lvups:0, totalTimes:0, remainder:0},
            {lvups:0, totalTimes:0, remainder:0},
            {lvups:0, totalTimes:0, remainder:0},
            {lvups:0, totalTimes:0, remainder:0},
            {lvups:0, totalTimes:0, remainder:0},
        ]
        area = ["여로", "츄츄", "레헬른" ,"아르카나","모라스","에스페라"]
        maxlv = 19;
    }else if(type=="authentic"){
        vlist = [
            {lv:array[0].lv , val:array[0].val , gain:array[0].gain },
            {lv:array[1].lv , val:array[1].val , gain:array[1].gain },
            {lv:array[2].lv , val:array[2].val , gain:array[2].gain },
        ]
        
        result = [
            {lvups:0, totalTimes:0, remainder:0},
            {lvups:0, totalTimes:0, remainder:0},
            {lvups:0, totalTimes:0, remainder:0},
        ]
        area = ["세르니움", "아르크스", "오디움"]
        maxlv = 10;
    }

    
    
    vlist.forEach( (index , i )=>{
        for( let j = maxlv; j > 0; j--){
            var reqVal = calTotalVal(j,type);
            //누적 심볼 수치를 구해야함
            if( index.lv > 0 && index.lv <= j && index.val >= reqVal){ // 해당레벨보다 낮은레벨인데, 성장치 초과했는지 판단
                result[i].lvups = j + 1 - index.lv;  // 기존레벨과 결과레벨의 차 만큼 레벨업함
                overlv += j + 1 - index.lv; // 사전레벨업 한 수치 누적
                index.lv = j + 1; //j에서 레벨업 판정 되므로, 결과레벨은 j+1
                index.val = index.val - reqVal;
                break;
            }
        }
    })
    var repeat = reqLvUp - overlv;


    for(let j=0; j < repeat; j++){
        
        //각 지역별 심볼마다 몇개, 몇일남았는지 계산
             
            var shortest = { reqTimes:0, index:null };
            var levelup = false;
            
            vlist.forEach( (index , i )=>{
                if( index.lv < 20 && index.lv > 0 && index.gain > 0 ){ //레벨업 불능인지 판단, 레벨과 수급량 모두 1 이상이어야함
                    
                    var reqVal = 0;
                    
                    if( type == "arcane" ){reqVal = (11 + index.lv**2) - index.val;}
                    else if (type == "authentic"){ reqVal = ( index.lv*20 + index.lv**2*9 ) - index.val;}
                    var reqTimes = result[i].totalTimes;
                    // 11 + lev^2 에서 현재 성장치를 뺀 값이 다음레벨업까지 요구되는 수치
                    levelup = true; // 레벨업이 가능 하면 true;
                    var remainder = 0;
                    
                    
                    if( reqVal % index.gain == 0 ){ //레벨업하고 나머지가 있는지
                        reqTimes += parseInt(reqVal / index.gain) //일퀘횟수
                    }else{
                        reqTimes += parseInt(reqVal / index.gain)+1; //안맞아떨어지면 1번 더해야됨
                        remainder = index.gain - ( reqVal % index.gain ) //레벨업 후 남은성장치
                    }

                    if( shortest.reqTimes > reqTimes || shortest.reqTimes == 0 ) { //첫번쨰 대조거나, 기존최단보다 짧으면 최단으로 간주
                        shortest.index = i; 
                        shortest.reqTimes = reqTimes; 
                        shortest.remainder = remainder;
                    }    
                //최단기간 레벨업 심볼의 남은기간, 레벨업 이후수치 기록
                }
            })
        
        if(levelup){ //레벨업을 했다면
            vlist[shortest.index].lv++;
            vlist[shortest.index].val = shortest.remainder;
            result[shortest.index].lvups++;
            result[shortest.index].totalTimes = shortest.reqTimes;
        }
    
        
    }
    
    
    
    var resultArray = [];
    var sum = 0;
    
    result.forEach((index,i)=>{
        if( index.lvups > 0){
            resultArray.push({
                    region: area[i], 
                    lv: vlist[i].lv,
                    lvUps: index.lvups, 
                    durTime: index.totalTimes
                })
            sum+= index.lvups
        }
    })

    return {result : resultArray, status : sum >= reqLvUp };
    
}

export default calculate;