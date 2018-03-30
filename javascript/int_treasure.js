console.log("Nick-the-Cage-Man-Cage is about to explore for treasure.");

// CANVAS STUFF
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

//CREATE CHARACTER
const move = 10;
const treasureCoord = [];
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
	nickCage.drawBody();
	drawTreasure();

});


//GIVE START BUTTON FUNCTIONALITY

$('#start').on('click', () => {
	timer();
});

//GIVE RESTART BUTTON FUNCTIONALITY
$('#restart').on('click', () => {
	location.reload();
});

nickCage.initialize();
nickCage.drawBody();


// CREATE TIMER
const timer = () => {
	let time = 0;
	setInterval(() => {
		time +=1;
		createTreasure();
		console.log(time);
	}, 1000);
}

//FUNCTION TO CREATE TREASURE
const createTreasure = () => {
	//Set random coordinates for treasure
	let tCoord = [randX(), randY()];
	treasureCoord.push(tCoord);

	//Show coordinate array
	console.log(treasureCoord);
	
	drawTreasure();

}


//FUNCTIONS TO GENERATE RANDOM COORDINATE
const randX = () => {
		return Math.floor(601 * Math.random());//Math.random will never allow us to get 255/we have to up it by one number. 
}

const randY = () => {
		return Math.floor(601* Math.random());//Math.random will never allow us to get 255/we have to up it by one number. 
}

//FUNCTION FOR DRAWING TREASURE
const drawTreasure = ()  => {
	// loop over our arrray of treasures and draw each one

	for(let i = 0; i < treasureCoord.length; i++) { 
		console.log(treasureCoord[i])	
		let xCoord = treasureCoord[i][0];
		let yCoord = treasureCoord[i][1];
		

		ctx.beginPath();
		ctx.arc(xCoord, yCoord, 5, 0, 2 * Math.PI);
		ctx.fillStyle = 'blue';
		ctx.fill();
		ctx.closePath();
	}


}


//FUNCTION FOR DRAWING TREASURE
const somethingElse = ()  => {
	// // Compare Snake's current location to location of treasure arrays

	// if ()

	// // If the snake hits treasure, add to treasure points and remove treasure circle

	// // else keep on keepin' on

 }


//CALL FUNCTIONS
nickCage.initialize();
nickCage.drawBody();
