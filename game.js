const buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;


function startOver() {
  level = 0;
  start = false;
  gamePattern = [];
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();

      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200)
    $("h1").text("gameOver!,press any key to restart");

    startOver();

  }

}


$(document).keydown(function() {
  if (!start) {

    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
  }
});
/*
function looop()
{
  if (start ==false && over == false){
    $(document).keydown(function()
    {
      start = true;
      return looop();
    });
  }
    if (start == true && over == false)
    {
      $("#level-title").text("level"+level);
      nextSequence();

      return looop();
    }
    if (start == true && over == true)
    {

    }

  }
*/
// main alg check it after touch it
function nextSequence() {
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  animatePress(randomChosenColor);

  $("#level-title").text("Level " + level);
  console.log(level);
}

// click function
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});


// sound and animated dont touch!
function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 150);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
