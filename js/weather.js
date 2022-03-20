const API_KEY = "c44e39971016b53d0cada39bfe833826";
const COORDS = "coords";

// api 에서 위도 경도를 가지로 날씨와 장소 받아오기
function getWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    console.log(url);
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const weather = document.querySelector("#weather span:first-child");
            const city = document.querySelector("#weather span:last-child");
            city.innerText = `📍${data.sys.country}, ${data.name}`;
            weather.innerText = `${Math.floor(data.main.temp)}° / ${data.weather[0].main}`;
        });
}

//위도 경도 저장하기 
function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

//위치 정보 받아온 후, 위도경도 저장하고 날씨 가져오기
function onGeoSuccess(position) {
    const latitude = position.coords.latitude;   //위도
    const longitude = position.coords.longitude;   //경도
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}
    
//위치정보 얻는거 실패했을 때 알림창 띄우기
function onGeoError(position) {
    alert("Can't find you. No weather for you.")
}

// 위치정보 물어보기
function askForCoords() {
    navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError); 
}

//// 위치정보 저장된거 불러오기
function loadCoords() {
    const loadCoords = localStorage.getItem(COORDS);
    // 저장된 위치정보가 없으면 물어보기
    if(loadCoords === null) {
        askForCoords();
    } else {
        // 있으면 json 으로 파싱해서 날씨 가져오기
        const parseCoords = JSON.parse(loadCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

loadCoords();