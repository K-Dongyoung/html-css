const http = require('http');
const express = require('express');
const app = express();

const port = 8000;

// 뷰 템플릿 사용을 위한 설정
app.set('views', 'views');
app.set('view engine', 'ejs');

// /public/index.html을 보여주기 위한 static 폴더 지정
app.use(express.static('public'));

const saramList = [
    {no: 102, name: '홍길동', email: 'hong@saram.com', job: "a", age:21},
    {no: 103, name: '이길동', email: 'lee@saram.com', job: "b", age:20},
    {no: 104, name: '김길순', email: 'kim@saram.com', job: "c", age:23},
    {no: 105, name: '박길순', email: 'park@saram.com', job: "d", age:22}
]

app.get('/home', function(req, res) {
    res.end('<h1>Hello Nodejs Express</h1>');
});

app.get('/profile', function(req, res) {
    res.end('<h1>My Profile page</h1>');
});

app.get('/saram', function(req, res) {
    var message = "Person information management system";
    req.app.render('saram', {message, saramList}, function(err, html) {
        res.end(html);
    });
});

app.get('/saram/detail', function(req, res) {
    var idx = saramList.findIndex(function(saram) {
        return saram.no == req.query.no;
    });
    var saram = null;
    if (idx!= -1) {
        saram = saramList[idx];
    }
    req.app.render('saramDetail', {saram}, function(err, html) {
        res.end(html);
    });
});

app.get('/saram/edit', function(req, res) {
    var idx = saramList.findIndex(function(saram) {
        return saram.no == req.query.no;
    });
    var saram = null;
    if (idx!= -1) {
        saram = saramList[idx];
    }
    req.app.render('saramEdit', {saram}, function(err, html) {
        res.end(html);
    });
});

app.get('/saram/update', function(req, res) {
    console.log("GET - /saram/update >>> ", req.query);
    // saramList에서 해당 정보를 찾아서 update 하기.
    var idx = saramList.findIndex(function(saram) {
        return saram.no == req.query.no;
    });
    var saram = null;
    if (idx!= -1) {
        saramList[idx] = req.query;
    }
    
    res.send(req.query);
});

const server = http.createServer(app);
server.listen(port, function() {
    console.log("서버 실행 중 >>> http://localhost:" + port);
});