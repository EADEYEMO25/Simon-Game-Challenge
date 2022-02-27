let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = true;
let level = 0;

$(document).on("keydown", function(){
  if (started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = false;
    }
    });


$(".btn").on("click", function(){
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
  userClickedPattern = [];
level++
$("h1").text("Level " + level);

  let randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);

}


function playSound(name) {
  let sound = new Audio("sounds/" + name + ".mp3");
        sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

    } else {

      gameOver(currentLevel);
      startOver(currentLevel);
    }
}

function gameOver(wrongAnswer) {
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
  let sound = new Audio("sounds/wrong.mp3");
        sound.play();
$("h1").text("Game Over, Press Any Key to Restart")

}

function startOver(){
  level = 0;
  gamePattern = [];
  started = true;
}
