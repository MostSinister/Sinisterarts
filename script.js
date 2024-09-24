
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Resize the canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Game variables
let player = {
    x: 100,
    y: canvas.height - 150,
    width: 50,
    height: 50,
    speed: 5,
    jumpHeight: -15,
    gravity: 0.8,
    velocityX: 0,
    velocityY: 0,
    isJumping: false
};

let keys = {
    left: false,
    right: false,
    jump: false
};

// Touch controls
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');
const jumpBtn = document.getElementById('jump-btn');

// Button event listeners
leftBtn.addEventListener('touchstart', () => keys.left = true);
leftBtn.addEventListener('touchend', () => keys.left = false);

rightBtn.addEventListener('touchstart', () => keys.right = true);
rightBtn.addEventListener('touchend', () => keys.right = false);

jumpBtn.addEventListener('touchstart', () => {
    if (!player.isJumping) {
        keys.jump = true;
    }
});
jumpBtn.addEventListener('touchend', () => keys.jump = false);

// Game loop
function gameLoop() {
    updatePlayer();
    draw();
    requestAnimationFrame(gameLoop);
}

// Update player position
function updatePlayer() {
    if (keys.left) {
        player.velocityX = -player.speed;
    } else if (keys.right) {
        player.velocityX = player.speed;
    } else {
        player.velocityX = 0;
    }

    if (keys.jump && !player.isJumping) {
        player.velocityY = player.jumpHeight;
        player.isJumping = true;
    }

    player.velocityY += player.gravity; // gravity
    player.x += player.velocityX;
    player.y += player.velocityY;

    // Ground collision
    if (player.y + player.height >= canvas.height - 50) {
        player.y = canvas.height - 50 - player.height;
        player.velocityY = 0;
        player.isJumping = false;
    }

    // Canvas bounds
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}

// Draw the player and the ground
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ground
    ctx.fillStyle = '#555';
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

    // Draw player
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

gameLoop();
