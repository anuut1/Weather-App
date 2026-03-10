document.addEventListener('DOMContentLoaded', () => {

    function adder(parent, tag, html, cls) {
        const el = document.createElement(tag);
        el.innerHTML = html;
        if (cls) el.classList.add(cls);
        parent.appendChild(el);
        return el;
    }

    const main = document.querySelector('.container');

    const info = adder(main, 'div', '', 'info');
    const output1 = adder(info, 'div', '', '');
    const output2 = adder(info, 'div', '', '');
    const status = adder(info, 'div', 'STATUS: NO COLLISION', 'status');

    output1.style.backgroundColor = 'red';
    output2.style.backgroundColor = 'blue';
    status.style.color = 'green';

    const gameBoard = adder(main, 'div', '', 'game');

    const box1 = adder(gameBoard, 'div', 'Box 1', 'box');
    box1.style.backgroundColor = 'red';

    const box2 = adder(gameBoard, 'div', 'Box 2', 'box');
    box2.style.backgroundColor = 'blue';
    box2.style.left = '100px';

    const game = {
        x1: box1.offsetLeft,
        y1: box1.offsetTop,
        x2: box2.offsetLeft,
        y2: box2.offsetTop,
        w1: box1.offsetWidth,
        h1: box1.offsetHeight,
        w2: box2.offsetWidth,
        h2: box2.offsetHeight,
        speed: 5
    };

    const keyz = {
        ArrowLeft:false, ArrowRight:false,
        ArrowUp:false, ArrowDown:false,
        KeyA:false, KeyW:false,
        KeyS:false, KeyZ:false
    };

    document.addEventListener('keydown', e => {
        if (e.code in keyz) keyz[e.code] = true;
    });

    document.addEventListener('keyup', e => {
        if (e.code in keyz) keyz[e.code] = false;
    });

    function checkCollision() {
        return (
            game.x1 < game.x2 + game.w2 &&
            game.x1 + game.w1 > game.x2 &&
            game.y1 < game.y2 + game.h2 &&
            game.y1 + game.h1 > game.y2
        );
    }

 
    function mover() {
        const maxX = gameBoard.clientWidth - game.w1;
        const maxY = gameBoard.clientHeight - game.h1;

        if (keyz.ArrowRight && game.x1 < maxX) game.x1 += game.speed;
        if (keyz.ArrowLeft && game.x1 > 0) game.x1 -= game.speed;
        if (keyz.ArrowDown && game.y1 < maxY) game.y1 += game.speed;
        if (keyz.ArrowUp && game.y1 > 0) game.y1 -= game.speed;

        if (keyz.KeyS && game.x2 < maxX) game.x2 += game.speed;
        if (keyz.KeyA && game.x2 > 0) game.x2 -= game.speed;
        if (keyz.KeyZ && game.y2 < maxY) game.y2 += game.speed;
        if (keyz.KeyW && game.y2 > 0) game.y2 -= game.speed;

        box1.style.left = game.x1 + 'px';
        box1.style.top  = game.y1 + 'px';
        box2.style.left = game.x2 + 'px';
        box2.style.top  = game.y2 + 'px';

        
        if (checkCollision()) {
            status.innerHTML = 'STATUS: HIT (Collision Detected)';
            status.style.color = 'red';
            box1.style.backgroundColor = 'yellow';
            box2.style.backgroundColor = 'yellow';
        } else {
            status.innerHTML = 'STATUS: NO COLLISION';
            status.style.color = 'green';
            box1.style.backgroundColor = 'red';
            box2.style.backgroundColor = 'blue';
        }

        output1.innerHTML = `Box #1 X:${game.x1} Y:${game.y1} W:${game.w1} H:${game.h1}`;
        output2.innerHTML = `Box #2 X:${game.x2} Y:${game.y2} W:${game.w2} H:${game.h2}`;

        requestAnimationFrame(mover);
    }

    mover(); 
});
