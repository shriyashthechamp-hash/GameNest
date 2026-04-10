

const GAMES_API = 'https://www.freetogame.com/api/games';
const QUOTES_API = 'https://dummyjson.com/quotes/random';

let exploreGames = [];

document.addEventListener('DOMContentLoaded', () => {
    const localGamesContainer = document.getElementById('localGamesContainer');
    const exploreContainer = document.getElementById('exploreContainer');
    const loadingGames = document.getElementById('loadingGames');
    
    const dashboard = document.getElementById('dashboard');
    const gameLoader = document.getElementById('gameLoader');
    const gameView = document.getElementById('gameView');
    
 
    const localGameContainer = document.getElementById('localGameContainer');
    const localTomJerry = document.getElementById('local_tomjerry');
    const localRps = document.getElementById('local_rps');
    const localTodo = document.getElementById('local_todo');
    const localTicTacToe = document.getElementById('local_tictactoe');
    const localMemory = document.getElementById('local_memory');
    const localReaction = document.getElementById('local_reaction');
    const localGuess = document.getElementById('local_guess');

    const loaderGameTitle = document.getElementById('loaderGameTitle');
    const funFact = document.getElementById('funFact');

    const viewTitle = document.getElementById('viewTitle');
    const viewImage = document.getElementById('viewImage');
    const viewThumbnail = document.getElementById('viewThumbnail');
    const viewGenre = document.getElementById('viewGenre');
    const viewPlatformText = document.getElementById('viewPlatformText');
    const viewDescription = document.getElementById('viewDescription');
    const viewPlayBtn = document.getElementById('viewPlayBtn');
    const closeGameBtn = document.getElementById('closeGameBtn');


    const LOCAL_GAMES = [
        {
            id: 'local_1',
            title: 'Tom & Jerry Grid Explorer',
            thumbnail: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            short_description: 'An exclusive original mini-game. Catch Jerry in a strategic grid pursuit using precise movements!',
            platform: 'Web Browser',
            genre: 'Strategy',
            isLocal: true,
            localId: 'local_tomjerry'
        },
        {
            id: 'local_2',
            title: 'Rock Paper Scissors Ultimate',
            thumbnail: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            short_description: 'The classic hand game reinvented with intense stakes. Defeat the computer and trigger confetti explosions!',
            platform: 'Web Browser',
            genre: 'Action',
            isLocal: true,
            localId: 'local_rps'
        },
        {
            id: 'local_3',
            title: 'Mission Log (To-Do List)',
            thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            short_description: 'Track your daily quests, add new tasks, and conquer your day one chore at a time.',
            platform: 'Web Browser',
            genre: 'Productivity',
            isLocal: true,
            localId: 'local_todo'
        },
        {
            id: 'local_4',
            title: 'Tic Tac Toe',
            thumbnail: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=800&q=80',
            short_description: 'The classic X and O board game! Take turns and be the first to get three in a row.',
            platform: 'Web Browser',
            genre: 'Board Game',
            isLocal: true,
            localId: 'local_tictactoe'
        },
        {
            id: 'local_5',
            title: 'Memory Card Game',
            thumbnail: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80',
            short_description: 'Flip cards to find matching pairs! Test your memory to clear the board in the fewest moves.',
            platform: 'Web Browser',
            genre: 'Puzzle',
            isLocal: true,
            localId: 'local_memory'
        },
        {
            id: 'local_6',
            title: 'Reaction Time Game',
            thumbnail: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?auto=format&fit=crop&w=800&q=80',
            short_description: 'How fast are your reflexes? Wait for the green signal, then click!',
            platform: 'Web Browser',
            genre: 'Reflex',
            isLocal: true,
            localId: 'local_reaction'
        },
        {
            id: 'local_7',
            title: 'Number Guessing Game',
            thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
            short_description: 'Guess the secret number between 1 and 100! Use hints to zero in on the answer.',
            platform: 'Web Browser',
            genre: 'Puzzle',
            isLocal: true,
            localId: 'local_guess'
        }
    ];

    function createGameCard(game) {
        const card = document.createElement('div');
        card.className = "bg-surface-container-highest rounded-2xl overflow-hidden group hover:shadow-[0_20px_50px_-12px_rgba(186,158,255,0.2)] transition-all duration-500 flex flex-col h-full border border-outline-variant/10 cursor-pointer hover:-translate-y-1";
        
        let genreText = game.genre || "Game";

        let badge = '';
        if (game.isLocal) {
            badge = `<div class="absolute top-4 left-4 bg-secondary text-black text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg tracking-widest uppercase">MY ORIGINAL</div>`;
        }
        
        let ratingBadge = '';

        card.innerHTML = `
            <div class="relative aspect-video overflow-hidden bg-surface-container">
                <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                     src="${game.thumbnail || ''}" 
                     onerror="this.src='https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800'"
                     loading="lazy" />
                ${badge}
            </div>
            <div class="p-6 flex flex-col flex-grow relative bg-surface-container-highest">
                <h4 class="text-xl font-headline font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">${game.title}</h4>
                <p class="text-on-surface-variant text-sm flex-grow leading-relaxed line-clamp-2 mb-2">${game.isLocal ? game.short_description : genreText}</p>
            </div>
        `;
        card.addEventListener('click', () => openGame(game));
        return card;
    }

    function renderLocalGames() {
        if(!localGamesContainer) return;
        localGamesContainer.innerHTML = '';
        LOCAL_GAMES.forEach(game => {
            localGamesContainer.appendChild(createGameCard(game));
        });
    }

    function renderExploreGames(gamesList) {
        if(!exploreContainer) return;
        exploreContainer.innerHTML = '';
        if (gamesList.length === 0) {
            exploreContainer.innerHTML = `<p class="text-on-surface-variant col-span-full py-8 text-center text-lg">No games found.</p>`;
            return;
        }

        gamesList.forEach(game => {
            exploreContainer.appendChild(createGameCard(game));
        });
    }

    async function openGame(game) {
        dashboard.classList.add('opacity-0');
        
        setTimeout(async () => {
            dashboard.classList.add('hidden');
            gameLoader.classList.remove('hidden');
            
            requestAnimationFrame(() => {
                gameLoader.classList.remove('opacity-0');
            });

            // Set fun fact quotes
            loaderGameTitle.textContent = `Warming up "${game.title}"...`;
            funFact.textContent = "Connecting to matchmaking servers...";
            try {
                const quoteRes = await fetch(QUOTES_API);
                const quoteData = await quoteRes.json();
                funFact.textContent = `"${quoteData.quote}" - ${quoteData.author}`;
            } catch (e) {
                funFact.textContent = "Tip: Make sure you stretch before an intense gaming session!";
            }

            const fallbackImg = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800';
            viewTitle.textContent = game.title;
            
            viewImage.src = game.thumbnail || fallbackImg;
            viewImage.onerror = () => { viewImage.src = fallbackImg; };
            
            viewThumbnail.src = game.thumbnail || fallbackImg;
            viewThumbnail.onerror = () => { viewThumbnail.src = fallbackImg; };

            viewGenre.textContent = game.genre || "Game";
            
            let pName = game.platform || "Various";
            viewPlatformText.textContent = pName;
            
            viewDescription.textContent = game.short_description || "Experience one of the free-to-play games fetched from our API! Full descriptions are available natively on the chosen platform.";
            

            localGameContainer.classList.add('hidden');
            localTomJerry.classList.add('hidden');
            localRps.classList.add('hidden');
            localTodo.classList.add('hidden');
            if (localTicTacToe) localTicTacToe.classList.add('hidden');
            if (localMemory) localMemory.classList.add('hidden');
            if (localReaction) localReaction.classList.add('hidden');
            if (localGuess) localGuess.classList.add('hidden');
            viewPlayBtn.classList.add('hidden');

            if (game.isLocal) {
                // Show specific local game container
                localGameContainer.classList.remove('hidden');
                document.getElementById(game.localId).classList.remove('hidden');
            
                if (game.localId === 'local_tomjerry') window.initTomJerry();
                if (game.localId === 'local_rps') window.initRPS();
                if (game.localId === 'local_todo') window.initTodo();
                if (game.localId === 'local_tictactoe') window.initTicTacToe();
                if (game.localId === 'local_memory') window.initMemory();
                if (game.localId === 'local_reaction') window.initReaction();
                if (game.localId === 'local_guess') window.initGuess();
            } else {
         
                viewPlayBtn.href = `#`; 
                viewPlayBtn.classList.remove('hidden');
                viewPlayBtn.style.display = "inline-flex";
            }

            setTimeout(() => {
                gameLoader.classList.add('opacity-0');
                setTimeout(() => {
                    gameLoader.classList.add('hidden');
                    gameView.classList.remove('hidden');
                    window.scrollTo(0,0);
                    requestAnimationFrame(() => {
                        gameView.classList.remove('opacity-0');
                    });
                }, 500);
            }, 2500);

        }, 300);
    }

    closeGameBtn.addEventListener('click', () => {
        gameView.classList.add('opacity-0');
        setTimeout(() => {
            gameView.classList.add('hidden');
            dashboard.classList.remove('hidden');
            window.scrollTo(0,0);
            requestAnimationFrame(() => {
                dashboard.classList.remove('opacity-0');
            });
        }, 300);
    });

    async function initializeGames() {
        renderLocalGames();
        
        const PROXY_URL = "https://corsproxy.io/?";
        const API_URL = "https://www.freetogame.com/api/games";

        try {
            const response = await fetch(PROXY_URL + encodeURIComponent(API_URL));
            const data = await response.json();
            

            exploreGames = Array.isArray(data) ? data.slice(0, 24) : [];
            
            if (loadingGames) loadingGames.classList.add('hidden');
            renderExploreGames(exploreGames);

        } catch (error) {
            console.error("API error:", error);
            if (loadingGames) {
                loadingGames.innerHTML = `<p class="text-error font-semibold text-xl">Could not retrieve global games database. Retrying network link...</p>`;
            }
        }
    }


    initializeGames();

});



