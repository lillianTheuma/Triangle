$(document).ready(function() {
  $("form#sideForm").submit(function(event) {
    var side1 = parseInt($("input#side1").val());
    var side2 = parseInt($("input#side2").val());
    var side3 = parseInt($("input#side3").val());

    var types= ["equilateral","isoceles","scalene","impossible"];
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

      }
    } else {
      console.log("Invalid inputs");
    }
    $(".type").show();
    //
    // $(".name").text(name);
    // $(".color").text(color);
    // $(".desc").text(desc);
    // $(".date").text(date);
    // $(".stend").text(stend);
    // $(".beverage").text(beverage);
    // $("#appointment").show();
    // $(".flavor").text(flavor);
    event.preventDefault();
  });
});
function numMatches(side1,side2,side3) {
  var count = 0;
  if (side1==side2){
    count += 1;
  }
  if (side1==side3){
    count += 1;
  }
  if (side2==side3){
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
    }
  }
  return false;
}
