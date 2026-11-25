// ============================================
// CONFIGURAÇÃO DO JOGO
// ============================================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

// ============================================
// PONTOS TURÍSTICOS (CENÁRIOS)
// ============================================
const locations = [
    {
        name: "Luís Correia",
        sky: '#87CEEB',
        ground: '#f4d03f',
        sea: '#1e88e5',
        description: "Praia de Luís Correia - Litoral do Piauí",
        plantableY: 400,
        drawBackground: function(ctx) {
            // Céu
            const skyGrad = ctx.createLinearGradient(0, 0, 0, 300);
            skyGrad.addColorStop(0, '#87CEEB');
            skyGrad.addColorStop(1, '#b3e5fc');
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, CANVAS_WIDTH, 300);
            
            // Sol
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(750, 100, 40, 0, Math.PI * 2);
            ctx.fill();
            
            // Mar
            ctx.fillStyle = '#1e88e5';
            ctx.fillRect(0, 280, CANVAS_WIDTH, 80);
            
            // Ondas
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.moveTo(0, 290 + i * 15);
                for (let x = 0; x < CANVAS_WIDTH; x += 20) {
                    ctx.lineTo(x, 290 + i * 15 + Math.sin(x / 30) * 3);
                }
                ctx.stroke();
            }
            
            // Areia
            const sandGrad = ctx.createLinearGradient(0, 360, 0, CANVAS_HEIGHT);
            sandGrad.addColorStop(0, '#f4d03f');
            sandGrad.addColorStop(1, '#d4a017');
            ctx.fillStyle = sandGrad;
            ctx.fillRect(0, 360, CANVAS_WIDTH, CANVAS_HEIGHT - 360);
            
            // Coqueiros decorativos
            drawPalmTree(ctx, 100, 360);
            drawPalmTree(ctx, 800, 370);
            
            // Placa turística
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(400, 380, 100, 50);
            ctx.fillStyle = '#FFF';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('LUÍS CORREIA', 450, 400);
            ctx.fillText('PI', 450, 415);
        }
    },
    {
        name: "Delta do Parnaíba",
        sky: '#a8d5ba',
        ground: '#5d4037',
        sea: '#2e7d32',
        description: "Delta do Parnaíba - Único das Américas",
        plantableY: 420,
        drawBackground: function(ctx) {
            // Céu
            const skyGrad = ctx.createLinearGradient(0, 0, 0, 250);
            skyGrad.addColorStop(0, '#a8d5ba');
            skyGrad.addColorStop(1, '#c8e6c9');
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, CANVAS_WIDTH, 250);
            
            // Nuvens
            ctx.fillStyle = 'rgba(255,255,255,0.8)';
            drawCloud(ctx, 150, 80);
            drawCloud(ctx, 600, 60);
            
            // Rio (múltiplos braços)
            ctx.fillStyle = '#1565c0';
            ctx.fillRect(0, 250, CANVAS_WIDTH, 150);
            
            // Ilhas
            ctx.fillStyle = '#5d4037';
            drawIsland(ctx, 150, 320, 80, 30);
            drawIsland(ctx, 450, 300, 100, 35);
            drawIsland(ctx, 700, 330, 90, 28);
            
            // Vegetação nas ilhas
            ctx.fillStyle = '#2e7d32';
            for (let i = 0; i < 15; i++) {
                ctx.beginPath();
                ctx.arc(130 + Math.random() * 40, 310 + Math.random() * 20, 8, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Terra firme
            ctx.fillStyle = '#6d4c41';
            ctx.fillRect(0, 400, CANVAS_WIDTH, 200);
            
            // Mangue
            ctx.fillStyle = '#33691e';
            for (let i = 0; i < 20; i++) {
                ctx.beginPath();
                ctx.arc(Math.random() * CANVAS_WIDTH, 400 + Math.random() * 30, 15, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Placa
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(400, 450, 100, 50);
            ctx.fillStyle = '#FFF';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('DELTA DO', 450, 470);
            ctx.fillText('PARNAÍBA', 450, 485);
        }
    },
    {
        name: "Sete Cidades",
        sky: '#ffcc80',
        ground: '#8d6e63',
        sea: '#a1887f',
        description: "Parque Nacional de Sete Cidades - Piripiri",
        plantableY: 380,
        drawBackground: function(ctx) {
            // Céu alaranjado
            const skyGrad = ctx.createLinearGradient(0, 0, 0, 300);
            skyGrad.addColorStop(0, '#ffcc80');
            skyGrad.addColorStop(1, '#ffe0b2');
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, CANVAS_WIDTH, 350);
            
            // Sol
            ctx.fillStyle = '#FF8F00';
            ctx.beginPath();
            ctx.arc(700, 120, 45, 0, Math.PI * 2);
            ctx.fill();
            
            // Formações rochosas (Sete Cidades)
            drawRockFormation(ctx, 100, 350, 120, 150);
            drawRockFormation(ctx, 280, 350, 100, 130);
            drawRockFormation(ctx, 450, 350, 140, 160);
            drawRockFormation(ctx, 650, 350, 110, 140);
            
            // Chão arenoso
            const groundGrad = ctx.createLinearGradient(0, 350, 0, CANVAS_HEIGHT);
            groundGrad.addColorStop(0, '#a1887f');
            groundGrad.addColorStop(1, '#6d4c41');
            ctx.fillStyle = groundGrad;
            ctx.fillRect(0, 350, CANVAS_WIDTH, CANVAS_HEIGHT - 350);
            
            // Vegetação de cerrado
            ctx.fillStyle = '#558b2f';
            for (let i = 0; i < 15; i++) {
                const x = Math.random() * CANVAS_WIDTH;
                const y = 380 + Math.random() * 50;
                ctx.beginPath();
                ctx.arc(x, y, 10 + Math.random() * 8, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Placa
            ctx.fillStyle = '#5D4037';
            ctx.fillRect(400, 470, 100, 50);
            ctx.fillStyle = '#FFF';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('SETE CIDADES', 450, 490);
            ctx.fillText('PIRIPERI-PI', 450, 505);
        }
    },
    {
        name: "Pedra do Sal",
        sky: '#b3e5fc',
        ground: '#e0e0e0',
        sea: '#0277bd',
        description: "Pedra do Sal - Parnaíba",
        plantableY: 460,
        drawBackground: function(ctx) {
            // Céu
            const skyGrad = ctx.createLinearGradient(0, 0, 0, 280);
            skyGrad.addColorStop(0, '#b3e5fc');
            skyGrad.addColorStop(1, '#e1f5fe');
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, CANVAS_WIDTH, 280);
            
            // Mar
            ctx.fillStyle = '#0277bd';
            ctx.fillRect(0, 280, CANVAS_WIDTH, 100);
            
            // Ondas brancas
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;
            for (let i = 0; i < 4; i++) {
                ctx.beginPath();
                ctx.moveTo(0, 290 + i * 20);
                for (let x = 0; x < CANVAS_WIDTH; x += 15) {
                    ctx.lineTo(x, 290 + i * 20 + Math.sin(x / 20) * 4);
                }
                ctx.stroke();
            }
            
            // Pedras de sal (formações brancas)
            ctx.fillStyle = '#f5f5f5';
            drawSaltRock(ctx, 150, 380, 100, 60);
            drawSaltRock(ctx, 350, 390, 120, 50);
            drawSaltRock(ctx, 600, 385, 110, 55);
            
            // Sombras nas pedras
            ctx.fillStyle = '#bdbdbd';
            ctx.fillRect(170, 420, 60, 20);
            ctx.fillRect(370, 425, 80, 15);
            ctx.fillRect(620, 422, 70, 18);
            
            // Areia
            ctx.fillStyle = '#ffe0b2';
            ctx.fillRect(0, 440, CANVAS_WIDTH, CANVAS_HEIGHT - 440);
            
            // Placa
            ctx.fillStyle = '#5D4037';
            ctx.fillRect(400, 480, 100, 50);
            ctx.fillStyle = '#FFF';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('PEDRA DO', 450, 500);
            ctx.fillText('SAL', 450, 515);
        }
    },
    {
        name: "Morro do Mariquita",
        sky: '#c8e6c9',
        ground: '#689f38',
        sea: '#33691e',
        description: "Morro do Mariquita - Piripiri",
        plantableY: 470,
        drawBackground: function(ctx) {
            // Céu
            const skyGrad = ctx.createLinearGradient(0, 0, 0, 300);
            skyGrad.addColorStop(0, '#c8e6c9');
            skyGrad.addColorStop(1, '#e8f5e9');
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, CANVAS_WIDTH, 300);
            
            // Nuvens
            ctx.fillStyle = 'rgba(255,255,255,0.9)';
            drawCloud(ctx, 200, 80);
            drawCloud(ctx, 550, 100);
            drawCloud(ctx, 780, 70);
            
            // Morro grande ao fundo
            ctx.fillStyle = '#558b2f';
            ctx.beginPath();
            ctx.moveTo(200, 450);
            ctx.lineTo(350, 200);
            ctx.lineTo(500, 180);
            ctx.lineTo(650, 220);
            ctx.lineTo(750, 450);
            ctx.closePath();
            ctx.fill();
            
            // Detalhes do morro
            ctx.fillStyle = '#33691e';
            ctx.beginPath();
            ctx.moveTo(250, 450);
            ctx.lineTo(380, 250);
            ctx.lineTo(480, 230);
            ctx.lineTo(580, 260);
            ctx.lineTo(680, 450);
            ctx.closePath();
            ctx.fill();
            
            // Vegetação no morro
            ctx.fillStyle = '#2e7d32';
            for (let i = 0; i < 30; i++) {
                const x = 250 + Math.random() * 400;
                const y = 250 + Math.random() * 180;
                ctx.beginPath();
                ctx.arc(x, y, 8 + Math.random() * 6, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Chão
            const groundGrad = ctx.createLinearGradient(0, 450, 0, CANVAS_HEIGHT);
            groundGrad.addColorStop(0, '#689f38');
            groundGrad.addColorStop(1, '#33691e');
            ctx.fillStyle = groundGrad;
            ctx.fillRect(0, 450, CANVAS_WIDTH, CANVAS_HEIGHT - 450);
            
            // Placa
            ctx.fillStyle = '#5D4037';
            ctx.fillRect(400, 500, 100, 50);
            ctx.fillStyle = '#FFF';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('MORRO DO', 450, 520);
            ctx.fillText('MARIQUITA', 450, 535);
        }
    }
];

// ============================================
// FUNÇÕES AUXILIARES DE DESENHO
// ============================================
function drawPalmTree(ctx, x, y) {
    // Tronco
    ctx.strokeStyle = '#6d4c41';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x - 10, y - 40, x - 5, y - 80);
    ctx.stroke();
    
    // Folhas
    ctx.fillStyle = '#2e7d32';
    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        ctx.beginPath();
        ctx.ellipse(x - 5, y - 80, 25, 8, angle, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Coquinhos
    ctx.fillStyle = '#5d4037';
    ctx.beginPath();
    ctx.arc(x - 5, y - 75, 4, 0, Math.PI * 2);
    ctx.fill();
}

function drawCloud(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.arc(x + 20, y, 25, 0, Math.PI * 2);
    ctx.arc(x + 45, y, 20, 0, Math.PI * 2);
    ctx.arc(x + 20, y - 15, 20, 0, Math.PI * 2);
    ctx.fill();
}

function drawIsland(ctx, x, y, w, h) {
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, 0, 0, Math.PI * 2);
    ctx.fill();
}

function drawRockFormation(ctx, x, y, w, h) {
    ctx.fillStyle = '#a1887f';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + w * 0.2, y - h);
    ctx.lineTo(x + w * 0.5, y - h * 0.9);
    ctx.lineTo(x + w * 0.8, y - h * 0.95);
    ctx.lineTo(x + w, y);
    ctx.closePath();
    ctx.fill();
    
    // Detalhes
    ctx.strokeStyle = '#6d4c41';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + w * 0.3, y - h * 0.5);
    ctx.lineTo(x + w * 0.7, y - h * 0.5);
    ctx.stroke();
}