let tomJerryInitialized = false;
window.initTomJerry = function() {
    if (tomJerryInitialized) return;
    tomJerryInitialized = true;
    const startBtn = document.getElementById('startBtn');
    const status = document.getElementById('status');
    const gridEl = document.getElementById('grid');
    const controls = {
        up: document.getElementById('up'),
        down: document.getElementById('down'),
        left: document.getElementById('left'),
        right: document.getElementById('right')
    };

    let size = 3;
    let tomX = 0, tomY = 0;
    let jerryX = 2, jerryY = 1;
    let running = false;

    function updateStatus(msg) {
        if(status) status.textContent = msg;
    }

    function renderGrid() {
        if(!gridEl) return;
        gridEl.innerHTML = '';
        for (let i = 0; i < size; i++) {
            const row = document.createElement('div');
            row.className = 'row';
            for (let j = 0; j < size; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell flex items-center justify-center font-bold text-white';
                if (i === tomX && j === tomY) {
                    cell.classList.add('bg-blue-500');
                    cell.textContent = 'Tom';
                } else if (i === jerryX && j === jerryY) {
                    cell.classList.add('bg-orange-500');
                    cell.textContent = 'Jerry';
                } else {
                    cell.classList.add('bg-[#3b3b5a]');
                }
                
                row.appendChild(cell);
            }
            gridEl.appendChild(row);
        }
    }

    function checkWin() {
        if (tomX === jerryX && tomY === jerryY) {
            updateStatus(`🎉 Tom found Jerry at (${tomX},${tomY})`);
            running = false;
            return true;
        }
        return false;
    }

    function moveTom(dir) {
        if (!running) return;
        if (dir === 'up' && tomX > 0) tomX--;
        else if (dir === 'down' && tomX < size - 1) tomX++;
        else if (dir === 'left' && tomY > 0) tomY--;
        else if (dir === 'right' && tomY < size - 1) tomY++;
        else {
            updateStatus('Invalid move');
            return;
        }
        renderGrid();
        if (!checkWin()) updateStatus(`Tom at (${tomX},${tomY})`);
    }

    if(startBtn) {
        startBtn.addEventListener('click', () => {
            size = 3; tomX = 0; tomY = 0; jerryX = 2; jerryY = 1; running = true;
            updateStatus('Game started — move Tom with the arrows or buttons');
            renderGrid();
        });
    }

    if(controls.up) controls.up.addEventListener('click', () => moveTom('up'));
    if(controls.down) controls.down.addEventListener('click', () => moveTom('down'));
    if(controls.left) controls.left.addEventListener('click', () => moveTom('left'));
    if(controls.right) controls.right.addEventListener('click', () => moveTom('right'));

    document.addEventListener('keydown', (e) => {
        // Only run if the local game container is active
        const localContainer = document.getElementById('local_tomjerry');
        if (!localContainer || localContainer.classList.contains('hidden')) return;

        if (!running) return;
        if (e.key === 'ArrowUp') moveTom('up');
        if (e.key === 'ArrowDown') moveTom('down');
        if (e.key === 'ArrowLeft') moveTom('left');
        if (e.key === 'ArrowRight') moveTom('right');
    });

    if(gridEl) {
        renderGrid();
    }
};


