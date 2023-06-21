require('dotenv').config();

const port = process.env.PORT;
const dbid = process.env.DB_id
const dbpw = process.env.DB_pw
const dbname = process.env.DB_name
const secret = process.env.secret;
const express = require('express');
const path = require('path');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
const http = require('http').createServer(app);

const cors = require('cors');
let corsOptions = {
    origin: `http://localhost:3000`,
    credentials: true
}

app.use(cors(corsOptions));

const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const dburl = `mongodb+srv://${dbid}:${dbpw}@${dbname}.zuorp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
app.use(session({secret : secret, resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 

const axios = require("axios");
const cheerio = require("cheerio");
const schedule = require('node-schedule');
const scrap = require('./scrap.js');
const { rescheduleJob } = require('node-schedule');
const job = schedule.scheduleJob('0 0 0 * * 4', ()=>{weeklyReset();});



var db;
var guildInfo;
MongoClient.connect(dburl, (err, client)=>{
    if (err) return console.log(err);
    db = client.db('MapleApp');
    
    scrap.getMembers()
    .then((result)=>{
        guildInfo = result;
        console.log(`월드랭킹 ${result.info.worldrank}`)
        console.log(`전체랭킹 ${result.info.totalrank}`)
        console.log(`길드원수 ${result.info.numbers}`)
        console.log(`길드포인트 ${result.info.point}`)
        console.log(`${result.masters.length}개의 관리자 리스트 로딩`)
        console.log(`${result.members.length}개의 멤버 리스트 로딩`)
        console.log("데이터 로딩 성공.")
        
        http.listen(port,  ()=>{
            console.log(`listening on port ${port}`)
            }); 

    }).catch( (err)=>{
        if(err) console.log("데이터 로딩 실패")
    })

  })
  

app.use( express.static( path.join(__dirname, 'frontend/build') ) )

app.get('/', (req,res)=>{
    res.sendFile( path.join(__dirname,'frontend/build/index.html') )
})

app.post('/datatable', (req,res)=>{
    var collection = "Charactors";
    var id = req.body._id
    db.collection(collection).findOne({_id : id },(err,result)=>{
        res.json(result);
        const today = new Date();
        console.log(`[ ${today.toLocaleString()} ] ${id}의 캐릭터 리스트 로딩.`);
    });

})
app.post('/searchInfo', (req,res)=>{
    var url = encodeURI("https://maple.gg/u/"+req.body.name);
    axios.get(url)
    .then( (result)=>{
        const $ = cheerio.load(result.data);
        const data = { 
            img: $('#user-profile > section > div.row.row-normal > div.col-lg-4.pt-1.pt-sm-0.pb-1.pb-sm-0.text-center.mt-2.mt-lg-0 > div > div.col-6.col-md-8.col-lg-6 > img').attr('src'),
            lv : $('#user-profile > section > div.row.row-normal > div.col-lg-8 > div.user-summary > ul > li:nth-child(1)').text().split("(")[0],
            ch : $('#user-profile > section > div.row.row-normal > div.col-lg-8 > div.user-summary > ul > li:nth-child(2)').text()
        };

        if(data)res.json(data);
    })
    .catch( (err)=>{console.log(err); console.log("")})
})

app.get('/getGuildInfo', (req,res)=>{
    console.log("접속함")
    res.json(guildInfo);
})

app.post( '/add', (req, res)=>{
    var collection = "Charactors";
    console.log(req.body)
    db.collection(collection).insertOne( 
        req.body,
        (err,result)=>{
            if(err) return console.log(err)
            else res.json(req.body);
        }
    );
});

app.post( '/update', (req, res)=>{
    var collection = "Charactors";
    var list = req.body.list;
    var id = req.body._id;
    db.collection(collection).updateOne(
        { _id : id },
        { $set : {list:list}}, 
        (err,result) => {
            if(err) return console.log(err)
            else {    
                res.json(list); 
                const today = new Date();
                console.log(`[ ${today.toLocaleString()} ] ${id}의 캐릭터 정보 갱신.` )
            }
        }
    );
});

app.post( '/images', (req, res)=>{
    console.log(req.body)
    const { file } = req;
    console.log(file);
    return res.send({ result: "success" });
}).get(async (req, res) => {
    console.log(process.cwd());
    return res.sendFile(
      process.cwd() + "./uploads/fef621f1c1e0e5394d7f4dea70c8f452"
    );
  });;

app.post('/login', passport.authenticate( 'local', {
    failureRedirect : '/fail'
}), (req, res)=>{
    const today = new Date();
    console.log(`[ ${today.toLocaleString()} ] ${req.body.id}로 로그인 시도.`)
    res.redirect('/')
});

passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pw',
        session: true,
        passReqToCallback: false,
    },(inputid, inputpw, done) => {
        db.collection('Accounts').findOne({ id: inputid }, (err, result)=>{
        if (err) return done(err)
        if (!result) return done(null, false, { message: '존재하지않는 아이디요' })
        if (inputpw == result.pw) {
            return done(null, result)
        } else {
            return done(null, false, { message: '비번틀렸어요' })
        }
        })
}));

passport.serializeUser((user,done)=>{
    done(null, user.id)
})

passport.deserializeUser((id, done)=>{
    db.collection('Accounts').findOne({ id: id }, (err, result)=>{
        done(null, result)
    })
})

app.get('/isLoggedin', isLoggedin, (req, res)=>{ 
    const today = new Date();
    console.log(`[ ${today.toLocaleString()} ] ${req.user.id}의 로그인 확인.`); 
    res.json(req.user.id);
}) 

const isLoggedin = (req, res, next) => { 
    if (req.user) { 
        next() 
    } 
    else { 
        res.send('로그인안함') 
    } 
} 

const weeklyReset = ()=>{
    var collection = "Charactors";
    let boss = [
        'zakum','hilla','pinkbean','cygnus',
        'pierre','vonbon','crimsonqueen','vellum',
        'magnus','papulatus','lotus','damien',
        'slime','lucid','will','dusk',
        'darknell','verushilla','seren','kalos','kaling'
    ]
    db.collection(collection).find().toArray((err ,result)=>{
        result.forEach((account,i)=>{
            account.list.forEach((char,j)=>{
                boss.forEach( bossname =>{ char[bossname].clear=0; } )
            })

            db.collection(collection).updateOne(
                { _id : account._id },
                { $set : {list:account.list}}, 
                (err,result) => {
                    if(err) return console.log(err)
                    else {
                        const today = new Date();
                        console.log(`[ ${today.toLocaleString()} ] ${account._id}의 캐릭터 정보 초기화.`)
                    }
                }
            );
        }) 
        if(err) console.log(err);
    });



    scrap.getMembers()
    .then((result)=>{
        guildInfo = result;
        console.log(`월드랭킹 ${result.info.worldrank}`)
        console.log(`전체랭킹 ${result.info.totalrank}`)
        console.log(`길드원수 ${result.info.numbers}`)
        console.log(`길드포인트 ${result.info.point}`)
        console.log(`${result.masters.length}개의 관리자 리스트 로딩`)
        console.log(`${result.members.length}개의 멤버 리스트 로딩`)
        console.log("데이터 로딩 성공.")
        
        http.listen(port,  () => {
            console.log(`listening on port ${port}`)
            }); 

    }).catch( (err)=>{
        if(err) console.log("데이터 로딩 실패")
    })

}
