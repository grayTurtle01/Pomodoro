let break_time = 5;
let session_time = 25;

/// reset
document.querySelector("#reset").onclick = function(){

    //stop timer

    //break to 5m
    break_time = 5
    document.querySelector("#break-length").innerText = break_time

    //session length to 25m
    session_time = 25
    document.querySelector("#session-length").innerText = session_time

    // time-left to 25:00
    document.querySelector("#time-left").innerText = '25:00'
}

/// break decrement
document.querySelector("#break-decrement").onclick = function(){
    if( break_time > 0){
        break_time -= 1;
        document.querySelector("#break-length").innerText = break_time
    }
}

/// break increment
document.querySelector("#break-increment").onclick = function(){
    break_time += 1;
    document.querySelector("#break-length").innerText = break_time
    
}


/// session decrement
document.querySelector("#session-decrement").onclick = function(){
    session_time -= 1;
    document.querySelector("#session-length").innerText = session_time
    
}

/// session increment
document.querySelector("#session-increment").onclick = function(){
    session_time += 1;
    document.querySelector("#session-length").innerText = session_time
    
}