let rpsInitialized = false;
window.initRPS = function() {
    if (rpsInitialized) return;
    rpsInitialized = true;

    let btn1 = document.getElementById("btn_chakka")
if(btn1) {
    btn1.addEventListener("click", function() {
        let user  = prompt("Choose something from rock paper or scissors");
        if(user) bro(user.toLowerCase());
    });
}

let score = 0;
const scoreEl = document.querySelector('.score');

function updateScore(amount = 1) {
    score += amount;
    if (scoreEl) scoreEl.textContent = score;
}

function bro(user){
    let comp = Math.random();
    let move = "";
    if (comp < 0.34){
        move = "rock";
    }
    else if (comp <= 0.64){
        move = "paper";
    }
    else{
        move = "scissors";
    }
    if (move == user){
        alert("Less gooo draw hai bhaiiii !!");
    }
    else if (user == "rock" && move == "scissors"){
        
        alert("Jeet gye baby");
        updateScore();
        triggerConfetti();

    }
    else if(user == "paper" && move == "rock"){
        alert("Yayyy jeet gaye");
        updateScore();
        triggerConfetti();
    }
    else if(user == "scissors" && move == "paper"){
        alert("Lesss go bahiiii jeet gye");
        updateScore();
        triggerConfetti();
    }
    else{
        alert("Shit Yrr Haar gya mein tohhh")
    }
}

function triggerConfetti() {
    if(typeof confetti !== 'undefined') {
        var count = 200;
        var defaults = { origin: { y: 0.7 } };

        function fire(particleRatio, opts) {
            confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
            }));
        }

        fire(0.25, { spread: 26, startVelocity: 55, });
        fire(0.2, { spread: 60, });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45, });
    }
}
};

