const STORE = [
    {
        question: 'What jersey number did Peyton Manning wear?',
        answers: [18, 16, 14, 12],
        rightAnswer: 18
    },
    {
        question: 'How many teams did Peyton Manning play for?',
        answers: [4, 2, 5, 1],
        rightAnswer: 2
    },
    {
        question: 'How many SuperBowls did Peyton Manning win?',
        answers: [0, 2, 3, 5],
        rightAnswer: 2
    },
    {
        question: 'How many touchdown passes did Peyton throw',
        answers: [200, 300, 400, 500],
        rightAnswer: 500
    },
    {
        question: 'Who caught the most touchdowns from Peyton Manning?',
        answers: ['Reggie Wayne', 'Marvin Harrison', 'Dallas Clark', 'Wes Welker'],
        rightAnswer: 'Marvin Harrison'
    }
];

let questionNum = 0;
let score = 0;

function updateScoreandQuestion() {
  $('.score-ticker').html(`<ul>
  <li>Question: ${questionNum + 1} out of 5</li>
  <li>Score: ${score} out of 5</li>
  </ul>
  `)
}


function start() {
  $('#start').on('click', function(event){
    makeQuestion(questionNum);
    
   

  })
}

function makeQuestion(question) {
  console.log(STORE[question].question);
   let questionString = $(`<section class="test area">
    <form id="peytonQuestions" class="question-form">
      
      <fieldset>
        <div class="question-container title">
          <legend>${STORE[question].question}</legend>
        </div>
        <div class="answer-container display">
        </div>
        <div class="feedback">
        </div>
        <div class="button-container">
				  <button type="submit" id="submit" > Submit </button>
          <button type = "button" id="next-question"> Next Question </button>
          <button type = "button" id="see-results"> See Results </button>
        </div>
      </fieldset>
    </form>
  </section>`);
  $("main").html(questionString);
  $('#next-question').hide();
  $('#see-results').hide();
  makeAnswers(questionNum);
    updateScoreandQuestion();
  
  
}

function makeAnswers(questNum) {
  console.log(STORE[questNum].answers);
  const answerList = STORE[questNum].answers;

  const answerSecond = answerList.map((a,i) => `<input type='radio' class='question-selector' name='selector' value='${STORE[questNum].answers[i]}' id='${STORE[questNum].answers[i]}' required>
   <label for="option${[i]+1}"> ${STORE[questNum].answers[i]}</label> <br>`);
  $('.answer-container').append(answerSecond);
  }

function showButton() {
   if (questionNum < STORE.length - 1) {
      $('#next-question').show();
   } else {
      $('#see-results').show();
   }
}

  // Listen for click on submit
function handleAnswer() {
 $('body').on('submit', '#peytonQuestions',function (event) {
   event.preventDefault();

    let answerChoice = $("input[name='selector']:checked").val();
    let correct = STORE[questionNum].rightAnswer;
    if(answerChoice == correct) {
      score++; 
     $('.feedback').append(
        `<p>You are correct! Great Work!</p>`
      );
      $('.feedback').toggleClass('good');

 } else {
   $('.feedback').append(
        `<p>You are not correct! The correct answer was ${correct}!</p>`
      );
      $('.feedback').toggleClass('bad');
 }; 
    $('#submit').hide();
    showButton();
  
  
 });
 

 }
 




// html for last page including button to restart
function displayResults() {
  $('body').on('click','#see-results', function(event)  {
  console.log('display results');
  updateScoreandQuestion();
  if (score < 4) {
    $("main").html(`<section class="test area">
    <form id="peytonQuestions" class="question-form">
      
      <fieldset>
       <section class="finalscreen title">
         <h2> Test Complete<h2>
         </section>
        <section class="scorefinal display">
          <p> Your final score was <span id="final-score-display-bad">${score} out of 5</span> which is not so fantastic. Want to try again?</p>
          </section>
        
        <section class="button-container">
				  <button type="button" id="tryAgain" > Restart Quiz </button>
        </section>
      </fieldset>
    </form>
  
  </section>`)
  } 

  else {
    $("main").html(`<section class="test area">
    <form id="peytonQuestions" class="question-form">
      
      <fieldset>
       <section class="finalscreen title">
         <h2> Test Complete<h2>
         </section>
        <section class="scorefinal display">
          <p> Your final score was <span id="final-score-display-good">${score} out of 5</span> which is fantastic. You are a true fan of Peyton Manning.</p>
          <br>
          <p>Want to try again?</p>
          </section>
        
        <section class="button-container">
				  <button type="button" id="tryAgain" > Restart Quiz </button>
        </section>
      </fieldset>
    </form>
  
  </section>`)
  }
  })
  


}
// Add one to the question count
// render question
// Need function to display display results 
// Need final results screen
function nextQuestion() {
 $('body').on('click','#next-question', function(event)  {
     questionNum++;
     makeQuestion(questionNum);
   });
}


function resetStats() {
  console.log('resetStats ran');
  score = 0;
  questionNum = 0;
}

// listen for restart button click
// Reset stats
// run generate question

function restartQuiz() {
  $('body').on('click','#tryAgain', function(event) {
    resetStats();
    makeQuestion(questionNum);
  });
}





function makeQuiz() {
start();
handleAnswer();
nextQuestion();
displayResults();
restartQuiz();
}

$(makeQuiz);