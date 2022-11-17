let cards = document.querySelectorAll('.card');
let backCard = document.querySelectorAll('.back_card');
let btnStart = document.querySelector('.start');

let flippedCard = false;
let flipLock = false;
let firstCard, secondCard;
let count = 0;

btnStart.addEventListener('click', startGame);

//перемешиваем и играем
function startGame() {
    btnStart.classList.add('finish');
    btnStart.textContent = 'Finish';

    showCard();
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 10);
        card.style.order = ramdomPos;
    });   

    cards.forEach(card => card.addEventListener('click', flipCard));

    let btnFinish = document.querySelector('.finish');
    btnFinish.addEventListener('click', finishGame);
}

//демонстрация
function showCard() {
    $(backCard).css('visibility', 'hidden');    
    setInterval(() => {
        $(backCard).css('visibility', 'visible');
    }, 2500);
}

//переворачиваем карты
function flipCard(){
    if (flipLock) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!flippedCard){
        flippedCard = true;
        firstCard = this;
        return;
    } secondCard = this;

    checkCards();
}

//проверка
function checkCards(){
    if(firstCard.dataset.id === secondCard.dataset.id){
        stopCards();
        return;
    }else{
        continueCards();        
    }
}

//совпали
function stopCards(){
    firstCard.removeEventListener ('click', flipCard);
    secondCard.removeEventListener ('click', flipCard);
    
    count++;
    if(count ===5){
        win();
    }
    resetCards();
}

//не совпали
function continueCards(){
    flipLock = true;

    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetCards();
    }, 2000);
}

//сброс карт
function resetCards() {
    [flippedCard, flipLock] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//победа
function win(){
    let win = document.createElement('div');
    win.innerText = 'You win!';
    win.style.padding = '20px';
    win.style.backgroundColor = 'green';
    win.style.color = 'white';
    win.style.fontSize = '30px';
    win.style.margin = '10px auto';
    win.style.width = '200px';
    win.style.position = 'absolute';
    win.style.top = '40%';
    win.style.left = '50%';
    win.style.borderRadius = '5px';
    win.style.opacity = '1';
    document.body.appendChild(win);
    document.body.style.opacity = '0.5';
    btnStart.classList.remove('finish');
    btnStart.textContent = 'Start';
    setTimeout(()=>{
        win.style.display = 'none';
        document.body.style.opacity = '1';
        cards.forEach(card => {
            card.classList.remove('flip');
        });
        count = 0;
    }, 2000);
};

function finishGame(){
    cards.forEach(card => {

        card.classList.remove('flip');
    });
    btnStart.classList.remove('finish');
    btnStart.textContent = 'Start';
    count = 0;
}