let break_time = 5;
let session_time = 25;
let is_playing = false;

let minutes = session_time;
let seconds = 0;
let str_timer = '25:00'

/// reset
document.querySelector("#reset").onclick = function(){

    //stop timer
    //is_playing = false;
    start_stop()
    session_time = 25;
    break_time = 5;
    minutes = session_time;
    seconds = 0
    str_timer = '25:00'
    

    //break to 5m
    break_time = 5
    document.querySelector("#break-length").innerText = break_time

    //session length to 25m
    session_time = 25
    document.querySelector("#session-length").innerText = session_time

    // time-left to 25:00
    document.querySelector("#time-left").innerText = str_timer
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
    if( break_time < 60 ){
        break_time += 1;
        document.querySelector("#break-length").innerText = break_time
    }
}


/// session decrement
document.querySelector("#session-decrement").onclick = function(){
    session_time -= 1;
    document.querySelector("#session-length").innerText = session_time
    minutes--;
    update_timmer()
    
}

/// session increment
document.querySelector("#session-increment").onclick = function(){
    session_time += 1;
    document.querySelector("#session-length").innerText = session_time
    minutes++
    update_timmer()
    
}

/// stop-play
document.querySelector("#start_stop").onclick = start_stop

//help-dev variables
function start_stop(){
    is_playing = !is_playing

    if( is_playing ){
        interval = setInterval(decrement_seconds, 1000)
    }
    else{
        clearInterval(interval)
    }
}

function decrement_seconds(){
    if( seconds == 0){
        minutes--;
        seconds=59
    }
    
    else if( seconds > 0){
        seconds--;        
    }
    else{
        seconds = 0
    }
    
    update_timmer()
}

function update_timmer(){
    formatted_seconds = seconds.toLocaleString('en-US', {
                                minimumIntegerDigits: 2,
                                useGrouping: false
                        })

    formatted_minutes = minutes.toLocaleString('en-US', {
                                minimumIntegerDigits: 2,
                                useGrouping: false
                              })
    
    str_timer = formatted_minutes + ':' + formatted_seconds
    document.querySelector("#time-left").innerText = str_timer
    
}