function drawSaltRock(ctx, x, y, w, h) {
    ctx.beginPath();
    ctx.moveTo(x, y + h);
    ctx.lineTo(x + w * 0.2, y);
    ctx.lineTo(x + w * 0.5, y - h * 0.2);
    ctx.lineTo(x + w * 0.8, y);
    ctx.lineTo(x + w, y + h);
    ctx.closePath();
    ctx.fill();
}

// ============================================
// TIPOS DE SEMENTES
// ============================================
const seedTypes = [
    {
        id: 'basic',
        name: '🌱 Muda',
        description: 'Árvore comum',
        price: 0,
        owned: true,
        oxygenBonus: 3,
        color: '#4caf50',
        size: 1
    },
    {
        id: 'coconut',
        name: '🌴 Coqueiro',
        description: '+5 oxigênio',
        price: 10,
        owned: false,
        oxygenBonus: 5,
        color: '#2e7d32',
        size: 1.3
    },
    {
        id: 'mangue',
        name: '🌿 Mangue',
        description: '+7 oxigênio',
        price: 10,
        owned: false,
        oxygenBonus: 7,
        color: '#1b5e20',
        size: 1.2
    },
    {
        id: 'ipe',
        name: '🌸 Ipê',
        description: '+10 oxigênio',
        price: 10,
        owned: false,
        oxygenBonus: 10,
        color: '#e91e63',
        size: 1.4
    },
    {
        id: 'carnauba',
        name: '🌳 Carnaúba',
        description: '+15 oxigênio',
        price: 10,
        owned: false,
        oxygenBonus: 15,
        color: '#00695c',
        size: 1.5
    },
    {
        id: 'babacu',
        name: '🌾 Babaçu',
        description: '+20 oxigênio',
        price: 10,
        owned: false,
        oxygenBonus: 20,
        color: '#827717',
        size: 1.6
    }
];

