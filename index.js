"use strict"
let ps2 = document.getElementById('ps2');
let pl = document.getElementById('pl');
let bg = document.getElementById('bg');
let width1 = pl.offsetWidth;
let width2 = document.getElementById('prt').offsetWidth;
// console.log(width1, width2);
// console.log(bg.style);
ps2.onmouseover = function(){
    bg.style.transform = "translate3d(-100%, 0, 0)";
    bg.style.width = width1 + 'px';
};
ps2.onmouseleave = () => {
    bg.style.transform = "translate3d(0, 0, 0)";
    bg.style.width = width2 + "px";
}

let outer_circle = document.getElementById('outer_circle');
let outer_circle_counter = 1;
outer_circle.onmouseenter = () => {
    let deg = outer_circle_counter * 180;
    outer_circle.style.transform = `rotateZ(${deg}deg)`;
    outer_circle_counter++;
}
outer_circle.onmouseleave = () => {
    let deg = outer_circle_counter * 180;
    outer_circle.style.transform = `rotateZ(${deg}deg)`;
    outer_circle_counter++;
}


function move(node){
    return function() {
        let moveArr = [];
        node.onmousemove = function(e){
            let evt = e || event;
            moveArr.push(evt);
        }

        node.onmouseleave = () => {
            node.onmousemove = null;
            node.onmouseleave = null;
            leave();
            if(success()){
                console.log('You win!');
            }
        }

        function leave(){
            // console.log(moveArr);
            let moveX = (moveArr[moveArr.length -1].clientX - moveArr[0].clientX);
            let moveY = (moveArr[moveArr.length -1].clientY - moveArr[0].clientY);
            let direction = (Math.abs(moveX) > Math.abs(moveY)) ? (moveX > 0 ? "right" : "left") : (moveY > 0 ? "down" : "up");
            let dirArr = check(node);
            if(dirArr.indexOf(direction) != -1){
                let exArr = exchangeEle(node, direction);
                console.log(exArr);
                for(let i in exArr){
                    exArr[i].name.style.transform = `translate(${exArr[i].x * 70}px, ${exArr[i].y * 70}px) scale(0.9)`;
                }
            }
        }

        function check(node){
            let index = null;
            let resArr = [];
            for(let i in bpArr){
                if(bpArr[i].name === node){
                    index = i;
                    break;
                }
            }
            console.log(index);
            index = parseInt(index);
            if(index - 3 >= 0){
                if(bpArr[index - 3].value == null){
                    resArr.push('up');
                }
            }
            if(index + 3 < 9){
                if(bpArr[index + 3].value == null){
                    resArr.push('down');
                }
            }
            if(index - 1 >= 0 && index%3 != 0){
                if(bpArr[index - 1].value == null){
                    resArr.push('left');
                }
            }
            if(index + 1 < 9 && index%3 != 2){
                if(bpArr[index + 1].value == null){
                    resArr.push('right');
                }
            }
            //可以改这个bug，但没必要
            if(bpArr[index].value == null){
                resArr.push('up', 'down', 'right', 'left')
            }
            //改了bug的代码
            // if(bpArr[index].value == null){
            //     let allDirection = ['up', 'down', 'right', 'left'];
            //     let dirMap = new Map();
            //     allDirection.forEach((ele, index) => {
            //         dirMap.set(ele, index);
            //     })
            //     if(index < 3){
            //         dirMap.delete('up');
            //     }
            //     if(index%3 == 0){
            //         dirMap.delete('left');
            //     }
            //     if(index%3 == 2){
            //         dirMap.delete('right');
            //     }
            //     if(index > bpArr.length - 3){
            //         dirMap.delete('down');
            //     }
            //     let res = [];
            //     for(let i of dirMap){
            //         res.push(i[0]);
            //     }
            //     // console.log(res);
            //     return res;
            // }
            console.log(resArr);
            return resArr;
        }

        function exchangeEle(node, direction){
            let index = null;
            let temp = null;
            let resArr = [];
            for(let i in bpArr){
                if(bpArr[i].name === node){
                    index = i;
                    break;
                }
            }
            index = parseInt(index);
            // switch(direction){
            //     case 'up':
            //         temp = bpArr[index];
            //         bpArr[index] = bpArr[index - 3];
            //         bpArr[index - 3] = temp;
            //         resArr.push(temp, bpArr[index]);
            //         break;
            //     case 'down':
            //         temp = bpArr[index];
            //         bpArr[index] = bpArr[index + 3];
            //         bpArr[index + 3] = temp;
            //         break;
            //     case 'left':
            //         temp = bpArr[index];
            //         bpArr[index] = bpArr[index - 1];
            //         bpArr[index - 1] = temp;
            //         break;
            //     case 'right':
            //         temp = bpArr[index];
            //         bpArr[index] = bpArr[index + 1];
            //         bpArr[index + 1] = temp;
            //         resArr.push(temp, bpArr[index]);
            //         break;
            //     default:
            //         break;
            // }
            if(direction == 'right'){
                bpArr[index].x += 1;
                bpArr[index + 1].x -= 1;
                temp = bpArr[index];
                bpArr[index] = bpArr[index + 1];
                bpArr[index + 1] = temp;
                resArr.push(temp, bpArr[index]);
            }
            if(direction == 'left'){
                bpArr[index].x -= 1;
                bpArr[index - 1].x += 1;
                temp = bpArr[index];
                bpArr[index] = bpArr[index - 1];
                bpArr[index - 1] = temp;
                resArr.push(temp, bpArr[index]);
            }
            if(direction == 'up'){
                bpArr[index].y -= 1;
                bpArr[index - 3].y += 1;
                temp = bpArr[index];
                bpArr[index] = bpArr[index - 3];
                bpArr[index - 3] = temp;
                resArr.push(temp, bpArr[index]);
            }
            if(direction == 'down'){
                bpArr[index].y += 1;
                bpArr[index + 3].y -= 1;
                temp = bpArr[index];
                bpArr[index] = bpArr[index + 3];
                bpArr[index + 3] = temp;
                resArr.push(temp, bpArr[index]);
            }
            return resArr;
        }

        function success(){
            for(let i= 0; i< bpArr.length -2; i++){
                if(bpArr[i].value > bpArr[i + 1].value){
                    return false;
                }
            }
            return true;
        }
    }
    
}

//这个随机算法不对，不能够保证有解
function shuffle(a) {
    var len = a.length;
    for(var i=0;i<len;i++){
        var end = len - 1 ;
        var index = (Math.random()*(end + 1)) >> 0;
        var t = a[end];
        a[end] = a[index];
        a[index] = t;
    }
    return a;
};

let valueArr = [1, 2, 3, 4, 5, 6, 7, 8, null];
let bpBox = document.getElementById('bpBox');
let children = bpBox.children;
let bpArr = [];
Array.from(children).forEach( (ele, index) => {
    bpArr.push({
        name: ele,
        x: 0,
        y: 0,
        value: valueArr[index]
    });
    ele.innerHTML = valueArr[index];
})
console.log(bpArr)
bpArr.forEach(ele => {
    ele.name.onmousedown = move(ele.name);
});