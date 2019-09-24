var sounds = {
	slither: new Howl({
		src: ['../src/sounds/slitherLoop.mp3']
	  }),
	gameOver: new Howl({
	src: ['../src/sounds/gameOver.mp3']
	}),
	newFood: new Howl({
	src: ['../src/sounds/newFood.mp3']
	}),
	pressKey: new Howl({
	src: ['../src/sounds/pressKey.mp3']
	}),
	questionCorrect: new Howl({
	src: ['../src/sounds/questionCorrect.mp3']
	}),
	score100: new Howl({
		src: ['../src/sounds/score100.mp3']
		})
}
function playSound(s) {
	if(window.location.hash && window.location.hash.includes('noSound')) return;
	s.play()
}
function pauseSound(s, m) {
	s.pause()
	if(m) {
		s.stop()
	}
}
function refresh() {
	window.location.reload()

}

window.addEventListener("resize", refresh)
class Node {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.state = 0;
		this.age = 5;
	}
	
	drawNode(width, height) {
		
		if (this.state == 0) {
		ctx.font = "30px Retro";
			ctx.fillStyle = "rgb(" + score % 255 + "," + score % 255 + "," + score % 255 + ")";
			//ctx.fillStyle = "rgb(0, 0, 0)";
		} else if (this.state == 1) {
		ctx.font = "30px Retro";
			ctx.fillStyle = "rgb(200, 0, 0)";
		} else {
		ctx.font = "30px Retro";
			ctx.fillStyle = "rgb(0, 200, 0)";
		}
		ctx.fillRect(this.x * width, this.y * height, width, height);
	}
}

function start() {

	pauseSound(sounds.gameOver, true)
	pauseSound(sounds.slither)
	playSound(sounds.slither)
	canvas = document.getElementById("canvas");
	//	window.requestAnimationFrame(loop);
	canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth - 15;
	canvas.height = window.innerHeight - 190;
	ctx = canvas.getContext("2d");
	ctx.lineWidth = 2;
	ctx.strokeStyle="#FF0000";
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
	lastRender = 0;
	ctx.textAlign = "center";
	ctx.font = "30px Retro";
	if (pixelWidth == undefined)
		pixelWidth = 25;
	x = 0;
	y = 0; 
	velX = 1;
	velY = 0;
	startScore = 5;
	score = startScore;
	gameOver = false;
	aiOn = false;
	keep = 0;
	grid = [];
	for (let i = 0; i < canvas.width/pixelWidth - 1; i++) {
		grid.push([]);
		for (let j = 0; j < canvas.height/pixelWidth - 1; j++) {
			grid[i].push(new Node(i, j));
		}
	}
	grid[Math.floor(grid.length/2)][Math.floor(grid[0].length/2)].state = 2;
	headX = Math.floor(grid.length/2);
	headY = Math.floor(grid[0].length/2);
	makeFood();
	setTimeout(updateSnake, 100);
}

function draw() { 
	
	if (gameOver) {
		if(mobile) {
		ctx.font = "30px Retro";
		ctx.fillStyle = "rgb(255, 255, 255)";
		ctx.fillText("Mobile Device Detected!", canvas.width * .5, canvas.height * .45);
		ctx.fillText("This is not compatible ", canvas.width * .5, canvas.height * .45 + 50);
		ctx.fillText("with mobile devices", canvas.width * .5, canvas.height * .45 + 100);
		// console.log(headX + )
		} else {
			ctx.font = "30px Retro";
		ctx.fillStyle = "rgb(255, 255, 255)";
		ctx.fillText("Game Over", canvas.width * .5, canvas.height * .45);
		ctx.fillText("Your Score Was: " + (score - startScore), canvas.width * .5, canvas.height * .45 + 50);
		ctx.fillText("Press Space To Play Again", canvas.width * .5, canvas.height * .45 + 100);
		ctx.fillText("Press i To Show AI", canvas.width * .5, canvas.height * .45 + 150);
		ctx.fillText("", canvas.width * .5, canvas.height * .45 + 250);
		//ctx.fillText("<a href='https://skylarmccauley.xyz/projects/snake/#noQuestion'>Click here to disable Math Questions</a>", canvas.width * .5, canvas.height * .45 + 200)
		if (correctAns != undefined)
			ctx.fillText("The Correct Answer Was: " + correctAns, canvas.width * .5, canvas.height * .45 + 250);
		}
		
	} else {
		ctx.font = "30px Retro";
		ctx.fillStyle = "rgb(255, 255, 255)";
		
		
		ctx.fillText(score - startScore, canvas.width/2, canvas.height * .1);
	}
}

function onClick(e) {
	clickX = e.clientX;
	clickY = e.clientY;
}

