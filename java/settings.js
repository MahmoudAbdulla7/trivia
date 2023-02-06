import { Quiz } from "./quiz.js";

export class Settings{
    constructor(){
        this.categoryElement =document.getElementById("category");
        this.difficulityElement = document.getElementsByName("difficulty");
        this.numberQuiztions = document.getElementById("numberQuiz");
        document.getElementById("startBtn").addEventListener('click',this.startQuiz.bind(this))
    }
    async startQuiz(){
        let category=this.categoryElement.value;
        let difficulity =Array.from(this.difficulityElement).filter(el=>el.checked)[0].value;
        let numOfQuiztions =this.numberQuiztions.value;
        let API =`https://opentdb.com/api.php?amount=${numOfQuiztions}&category=${category}&difficulty=${difficulity}`;

        let questions = await this.fetchApi(API);

        if (questions.length>0) {

            $("#setting").fadeOut(500,()=>{
                $("#quiz").fadeIn(1000)
            });

            let quiz =new Quiz(questions);

        }
    }
    async fetchApi(API){
        let response =await fetch(API);
        response=await response.json();
        return response.results;
    }

}