
const io = require('socket.io-client');

// 连接到 Socket.io 服务器
const socket = io('http://localhost:3000'); // 将服务器地址替换为你的服务器地址

// 监听服务器发送的消息



// 发送消息到服务器
function message(id,msg){
  socket.emit('message', id,msg);
}
socket.on('message', (msg) => {
  console.log(msg);
});

// 处理断开连接事件
function disconnect(){
  socket.disconnect();
}
socket.on('disconnect', () => {
  console.log('与服务器的连接已断开');
});

function joinGroup(name,id){
    socket.emit('joinGroup', name,id);
}
socket.on('joinGroup', (msg) => {
  console.log(`收到消息: ${msg}`);
});

function getList(id){
  socket.emit('getList', id);
}
socket.on('getList', (list) => {
    chrome.runtime.sendMessage({ action: "receivedList", sites: list });
});

function updateList(id,list){
  socket.emit('updateList', id,list);
}
socket.on("updateList", (msg) => {
  console.log(`收到消息: ${msg}`);
});