function onKeyPress(e) {
console.log(e.key);
	
	switch (e.key) {
	case "w":
		case "ArrowUp":
			if(!aiOn) {
				velX = 0;
			velY = -1;
			if(!gameOver) {
				playSound(sounds.pressKey)
				
			}
			}
			
		break;
	case "s":
		case "ArrowDown":
		if(!aiOn) {
			velX = 0;
			velY = 1;
		if(!gameOver) {
			playSound(sounds.pressKey)
		}
		}
		
	break;
	case "a":
		case "ArrowLeft":
		if(!aiOn) {
			velX = -1;
		velY = 0;
		if(!gameOver) {
			playSound(sounds.pressKey)
		}
		}
		
	break;
	case "d":
		case "ArrowRight":
		if(!aiOn) {
			velX = 1;
			velY = 0;
			if(!gameOver) {
				playSound(sounds.pressKey)
			}
		}
			
	break;
	case "k":
			endGame()
			aiOn = false
	break;
	case " ":
			if(gameOver) {
				playSound(sounds.pressKey)
			start();
			aiOn = false;
			gameOver = false;
		}
		break;
case "i":
			
if(aiOn) return;
if (gameOver) {
	playSound(sounds.pressKey)
start();
aiOn = true;
gameOver = false;
} 
break;
}
}

async function updateSnake () {
ctx.font = "30px Retro";
ctx.fillStyle = "rgb(255, 255, 255)";
if(aiOn) {
	ctx.fillText("Press K to End", canvas.width * .5, canvas.height * .45 + 250);
}
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			grid[i][j].age--;
			if (grid[i][j].age < 1 && grid[i][j].state == 2) {
				grid[i][j].state = 0;
				grid[i][j].drawNode(pixelWidth, pixelWidth);
			}
		}
	}
	try {
		if (aiOn) {
			
			if (keep == 0) {
				let output = getAIDir(headX, headY, foodX, foodY);
				velX = output.velX;
				velY = output.velY;
			} else {
				keep--;
			}
		}
		if (grid[headX + velX][headY + velY].state == 1) {
			score++;
			ctx.fillStyle = "rgb(0, 0, 0)";
			ctx.fillRect(canvas.width/2 - 50, canvas.height * .05, 100, canvas.height * .05);
			ctx.fillStyle = "rgb(255, 255, 255)";
			ctx.fillText(score - startScore, canvas.width/2, canvas.height * .1);
			if(score== 100 || score == "100" || score == "200"|| score== 200 || score == "300"|| score== 300 || score == "400"|| score== 400 || score == "500"|| score== 500 || score == "600" || score == "600"|| score == "700" || score == "700"|| score == "800" || score == "800"|| score == "900" || score == "900") {
				playSound(sounds.score100)
			}
			makeFood();
			if (!aiOn) {
				if (!askQuestion()) {
					endGame();
				}
			}
		} else if (grid[headX + velX][headY + velY].state == 2) {
			endGame();
			return;
		}
		
		pauseSound(sounds.slither)
		playSound(sounds.slither)
			grid[headX + velX][headY + velY].state = 2;
			grid[headX + velX][headY + velY].age = score;
			headX += velX;
			headY += velY;
			grid[headX][headY].drawNode(pixelWidth, pixelWidth);
			
			if (!gameOver)
				setTimeout(updateSnake, aiOn ? 5 : 65);
	} catch (err){
		console.log(err);
		endGame();
	}
}

function makeFood() {
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		
		endGame(true)
	}
	playSound(sounds.newFood)
	foodX = Math.floor(Math.random() * grid.length);
	foodY = Math.floor(Math.random() * grid[0].length);
	while (grid[foodX][foodY].state == 2) {
		foodX = Math.floor(Math.random() * grid.length);
		foodY = Math.floor(Math.random() * grid[0].length);
	}
	grid[foodX][foodY].state = 1;
	grid[foodX][foodY].drawNode(pixelWidth, pixelWidth);
}

function endGame(m) {

	if(m) {
		gameOver = true
		mobile = true
	}
	

	console.log("game over");
	gameOver = true;
	playSound(sounds.gameOver)
	
	draw();
}

