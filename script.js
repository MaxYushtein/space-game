// eto vlevo vpravo
let x = 0
let y = 15
let h1 = document.getElementById("h1")
let stopMeters = false
let meters = 0
let metersSpaceship = document.getElementById("metersSpaceship")
let spaceship = document.getElementById("spaceship")
let img = document.getElementById("img")
// Массив для тех клавиш, которые нажаты в данный момент
let keys = []
// Эта строчка срабатывает каждый раз, когда игрок нажимает клавишу
document.body.onkeydown = function (event) {
    if (event.keyCode == 37) {
        console.log(" Лево руля");
    }
    if (event.keyCode == 39) {
        console.log("Право руля");
        if (event.keyCode == 38) {
            console.log(" 1 руля");
        }
        if (event.keyCode == 40) {
            console.log(" 0 руля");
        }
    }
    if (!keys.includes(event.keyCode)) {
        // Метод push используется для того, чтобы добавить что-то в массив
        keys.push(event.keyCode)
    }
    console.log(keys);
}
// Эта строчка срабатывает каждый раз, когда игрок нажимает клавишу
document.body.onkeyup = function (event) {
    // Метод splice удаляет элемент из списка
    keys.splice(keys.indexOf(event.keyCode), 1)
    console.log(keys);
}
setInterval(function () {
    if (keys.includes(39)) {
        x++
        if (x > window.innerWidth - 176) {
            // window.innerWidth - внутренняя ширина экрана
            x = window.innerWidth - 176
        }
        spaceship.style.left = x + "px"
        spaceship.style.transform = "translate(-50%,-50%) rotate(50deg)"
    }
    if (keys.includes(37)) {
        x--
        if (x < 0) {
            x = 0
        }
        spaceship.style.left = x + "px"
        spaceship.style.transform = "translate(-50%,-50%) rotate(-50deg)"
    }
    if (keys.includes(38)) {
        y++
        if (y > window.innerHeight - 220) {
            y = window.innerHeight - 220
        }
        spaceship.style.bottom = y + "px"
    }
    if (keys.includes(40)) {
        y--
        if (y < 0) {
            y = 0
        }
        spaceship.style.bottom = y + "px"
    }
    if (!keys.includes(37) && !keys.includes(39)) {
        spaceship.style.transform = "translate(-50%,-50%) rotate(0deg)"
    }
    let enemies = document.getElementsByClassName("enemy")
    for (let e of enemies) {
        let enemyBOTTOM = parseInt(window.getComputedStyle(e).getPropertyValue("bottom")) - 1
        let enemyLEFT = parseInt(window.getComputedStyle(e).getPropertyValue("left"))
        e.style.bottom = enemyBOTTOM + "px"
        if (enemyBOTTOM < -200) {
            e.remove()
        }
        if (Math.abs(enemyLEFT - x) < 60 && Math.abs(enemyBOTTOM - y) < 60) {
            spaceship.remove()
            h1.innerHTML = "you lose"
            stopMeters = true
        }
    }
    if (!stopMeters) {
        meters++
        metersSpaceship.innerHTML = meters + " km"
    }
    if (meters==10000) {
        h1.innerHTML = "you win"
        stopMeters=true

    }
}, 1)
setInterval(function () {
    if(!stopMeters){
        let enemy = document.createElement("img")
        // enemy eto monster
        enemy.src = "ezgif.com-optimize.gif"
        document.body.appendChild(enemy)
        enemy.style.left = Math.random() * (window.innerWidth - 200) + "px"
        enemy.style.bottom = window.innerHeight + "px"
        // enemy.style.transition = Math.random() * 8 + 2 + "s"
        enemy.classList.add("enemy")
    }
    // set kotoriy zamedlayet vrema
    // setTimeout(function () {
    //     enemy.style.bottom = "-160px"
    // }, 1000)
}, 1000)