let todoInitialized = false;
window.initTodo = function() {
    if (todoInitialized) return;
    todoInitialized = true;

let obj = {
    names :"Messi",
    age: 38,
    country: "Argentina",
    isGoat: true,
    clubs: ["barca" , "psg" ,"miami"],
    isretired: null,
    greet: function(){
        console.log("Hi")
    }
}

let inp = document.getElementById("add");
let kaam = document.getElementsByClassName("aaj_ke_kaam")[0];
let task_btn = document.getElementsByClassName("task_btn")[0];

if(task_btn && inp && kaam) {
    task_btn.addEventListener("click", () => {
        let taskText = inp.value;

        if (taskText === "") return;
        let kaam_kar_bhadwe = document.createElement("div");
        kaam_kar_bhadwe.className = "flex items-center gap-3 p-4 bg-surface-container-high rounded-xl border border-outline-variant/30";

        kaam_kar_bhadwe.innerHTML = `
            <input type="checkbox" class="w-5 h-5 accent-primary border-none rounded">
            <span class="text-on-surface font-semibold flex-1">${taskText}</span>
        `;

        kaam.appendChild(kaam_kar_bhadwe);
        inp.value = "";
    });
}

let deleteButtons = document.getElementsByClassName("delete");

let vada = new Promise((resolve) => {})
console.log(vada)
};
// ==========================================
// NEW GAMES — INIT FUNCTIONS
// ==========================================

