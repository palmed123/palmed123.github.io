/**
 *解析歌词字符创
 *得到一个歌词对象的数组
 */

function parseLrc(){
    var lines = lrc.split('\n');
    var result = [];
    for(var i = 0; i < lines.length; i++){
        var str = lines[i];
        var parts = str.split(']')
        var timeStr = parts[0].substring(1);
        var obj = {
            time:parseTime(timeStr),
            words:parts[1],
        };
        result.push(obj);
    }
    return result;
}
/**
 * 将一个时间字符串解析为数字
 * @param {String} timeStr 
 * @returns 
 */
function parseTime(timeStr){
    var parts = timeStr.split(':');
    return +parts[0] * 60 + +parts[1];
}
var lrcData = parseLrc();
var doms = {
    audio: document.querySelector('audio'),
    ul:document.querySelector('.container ul'),
    container:document.querySelector('.container')
}
function findIndex(){
    var curTime = doms.audio.currentTime;
    for(var i = 0; i < lrcData.length; i++){
        if(curTime<lrcData[i].time){
            return i -1;
        }
    }
}

//终于写完这个了，bug修了好多，findIndex刚刚一直找不到，现在终于开始写界面了
function createLrcElements(){
    for(var i = 0;i<lrcData.length;i++){
        var li =document.createElement('li')
        li.textContent = lrcData[i].words;
        doms.ul.appendChild(li);
    }
}
createLrcElements();
var containerHeight =doms.container.clientHeight;
var liHeight = doms.ul.children[0].clientHeight;
var maxOffset = doms.ul.clientHeight-containerHeight;
function setOffset(){
    var index = findIndex();
    var offset = liHeight*index+liHeight/2-containerHeight/2;
    if(offset<0){
        offset = 0;
    }
    if(offset>maxOffset){
        offset = maxOffset;
    }
    doms.ul.style.transform = `translateY(-${offset}px)`
    var li = doms.ul.querySelector('.active')
    if(li){
        li.classList.remove('active');
    }

    var li = doms.ul.children[index];
    if(li){
        li.classList.add('active');
    }
}
doms.audio.addEventListener('timeupdate',setOffset);