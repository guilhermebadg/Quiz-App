//selecionando todos os elementos necessários

const botaoStart = document.querySelector(".start_btn");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const tempoDoTexto = document.querySelector(".timer .time_left_txt");
const contarTempo = document.querySelector(".timer .timer_sec");
const sumirFooter = document.querySelector(".info_eu");
const body = document.querySelector("body")

// se clicar no botao "comecar quiz"
botaoStart.onclick = ()=>{
    info_box.classList.add("activeInfo"); 
    sumirFooter.style.display = "none"
    body.style.backgroundColor = "#1C0C5B";
}

// se clicar no botao "exit quiz"
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
    sumirFooter.style.display = "flex";
}

// se clicar no botao "continuar"
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.add("activeQuiz"); 
    showQuetions(0);
    queCounter(1); 
    startTimer(15);
    startTimerLine(0); 
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// se clicar no botao "restart quiz"
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); 
    result_box.classList.remove("activeResult"); 
    sumirFooter.style.display = "none"
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); 
    queCounter(que_numb); 
    clearInterval(counter); 
    clearInterval(counterLine);
    startTimer(timeValue); 
    startTimerLine(widthValue);
    tempoDoTexto.textContent = "Time Left";
    next_btn.classList.remove("show");
}

// se clicar no botao "quit quiz"
quit_quiz.onclick = ()=>{
    window.location.reload(); 
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// se clicar no botao "next question"
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++; 
        que_numb++;
        showQuetions(que_count); 
        queCounter(que_numb); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue); 
        startTimerLine(widthValue); 
        tempoDoTexto.textContent = "Tempo"; 
        next_btn.classList.remove("show"); 
    }else{
        clearInterval(counter);
        clearInterval(counterLine); 
        showResult(); 
    }
}

// pegando opcoes/ questoes do array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //criando uma nova tag span e div para pergunta e opção e passando o valor usando o index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; 
    
    const option = option_list.querySelectorAll(".option");

    // definir o atributo onclick para todas as opções 
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// acerto/erro das questoes
let tickIconTag = '<div class="icon tick"><i class="fas fa-check">  </i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"> </i></div>';

// se o usuario clicar em certa opcao
function optionSelected(answer){
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; 
    let correcAns = questions[que_count].answer; 
    const allOptions = option_list.children.length; 
    
    if(userAns == correcAns){ //se estiver correta
        userScore += 1; 
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{ //se estiver incorreta
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ 
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); 
    }
    next_btn.classList.add("show"); 
}

function showResult(){
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult"); 
    sumirFooter.style.display = "flex"
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ 
        let scoreTag = '<span> parabéeens! você acertou <p>'+ userScore +'</p> de <p>'+ questions.length +'</p> </span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){ 
        let scoreTag = '<span> ótimo resultado! você acertou <p>'+ userScore +'</p> de <p>'+ questions.length +'</p> </span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span> que pena :( você acertou <p>'+ userScore +'</p> de <p>'+ questions.length +'</p> </span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        contarTempo.textContent = time; 
        time--;
        if(time < 9){ 
            let addZero = contarTempo.textContent; 
            contarTempo.textContent = "0" + addZero; 
        }
        if(time < 0){ 
            clearInterval(counter);
            tempoDoTexto.textContent = ""; 
            const allOptions = option_list.children.length; 
            let correcAns = questions[que_count].answer; 
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){
                    option_list.children[i].setAttribute("class", "option correct"); 
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); 
            }
            next_btn.classList.add("show"); 
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeLine.style.width = time + "px"; 
        if(time > 549){ 
            clearInterval(counterLine); 
        }
    }
}

function queCounter(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> de <p>'+ questions.length +'</p> questões</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
}