let tttInitialized = false;
window.initTicTacToe = function() {
    if (tttInitialized) return;
    tttInitialized = true;

    let tttBoard = Array(9).fill('');
    let currentPlayer = 'X';
    let gameOver = false;

    const boardEl = document.getElementById('tttBoard');
    const statusEl = document.getElementById('tttStatus');
    const currentPlayerEl = document.getElementById('tttCurrentPlayer');
    const resetBtn = document.getElementById('tttResetBtn');

    function renderTTT() {
        if (!boardEl) return;
        boardEl.innerHTML = '';
        tttBoard.forEach((val, i) => {
            const div = document.createElement('div');
            div.className = 'ttt-cell' + (val === 'X' ? ' x' : val === 'O' ? ' o' : '');
            div.textContent = val;
            div.addEventListener('click', () => makeMoveTTT(i));
            boardEl.appendChild(div);
        });
    }

    function makeMoveTTT(i) {
        if (tttBoard[i] !== '' || gameOver) return;
        tttBoard[i] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayerEl) currentPlayerEl.textContent = currentPlayer;
        renderTTT();
        checkTTTWinner();
    }

    function checkTTTWinner() {
        const wins = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];
        for (let [a,b,c] of wins) {
            if (tttBoard[a] && tttBoard[a] === tttBoard[b] && tttBoard[a] === tttBoard[c]) {
                if (statusEl) statusEl.textContent = `🎉 Player ${tttBoard[a]} wins!`;
                gameOver = true;
                return;
            }
        }
        if (!tttBoard.includes('')) {
            if (statusEl) statusEl.textContent = "It's a draw!";
            gameOver = true;
        }
    }

    function resetTTT() {
        tttBoard = Array(9).fill('');
        currentPlayer = 'X';
        gameOver = false;
        if (currentPlayerEl) currentPlayerEl.textContent = 'X';
        if (statusEl) statusEl.textContent = 'Your move, X!';
        renderTTT();
    }

    if (resetBtn) resetBtn.addEventListener('click', resetTTT);
    renderTTT();
};


let memoryInitialized = false;
window.initMemory = function() {
    if (memoryInitialized) return;
    memoryInitialized = true;

    const emojis = ['🎮','🎮','🎯','🎯','🃏','🃏','🎲','🎲','⭐','⭐','🏆','🏆'];
    let cards = [...emojis].sort(() => Math.random() - 0.5);
    let firstCard = null, secondCard = null;
    let moves = 0, matched = 0, locked = false;

    const boardEl = document.getElementById('memoryBoard');
    const movesEl = document.getElementById('memoryMoves');
    const statusEl = document.getElementById('memoryStatus');
    const resetBtn = document.getElementById('memoryResetBtn');

    function renderMemory() {
        if (!boardEl) return;
        boardEl.innerHTML = '';
        cards.forEach((emoji, i) => {
            const div = document.createElement('div');
            div.className = 'memory-card';
            div.dataset.index = i;
            div.dataset.value = emoji;
            div.addEventListener('click', () => flipCard(div));
            boardEl.appendChild(div);
        });
    }

    function flipCard(el) {
        if (locked || el.classList.contains('flipped') || el.classList.contains('matched')) return;
        el.textContent = el.dataset.value;
        el.classList.add('flipped');
        if (!firstCard) {
            firstCard = el;
        } else {
            secondCard = el;
            moves++;
            if (movesEl) movesEl.textContent = moves;
            locked = true;
            if (firstCard.dataset.value === secondCard.dataset.value) {
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');
                firstCard = null; secondCard = null;
                locked = false;
                matched += 2;
                if (matched === cards.length && statusEl) {
                    statusEl.textContent = `🎉 You won in ${moves} moves!`;
                }
            } else {
                const f = firstCard, s = secondCard;
                setTimeout(() => {
                    f.textContent = ''; s.textContent = '';
                    f.classList.remove('flipped'); s.classList.remove('flipped');
                    firstCard = null; secondCard = null;
                    locked = false;
                }, 900);
            }
        }
    }

    function resetMemory() {
        cards = [...emojis].sort(() => Math.random() - 0.5);
        firstCard = null; secondCard = null;
        moves = 0; matched = 0; locked = false;
        if (movesEl) movesEl.textContent = 0;
        if (statusEl) statusEl.textContent = '';
        renderMemory();
    }

    if (resetBtn) resetBtn.addEventListener('click', resetMemory);
    renderMemory();
};


