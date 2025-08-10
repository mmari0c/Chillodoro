// Variables

let workTittle = document.querySelector("#work")
let breakTittle = document.querySelector("#break")

let workTime = 25;
let breakTime = 5;

let seconds = "00"

// display

window.onload = () => {
   document.querySelector("#minutes").innerHTML = workTime;
   document.querySelector("#seconds").innerHTML = seconds;

   workTittle.classList.add('active')
}

// start timer
function start() {
   // change button

   document.querySelector("#start").style.display = "none";
   document.querySelector("#reset").style.display = "block";
   const player = document.getElementById("lofiPlayer");
   // Start at volume 0 (muted)
   player.volume = 0;
   player.play();

   // Fade in over 3 seconds
   let fadeInterval = setInterval(() => {
       if (player.volume < 1) {
           player.volume = Math.min(player.volume + 0.01, 1); // increase by 5%
       } else {
           clearInterval(fadeInterval); // stop once full volume
       }
   }, 150); // run every 150ms

   // change the time
   seconds = 59;

   let workMinutes = workTime - 1;
   let breakMinutes = breakTime - 1;

   breakCount = 0;

   let timerInterval;

   let timerFunction = () => {

      document.querySelector("#minutes").innerHTML = workMinutes;
      document.querySelector("#seconds").innerHTML = seconds;
      const alarm = document.getElementById('alarmSound');

      seconds = seconds - 1;

      if(seconds === 0) {

         workMinutes = workMinutes - 1;

         if(workMinutes === -1) {

            player.pause();

            alarm.play();
            // add an alarm to sound
            clearInterval(timerInterval);
            console.log("Pausing timer for 8 seconds...");
            setTimeout(() => {
               console.log("Resuming timer...");
               timerInterval = setInterval(timerFunction, 1000); // restart
            }, 8000);

            if(breakCount % 2 === 0) {
               // start break
               workMinutes = breakMinutes;
               breakCount++

               // change the panel
               workTittle.classList.remove("active");
               breakTittle.classList.add("active");
            } else {
               // continue working
               workMinutes = workTime;
               breakCount++

               // change the pabel
               breakTittle.classList.remove("active");
               workTittle.classList.add("active");

               player.volume = 0;
               player.play();
               // Fade in over 3 seconds
               setTimeout(() => {
                  player.volume = 0;
                  player.play();
      
                  let fadeInterval = setInterval(() => {
                      if (player.volume < 1) {
                          player.volume = Math.min(player.volume + 0.01, 1);
                      } else {
                          clearInterval(fadeInterval);
                      }
                  }, 150);
              }, 8000); // same pause as timer resume
            }
         } 
         seconds = 59;         
      }
   }

   timerInterval = setInterval(timerFunction, 1000);


}