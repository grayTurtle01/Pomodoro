let break_time = 5;
let session_time = 25;
let is_playing = false;

let state = "session"

let minutes = session_time;
let seconds = 0;
let str_timer = '25:00'

let audio = document.querySelector("audio")
/// reset
document.querySelector("#reset").onclick = function(){

    //stop timer
    audio.pause()
    audio.load()
    is_playing = false;
    start_stop()
   
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

    // State message
    document.querySelector("#timer-label").innerText = 'Session'
    
}

/// break decrement
document.querySelector("#break-decrement").onclick = function(){
    if( break_time > 1){
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
    if( session_time > 1){
        session_time -= 1;
        document.querySelector("#session-length").innerText = session_time
        minutes--;
        update_timmer()
    }
    
}

/// session increment
document.querySelector("#session-increment").onclick = function(){
    if( session_time < 60){
        session_time += 1;
        document.querySelector("#session-length").innerText = session_time
        minutes++
        update_timmer()
    }
    
}

/// stop-play
document.querySelector("#start_stop").onclick = function(){
    is_playing = !is_playing
    start_stop()
    document.getElementById("myAudio")
}




function start_stop(){

    if( is_playing ){
        interval = setInterval(decrement_seconds, 1000)
    }
    else{
        try{
            clearInterval(interval)
            audio.pause()
            aduio.load()
        }catch{}
    }
}

let max_seconds = 59
//~ max_seconds = 5
//~ minutes = 1

function decrement_seconds(){
    if( seconds == 0){
        minutes--;
        seconds = max_seconds
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

    check_state()
}


function check_state(){
     if( state == "session")
        if( minutes == 0 && seconds == 0){
            audio.play()
            state = "break"
            document.querySelector("#timer-label").innerText = 'Break'
            minutes = break_time;
            seconds = 0;
            //update_timmer()
        }
        
    if( state == "break")
        if( minutes == 0 && seconds == 0){
            audio.play()
            state = "session"
            document.querySelector("#timer-label").innerText = 'Session'
            minutes = session_time;
            seconds = 0;
            //update_timmer()
        }

}