// ============================================
// ESTADO DO JOGO
// ============================================
const game = {
    state: 'menu',
    player: {
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2,
        width: 30,
        height: 40,
        speed: 4,
        color: '#ff5722'
    },
    keys: {},
    oxygen: 20,
    maxOxygen: 100,
    coins: 20,
    treesPlanted: 0,
    trees: [],
    currentLocation: 0,
    selectedSeed: 0,
    oxygenDecayTimer: 0,
    oxygenDecayRate: 3000,
    lastTime: 0,
    particles: [],
    notifications: []
};

// ============================================
// CONTROLES DO TECLADO
// ============================================
document.addEventListener('keydown', (e) => {
    game.keys[e.key.toLowerCase()] = true;
    
    if (game.state === 'playing') {
        if (e.key.toLowerCase() === 'e') {
            plantTree();
        }
        if (e.key.toLowerCase() === 'b') {
            openShop();
        }
        if (e.key.toLowerCase() >= '1' && e.key.toLowerCase() <= '6') {
            const seedIndex = parseInt(e.key) - 1;
            if (seedTypes[seedIndex] && seedTypes[seedIndex].owned) {
                game.selectedSeed = seedIndex;
                addNotification(`Semente: ${seedTypes[seedIndex].name}`);
            }
        }
    }
    
    if (e.key.toLowerCase() === 'b' && game.state === 'shop') {
        closeShop();
    }
    
    if (e.key.toLowerCase() === 'r' && game.state === 'gameover') {
        resetGame();
    }
});

