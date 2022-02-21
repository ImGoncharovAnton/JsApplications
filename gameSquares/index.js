let $start = document.querySelector('#start'); // 1
let $game = document.querySelector('#game'); // 5
let $time = document.querySelector('#time'); // 37
let $result = document.querySelector('#result'); // 55
let $timeHeader = document.querySelector('#time-header'); // 51
let $resultHeader = document.querySelector('#result-header'); // 52
let $gameTime = document.querySelector('#game-time'); // 65

let colors = ['#cb356b', '#bd3f32', '#3a1c71', '#d76d77', '#283c86', '#45a247', '#8e44ad', '#155799', '#159957', '#000046', '#1cb5e0', '#2f80ed']; // 80
let score = 0; // 23
let isGameStarted = false; // 43

$start.addEventListener('click', startGame) // 2
$game.addEventListener('click', handleBoxClick); // 17
$gameTime.addEventListener('input', setGameTime); // 66

function show($el) { // 70 // рефакторинг небольшой, закидываем повторяющиеся убрать/добавить класс в отдельные функции с параметром
    $el.classList.remove('hide') // 73
}

function hide($el) { // 71
    $el.classList.add('hide') // 72
}


function startGame() { // 3
    score = 0; // 59
    setGameTime();
    $gameTime.setAttribute('disabled', true); // 68
    // $timeHeader.classList.remove('hide'); // 60 // заменяем на вызов функции, и переносим в функцию setGetTime для динамического изменения значений с поля ввода на поле заголовка.
    // $resultHeader.classList.add('hide'); // 61
    isGameStarted = true; // 44
    // $start.classList.add('hide'); // 4
    hide($start); // 76
    $game.style.backgroundColor = '#fff'; // 6

    let interval = setInterval(function() { // 36
        let time = parseFloat($time.textContent) // 37

        if (time <= 0) { // 38
            clearInterval(interval); // 42
            endGame(); // 40
        } else {
            $time.textContent = (time - 0.1).toFixed(1); // 39
        }
    }, 100)

    renderBox(); // 7
}

function setGameScore() { // 56
    $result.textContent = score.toString(); // 57
}

function setGameTime() { // 62
    // let time = 5; // 63
    let time = +$gameTime.value // 67 через "+" приводим к числу
    $time.textContent = time.toFixed(1); // 64
    show($timeHeader); // 74
    hide($resultHeader); // 75
}

function endGame() { // 41
    isGameStarted = false; // 45
    setGameScore(); // 58
    $gameTime.removeAttribute('disabled'); // 69
    // $start.classList.remove('hide'); // 48
    show($start); // 77
    $game.innerHTML = ''; // 50
    $game.style.backgroundColor = '#ccc'; // 49
    // $timeHeader.classList.add('hide'); // 53
    hide($timeHeader); // 78
    // $resultHeader.classList.remove('hide'); // 54
    show($resultHeader);// 79
}

function handleBoxClick(e) { // 18
    // console.log(e.target.dataset); // 20
    if (!isGameStarted) { // 46
        return false // 47
    }

    if (e.target.dataset.box) { // 21
        score++; // 24
        renderBox(); // 22
    }
}

function renderBox() { // 8
    $game.innerHTML = ''; // 25
    let box = document.createElement('div') // 9
    let boxSize = getRandom(30, 100); // 28
    let gameSize = $game.getBoundingClientRect(); // 30
    // console.log(gameSize); // 31 узнаем параметры нашего игрового поля.
    let maxTop = gameSize.height - boxSize; // 32
    let maxLeft = gameSize.width - boxSize; // 33
    let randomColorIndex = getRandom(0, colors.length) // 82

    // box.style.height = box.style.width = '50px' // 10
    box.style.height = box.style.width = boxSize + 'px'; // 29 
    box.style.position = 'absolute'; // 11
    // box.style.backgroundColor = '#000'; // 12
    box.style.backgroundColor = colors[randomColorIndex]; // 81
    // box.style.top = '50px'; // 14
    box.style.top = getRandom(0, maxTop) + 'px'; // 34
    // box.style.left = '70px'; // 15
    box.style.left = getRandom(0, maxLeft) + 'px'; // 35
    box.style.cursor = 'pointer'; // 16
    box.setAttribute('data-box', 'true'); // 19

    $game.insertAdjacentElement('afterbegin', box); // 13
}

function getRandom(min, max) { // 26
    return Math.floor(Math.random() * (max - min) + min) // 27
}