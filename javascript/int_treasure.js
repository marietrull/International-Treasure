console.log("Nick-the-Cage-Man-Cage is about to explore for treasure.");

// CANVAS STUFF
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');


//--------------------NICK CAGE------------------------------------//


//CREATE CHARACTER
const move = 10;  				//how far he will move with each keystroke
let villainCoord = [];		//array to store the villains' coordinates
const treasure = document.createElement('img');
let villainPic = "https://i.imgur.com/9ePZ2di.png";
let treasurePic = 'https://i.imgur.com/Rx3n84Y.png';
let treasurePoints = 0;			//variable to store treasure score
let healthPoints = 5;			//variable to store health points
let time = 0;

//Character Class
const nickCage = {
	body: {

	},
	initialize() {
		//Method to setup Nick
		this.body = {
			x: 450,
			y: 400,
			r: 5,
			e:0
		}
	}, //Method to draw Nick
	drawBody() {
		// Create an image element
		const cageFace = document.createElement('IMG');
 
		// When the image is loaded, draw it
		cageFace.onload = function () {
		ctx.beginPath();
    	ctx.drawImage(cageFace, nickCage.body.x, nickCage.body.y);
    	ctx.closePath();
		}
 
	// Specify the src to load the image
	cageFace.src = "https://i.imgur.com/pBMjycK.png";
	},
	
}

//--------------------MOVEMENT-------------------------//

