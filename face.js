/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = false;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 4;

function segment_average(segment) {
  let sum_x = 0;
  let sum_y = 0;
  let s_len = segment.length;
  for (let i=0; i<s_len; i++) {
    sum_x = sum_x + segment[i][0];
    sum_y = sum_y + segment[i][1];
  }
  return [sum_x / s_len , sum_y / s_len ];
}

// This where you define your own face object
function Face() {
  const redColour = [255,70,70];
  const blueColour = [70,70,255];
  const yellowColour = [200,255,70];

  this.eye_type = 1;    // type of eye 1 or 2
  this.mouth_open = 1;  // mouth open when 1
  this.background_colour = 1; // color of background
  this.background_shape = 1; // shape of background

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    //bakcgorund
    let dotNum = 6 //number of edges on one side of rectangle
    let spacing = 4/dotNum //spacing for vertex lines

    let horizonSpa = 0.2 //expanding the horizontal size for spiral
    let vertiSpa = 0.4 //spacing for each spiral
    
    push();
    if (this.background_colour == 1) { //colour changes
      stroke(redColour);
    } else if (this.background_colour == 2) {
      stroke(blueColour);
    } else if (this.background_colour == 3) {
      stroke(yellowColour);
    }

    if (this.background_shape = 1) { //zigzag
      push();
      translate(segment_average(positions.chin)[0],0);
      strokeWeight(0.3);
      noFill();
      beginShape();
      curveVertex(-2, -2 + spacing + 0.3)
      for (let i = 0; i < dotNum; i++) {
    
        curveVertex(-2, -2 + spacing*i + 0.3);
        curveVertex(-2 + spacing + spacing*i, -2);
      }
      curveVertex(-2 + spacing + spacing, -2);
      endShape();
  
      beginShape();
      curveVertex(2, -2 + spacing + 0.3);
      for (let i = 0; i < dotNum; i++) {
        curveVertex(2, -2 + spacing*i + 0.3);
        curveVertex(-2 + spacing + spacing*i, 2);
      }
      curveVertex(-2 + spacing + spacing, 2);
      endShape();
      pop();
    } else if (this.background_shape = 2){ //spiral
      push(); 
      translate(segment_average(positions.chin)[0],0);
      noFill();
      strokeWeight(0.3);
      beginShape();
      curveVertex(0,2);
      for (let i = 0; i < 10; i++) {
        curveVertex(0,2-vertiSpa*i);
        curveVertex(-0.4-horizonSpa*i,2-vertiSpa*i-vertiSpa);
        curveVertex(0,1.2-vertiSpa*i);
        curveVertex(0.4 +horizonSpa*i,2-vertiSpa*i-vertiSpa);
        curveVertex(0,1.6-vertiSpa*i);
      }
      curveVertex(0,-0.8);
      endShape();
      pop();
    }
    pop();

    // mouth
    // fill(this.detailColour);
    // ellipse(segment_average(positions.bottom_lip)[0], segment_average(positions.bottom_lip)[1], 1.36, 0.25 * this.mouth_open);

    //mouth
    push(); //closed by default
    translate(segment_average(positions.top_lip)[0], segment_average(positions.top_lip)[1] - 0.3);
    strokeWeight(0.4)
    scale(0.2);
    noFill();
    beginShape();
    curveVertex(-2,0.5);
    curveVertex(-2,0.5);
    curveVertex(-3,0);
    curveVertex(-4,1);
    curveVertex(-3,2);
    curveVertex(-2,1.8);
    curveVertex(0,1.5);
    curveVertex(2,1.8);
    curveVertex(3,2);
    curveVertex(4,1);
    curveVertex(3,0);
    curveVertex(2,0.5);
    curveVertex(2,0.5);
    endShape();
    pop();

    if (this.mouth_open == 1) { //let mouse open when mouth_open is 1
      push();
      translate(segment_average(positions.top_lip)[0], segment_average(positions.top_lip)[1] - 0.3);
      strokeWeight(0.4)
      scale(0.2);
      noFill();
      beginShape();
      curveVertex(-2,1.8);
      curveVertex(-2,1.8);
      curveVertex(0,segment_average(positions.bottom_lip)[1]*4);
      curveVertex(2,1.8);
      curveVertex(2,1.8);
      endShape();
      pop();
    }

    // eyebrows
    let LEB0 = positions.left_eyebrow[0];
    let LEB2 = positions.left_eyebrow[2];
    let LEB4 = positions.left_eyebrow[4];
    let REB0 = positions.right_eyebrow[0];
    let REB2 = positions.right_eyebrow[2];
    let REB4 = positions.right_eyebrow[4];

    noFill();
    strokeWeight(0.08);
    beginShape(); //left eyebrows
    curveVertex(LEB0[0],LEB0[1]);
    curveVertex(LEB0[0],LEB0[1]);
    curveVertex(LEB2[0],LEB2[1]);
    curveVertex(LEB4[0],LEB4[1]);
    curveVertex(LEB4[0],LEB4[1]);
    endShape();

    beginShape(); //right eyebrows
    curveVertex(REB0[0],REB0[1]);
    curveVertex(REB0[0],REB0[1]);
    curveVertex(REB2[0],REB2[1]);
    curveVertex(REB4[0],REB4[1]);
    curveVertex(REB4[0],REB4[1]);
    endShape();

    //nose
    let noseBegg = positions.nose_bridge[0];
    let noseBegg2 = positions.nose_bridge[2];
    let noseTop = positions.nose_bridge[3];
    let noseTipMid = positions.nose_tip[2];
    let noseEndR = positions.nose_tip[4];
    let noseEndL = positions.nose_tip[0];

    let d = dist(noseTipMid[0], 0, noseTop[0], 0);
    let noseGap = map(d, 0, 1 , 0.1, 0.6);

    if (noseTipMid[0] < noseTop[0] - 0.05) { // the nose angle depends whick side the person facing.
      noFill();
      stroke(0);
      beginShape();
      curveVertex(noseBegg[0],noseBegg[1]);
      curveVertex(noseBegg[0],noseBegg[1]);
      curveVertex(noseBegg2[0],noseBegg2[1]);
      curveVertex(noseTop[0],noseTop[1]);
      curveVertex(noseTipMid[0],noseTipMid[1]);
      curveVertex(noseTipMid[0]-noseGap,noseTipMid[1]-noseGap);
      curveVertex(noseEndL[0]+0.2,noseEndL[1] - 0.4);
      curveVertex(noseEndL[0]+0.2,noseEndL[1] - 0.4);
      endShape();
    } else if (noseTipMid[0] > noseTop[0] + 0.05) {
      noFill();
      stroke(0);
      beginShape();
      curveVertex(noseBegg[0],noseBegg[1]);
      curveVertex(noseBegg[0],noseBegg[1]);
      curveVertex(noseBegg2[0],noseBegg2[1]);
      curveVertex(noseTop[0],noseTop[1]);
      curveVertex(noseTipMid[0],noseTipMid[1]);
      curveVertex(noseTipMid[0]+noseGap,noseTipMid[1]-noseGap);
      curveVertex(noseEndR[0]-0.2,noseEndR[1] - 0.4);
      curveVertex(noseEndR[0]-0.2,noseEndR[1] - 0.4);
      endShape();
    } else { // when person is facing front
      noFill();
      stroke(0);
      beginShape();
      curveVertex(noseBegg[0],noseBegg[1]);
      curveVertex(noseBegg[0],noseBegg[1]);
      curveVertex(noseBegg2[0],noseBegg2[1]);
      curveVertex(noseTop[0],noseTop[1]);
      curveVertex(noseTop[0],noseTop[1]);
      endShape();
    }

     // eyes
    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);

    if(this.eye_type == 2) {
      let eyeLine = 120 //where line on eye appears 
  
      noFill();
      strokeWeight(0.08)
      stroke(20);
      arc(left_eye_pos[0], left_eye_pos[1],0.5,0.7,90-eyeLine,90+eyeLine,CHORD)
      arc(right_eye_pos[0], right_eye_pos[1],0.5,0.7,90-eyeLine,90+eyeLine,CHORD)
      fill(0);
      arc(left_eye_pos[0], left_eye_pos[1],0.5,0.7,90+eyeLine,90-eyeLine,CHORD)
      arc(right_eye_pos[0], right_eye_pos[1],0.5,0.7,90+eyeLine,90-eyeLine,CHORD)
  
      fill(20);
      ellipse(left_eye_pos[0], left_eye_pos[1]+0.19,0.12);
      ellipse(right_eye_pos[0], right_eye_pos[1]+0.19,0.12);
    }
    else {
      noFill();
      strokeWeight(0.08)
      stroke(20);
      ellipse(left_eye_pos[0], left_eye_pos[1],0.5,0.7)
      ellipse(right_eye_pos[0], right_eye_pos[1],0.5,0.7)

      fill(20);
      ellipse(left_eye_pos[0], left_eye_pos[1]+0.1,0.12);
      ellipse(right_eye_pos[0], right_eye_pos[1]+0.1,0.12);
    }
  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.background_colour = int(map(settings[0], 0, 100, 1, 3));
    this.eye_type = int(map(settings[1], 0, 100, 1, 2));
    this.mouth_open = int(map(settings[2], 0, 100, 1, 2));
    this.background_shape = int(map(settings[3], 0, 100, 1, 2));
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(4);
    settings[0] = map(this.background_colour, 1, 3, 0, 100);
    settings[1] = map(this.eye_type, 1, 2, 0, 100);
    settings[2] = map(this.mouth_open, 1, 2, 0, 100);
    settings[3] = map(this.background_shape, 1, 2, 0, 100);
    return settings;
  }
}
