// Variables
let workTittle = document.querySelector("#work")
let breakTittle = document.querySelector("#break")
let relaxTittle = document.querySelector("#relax")

const workTime = 25;
const breakTime = 5;
const relaxTime = 15;

const workMessages = [
   "You're doing great, keep it up!, meow!",
   "Stay focused, you’ve got this!, meow!",
   "Every second counts toward your goal, meow!",
   "Small steps make big progress, meow!",
   "Don't forget to breathe and stay calm, meow!",
   "Does the task seem hard? Break it down into smaller parts, meow!",
   "Remember, consistency is key to success, meow!",
   "Does the phone keep distracting you? Lock that phone away! meow!",
 ];
 // Tips for short breaks
 const shortBreakTips = [
   "Stand up and stretch! Your body will thank you, meow!",
   "Drink some water. Hydration is important, meow!",
   "Do a quick breathing exercise to relax your mind, meow!",
   "Take a moment to appreciate your progress so far, meow!",
   "Grab a healthy snack to refuel your energy, meow!",
   "Chat with a friend to refresh your mind, meow!",
 ];
 // Tips for long breaks
 const longBreakTips = [
   "Take a walk outside for fresh air and a change of scenery, meow!",
   "Listen to a song you love to lift your spirits, meow!",
   "Give your eyes a rest from screens, meow!",
   "Do a quick meditation or mindfulness exercise to clear your mind, meow!",
   "How about a nap? Just 10-15 minutes can recharge you, meow!",
   "Engage in a hobby you enjoy, like drawing or reading, meow!",
 ];

 // tips 
 function showTip(tips) {
   const tipEl = document.getElementById('tipCharacter');
   const tipText = document.querySelector('.speech-bubble');
 
   tipText.innerHTML = tips[Math.floor(Math.random() * tips.length)];
 
   tipEl.classList.add('show');

   setTimeout(() => {
      tipEl.classList.remove('show');
    }, 8000); // hides after 8 seconds

 }

let seconds = "00"

// display

window.onload = () => {
   document.querySelector("#minutes").innerHTML = workTime;
   document.querySelector("#seconds").innerHTML = seconds;

   workTittle.classList.add('active')
}

function startCountdown(callback) {
   // Create countdown overlay
   const countdownOverlay = document.createElement('div');
   countdownOverlay.id = 'countdown-overlay';
   countdownOverlay.innerHTML = `
      <div class="countdown-content">
         <div class="countdown-number">3</div>
      </div>
   `;
   document.body.appendChild(countdownOverlay);

   let count = 3;
   const countdownElement = document.querySelector('.countdown-number');
   
   const countdownInterval = setInterval(() => {
      count--;
      if (count > 0) {
         countdownElement.textContent = count;
         countdownElement.classList.add('countdown-animate');
         setTimeout(() => countdownElement.classList.remove('countdown-animate'), 100);
      } else if (count === 0) {
         countdownElement.textContent = 'lock in!';
         countdownElement.classList.add('lockin-animate');
      } else {
         // Remove overlay and start actual timer
         document.body.removeChild(countdownOverlay);
         clearInterval(countdownInterval);
         callback(); // Start the actual timer
      }
   }, 800); // 800ms between each step
}

let timerInterval;


// start timer
function start() {
   // Disable start button during countdown
   document.querySelector("#start").disabled = true;
   
   // Start countdown first
   startCountdown(() => {
      // This callback runs after countdown finishes
      
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
      let relaxMinutes = relaxTime - 1;

      breakCount = 0;

      let timerFunction = () => {

         document.querySelector("#minutes").innerHTML = workMinutes.toString().padStart(2, "0");
         document.querySelector("#seconds").innerHTML = seconds.toString().padStart(2, "0");      
         const alarm = document.getElementById('alarmSound');
         seconds = seconds - 1;

         // show tip
// show tip

         if(seconds === -1) {

            workMinutes = workMinutes - 1;
            
            if (Math.random() < 1) {
               // Figure out the stage
               if (breakCount !== 0 && breakCount % 8 === 0) {
               // Long break (after 4 complete cycles: breakCount 8, 16, 24, etc.)
               showTip(longBreakTips);
               } else if (breakCount % 2 === 1) {
               // Short break (odd numbers: 1, 3, 5, 7, 9, 11, 13, 15, etc.)
               showTip(shortBreakTips);
               } else {
               // Work session (even numbers: 0, 2, 4, 6, 10, 12, 14, etc.)
               showTip(workMessages);
               }
            }

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

               if(breakCount !== 0 && breakCount % 8 === 0) {
                  //longer break
                  workMinutes = relaxMinutes;
                  breakCount++

                  workTittle.classList.remove("active");
                  relaxTittle.classList.add("active")
               }
               else if(breakCount % 2 === 0) {
                  // start break
                  workMinutes = breakMinutes;
                  breakCount++

                  // change the panel
                  workTittle.classList.remove("active");
                  breakTittle.classList.add("active");
               }
               else {
                  // continue working
                  workMinutes = workTime - 1;
                  breakCount++

                  // change the pabel
                  breakTittle.classList.remove("active");
                  relaxTittle.classList.remove("active");
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
   });
}