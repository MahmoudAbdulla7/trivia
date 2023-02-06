export class Quiz{

    constructor(questions){

        this.score=0;
        this.questions=questions;
        this.currQuestion=0;
        this.numOfQuestions=this.questions.length;
        this.showQuestions()
        // console.log(this.questions);

        document.getElementById("next").addEventListener('click',this.nextQuestion.bind(this));

        $("#tryBtn").click(()=>{
            $("#score").fadeOut(500,()=>{
                $("#setting").fadeIn(500)
            })
        })
        
    }

    shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    showQuestions(){

        let answers =[this.questions[this.currQuestion].correct_answer,...this.questions[this.currQuestion].incorrect_answers];

        console.log(answers);
        this.shuffle(answers)
        console.log(answers);

        document.getElementById("numQues").innerHTML=`${this.currQuestion +1} Of ${this.numOfQuestions} Questions`
        let answerRow=''
        for (let i = 0; i < answers.length; i++) {
            answerRow+=`<label class="mt-2 ms-3">
            <input class="form-check-input" type="radio" name="answer" value="${answers[i]}">
            ${answers[i]}
        </label>
        <br/>`
        
        }

        document.getElementById("question").innerHTML= this.questions[0].question;
        document.getElementById("rowAnswer").innerHTML=answerRow;
    }

    nextQuestion(){

        let correctAnswer=this.questions[this.currQuestion].correct_answer;
        let userAnswer= Array.from(document.getElementsByName("answer")).filter(el=>el.checked)[0].value;
        this.checkAnswer(correctAnswer,userAnswer);
        this.currQuestion++;
        
        if (this.numOfQuestions>this.currQuestion) {
            
            this.showQuestions();
        }
        else
        {
            $("#quiz").fadeOut(500,()=>{$("#score").fadeIn(500)})
            document.getElementById("scoreValue").innerHTML=this.score;
        }
    }

    checkAnswer(correctAnswer,userAnswer){

        if (correctAnswer==userAnswer) {
            this.score++
            console.log(this.score);
            $("#correct").fadeIn(500).fadeOut(500);
        }
        else
        {
            $("#incorrect").fadeIn(500).fadeOut(500);
        }
    }
}