function getAIDir(headX, headY, foodX, foodY) {

	let ret = {"velX": 0, "velY": 0};
	let i = 1;
	if (grid[headX + i] != undefined) {
		while(grid[headX + i][headY].state != 2 || grid[headX + i][headY].age - i < 0) {
			if (headX + i == foodX) {
				if (grid[headX + i][(headY - 1 < 0) ? headY + 1 : headY - 1].state != 2 || grid[headX + i][(headY + 1 > grid[0].length - 1) ? headY - 1 : headY + 1].state != 2) {
					ret.velX = 1;
					ret.velY = 0;
					keep = i - 1;
					return ret;
				} else {
					console.log("one wide path to food");
					//i = 0;
				}
			}
			i++;
			if (grid[headX + i] == undefined) {
				break;
			}
		}
	}
	let j = 1;
	if (grid[headX - j] != undefined) {
		while(grid[headX - j][headY].state != 2 || grid[headX - j][headY].age - j < 0) {
			if (headX - j == foodX) {
				if (grid[headX - j][(headY - 1 < 0) ? headY + 1 : headY - 1].state != 2 || grid[headX - j][(headY + 1 > grid[0].length - 1) ? headY - 1 : headY + 1].state != 2) {
					ret.velX = -1;
					ret.velY = 0;
					keep = j - 1;
					return ret;
				} else {
					console.log("one wide path to food");
					//j = 0;
				}
			}
			j++;
			if (grid[headX - j] == undefined) {
				break;
			}
		}
	}
	let k = 1;
	if (grid[headX][headY + k] != undefined) {
		while(grid[headX][headY + k].state != 2 || grid[headX][headY + k].age - k < 0) {
			if (headY + k == foodY) {
				if (grid[(headX + 1 > grid.length - 1) ? headX - 1 : headX + 1][headY + k].state != 2 || grid[(headX - 1 < 0) ? headX + 1 : headX - 1][headY + k].state != 2) {
					ret.velX = 0;
					ret.velY = 1;
					keep = k - 1;
					return ret;
				} else {
					console.log("one wide path to food");
					//k = 0;
				}
			}
			k++;
			if (grid[headX][headY + k] == undefined) {
				break;
			}
		}
	}
	let l = 1;
	if (grid[headX][headY - l] != undefined) {
		while(grid[headX][headY - l].state != 2 || grid[headX][headY - l].age - l < 0) {
			if (headY - l == foodY) {
				if (grid[(headX + 1 > grid.length - 1) ? headX - 1 : headX + 1][headY - l].state != 2 || grid[(headX - 1 < 0) ? headX + 1 : headX - 1][headY - l].state != 2) {
					ret.velX = 0;
					ret.velY = -1;
					keep = l - 1;
					return ret;
				} else {
					console.log("one wide path to food");
					//l = 0;
				}
			}
			l++;
			if (grid[headX][headY - l] == undefined) {
				break;
			}
		}
	}
	//console.log("no clear path to food", i, j, k, l);
	if (Math.max(i, j, k, l) == i) {
		ret.velX = 1;
	} else if (Math.max(i, j, k, l) == j) {
		ret.velX = -1;
	} else if (Math.max(i, j, k, l) == k) {
		ret.velY = 1;
	} else {
		ret.velY = -1;
	}
	return ret;
}

function askQuestion() {

	if(window.location.hash && window.location.hash.includes('noQuestion') || window.navigator.userAgent.includes("Electron")) {
			correctAns = undefined;
			return true;
	}
	if (Math.random() > .45)
		return true;
	let num1;
	let num2;
	let ui;
	switch (Math.floor(Math.random() * 4)) {
		case 0:	
			num1 = Math.floor(Math.random() * 51);
			num2 = Math.floor(Math.random() * 26);
			ans = num1 + num2;
			ui = prompt(num1 + " + " + num2 + "= ?");
			break;
		case 1: 
			num1 = Math.floor(Math.random() * 51);
			num2 = Math.floor(Math.random() * 26);
			if (num2 > num1) {
			let sto = num1;
			num1 = num2;
			num2 = sto;
			}
			ans = num1 - num2;
			ui = prompt(num1 + " - " + num2 + "= ?");
			break;
		case 2:
			num1 = Math.floor(Math.random() * 13);
			num2 = Math.floor(Math.random() * 13);
			ans = num1 * num2;
			ui = prompt(num1 + " * " + num2 + "= ?");
			break;
		case 3: 
			num2 = Math.floor(Math.random() * 13);
			num1 = num2 * Math.floor(Math.random() * 13);
			ans = num1/num2;
			ui = prompt(num1 + " / " + num2 + "= ?");
			break;
	}
	if (ans == ui) {
		correctAns = undefined;
		playSound(sounds.questionCorrect)
		return true; 
	}
	correctAns = ans;
	return false;
}

var lastRender;
var canvas;
var ctx;
var grid;
var score;
var velX;
var velY;
var gameOver;
var aiOn;
var headX;
var headY;
var foodX;
var foodY;
var correctAns;
var startScore;
var keep;
var pixelWidth;
var mobile;
document.addEventListener("DOMContentLoaded", start);
document.addEventListener("click", onClick);
document.addEventListener("keydown", onKeyPress);
