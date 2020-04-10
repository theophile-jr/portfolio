

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


class NavControl {
  constructor(navselector, ismobile) {
      this.navselector = navselector; //the navbar's id
      this.ismobile = ismobile; //is the user on mobile
      this.shownavbar = true; //is the navbar displayed
      this.clicked = false; //has the user clicked on a button lately
      this.isscrolling; //is the user scrolling
      $(document).on("click", "#hrefhome, #hrefprojects, #hrefcontact", function(e) { //add an event (click) on every link (a with attr href) and executes code when triggred
          nav.clicked = true;
          console.log("clicked")
      });
  }

  shownav(status) {
      if (status == "show") {
          this.shownavbar = true;
          $(this.navselector).show()
      } else {
          this.shownavbar = false;
          $(this.navselector).hide()
      }
  }
  stoppedscrolling() { //called when user stopped scrolling
      if (this.clicked) {
          this.clicked = false;
      }
  }
  stoppedscrollinglistener(){//setup of the listener
    window.addEventListener('scroll', function(event) {
      window.clearTimeout(this.isscrolling);
      this.isscrolling = setTimeout(function() {
          this.nav.stoppedscrolling() //user stopped scrolling
      }, 66);
  }, false);
  }
}





$(document).ready(function() { //executing this code only when page fully loaded
  var ismobile = (getBrowserWidth() == "sm" || getBrowserWidth() == "xs");
  nav = new NavControl("nav", ismobile) //initiating a new instance of navcontrol class
  nav.stoppedscrollinglistener();
  firstscroll = false; //has the first scroll been done (to add the fixed class to the navbar)
  var prevScrollpos = window.pageYOffset; //function listens to scroll; and decides wethers showing or not the navbar
  window.onscroll = function() {
      
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
          if (this.nav.clicked) {
              this.console.log("scrolling up and clicked")
              this.nav.shownav("hide")
          } else {
              this.console.log("scrolling up and didn't click")
              this.nav.shownav("show")
          }
      } else {
          this.console.log("scrolling down")
          this.nav.shownav("hide")
      }
      prevScrollpos = currentScrollPos;
  }
  
});