document.addEventListener('keyup', (e) => {
    game.keys[e.key.toLowerCase()] = false;
});

// ============================================
// FUNÇÕES DO JOGO
// ============================================
function plantTree() {
    const seed = seedTypes[game.selectedSeed];
    const location = locations[game.currentLocation];
    
    // Verifica se está em área plantável
    if (game.player.y < location.plantableY) {
        addNotification('⚠️ Só plante na terra/areia!');
        return;
    }
    
    // Verifica se já existe árvore muito perto
    const tooClose = game.trees.some(tree => {
        const dx = tree.x - game.player.x;
        const dy = tree.y - game.player.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < 50;
    });
    
    if (tooClose) {
        addNotification('⚠️ Muito perto de outra árvore!');
        return;
    }
    
    // Planta a árvore
    game.trees.push({
        x: game.player.x,
        y: game.player.y + 20,
        type: seed.id,
        color: seed.color,
        size: seed.size,
        plantedAt: Date.now(),
        growth: 0
    });
    
    game.treesPlanted++;
    game.coins += 5;
    game.oxygen = Math.min(game.maxOxygen, game.oxygen + seed.oxygenBonus);
    
    // Partículas de plantio
    createParticles(game.player.x, game.player.y, seed.color);
    
    addNotification(`+5💰 +${seed.oxygenBonus}%🌬️`);
    
    // Verifica se mudou de cenário
    if (game.treesPlanted > 0 && game.treesPlanted % 10 === 0) {
        if (game.currentLocation < locations.length - 1) {
            game.currentLocation++;
            addNotification(`🎉 Novo local: ${locations[game.currentLocation].name}!`);
            game.trees = [];
        }
    }
    
    updateHUD();
    checkWinCondition();
}

