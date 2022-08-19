// Smooth scroll.
var nav_anchor_tags = document.querySelectorAll(".nav-menu a");

for (var i = 0; i < nav_anchor_tags.length; i++) {
  nav_anchor_tags[i].addEventListener("click", function (event) {
    event.preventDefault();
    // prevents the hyperlink to directly take the control to the destination.
    var target_id = this.innerText.trim().toLowerCase();
    var target = document.getElementById(target_id);
    var scroll_interval = setInterval(function () {
      var coordinates = target.getBoundingClientRect();
      if (coordinates.top <= 0) {
        clearInterval(scroll_interval);
        return;
      }
      window.scrollBy(0, 50);
    }, 50);
  });
}

// Auto fill skill bar.
var skill_bar_animation_done = new Array(false,false,false,false,false,false);
var progress_bars = document.querySelectorAll(".skill-progress > div")

function initialize_skill_bars(bar) {
  bar.style.width = "0%";
}

function fill_bars(bar) {
  // for (let bar of progress_bars) {
    let target_width = bar.getAttribute("data-percent");
    let current_width = 0;
    let interval = setInterval(function () {
      if (current_width > target_width) {
        clearInterval(interval);
        return;
      }
      current_width++;
      bar.style.width = current_width + "%";
    }, 5);
  // }
}
function check_scroll() {
  for (let i in progress_bars) {
    let skill_container_position = progress_bars[i].getBoundingClientRect();
    if (
      !skill_bar_animation_done[i] &&
      skill_container_position.top < window.innerHeight
    ) {
      // window.innerHeight is viewport height
      skill_bar_animation_done[i] = true;
      console.log("skills section visible");
      fill_bars(progress_bars[i]);
    } else if (skill_container_position.top > window.innerHeight) {
      skill_bar_animation_done[i] = false;
      initialize_skill_bars(progress_bars[i]);
    }
  }
}
window.addEventListener("scroll", check_scroll);
