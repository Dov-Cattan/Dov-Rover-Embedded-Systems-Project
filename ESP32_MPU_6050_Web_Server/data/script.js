/*
  Rui Santos
  Complete project details at https://RandomNerdTutorials.com/esp32-mpu-6050-web-server/

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files.
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

let scene, camera, rendered, cube;
var radToDeg = 57.3;


function parentWidth(elem) {
  return elem.parentElement.clientWidth;
}

function parentHeight(elem) {
  return elem.parentElement.clientHeight;
}


// Create events for the sensor readings
if (!!window.EventSource) {
  var source = new EventSource('/events');

  source.addEventListener('open', function(e) {
    console.log("Events Connected");
  }, false);

  source.addEventListener('error', function(e) {
    if (e.target.readyState != EventSource.OPEN) {
      console.log("Events Disconnected");
    }
  }, false);
  source.addEventListener('gyro_readings', function(e) {
    //console.log("gyro_readings", e.data);
    var obj = JSON.parse(e.data);
    document.getElementById("gyroX").innerHTML = (obj.gyroX*radToDeg).toFixed(2);
    document.getElementById("gyroY").innerHTML = (obj.gyroY*radToDeg).toFixed(2);
    document.getElementById("gyroZ").innerHTML = (obj.gyroZ*radToDeg).toFixed(2);

    // reset after it reaches 360
    if (document.getElementById("gyroX").innerHTML < -359)
    {
      document.getElementById('resetX').dispatchEvent(new MouseEvent("click"));
    }
    else if (document.getElementById("gyroX").innerHTML > 359)
    {
      document.getElementById('resetX').dispatchEvent(new MouseEvent("click"));
    }
    if ( document.getElementById("gyroY").innerHTML < -359)
    {
      document.getElementById('resetY').dispatchEvent(new MouseEvent("click"));
    }
    if (document.getElementById("gyroY").innerHTML>359)
    {
      document.getElementById('resetY').dispatchEvent(new MouseEvent("click"));
    }
    if (document.getElementById("gyroZ").innerHTML < -359)
    {
      document.getElementById('resetZ').dispatchEvent(new MouseEvent("click"));
    }
    if (document.getElementById("gyroZ").innerHTML> 359)
    {
      document.getElementById('resetZ').dispatchEvent(new MouseEvent("click"));
    }

  }, false);

  source.addEventListener('temperature_reading', function(e) {
    console.log("temperature_reading", e.data);
    document.getElementById("temp").innerHTML = e.data;
  }, false);

  source.addEventListener('accelerometer_readings', function(e) {
    console.log("accelerometer_readings", e.data);
    var obj = JSON.parse(e.data);
    document.getElementById("accX").innerHTML = obj.accX;
    document.getElementById("accY").innerHTML = obj.accY;
    document.getElementById("accZ").innerHTML = obj.accZ;
  }, false);
}

function resetPosition(element){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/"+element.id, true);
  console.log(element.id);
  xhr.send();
}





 