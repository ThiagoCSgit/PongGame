const INITIAL_SPEED = 0.025
const SPEED_INCREASE = 0.000005
const COLLISION_SOUND = new Audio()
COLLISION_SOUND.src = 'hitSound.wav'

export default class Ball{
    constructor(ballElem){
        this.ballElem = ballElem
        this.reset()
    }

    get x(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
    }

    set x(value){
        this.ballElem.style.setProperty("--x", value)
    }

    get y(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
    }

    set y(value){
        this.ballElem.style.setProperty("--y", value)
    }

    rect(){
        return this.ballElem.getBoundingClientRect()
    }

    reset(){
        this.x = 50
        this.y = 50
        this.direction = {x: 0}
        while(Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9){
            const heading = randomNumerBetween(0, 2 * Math.PI)
            this.direction = {x: Math.cos(heading), y: Math.sin(heading)}
        }
        this.speed = INITIAL_SPEED
    }

    update(delta, paddleRects){
        this.x += this.direction.x * this.speed * delta
        this.y += this.direction.y * this.speed * delta
        this.speed += SPEED_INCREASE * delta
        const rect = this.rect()
        if(rect.bottom >= window.innerHeight || rect.top <= 0){
            COLLISION_SOUND.play()
            this.direction.y *= -1
        }
        if(paddleRects.some(r => isCollision(r, rect))){
            COLLISION_SOUND.play()
            this.direction.x *= -1
        }
    }
}

function randomNumerBetween(min, max){
    return Math.random() * (max - min) + min
}

function isCollision(rect1, rect2){
    if(rect1.left <= rect2.right && rect1.right >= rect2.left && rect1.top <= rect2.bottom && rect1.bottom >= rect2.top) 
    {
        COLLISION_SOUND.play()
        return true
    }
    return false
}