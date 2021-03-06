let break_time = 5;
let session_time = 25;
let is_playing = false;

let state = "session"

let minutes = session_time;
let seconds = 0;
let max_seconds = 59
let str_timer = '25:00'

let second_speed_ms = 1000

let audio = document.querySelector("audio")
let interval = setInterval(decrement_second, 1000)
clearInterval(interval)


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
   
    minutes = 25;
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
        if( state == 'break'){
            minutes--
            update_display()
        }
    }
}

/// break increment
document.querySelector("#break-increment").onclick = function(){
    if( break_time < 60 && !is_playing ){
        break_time += 1;
        document.querySelector("#break-length").innerText = break_time
        if( state == 'break'){
            minutes++
            update_display()
        }
    }
}


/// session decrement
document.querySelector("#session-decrement").onclick = function(){
    if( session_time > 1 && !is_playing){
        session_time -= 1;
        document.querySelector("#session-length").innerText = session_time
        if( state == 'session'){

            minutes--;
            update_display()
        }
    }
    
}

/// session increment
document.querySelector("#session-increment").onclick = function(){
    if( session_time < 60 && !is_playing){
        session_time += 1;
        document.querySelector("#session-length").innerText = session_time
        if( state == 'session'){
            minutes++
            update_display()
        }
    }
    
}


/// stop-play
document.querySelector("#start_stop").onclick = function(){
    is_playing = !is_playing
    start_stop()
}


function start_stop(){

    let btn = document.querySelector('#smart_button')

    if( is_playing ){
        interval = setInterval(decrement_second, second_speed_ms)
        btn.classList.add('fa-pause')
        btn.classList.remove('fa-play')
    }
    else{
        try{
            btn.classList.add('fa-play')
            btn.classList.remove('fa-pause')
            clearInterval(interval)
        }catch{
            console.log("interval error")
        }
    }
}


function decrement_second(){

    // decrement minutes
    if( seconds == 0){
        minutes--;
        seconds = max_seconds
    }
    
    // decrement seconds
    else if( seconds > 0){
        seconds--;        
    }
    update_display()
    
    if( minutes == 0 && seconds == 0){
        audio.play()
        //console.log(str_timer, state)
    }
    
    if( minutes == -1){
        switch_state()
        change_counter()
    }
    
}

function update_display(){
    
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

let pause_ms = 0
function switch_state(){

    is_playing = false
    start_stop()

     if( state == "session"){
             document.querySelector("#timer-label").innerText = 'Break'
             state = "break"
                
    }
    else if( state == "break"){
            document.querySelector("#timer-label").innerText = 'Session'
            state = "session"   
    }

    is_playing = true
    start_stop()

}

function change_counter(){
   
   seconds = 0;
    
   if( state == "session"){
        minutes = document.querySelector("#break-length").innerText;
   }
   else if( state == "break"){
        minutes = document.querySelector("#session-length").innerText;
    }
    
    update_display()
}


