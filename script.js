// ==========================================
// GAMENEST PLATFORM LOGIC - RAWG Edition
// ==========================================

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
    
    // Game/Local Containers
    const localGameContainer = document.getElementById('localGameContainer');
    const localTomJerry = document.getElementById('local_tomjerry');
    const localRps = document.getElementById('local_rps');
    const localTodo = document.getElementById('local_todo');

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

    // Local Custom Games Metadata
    const LOCAL_GAMES = [
        {
            id: 'local_1',
            title: 'Tom & Jerry Grid Explorer',
            thumbnail: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            short_description: 'An exclusive original mini-game. Catch Jerry in a strategic grid pursuit using precise movements!',
            platform: 'Web Browser',
            genre: 'Strategy',
            isLocal: true,
            localId: 'local_tomjerry'
        },
        {
            id: 'local_2',
            title: 'Rock Paper Scissors Ultimate',
            thumbnail: 'https://images.unsplash.com/photo-1610892972986-e8220970ae58?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
        }
    ];

    function createGameCard(game) {
        const card = document.createElement('div');
        card.className = "bg-surface-container-highest rounded-2xl overflow-hidden group hover:shadow-[0_20px_50px_-12px_rgba(186,158,255,0.2)] transition-all duration-500 flex flex-col h-full border border-outline-variant/10 cursor-pointer hover:-translate-y-1";
        
        let genreText = game.genre || "Game";
        
        // Badge logic
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

            // Populate view details
            viewTitle.textContent = game.title;
            viewImage.src = game.thumbnail || '';
            viewThumbnail.src = game.thumbnail || '';
            viewGenre.textContent = game.genre || "Game";
            
            let pName = game.platform || "Various";
            viewPlatformText.textContent = pName;
            
            viewDescription.textContent = game.short_description || "Experience one of the free-to-play games fetched from our API! Full descriptions are available natively on the chosen platform.";
            
            // Hide all local wrappers
            localGameContainer.classList.add('hidden');
            localTomJerry.classList.add('hidden');
            localRps.classList.add('hidden');
            localTodo.classList.add('hidden');
            viewPlayBtn.classList.add('hidden');

            if (game.isLocal) {
                // Show specific local game container
                localGameContainer.classList.remove('hidden');
                document.getElementById(game.localId).classList.remove('hidden');
                
                // Initialize game logic dynamically when opened
                if (game.localId === 'local_tomjerry') window.initTomJerry();
                if (game.localId === 'local_rps') window.initRPS();
                if (game.localId === 'local_todo') window.initTodo();
            } else {
                // External game
                viewPlayBtn.href = `#`; // RAWG free API doesn't always provide direct play URLs directly in the list
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
            
            // FreeToGame returns array directly
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

    // Start App
    initializeGames();

});


// ==========================================
// ORIGINAL USER GAME LOGIC (PRESERVED)
// ==========================================

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