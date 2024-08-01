const typingText = document.querySelector('.typing-text p')
const input = document.querySelector('.wrapper .input-field')
const time = document.querySelector('.time span b')
const mistakes = document.querySelector('.mistake span')
const wpm = document.querySelector('.wpm span')
const cpm = document.querySelector('.cpm span')
const btn = document.querySelector('button')

//set values
let timer;
let maxTime=60;
let timeLeft= maxTime;
let charIndex=0;
let mistake=0;
let isTyping=false;

function loadParagraph(){
    const paragraph=["The beautiful sunset painted the sky in hues of orange and pink, casting a warm glow over the tranquil lake", "As the orchestra played the final notes of the symphony, the audience erupted into a standing ovation, applauding the musicians' exceptional performance", "The aroma of freshly brewed coffee filled the air, mingling with the scent of pastries baking in the oven, creating a cozy atmosphere in the café", "Despite the challenges they faced during their journey, the group remained determined to reach the summit of the mountain, encouraged by each other’s unwavering support", "She spent the entire afternoon organizing her collection of vintage books, carefully dusting each one and arranging them alphabetically on the shelves", "The old man shared stories of his youth, recounting adventures and experiences that shaped his life, captivating everyone gathered around him", "The vibrant flowers in the garden attracted a variety of butterflies and bees, creating a lively and colorful display of nature’s beauty", "As the plane soared above the clouds, passengers marveled at the breathtaking view of the landscape below, stretching as far as the eye could see", "After months of meticulous planning and preparation, the event went off without a hitch, leaving the organizers and attendees feeling incredibly satisfied", "The little girl held her mother’s hand tightly as they walked through the bustling market, her eyes wide with wonder at the array of sights and sounds surrounding her"];
    const randomIndex = Math.floor(Math.random()*paragraph.length);
    typingText.innerHTML='';
    for(const char of paragraph[randomIndex]){
        console.log(char)
        typingText.innerHTML +=`<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',()=>input.focus());
    typingText.addEventListener("click",()=>{input.focus()});
}

//handling user input
function initTyping(){
    const char=typingText.querySelectorAll('span');
    const typedChar=input.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft > 0){
        if(!isTyping){
            timer = setInterval(initTime,1000);
            isTyping=true;
        }
        if(char[charIndex].innerText === typedChar){
            char[charIndex].classList.add('correct');
            console.log("correct");
        } 
        else{
            mistake++;
            char[charIndex].classList.add('incorrect');
            console.log("incorrect");
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistakes.innerText = mistake;
        cpm.innerText=charIndex-mistake;
    }
    else{
        clearInterval(timer);
        input.value='';
    }
}

function initTime(){
    if(timeLeft>0)
    {
        timeLeft--;
        time.innerText=timeLeft;
        let wpmVal = Math.round(((charIndex - mistake)/5) /  (maxTime - timeLeft)*60);
        wpm.innerText=wpmVal;
    }
    else{
        clearInterval(timer);
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText = timeLeft;
    input.value='';
    charIndex = 0;
    mistake = 0;
    isTyping = false;   
    wpm.innerText=0;
    cpm.innerText=0;
    mistakes.innerText=0;
}

input.addEventListener("input",initTyping);
btn.addEventListener("click",reset);
loadParagraph();