function createParticles(x, y, color) {
    for (let i = 0; i < 10; i++) {
        game.particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4 - 2,
            life: 1,
            color: color,
            size: Math.random() * 3 + 2
        });
    }
}

function addNotification(text) {
    game.notifications.push({
        text: text,
        life: 2,
        y: 120
    });
}

function updatePlayer(deltaTime) {
    let dx = 0, dy = 0;
    
    if (game.keys['arrowup'] || game.keys['w']) dy -= 1;
    if (game.keys['arrowdown'] || game.keys['s']) dy += 1;
    if (game.keys['arrowleft'] || game.keys['a']) dx -= 1;
    if (game.keys['arrowright'] || game.keys['d']) dx += 1;
    
    // Normaliza diagonal
    if (dx !== 0 && dy !== 0) {
        dx *= 0.707;
        dy *= 0.707;
    }
    
    game.player.x += dx * game.player.speed;
    game.player.y += dy * game.player.speed;
    
    // Limites do canvas
    game.player.x = Math.max(game.player.width / 2, Math.min(CANVAS_WIDTH - game.player.width / 2, game.player.x));
    game.player.y = Math.max(80 + game.player.height / 2, Math.min(CANVAS_HEIGHT - game.player.height / 2, game.player.y));
}

function updateOxygen(deltaTime) {
    game.oxygenDecayTimer += deltaTime;
    
    // Quanto mais árvores, mais lento o decaimento
    const treesFactor = Math.max(0.5, 1 - game.trees.length * 0.03);
    const decayTime = game.oxygenDecayRate * treesFactor;
    
    if (game.oxygenDecayTimer >= decayTime) {
        game.oxygen = Math.max(0, game.oxygen - 1);
        game.oxygenDecayTimer = 0;
        updateHUD();
        
        if (game.oxygen <= 0) {
            endGame(false);
        }
    }
}

function updateParticles(deltaTime) {
    game.particles = game.particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
        p.life -= deltaTime / 1000;
        return p.life > 0;
    });
}

function updateNotifications(deltaTime) {
    game.notifications = game.notifications.filter(n => {
        n.life -= deltaTime / 1000;
        n.y -= deltaTime / 50;
        return n.life > 0;
    });
}

function updateTrees(deltaTime) {
    game.trees.forEach(tree => {
        if (tree.growth < 1) {
            tree.growth = Math.min(1, tree.growth + deltaTime / 1000);
        }
    });
}

function checkWinCondition() {
    if (game.oxygen >= game.maxOxygen) {
        endGame(true);
    }
}

function endGame(won) {
    game.state = 'gameover';
    const endTitle = document.getElementById('end-title');
    const endMessage = document.getElementById('end-message');
    const endStats = document.getElementById('end-stats');
    
    if (won) {
        endTitle.textContent = '🎉 VITÓRIA! 🎉';
        endMessage.textContent = 'Você salvou os pontos turísticos do Piauí!';
    } else {
        endTitle.textContent = '💨 FIM DE JOGO';
        endMessage.textContent = 'O oxigênio acabou... A cidade perdeu!';
    }
    
    endStats.innerHTML = `
        🌳 Árvores plantadas: <b>${game.treesPlanted}</b><br>
        💰 Moedas acumuladas: <b>${game.coins}</b><br>
        📍 Locais visitados: <b>${game.currentLocation + 1}</b>
    `;
    
    document.getElementById('game-over').classList.remove('hidden');
}

// ============================================
// LOJA
// ============================================
function openShop() {
    game.state = 'shop';
    renderShop();
    document.getElementById('shop').classList.remove('hidden');
}

function closeShop() {
    game.state = 'playing';
    document.getElementById('shop').classList.add('hidden');
}

