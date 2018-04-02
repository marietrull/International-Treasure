console.log("Nick-the-Cage-Man-Cage is about to explore for treasure.");

// CANVAS STUFF
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

//CREATE CHARACTER
const move = 10;
const treasureCoord = [];
let villainX = 100;
let villainY = 100;
const nickCage = {
	body: {

	},
	initialize() {
		//set up our hero
		this.body = {
			x: 50,
			y: 400,
			r: 5,
			e:0
		}
	},
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
	} else if (key ==38 && nickCage.body.y > 0) {
		nickCage.body.y = nickCage.body.y-move;
		nickCage.direction = 'up';
	} else if (key==39 && nickCage.body.x < 600){
		nickCage.body.x = nickCage.body.x+move;
		nickCage.direction = 'right';
	} else if (key==40 && nickCage.body.y < 600){
		nickCage.body.y = nickCage.body.y+move;
		nickCage.direction = 'down';
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
		time +=1;
		if (time % 10 === 0 && treasure < 10){
			treasure += 1;
			createTreasure();
			
		} else if (time % 6 === 0){
			moveVillain();
		}
		findTreasure();
		console.log(time);
	}, 1000);
}

//FUNCTIONS TO GENERATE RANDOM COORDINATES
const randX = () => {
		return Math.floor(601 * Math.random());//Math.random will never allow us to get 255/we have to up it by one number. 
}

const randY = () => {
		return Math.floor(601* Math.random());//Math.random will never allow us to get 255/we have to up it by one number. 
}


//FUNCTION TO CREATE TREASURE
const createTreasure = () => {
	//Set random coordinates for treasure
	let tCoord = [randX(), randY()];
	treasureCoord.push(tCoord);

	drawTreasure();
}

//FUNCTION FOR DRAWING TREASURE
const drawTreasure = ()  => {
	// loop over our arrray of treasures and draw each one

	for(let i = 0; i < treasureCoord.length; i++) { 
		// console.log(treasureCoord[i])	
		let xCoord = treasureCoord[i][0];
		let yCoord = treasureCoord[i][1];
		

		ctx.beginPath();
		ctx.arc(xCoord, yCoord, 5, 0, 2 * Math.PI);
		ctx.fillStyle = 'blue';
		ctx.fill();
		ctx.closePath();
	}
	// nickCage.drawBody()
}

//FUNCTION TO CREATE VILLAIN

const drawVillain = () => {
	ctx.beginPath();
	ctx.arc(villainX, villainY, 10, 0, 2 * Math.PI);
	ctx.fillStyle = 'red';
	ctx.fill();
	ctx.closePath();
}

//FUNCTION TO MOVE VILLAIN

const moveVillain = () => {
	
	villainX = randX();
	villainY = randY();

}


//FUNCTION FOR FINDING TREASURE
const findTreasure = ()  => {

	for (let i = 0; i < treasureCoord.length; i++){
		// Grab Treasure's Coordinates
		let xCoord = treasureCoord[i][0];
		let yCoord = treasureCoord[i][1];

		checkCoords(xCoord, yCoord);

	}

 }

//FUNCTION FOR COLLISION DETECTION ON X AXIS
 const checkCoords = (xCoord, yCoord) => {
 	for (let i = -5; i < 5; i++){
 		if (nickCage.body.x + i == xCoord && nickCage.body.y + i == yCoord){
		console.log("X Coordinate: + " + xCoord + " Match!");
		console.log("Y Coordinate + " + yCoord + " Match!");
		}
	}
}


//CALL FUNCTIONS
nickCage.initialize();
nickCage.drawBody();
