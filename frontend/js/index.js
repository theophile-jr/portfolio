


$("html").removeClass("no-js") //adding or removing js class of html, used in css
$("html").addClass("js")
//hide loading animation when page fully loaded
$(window).load(function() {
  $(".se-pre-con").hide();

});




/*javascript for the navbar*/
var getBrowserWidth = function() { //detecting user's screen size
  if (window.innerWidth < 768) {
      // Extra Small Device
      return "xs";
  } else if (window.innerWidth < 991) {
      // Small Device
      return "sm"
  } else if (window.innerWidth < 1199) {
      // Medium Device
      return "md"
  } else {
      // Large Device
      return "lg"
  }
};


shownavbar = true;
function shownav(status) {
    if (status == "show") {
        this.shownavbar = true;
        $("nav").show()
    } else {
        this.shownavbar = false;
        $("nav").hide()
    }
}


$(document).ready(function() { //executing this code only when page fully loaded
  var ismobile = (getBrowserWidth() == "sm" || getBrowserWidth() == "xs");
  var prevScrollpos = window.pageYOffset; //function listens to scroll; and decides wethers showing or not the navbar
  window.onscroll = function() {

      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
              this.console.log("scrolling up and didn't click")
              shownav("show")
          }
       else {
          this.console.log("scrolling down")
          shownav("hide")
      }
      prevScrollpos = currentScrollPos;
  }

});
