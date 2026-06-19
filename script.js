
function loadScene(scene) {
    const current = gameData[scene];
    typeText(current.text);
    const character = document.getElementById("character");
    if (scene === "pollution") {
     document.body.style.backgroundColor = "#900D09";
 } else if (scene === "moreenvironmetsaving") {
     document.body.style.backgroundColor = "#0B610B";
 } 
     if (scene === "start") {
         character.src = "";
     } else if (scene === "pollution") {
         character.src = "";
     } else if (scene === "moreenvironmetsaving") {
         character.src = "";
     } else if (scene === "end") {
         character.src = "";
     } else if (scene === "trashcan") {
         character.src = "";
     } else if (scene === "duckend") {
         character.src = "";
     }
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";
 
    current.choices.forEach(choice => {
     const button = document.createElement("button");
     button.innerText = choice.text;
     button.onclick = () => loadScene(choice.next);
     choicesDiv.appendChild(button);
    });
 }function typeText(text) {
     let i = 0;
     const story = document.getElementById("story");
     story.innerText = "";
     const interval = setInterval(() => {
         story.innerText += text.charAt(i);
         i++;
         if (i >= text.length) {
             clearInterval(interval);
         }
     }, 30);
 }
 function loadScene(scene) {
     const current = gameData[scene];
     document.getElementById("story").innerText = current.text;
 
     const choicesDiv = document.getElementById("choices");
     choicesDiv.innerHTML = "";
 
     current.choices.forEach(choice => {
         const button = document.createElement("button");
         button.innerText = choice.text;
         button.onclick = () => loadScene(choice.next);
         choicesDiv.appendChild(button);
     });
 }
 
 function loadScene(scene) {
     const current = gameData[scene];
     document.getElementById("story").innerText = current.text;
 
     const choicesDiv = document.getElementById("choices");
     choicesDiv.innerHTML = "";
     if (pollution >=70) {
        document.body.style.backgroundColor = "#4a0000";
     }
     else if (pollution >= 30) {
        document.body.style.backgroundColor = "#7a5a00";
     }
     else {
        document.body.style.backgroundColor = "#95C8D8";
     }

 
     current.choices.forEach(choice => {
         const button = document.createElement("button");
         button.innerText = choice.text;
         button.onclick = document.getElementById("clickSound").onplay();
          () => loadScene(choice.next);
         choicesDiv.appendChild(button);
         button.onclick =() => {
            if (choice.effect) {
                pollution += choice.effect.pollution || 0;
                energy += choice.effect.energy || 0;
            }
            updateUI();
            if (pollution >= 100) {
                unlockAchievement("Pollution Disaster");
            }
            loadScene(choice.next);
         };
         choicesDiv.appendChild(button);
     });
 }
 loadGame();
 updateUI();
 loadScene("start");
 document.getElementById("fill").style.width = "65%";
 document.body.classList.add("shake");
 choices: [
     {text: "play Again", next: "start"}
 ]
 function updateUI() {
    Document.getElementById("pollutionFill").style.width = pollution + "%";
    Document.getElementById("energyFill").style.width = energy + "%";
 }
 function saveGame() {
    localStorage.setItem("pollution", pollution);
    localStorage.setItem("energy", energy);
    alert("Game Saved");
 }
 function loadGame() {
    pollution = Number(localStorage.getItem("pollution")) || 0;
    energy = Number(localStorage.getItem("energy")) || 100;
 }
 function unlockAchievement(name) {
    if (!achievements.includes(name)) {
        achievements.push(name);
        alert("Achievement Unlocked: " + name);
    }
 }
 let pollution = 0;
 let energy = 100;
 let achievements = [];
 let inventory = [];

 const gameData = {
    start: {
        text: "You finish feeding ducks. What do you plan to do with the wrapper?",
        choices: [
            {text: "throw wrapper onto the ground",
            next: "pollutionScene",
            effect: {
                pollution: 20,
                energy: -5
            }
        },
        {
            text: "throw wrapper into the trash can",
            next: "goodScene",
            effect: {
                pollution: -10,
                energy:-12
            }
        },

        ]
    },
    pollutionScene: {
        text: "A poor innocent duck waddles over and munches on your wrapper.",
        choices: [
            {
                text: "Continue",
                next: "duckEnd",
             }
        ]
     },
     goodScene: {
        text: "You throw the wrapper into the trash can and feel a sense of accomplishment.",
        choices: [
            {
                text: "Continue",
                next: "goodEnding",
             }
        ]
     },
     duckEnd: {
        text: "The duck unable to swallow wallows in pain before collapsing. Shamed you start running away.",
        choices: [
            {
                text: "Continue",
                next: "badEnding",
            }
        ]
     },


 }