let reactionInitialized = false;
window.initReaction = function() {
    if (reactionInitialized) return;
    reactionInitialized = true;

    const box = document.getElementById('reactionBox');
    const startBtn = document.getElementById('reactionStartBtn');
    const resultEl = document.getElementById('reactionResult');
    let reactionStartTime = null;
    let reactionTimeout = null;
    let waiting = false;

    function resetBox() {
        if (!box) return;
        box.style.background = '#2a1f49';
        box.style.border = '2px solid rgba(186,158,255,0.2)';
        box.style.color = '#dee5ff';
        box.textContent = 'Click Start to begin';
    }

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            if (reactionTimeout) clearTimeout(reactionTimeout);
            if (resultEl) resultEl.textContent = '';
            if (!box) return;
            box.style.background = '#7f1d1d';
            box.style.border = '2px solid #ef4444';
            box.style.color = '#fca5a5';
            box.textContent = 'Wait for green...';
            waiting = true;
            reactionStartTime = null;
            reactionTimeout = setTimeout(() => {
                box.style.background = '#14532d';
                box.style.border = '2px solid #4ade80';
                box.style.color = '#86efac';
                box.textContent = 'CLICK NOW!';
                reactionStartTime = Date.now();
                waiting = false;
            }, Math.random() * 3000 + 1000);
        });
    }

    if (box) {
        box.addEventListener('click', () => {
            if (waiting) {
                if (reactionTimeout) clearTimeout(reactionTimeout);
                if (resultEl) resultEl.textContent = '⚠️ Too early! Try again.';
                resetBox();
                waiting = false;
                return;
            }
            if (!reactionStartTime) return;
            const time = Date.now() - reactionStartTime;
            if (resultEl) resultEl.textContent = `⚡ ${time}ms — ${time < 250 ? 'Incredible!' : time < 400 ? 'Great!' : 'Keep practicing!'}`;
            reactionStartTime = null;
            resetBox();
        });
    }
};


let guessInitialized = false;
window.initGuess = function() {
    if (guessInitialized) return;
    guessInitialized = true;

    let secret = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;

    const inputEl = document.getElementById('guessInput');
    const guessBtn = document.getElementById('guessBtn');
    const msgEl = document.getElementById('guessMsg');
    const attemptsEl = document.getElementById('guessAttempts');
    const resetBtn = document.getElementById('guessResetBtn');

    function checkGuess() {
        if (!inputEl || !msgEl) return;
        const guess = Number(inputEl.value);
        if (!guess || guess < 1 || guess > 100) {
            msgEl.textContent = 'Enter a number between 1 and 100!';
            msgEl.style.color = '#ff6e84';
            return;
        }
        attempts++;
        if (attemptsEl) attemptsEl.textContent = attempts;
        if (guess === secret) {
            msgEl.textContent = `🎉 Correct! Found it in ${attempts} attempt${attempts === 1 ? '' : 's'}!`;
            msgEl.style.color = '#4ade80';
        } else if (guess > secret) {
            msgEl.textContent = '📉 Too high! Try lower.';
            msgEl.style.color = '#fbbf24';
        } else {
            msgEl.textContent = '📈 Too low! Try higher.';
            msgEl.style.color = '#60a5fa';
        }
        inputEl.value = '';
    }

    function resetGuess() {
        secret = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        if (attemptsEl) attemptsEl.textContent = 0;
        if (msgEl) { msgEl.textContent = ''; msgEl.style.color = ''; }
        if (inputEl) inputEl.value = '';
    }

    if (guessBtn) guessBtn.addEventListener('click', checkGuess);
    if (inputEl) inputEl.addEventListener('keydown', e => { if (e.key === 'Enter') checkGuess(); });
    if (resetBtn) resetBtn.addEventListener('click', resetGuess);
};