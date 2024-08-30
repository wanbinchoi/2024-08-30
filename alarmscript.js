let batteryDrainInterval;
let alarms = [];

function updateTime(){
    const now = new Date();
    const year = String(now.getFullYear()).slice(2);
    const month = String(now.getMonth() + 1).padStart(2, '0');;
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2,'0');
    const minutes = String(now.getMinutes()).padStart(2,'0');
    const seconds = String(now.getSeconds()).padStart(2,'0');

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    const currentTime = `${hours}:${minutes}:${seconds}`;

    document.getElementById('currentDateTime').textContent = formattedDate;
    
    alarms = alarms.filter(alarm => {
        if(currentTime === alarm.time){
            alert('알람!');
            return false;
        }
        return true;
    });
    updateAlarmList();
}

function startBatteryDrain(){
    let batteryLevel = 100;
    const batteryElement = document.getElementById('Battery');
    const timeElement = document.getElementById('currentDateTime');
    if(batteryDrainInterval){
        clearInterval(batteryDrainInterval);
    }
    const batteryDrain = setInterval(() => {
        if(batteryLevel > 0){
            batteryLevel--;
            batteryElement.textContent = batteryLevel + '%';
        }else{
            clearInterval(batteryDrain);
            clearInterval(timeUpdateInterval);
            alert('배터리가 부족합니다!');
            timeElement.classList.add('screen-off');

            document.getElementById('addAlarm').disabled = true;
            document.getElementById('hours').disabled = true;
            document.getElementById('minutes').disabled = true;
            document.getElementById('seconds').disabled = true;

            document.querySelectorAll('delete-btn').forEach(button => {
                button.disabled = true;
            });
        }
    },1000);
}

function rechargeBattery(){
    const batteryElement = document.getElementById('Battery');
    const timeElement = document.getElementById('currentDateTime');

    if(batteryDrainInterval){
        clearInterval(batteryDrainInterval);
        batteryDrainInterval = null;
    }

    batteryElement.textContent = '100%';
    timeElement.classList.remove('screen-off');
    

    document.getElementById('addAlarm').disabled = false;
    document.getElementById('hours').disabled = false;
    document.getElementById('minutes').disabled = false;
    document.getElementById('seconds').disabled = false;

    document.querySelectorAll('delete-btn').forEach(button => {
        button.disabled = false;
    });

    timeUpdateInterval = setInterval(updateTime, 1000);
    startBatteryDrain();
}
function addAlarm(){
    if(alarms.length >=3){
        alert('알람을 최대 3개까지 설정할 수 있습니다.');
        return;
    }
    const hours = String(document.getElementById('hours').value).padStart(2,'0');
    const minutes = String(document.getElementById('minutes').value).padStart(2,'0');
    const seconds = String(document.getElementById('seconds').value).padStart(2,'0');

    const alarmTime = `${hours}:${minutes}:${seconds}`;

    if(alarmTime){
        alarms.push({time:alarmTime});
        updateAlarmList();
    }
}
function deleteAlarm(index){
    alarms.splice(index, 1);
    updateAlarmList();
}
function updateAlarmList(){
    const alarmList = document.getElementById('alarmList');
    alarmList.innerHTML = '';

    alarms.forEach((alarm, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = alarm.time;
        
        const deleteButton = document.createElement('span');
        deleteButton.textContent = '삭제';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => deleteAlarm(index));

        listItem.appendChild(deleteButton);
        alarmList.appendChild(listItem);
    });
}   

document.getElementById('rechargeBattery').addEventListener('click',rechargeBattery);
document.getElementById('addAlarm').addEventListener('click',addAlarm);

timeUpdateInterval = setInterval(updateTime, 1000);

startBatteryDrain();