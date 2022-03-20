const clock = document.querySelector("h1#clock");

// 시간을 받아서 h1의 innerText에 업데이트
function getClock() {
    const date = new Date(); //현재 날짜 & 시간 가져옴
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds =date.getSeconds();
    
    clock.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}
    
getClock();
setInterval(getClock, 1000);  //1초마다 getClock function 호출