//SET EVENT LISTENERS FOR MOVEMENT
document.addEventListener('keydown', function(event){
	const key = event.keyCode;
	if(key == 37 && nickCage.body.x > 0){
		nickCage.body.x = nickCage.body.x - move;
		nickCage.direction = 'left';
		collectTreasure();
		villainCollide();

	} else if (key ==38 && nickCage.body.y > 0) {
		nickCage.body.y = nickCage.body.y - move;
		nickCage.direction = 'up';
		collectTreasure();
		villainCollide();
		
	} else if (key==39 && nickCage.body.x < 750){
		nickCage.body.x = nickCage.body.x + move;
		nickCage.direction = 'right';
		collectTreasure();
		villainCollide();
		
	} else if (key==40 && nickCage.body.y < 550){
		nickCage.body.y = nickCage.body.y + move;
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

//--------------------PICK YOUR NICK----------------------//


$('#azNick').on('click', () => {
	changeNick('https://i.imgur.com/v4AQ7Ck.jpg','https://i.imgur.com/7NejvCm.png');
})

$('#natNick').on('click', () => {
	changeNick('https://i.imgur.com/507apQg.jpg','https://i.imgur.com/rDWs2S1.png' );
	
})

$('#ghostNick').on('click', () => {
	changeNick('https://i.imgur.com/dMQ2CeY.jpg','https://i.imgur.com/DUAEDBu.jpg');
})

$('#vampNick').on('click', () => {
	changeNick('https://i.imgur.com/Id0TNTj.jpg','https://i.imgur.com/nF1Bbrj.jpg');
})

$('#wickerNick').on('click', () => {
	changeNick('https://i.imgur.com/BFSHfrF.jpg','https://i.imgur.com/blfam3z.jpg' );
})

$('#wizardNick').on('click', () => {
	changeNick('https://i.imgur.com/OLvhUGP.jpg','https://i.imgur.com/8tgTNhb.png' );
})

//--------------------BUTTONS----------------------//

$('#start').on('click', () => {
	timerFunc();
});

$('#clear').on('click', () =>{
	clearBoard();
	
})

$('#goBack').on('click', () => {
	location.reload();
});

$('#pause').on('click', () =>{
	clearInterval(timer);
})

$('#hideMe').on('click', () => {
	$('#rules').toggle(0);
})


//--------------------FUNCTIONS BASED ON NICK PICK -----------------------//

//FUNCTION TO CHANGE NICK & MAP

const changeNick = (nickImage, mapImage) => {
	//HIDE HEADER + SHOW GAME
	$('.topAndBottom').toggle(0);
	$('#pickNick').toggle();

	//Change the Map
	const imageMap = "url("+mapImage+")"
	$('#my-canvas').css('background-image', imageMap);
	//Change Nick
	const imageCage = nickImage;
	$('#nickPic').attr('src', imageCage);
}

//FUNCTION TO CHANGE VILLAIN
const setVillain = (imageLink) => {
	villainPic = imageLink;
}

//--------------------TIMER + COORDINATES + CLEAR----------------------//

// CREATE TIMER
const timerFunc = () => {
	let treasure = 0;
	console.log(time);
	timer = setInterval(() => {
		//track the time
		time +=1;

		//create a new villain every ten seconds
		if (time % 5 === 0){
			createVillain();

		//move treasure every six seconds
		} else if (time % 6 === 0){
			moveTreasure();
		}
		console.log(time);
	}, 1000);
}

//FUNCTIONS TO GENERATE RANDOM COORDINATES
const randX = () => {
		return Math.floor(751 * Math.random());//Math.random will never allow us to get 255/we have to up it by one number. 
}

const randY = () => {
		return Math.floor(551* Math.random());//Math.random will never allow us to get 255/we have to up it by one number. 
}

let treasureX = randX();			//initial treasure x coordinate 
let treasureY = randY();			//initial treasure y coordinate


//FUNCTION TO RESET THE BOARD

const clearBoard = () => {
	clearInterval(timer);
	time = 0;
	ctx.clearRect(0,0, canvas.width, canvas.height);
	villainCoord = [];
	nickCage.drawBody();
	drawTreasure();
	
}



//--------------------VILLAIN FUNCTIONS----------------------//

//FUNCTION TO CREATE VILLAIN
const createVillain = () => {
	//Set random coordinates for villain
	let tCoord = [randX(), randY()];
	//Store villain location in array
	villainCoord.push(tCoord);

	//draw the villain
	drawVillain();
}

//FUNCTION FOR DRAWING VILLAINS


const drawVillain = ()  => {
	// loop over our arrray of villains and draw each one

	for(let i = 0; i < villainCoord.length; i++) { 
		// set coordinates for each villain	
		let xCoord = villainCoord[i][0];
		let yCoord = villainCoord[i][1];
		const villain = document.createElement('img');  //villain image

		villain.onload = function () {
			ctx.beginPath();
    		ctx.drawImage(villain, xCoord, yCoord);
    		ctx.closePath();
			}
		villain.src = villainPic;
	}
	// nickCage.drawBody()
}


//FUNCTION FOR VILLAIN COLLISION
const villainCollide = ()  => {

	for (let i = 0; i < villainCoord.length; i++){
		// Grab Treasure's Coordinates
		let cageBodyX = nickCage.body.x;
		let cageBodyY = nickCage.body.y;
		let xCoord = villainCoord[i][0];
		let yCoord = villainCoord[i][1];
		const r = 15;

		if(cageBodyX + r > xCoord - r && cageBodyX - r < xCoord + r && cageBodyY - r < yCoord + r && cageBodyY + r > yCoord + r){
			healthPoints -= 1;
			villainCoord.splice(i, 1);
			createVillain();
			if(healthPoints > 0){
				$('#health').text("Health: " + healthPoints);
				console.log("Nick was attacked by a Villain!");
			} else {
				window.alert("The bad guys got to the treasure first! You have failed the world!")
				clearTimeout(timer);
				location.reload();
			}
		} 
	}
}


//--------------------TREASURE FUNCTIONS----------------------//


//FUNCTION TO DRAW TREASURE

const drawTreasure = () => {
	ctx.beginPath();
	treasure.onload = function () {
		ctx.beginPath();
    	ctx.drawImage(treasure, treasureX, treasureY);
    	ctx.closePath();
	}
	treasure.src = treasurePic;
}

//FUNCTION TO MOVE TREASURE

const moveTreasure = () => {
	
	treasureX = randX();
	treasureY = randY();

}

 
//FUNCTION FOR COLLISION DETECTION W/ TREASURE
const collectTreasure = () => {
	let cageBodyX = nickCage.body.x;
	let cageBodyY = nickCage.body.y;
	const r = 15;

 	if(cageBodyX + r > treasureX - r && cageBodyX - r < treasureX + r && cageBodyY - r < treasureY + r && cageBodyY + r > treasureY + r){
 		console.log("Nick found his treasure!");
 		moveTreasure();
 		treasurePoints += 1;
 		if(treasurePoints < 5){
 			$('#treasure').text("Treasure: " + treasurePoints);
 		} else {
 			window.alert("You managed to collect all of the treasure! You Win!");
 			clearTimeout(timer);
 		}
	}
}


//CALL FUNCTIONS
nickCage.initialize();
nickCage.drawBody();
drawTreasure();
