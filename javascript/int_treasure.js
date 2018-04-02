console.log("Nick-the-Cage-Man-Cage is about to explore for treasure.");

// CANVAS STUFF
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

//CREATE CHARACTER
const move = 10;  				//how far he will move with each keystroke
const villainCoord = [];		//array to store the villains' coordinates
let treasurePoints = 0;			//variable to store treasure score
let healthPoints = 3;			//variable to store health points
let treasureX = 100;			//initial treasure x coordinate location
let treasureY = 100;			//initial treasure y coordinate



//Character Class
const nickCage = {
	body: {

	},
	initialize() {
		//Method to setup Nick
		this.body = {
			x: 50,
			y: 400,
			r: 5,
			e:0
		}
	}, //Method to draw Nick
	drawBody() {
		ctx.beginPath();
		ctx.arc(this.body.x, this.body.y, this.body.r, this.body.e, Math.PI * 2)
		ctx.fillStyle = "#000";
		ctx.fill();
		ctx.closePath();
	},
	
}

//SET EVENT LISTENERS FOR MOVEMENT
document.addEventListener('keydown', function(event){
	const key = event.keyCode;
	if(key == 37 && nickCage.body.x > 0){
		nickCage.body.x = nickCage.body.x-move;
		nickCage.direction = 'left';
		collectTreasure();
		villainCollide();
		
	} else if (key ==38 && nickCage.body.y > 0) {
		nickCage.body.y = nickCage.body.y-move;
		nickCage.direction = 'up';
		collectTreasure();
		villainCollide();
		
	} else if (key==39 && nickCage.body.x < 600){
		nickCage.body.x = nickCage.body.x+move;
		nickCage.direction = 'right';
		collectTreasure();
		villainCollide();
		
	} else if (key==40 && nickCage.body.y < 600){
		nickCage.body.y = nickCage.body.y+move;
		nickCage.direction = 'down';
		collectTreasure();
		villainCollide();
	}
	//clear old Cage and remove trail
	ctx.clearRect(0,0, canvas.width, canvas.height)
	drawTreasure();
	drawVillain();
	nickCage.drawBody();

	// findTreasure();

});


//GIVE START BUTTON FUNCTIONALITY

$('#start').on('click', () => {
	timer();
});

//GIVE RESTART BUTTON FUNCTIONALITY
$('#restart').on('click', () => {
	location.reload();
});


// CREATE TIMER
const timer = () => {
	let time = 0;
	let treasure = 0;
	console.log(time);
	setInterval(() => {
		//track the time
		time +=1;

		//create a new villain every ten seconds
		if (time % 10 === 0){
			createVillain();

		//move treasure every six seconds
		} else if (time % 6 === 0){
			moveTreasure();
		}
		//console.log(time);
	}, 1000);
}

//FUNCTIONS TO GENERATE RANDOM COORDINATES
const randX = () => {
		return Math.floor(601 * Math.random());//Math.random will never allow us to get 255/we have to up it by one number. 
}

const randY = () => {
		return Math.floor(601* Math.random());//Math.random will never allow us to get 255/we have to up it by one number. 
}


//FUNCTION TO CREATE VILLAIN
const createVillain = () => {
	//Set random coordinates for villain
	let tCoord = [randX(), randY()];
	//Store villain location in array
	villainCoord.push(tCoord);

	//draw the villain
	drawVillain();
}

//FUNCTION FOR DRAWING TREASURE
const drawVillain = ()  => {
	// loop over our arrray of villains and draw each one

	for(let i = 0; i < villainCoord.length; i++) { 
		// set coordinates for each villain	
		let xCoord = villainCoord[i][0];
		let yCoord = villainCoord[i][1];
		
		//actually draw the villain
		ctx.beginPath();
		ctx.arc(xCoord, yCoord, 5, 0, 2 * Math.PI);
		ctx.fillStyle = 'blue';
		ctx.fill();
		ctx.closePath();
	}
	// nickCage.drawBody()
}

//FUNCTION TO DRAW TREASURE

const drawTreasure = () => {
	ctx.beginPath();
	ctx.arc(treasureX, treasureY, 10, 0, 2 * Math.PI);
	ctx.fillStyle = 'red';
	ctx.fill();
	ctx.closePath();
}

//FUNCTION TO MOVE TREASURE

const moveTreasure = () => {
	
	treasureX = randX();
	treasureY = randY();

}


//FUNCTION FOR VILLAIN COLLISION
const villainCollide = ()  => {

	for (let i = 0; i < villainCoord.length; i++){
		// Grab Treasure's Coordinates
		let cageBodyX = nickCage.body.x;
		let cageBodyY = nickCage.body.y;
		let xCoord = villainCoord[i][0];
		let yCoord = villainCoord[i][1];
		const r = 5;

		if(cageBodyX + r > xCoord - r && cageBodyX - r < xCoord + r && cageBodyY - r < yCoord + r && cageBodyY + r > yCoord + r){
			healthPoints -= 1;
			if(healthPoints >= 0){
				$('#health').text("Health: " + healthPoints);
				console.log("Nick was attacked by a Villain!");
			} else {
				window.alert("Sean Bean got your ass! Game over.")
				location.reload();
			}
		} 
	}
}
 
//FUNCTION FOR COLLISION DETECTION W/ VILLAIN
const collectTreasure = () => {
	let cageBodyX = nickCage.body.x;
	let cageBodyY = nickCage.body.y;
	const r = 5;

	for(let i = -5; i < 5; i++){
 		if(cageBodyX + r > treasureX - r && cageBodyX - r < treasureX + r && cageBodyY - r < treasureY + r && cageBodyY + r > treasureY + r){
 			console.log("Nick found his treasure!");
 			moveTreasure();
 			treasurePoints += 1;
 			if(treasurePoints < 5){
 				$('#treasure').text("Treasure: " + treasurePoints);
 			} else {
 				window.alert("You managed to collect all of the treasure! You Win!");
 				location.reload();
 			}
		}
	}
}


//CALL FUNCTIONS
nickCage.initialize();
nickCage.drawBody();
drawTreasure();
