var seedBegin; 
var adder; 
var seedSize; 

seedBegin = 115; //determines size of the seed of life
adder = 4; //determines speed of ellipse size change
seedSize = 150; //determines size of each seed ellipse 

function draw_one_frame() {
	colorMode(HSB,360,100,100,1); // change color mode to HSB
	angleMode(DEGREES);
	background(280,100,20);
	translate(width/2,height/2-50); //center of everything

	scale(3);

	push();
  	for(i=0;i<6;i++){ //draw flower of life
  		rotate(60);
		stroke(360);
		noFill();
		push();
		strokeradialGradient( //banishing code
			0, seedSize/2, 50, 
			0, seedSize/2, 100,
			0, seedSize/2, 190,
			color(280,100,20,0),
			color(50,40,100,100),
			color(280,100,20,0)
			);
		strokeWeight(3);
		ellipse(0,seedSize/2,i/2+seedBegin,i/2+seedBegin); //ellipse for flower of life
		pop();
  	}

  	seedBegin+=adder;

  	if (seedBegin >= seedSize) { //code for changing the size of flower of life
		adder*=-1;
  	} 

  	if (seedBegin <= seedSize-50) {
  		adder*=-1;
  	}
	pop();

	push();
	radialGradient(
		0, 0, 50, //where startcolor start
		0, 0, 100, //where endcolor start
		color(50,100,100,100), //startcolor
		color(50,20,100,0) //endcolor
	  );
	noStroke();
	ellipse(0,0,250,250); //draw gradient ellipse
	pop();
}

function radialGradient(sX,sY,sR,eX,eY,eR,colorS,colorE){ //fill gradient codes
	let gradient = drawingContext.createRadialGradient(sX,sY,sR,eX,eY,eR);
	gradient.addColorStop(0, colorS);
	gradient.addColorStop(1, colorE);
	
	drawingContext.fillStyle = gradient; 
}

function strokeradialGradient(sX,sY,sR,mX,mY,mR,eX,eY,eR,colorS,colorM,colorE){ //stroke gradient codes
	let strokegradient = drawingContext.createRadialGradient(sX,sY,sR,mX,mY,mR,eX,eY,eR);
	strokegradient.addColorStop(0, colorS);
    strokegradient.addColorStop(0.5, colorM);
	strokegradient.addColorStop(1, colorE);
	
	drawingContext.strokeStyle = strokegradient; 
}