function renderShop() {
    const shopItems = document.getElementById('shop-items');
    shopItems.innerHTML = '';
    document.getElementById('shop-coins').textContent = game.coins;
    
    seedTypes.forEach((seed, index) => {
        const item = document.createElement('div');
        item.className = 'shop-item';
        
        if (seed.owned) {
            item.classList.add('owned');
        } else if (game.coins < seed.price) {
            item.classList.add('locked');
        }
        
        item.innerHTML = `
            <div class="shop-item-name">${seed.name}</div>
            <div class="shop-item-desc">${seed.description}</div>
            <div class="shop-item-price">
                ${seed.owned ? '✓ Possuído' : `💰 ${seed.price}`}
            </div>
        `;
        
        item.addEventListener('click', () => buySeed(index));
        shopItems.appendChild(item);
    });
}

function buySeed(index) {
    const seed = seedTypes[index];
    
    if (seed.owned) {
        addNotification('Você já possui esta semente!');
        return;
    }
    
    if (game.coins < seed.price) {
        addNotification('Moedas insuficientes!');
        return;
    }
    
    game.coins -= seed.price;
    seed.owned = true;
    game.selectedSeed = index;
    
    addNotification(`Comprou: ${seed.name}`);
    renderShop();
    updateHUD();
}

document.getElementById('close-shop').addEventListener('click', closeShop);

// ============================================
// HUD
// ============================================
function updateHUD() {
    const oxygenBar = document.getElementById('oxygen-bar');
    const oxygenText = document.getElementById('oxygen-text');
    const coinsText = document.getElementById('coins-text');
    const treesText = document.getElementById('trees-text');
    const locationText = document.getElementById('location-text');
    
    oxygenBar.style.width = `${game.oxygen}%`;
    oxygenText.textContent = `${Math.floor(game.oxygen)}%`;
    coinsText.textContent = game.coins;
    treesText.textContent = game.treesPlanted;
    locationText.textContent = locations[game.currentLocation].name;
    
    // Muda cor da barra conforme oxigênio
    if (game.oxygen < 30) {
        oxygenBar.style.background = '#ff4444';
    } else if (game.oxygen < 60) {
        oxygenBar.style.background = 'linear-gradient(90deg, #ff4444, #ffaa00)';
    } else {
        oxygenBar.style.background = 'linear-gradient(90deg, #ffaa00, #44ff44)';
    }
}

