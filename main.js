// initialize variables
var questionID, question, choiceA, choiceB, choiceC, choiceD, questions, numQuestions, qInfo,
current = 0;
score = 0,
points = [];
/*above add the following variables and element references to the beginning of our JavaScript file:
 score, userChoice, and the points array.*/

var defaultQuestions = [
{
    question: "Where are the three smallest bones in the human body?",
    choiceA: "middle ear",
    choiceB: "nose",
    choiceC: "toes",
    choiceD: "eyes",
    correct: "A"
},
{
    question: "What is the most abundant element in the Universe?",
    choiceA: "Helium",
    choiceB: "Oxygen",
    choiceC: "Lithium",
    choiceD: "Hydrogen",
    correct: "D"
},
{
    question: "Approximately how long does it take for light to travel from the Sun's surface to the Earth?",
    choiceA: "8 days",
    choiceB: "8 seconds",
    choiceC: "8 minutes",
    choiceD: "8 hours",
    correct: "C"
},
{
    question: "What is 10/2?",
    choiceA: "5",
    choiceB: "2",
    choiceC: "8",
    choiceD: "9",
    correct: "A"
},
{
    question: "Which planet has the most moons?",
    choiceA: "Saturn",
    choiceB: "Mars",
    choiceC: "Jupiter",
    choiceD: "Uranus",
    correct: "C"
},
{
    question: "Who was the best NBA player ever?",
    choiceA: "Kareem Abdul-Jabbar",
    choiceB: "Michael Jordan",
    choiceC: "Wilt Chamberlain",
    choiceD: "Kobe Bryant",
    correct: "B"
},
{
    question: "NaCl is the chemical formula of?",
    choiceA: "Sodium chloride",
    choiceB: "Nitrous chloride",
    choiceC: "Ammonia",
    choiceD: "Nano calcium",
    correct: "A"
},
{
    question: "What is the first element on the periodic table?",
    choiceA: "Sodium",
    choiceB: "Oxygen",
    choiceC: "Hydrogen",
    choiceD: "Helium",
    correct: "C"
}];


// reference HTML elements
var elQuiz = document.getElementById("quiz");
var elQuizStatus = document.getElementById("quizStatus");

var elQuestion = document.getElementById("question");
var elChoiceA = document.getElementById("choiceA");
var elChoiceB = document.getElementById("choiceB");
var elChoiceC = document.getElementById("choiceC");
var elChoiceD = document.getElementById("choiceD");
var elChoices = document.getElementsByName('choices');

/*The populateQuestions() function populates the questions array with the set of default questions, plus the set of
questions stored in local storage, if any. We also update the numQuestions variable, which is used later to display user progress
The populateQuestionInfo() function populates application variables with question info for the current question.
The renderQuestion() function updates the HTML elements to display the current question and answer choices,
along with the user progress indicator.*/
// start quiz
populateQuestions();
renderQuestion();
document.getElementById("submit").onclick = gradeQuestion;

function populateQuestions(){
    // populate with default questions
    questions = defaultQuestions;
    // if local storage contains questions, add to question set
    if(localStorage.getItem("questions")){
        var storedQuestions = JSON.parse(localStorage.getItem("questions"));
        for(var i = 0; i < storedQuestions.length; i++){
            questions.push(storedQuestions[i]);
        }
    }
    numQuestions = questions.length;
}

function populateQuestionInfo(){
    // populate current question info from question list
    question = questions[current].question;
    qInfo = questions[current];
    choiceA = qInfo.choiceA;
    choiceB = qInfo.choiceB;
    choiceC = qInfo.choiceC;
    choiceD = qInfo.choiceD;
    correct = qInfo.correct;
}

function renderQuestion(){
    // display question on webpage
    questionID = current + 1;
    elQuizStatus.innerHTML = "Question " + (questionID) + " of " + (numQuestions);
    populateQuestionInfo();
    elQuestion.innerHTML = question;
    elChoiceA.innerHTML = choiceA;
    elChoiceB.innerHTML = choiceB;
    elChoiceC.innerHTML = choiceC;
    elChoiceD.innerHTML = choiceD;
}

function gradeQuestion(){
    if(getUserChoice()){
        if(userChoice == questions[current].correct){
            score++;
            points[current] = 1;
        }
        else{
            points[current] = 0;
        }
        if(current == questions.length-1){
            endGame();
      }
        else{
        // next question
        current++;
        renderQuestion();
    }
  }
}
/*Add a click event handler to the submit button, specifying the gradeQuestion function as the event handler
Define the getUserChoice() function, which loops through the answer choice radio buttons to identify the choice selected by the user. This function updates the userChoice variable with the selected answer choice and returns true if there was a selected answer, or displays an alert to the user and returns false otherwise.
Define the gradeQuestion() function, which compares the user choice (if selected) to the correct answer for the current question. This function updates the score variable if the answer was correct, and stores the appropriate value in the scores array. It then updates the current variable to point to the next question and calls the renderQuestion() function to display the next question.
Test!*/


function getUserChoice(){
    for (var i = 0, length = elChoices.length; i < length; i++)
    {
        if (elChoices[i].checked)
        {
            userChoice = elChoices[i].value;

            // clear radio input for next question
            elChoices[i].checked = false;

            return true;
        }
    }
    // user didn't select an answer
    alert("Please select an answer before continuing");
    return false;
}

function endGame(){
    elQuiz.innerHTML = "<h2>Your Score: " + score + " out of " + numQuestions + "</h2>";
    for(var i = 0; i < points.length; i++){
        var summary = document.createElement("p");
        if(points[i] == 0){
            summary.innerHTML = "Question #" + (i+1) + ": INCORRECT";
            summary.style.color = "red";
        }
        else{
            summary.innerHTML = "Question #" + (i+1) + ": CORRECT!";
            summary.style.color = "green";
        }
        elQuiz.appendChild(summary);
    }
    document.getElementById("options").style.display = "block";

}
