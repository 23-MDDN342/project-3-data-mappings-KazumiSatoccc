/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 3;

// other variables can be in here too
// here's some examples for colors used


const stroke_color = [95, 52, 8];

// example of a global function
// given a segment, this returns the average point [x, y]
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
  // these are state variables for a face
  // (your variables should be different!)
  this.detailColour = [204, 136, 17];
  this.mainColour = [51, 119, 153];
  this.num_eyes = 2;    // can be either 1 (cyclops) or 2 (two eyes)
  this.eye_shift = -1;   // range is -10 to 10
  this.mouth_size = 1;  // range is 0.5 to 8

  this.chinColour = [153, 153, 51]
  this.lipColour = [136, 68, 68]
  this.eyebrowColour = [119, 85, 17]

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    console.log()
    // head
    // ellipseMode(CENTER);
    // stroke(stroke_color);
    // fill(this.mainColour);
    // ellipse(segment_average(positions.chin)[0], 0, 3, 4);
    // noStroke();
    rectMode(CENTER);
    //rect(segment_average(positions.chin)[0],0,4,4);

    let dotNum = 10
    let spacing = 4/dotNum //0.4
    
    push();
    translate(segment_average(positions.chin)[0],0);
    strokeWeight(0.05);
    stroke(50, 168, 78);
    noFill();
    beginShape();
    for (let i = 0; i < dotNum; i++) {
      curveVertex(-2, -2 + spacing*i + 0.3);
      curveVertex(-2 + spacing + spacing*i, -2);
    
      strokeWeight(0.1);
      point(-2, -2 + spacing*i + 0.3);
      point(-2 + spacing + spacing*i, -2);
    }
    endShape();
  
    line(2,-2,-1.6,2)
  
    beginShape();
    for (let i = 0; i < dotNum; i++) {
      curveVertex(2, -2 + spacing*i + 0.3);
      curveVertex(-2 + spacing + spacing*i, 2);
    }
    endShape();
    pop();

    // mouth
    // fill(this.detailColour);
    // ellipse(segment_average(positions.bottom_lip)[0], segment_average(positions.bottom_lip)[1], 1.36, 0.25 * this.mouth_size);

    //mouth code
    push();  //@ flippe depends where its facing
    translate(0,0.6);
    strokeWeight(0.5)
    scale(0.2);
    noFill();
    beginShape();
    curveVertex(-2,0.5);
    curveVertex(-2,0.5);
    curveVertex(-3,0);
    curveVertex(-4,1);
    curveVertex(-3,2);
    curveVertex(-1,1.5);
    curveVertex(2.5,0.5);
    curveVertex(3.5,2);
    curveVertex(2,3);
    curveVertex(0,2.5);
    curveVertex(-1,1.5);
    curveVertex(-1,1.5);
    endShape();

    beginShape();
    curveVertex(-2,0.5);
    curveVertex(-2,0.5);
    curveVertex(-3,0);
    curveVertex(-4,1);
    curveVertex(-3,2);
    curveVertex(-1,1.5);
    curveVertex(2.5,0.5);
    curveVertex(3.5,2);
    curveVertex(2,3);
    curveVertex(0,2.5);
    curveVertex(-1,1.5);
    curveVertex(-1,1.5);
    endShape();
    pop();

    // eyebrows
    // fill( this.eyebrowColour);
    // stroke( this.eyebrowColour);
    // strokeWeight(0.08);
    // this.draw_segment(positions.left_eyebrow);
    // this.draw_segment(positions.right_eyebrow);

    // draw the chin segment using points
    // fill(this.chinColour);
    // stroke(this.chinColour);
    // this.draw_segment(positions.chin);

    //nose
    // fill(100, 0, 100);
    // stroke(100, 0, 100);
    // this.draw_segment(positions.nose_bridge);
    // this.draw_segment(positions.nose_tip);

    let nosePosi = segment_average(positions.nose_tip);

    noFill();
    stroke(0.3);
    ellipse(nosePosi[0],nosePosi[1]-0.2,0.3,0.3);

    strokeWeight(0.03);

    // fill(this.lipColour);
    // stroke(this.lipColour);
    // this.draw_segment(positions.top_lip);
    // this.draw_segment(positions.bottom_lip);

    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);

    // eyes
    noStroke();
    //let curEyeShift = 0.04 * this.eye_shift;
    if(this.num_eyes == 2) {
      let eyeLine = 120 //between 1 ~ 180
  
      noFill();
      strokeWeight(0.05)
      stroke(20);
      arc(left_eye_pos[0], left_eye_pos[1],0.5,0.7,90-eyeLine,90+eyeLine,CHORD)
      arc(left_eye_pos[0], left_eye_pos[1],0.5,0.7,90+eyeLine,90-eyeLine,CHORD)
      arc(right_eye_pos[0], right_eye_pos[1],0.5,0.7,90-eyeLine,90+eyeLine,CHORD)
      arc(right_eye_pos[0], right_eye_pos[1],0.5,0.7,90+eyeLine,90-eyeLine,CHORD)
  
      fill(20);
      ellipse(left_eye_pos[0], left_eye_pos[1]+0.19,0.12);
      ellipse(right_eye_pos[0], right_eye_pos[1]+0.19,0.12);
    }
    else {
      // let eyePosX = (left_eye_pos[0] + right_eye_pos[0]) / 2;
      // let eyePosY = (left_eye_pos[1] + right_eye_pos[1]) / 2;

      // fill(this.detailColour);
      // ellipse(eyePosX, eyePosY, 0.45, 0.27);

      // fill(this.mainColour);
      // ellipse(eyePosX - 0.1 + curEyeShift, eyePosY, 0.18);

      noFill();
      stroke(20);
      ellipse(left_eye_pos[0], left_eye_pos[1],0.5,0.7)
      ellipse(right_eye_pos[0], right_eye_pos[1],0.5,0.7)

      fill(20);
      ellipse(left_eye_pos[0], left_eye_pos[1]+0.1,0.12);
      ellipse(right_eye_pos[0], right_eye_pos[1]+0.1,0.12);
    }
  //  fill(0)
  //  ellipse(0,0, 0.5,0.5) //center point
  //  rect(-2,-2,4.5,4) //sizing debug 
  }

  // example of a function *inside* the face object.
  // this draws a segment, and do_loop will connect the ends if true
  this.draw_segment = function(segment, do_loop) {
    for(let i=0; i<segment.length; i++) {
        let px = segment[i][0];
        let py = segment[i][1];
        ellipse(px, py, 0.1);
        if(i < segment.length - 1) {
          let nx = segment[i+1][0];
          let ny = segment[i+1][1];
          line(px, py, nx, ny);
        }
        else if(do_loop) {
          let nx = segment[0][0];
          let ny = segment[0][1];
          line(px, py, nx, ny);
        }
    }
  };

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.num_eyes = int(map(settings[0], 0, 100, 1, 2));
    this.eye_shift = map(settings[1], 0, 100, -2, 2);
    this.mouth_size = map(settings[2], 0, 100, 0.5, 8);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.num_eyes, 1, 2, 0, 100);
    settings[1] = map(this.eye_shift, -2, 2, 0, 100);
    settings[2] = map(this.mouth_size, 0.5, 8, 0, 100);
    return settings;
  }
}
