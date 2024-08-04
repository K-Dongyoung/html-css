const http = require('http');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.set('port', 3000);

const membersInfo = {
    noCnt: 0,
    members: []
}

const commentInfo = {
    noCnt: 0,
    comments: []
}


app.get('/', (req, res) => {
    res.send(membersInfo.members);
});

app.post('/', (req, res) => {
    const newMember = req.body.newMember;
    newMember["no"] = ++membersInfo.noCnt;
    membersInfo.members.push(newMember);
    // console.log(membersInfo.members);
    res.send(newMember);
})

app.put('/', (req, res) => {
    const memberNo = req.body.no;
    const idx = membersInfo.members.findIndex(member => member.no === memberNo);
    if (idx === -1) return res.status(404).send('Not Found');
    membersInfo.members[idx] = req.body;
    // console.log(membersInfo.members);
    res.send(req.body);
});

app.delete('/member/:memberNo', (req, res) => {
    const memberNo = parseInt(req.params.memberNo);
    const idx = membersInfo.members.findIndex(member => member.no === memberNo);
    if (idx === -1) return res.status(404).send('Not Found');
    membersInfo.members.splice(idx, 1);
    res.send(membersInfo.members);
});

app.get('/comment/:memberNo', (req, res) => {
    const memberNo = parseInt(req.params.memberNo);
    const comments = commentInfo.comments.filter(comment => comment.memberNo === memberNo);
    res.send(comments);
});

app.post('/comment/:memberNo', (req, res) => {
    const memberNo = parseInt(req.params.memberNo);
    const newComment = req.body.newComment;
    newComment["no"] = ++commentInfo.noCnt;
    commentInfo.comments.push(newComment);
    res.send(newComment);
});

app.put('/comment/:commentNo', (req, res) => {
    const idx = commentInfo.comments.findIndex(comment => comment.no === parseInt(req.params.commentNo));
    if (idx === -1) return res.status(404).send('Not Found');
    commentInfo.comments[idx] = req.body;
    res.send(req.body);
});

app.delete('/comment/:commentNo', (req, res) => {
    const idx = commentInfo.comments.findIndex(comment => comment.no === parseInt(req.params.commentNo));
    if (idx === -1) return res.status(404).send('Not Found');
    commentInfo.comments.splice(idx, 1);
    res.send(204);
});


const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log(`Server is running at http://localhost:${app.get('port')}`);
});