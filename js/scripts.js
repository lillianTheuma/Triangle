$(document).ready(function() {
  $("form#sideForm").submit(function(event) {
    var side1 = parseInt($("input#side1").val());
    var side2 = parseInt($("input#side2").val());
    var side3 = parseInt($("input#side3").val());
    var ang1;
    var ang2;
    var ang3;

    var types=["equilateral","isoceles","scalene","impossible","An Exception has Occoured, see console for details"];
    // console.log('beef');
    if ((side1+side2+side3) / (side1+side2+side3) === 1) {
      if (isTriangle(side1,side2,side3)) { // Equilateral
        $(".type").text(types[3]);
      } else if (numMatches(side1,side2,side3) === 0) { // Isoceles
        $(".type").text(types[1]);
      } else if (numMatches(side1,side2,side3) === 1) { // Scalene
        $(".type").text(types[2]);
      } else if (numMatches(side1,side2,side3) === 3){ // Non-Triangle
        $(".type").text(types[0]);
      } else { // Exception Handling
        $(".type").text(types[4]);

      }
    } else {
      console.log("Invalid inputs");
    }
    draw(genCoords(solve(side1,side2,side3),side1,side3),side3);

    $(".type").show();

    event.preventDefault();
  });
});
function numMatches(side1,side2,side3) {
  var count = 0;
  if (side1===side2){
    count += 1;
  }
  if (side1===side3){
    count += 1;
  }
  if (side2===side3){
    count += 1;
  }
  return count;
}
function isTriangle(side1,side2,side3) {
  var total = side1+side2+side3;
  var list = [side1,side2,side3];
  for (i=0; i < 3; i++) {
    if (total - list[i] < list[i]) {
      return true;
    } // if (total - list[i] < list[i])
  } // for (i =0; ...)
return false;
} // function isTriangle()
function solve(side1,side2,side3) {
  var angles = [];
  angles[0] = Math.acos((Math.pow(side2, 2) + Math.pow(side3, 2) - Math.pow(side1, 2) / (2 * side2 * side3))%1);
  angles[1] = Math.acos((Math.pow(side3, 2) + Math.pow(side1, 2) - Math.pow(side2, 2) / (2 * side1 * side3))%1);
  angles[2] = (3.14159265359 - angles[0] - angles[1]);
  console.log(angles[0]+" "+angles[1]+ " " +angles[2])
  return angles;
}
function genCoords(angles,side1,side3){
  var a = angles[0];
  var b = angles[1];
  console.log(side1,side3)
  var rise = (side1 * (Math.sin(a)));
  var run = (Math.sqrt((side3 * side3)-(rise * rise)));
  var coords = [run,rise];
  console.log(run+" "+rise);
  return coords;
}
function draw(coords, side3) {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    console.log(coords[0],coords[1])
    var coords = [(coords[0]*20),(coords[1]*20)];
    var side2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(coords[1],coords[0]);
    ctx.lineTo((side3)*20,0);
    ctx.fill();

  }
}
