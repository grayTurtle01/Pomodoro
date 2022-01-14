let break_time = 5;
let session_time = 25;
let is_playing = false;

let state = "session"

let minutes = session_time;
let seconds = 0;
let max_seconds = 59
let str_timer = '25:00'

let audio = document.querySelector("audio")

// dev-variables
//~ break_time = 1
//~ session_time = 1
//~ minutes = session_time
//~ str_timer = '01:00'
//~ max_seconds = 10

function init(){
    document.querySelector("#break-length").innerText = break_time
    document.querySelector("#session-length").innerText = session_time
    document.querySelector("#time-left").innerText = str_timer
}
init()

/// reset
document.querySelector("#reset").onclick = function(){

    //stop beep
    audio.pause()
    audio.load()
    
    //stop timer
    is_playing = false;
    start_stop()
   
    minutes = session_time;
    seconds = 0
    str_timer = '25:00'

    state = "session"
    
    
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
    if( (break_time > 1) && !is_playing){
        break_time -= 1;
        document.querySelector("#break-length").innerText = break_time
        update_timmer()
    }
}

/// break increment
document.querySelector("#break-increment").onclick = function(){
    if( break_time < 60 && !is_playing ){
        break_time += 1;
        document.querySelector("#break-length").innerText = break_time
        update_timmer()
    }
}


/// session decrement
document.querySelector("#session-decrement").onclick = function(){
    if( session_time > 1 && !is_playing){
        session_time -= 1;
        document.querySelector("#session-length").innerText = session_time
        minutes--;
        update_timmer()
    }
    
}

/// session increment
document.querySelector("#session-increment").onclick = function(){
    if( session_time < 60 && !is_playing){
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
}



function start_stop(){

    if( is_playing ){
        interval = setInterval(decrement_second, 1000)
    }
    else{
        try{
            clearInterval(interval)
        }catch{}
    }
}


function decrement_second(){
    if( seconds == 0){
        minutes--;
        seconds = max_seconds
    }
    
    else if( seconds > 0){
        seconds--;        
    }
        
    update_timmer()
    check_state()
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

    //check_state()
    
}


async function check_state(){
    
     if( state == "session")
        if( minutes == 0 && seconds == 0){
            audio.play()
            is_playing = false
            start_stop()
            state = "break"
            minutes = document.querySelector("#break-length").innerText;
            seconds = 0;
            
            await setTimeout( ()=> {
               is_playing = true
               start_stop() 
               document.querySelector("#timer-label").innerText = 'Break'
               update_timmer()
            } , 3000)
        }
        
    if( state == "break")
        if( minutes == 0 && seconds == 0){
            audio.play()
            is_playing = false
            start_stop()
            state = "session"
            minutes = document.querySelector("#session-length").innerText;
            seconds = 0;

           await setTimeout( ()=> {
               is_playing = true
               start_stop() 
               document.querySelector("#timer-label").innerText = 'Session'
               update_timmer()
            } , 3000)
            
        }

}


