let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let score = 0;
let play = false;
let wrong = new Audio("sounds/wrong.mp3");
let continues = true;

function nextSequence() {
    userClickedPattern = [];
    score++;
    $("#level-title").text("Score: " + score);
    var randNumber = Math.floor(Math.random() * 4);
    var randColor = buttonColors[randNumber];
    gamePattern.push(randColor);
    let next = randColor;

    pattern(next);
    playSound(next);

}
$("html").keydown(function () {
    if(!play){
        // console.log("go time");
        nextSequence();
        $("#level-title").text("Score: " + score);
        play = true;

    }
})


function pattern(next) {
    // for (let elem of gamePattern) {
        $("." + next).animate({
            opacity: 0.5,
        }, 100);

        setTimeout(() => {
            $("."+next).animate({
                opacity: 1
            }, 100);
        }, 100)
    }
// }

$(".btn").on("click", function () {
    let userChoice = this.id;
    userClickedPattern.push(userChoice);

    
    animatePressed(userChoice);
    playSound(userChoice);

    checkAnswer(userClickedPattern.length -1);

});

function checkAnswer(currentScore) {

    if (gamePattern[currentScore] === userClickedPattern[currentScore]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      restart();
    }
}


// $("#level-title").after("<h1>Score:"+score);

function animatePressed(userChoice) {
    $("." + userChoice).addClass("pressed");
    // console.log(this.classList);
    setTimeout(() => {
        $("." + userChoice).removeClass("pressed");
    }, 100);
}

const equalityCheck = (a,b) => {
    return JSON.stringify(a) === JSON.stringify(b);
}

function playSound(name){

    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function restart() {
    score = 0;
    gamePattern = [];
    play = false;
  }