// ============================================
// RENDERIZAÇÃO
// ============================================
function drawPlayer() {
    const p = game.player;
    
    // Sombra
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(p.x, p.y + p.height / 2, p.width / 2, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Corpo
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x - p.width / 2, p.y - p.height / 2, p.width, p.height);
    
    // Cabeça
    ctx.fillStyle = '#ffcc80';
    ctx.beginPath();
    ctx.arc(p.x, p.y - p.height / 2 - 8, 10, 0, Math.PI * 2);
    ctx.fill();
    
    // Chapéu de palha
    ctx.fillStyle = '#f4d03f';
    ctx.beginPath();
    ctx.ellipse(p.x, p.y - p.height / 2 - 15, 14, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(p.x - 8, p.y - p.height / 2 - 22, 16, 8);
    
    // Indicador de semente selecionada
    const seed = seedTypes[game.selectedSeed];
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(p.x - 15, p.y - p.height / 2 - 45, 30, 20);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(seed.name.split(' ')[0], p.x, p.y - p.height / 2 - 30);
}

function drawTree(tree) {
    const growth = tree.growth;
    const baseSize = 20 * tree.size * growth;
    
    // Sombra
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(tree.x, tree.y + 5, baseSize * 0.8, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Tronco
    ctx.fillStyle = '#5d4037';
    ctx.fillRect(tree.x - 3 * tree.size, tree.y - baseSize * 0.5, 6 * tree.size, baseSize * 0.8);
    
    // Copa
    ctx.fillStyle = tree.color;
    
    if (tree.type === 'coconut') {
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            ctx.beginPath();
            ctx.ellipse(
                tree.x, tree.y - baseSize * 0.5,
                baseSize * 0.8, baseSize * 0.2,
                angle, 0, Math.PI * 2
            );
            ctx.fill();
        }
        ctx.fillStyle = '#6d4c41';
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(tree.x - 5 + i * 5, tree.y - baseSize * 0.4, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    } else if (tree.type === 'ipe') {
        ctx.beginPath();
        ctx.arc(tree.x, tree.y - baseSize * 0.7, baseSize * 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#f8bbd0';
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const fx = tree.x + Math.cos(angle) * baseSize * 0.5;
            const fy = tree.y - baseSize * 0.7 + Math.sin(angle) * baseSize * 0.5;
            ctx.beginPath();
            ctx.arc(fx, fy, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    } else if (tree.type === 'carnauba' || tree.type === 'babacu') {
        for (let i = 0; i < 10; i++) {
            const angle = (i / 10) * Math.PI * 2;
            ctx.beginPath();
            ctx.ellipse(
                tree.x, tree.y - baseSize * 0.8,
                baseSize * 0.9, baseSize * 0.15,
                angle, 0, Math.PI * 2
            );
            ctx.fill();
        }
    } else {
        ctx.beginPath();
        ctx.arc(tree.x, tree.y - baseSize * 0.7, baseSize * 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(tree.x - baseSize * 0.4, tree.y - baseSize * 0.5, baseSize * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(tree.x + baseSize * 0.4, tree.y - baseSize * 0.5, baseSize * 0.5, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawParticles() {
    game.particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalAlpha = 1;
}

function drawNotifications() {
    game.notifications.forEach((n, i) => {
        ctx.fillStyle = `rgba(0, 0, 0, ${n.life / 2})`;
        ctx.fillRect(CANVAS_WIDTH / 2 - 100, n.y - 15, 200, 30);
        ctx.fillStyle = `rgba(255, 255, 255, ${n.life / 2})`;
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(n.text, CANVAS_WIDTH / 2, n.y + 5);
    });
}

function drawSeedIndicator() {
    const startX = 10;
    const startY = CANVAS_HEIGHT - 40;
    
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(startX, startY, 250, 35);
    
    seedTypes.forEach((seed, i) => {
        if (!seed.owned) return;
        const x = startX + 10 + i * 40;
        const y = startY + 17;
        
        if (i === game.selectedSeed) {
            ctx.fillStyle = '#ffd700';
            ctx.fillRect(x - 15, y - 13, 30, 26);
        }
        
        ctx.fillStyle = seed.color;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(i + 1, x, y + 3);
    });
}

// ============================================
// LOOP PRINCIPAL
// ============================================
function gameLoop(timestamp) {
    const deltaTime = timestamp - game.lastTime;
    game.lastTime = timestamp;
    
    if (game.state === 'playing') {
        updatePlayer(deltaTime);
        updateOxygen(deltaTime);
        updateParticles(deltaTime);
        updateNotifications(deltaTime);
        updateTrees(deltaTime);
    }
    
    // Renderiza
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Desenha cenário atual
    locations[game.currentLocation].drawBackground(ctx);
    
    // Desenha árvores
    game.trees.forEach(tree => drawTree(tree));
    
    // Desenha jogador
    if (game.state === 'playing' || game.state === 'shop') {
        drawPlayer();
    }
    
    // Desenha partículas
    drawParticles();
    
    // Desenha notificações
    drawNotifications();
    
    // Indicador de sementes
    if (game.state === 'playing') {
        drawSeedIndicator();
    }
    
    requestAnimationFrame(gameLoop);
}

// ============================================
// INICIALIZAÇÃO
// ============================================
function resetGame() {
    game.state = 'playing';
    game.player.x = CANVAS_WIDTH / 2;
    game.player.y = CANVAS_HEIGHT / 2;
    game.oxygen = 20;
    game.coins = 20;
    game.treesPlanted = 0;
    game.trees = [];
    game.currentLocation = 0;
    game.selectedSeed = 0;
    game.oxygenDecayTimer = 0;
    game.particles = [];
    game.notifications = [];
    
    // Reseta sementes
    seedTypes.forEach((seed, i) => {
        seed.owned = i === 0;
    });
    
    document.getElementById('game-over').classList.add('hidden');
    document.getElementById('shop').classList.add('hidden');
    updateHUD();
}

document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('menu').classList.add('hidden');
    resetGame();
});

document.getElementById('restart-btn').addEventListener('click', () => {
    resetGame();
});

// Inicia o loop
updateHUD();
requestAnimationFrame((timestamp) => {
    game.lastTime = timestamp;
    gameLoop(timestamp);
});