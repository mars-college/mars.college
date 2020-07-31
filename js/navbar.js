// slide toggles without jquery
let slideUp = (target, duration) => {
	/* Sliding-up logic */
	target.style.transitionProperty = 'height, margin, padding'; /* [1.1] */
	target.style.transitionDuration = duration + 'ms'; /* [1.2] */
	target.style.boxSizing = 'border-box'; /* [2] */
	target.style.height = target.offsetHeight + 'px'; /* [3] */

	target.style.height = 0; /* [4] */
	target.style.paddingTop = 0; /* [5.1] */
	target.style.paddingBottom = 0; /* [5.2] */
	target.style.marginTop = 0; /* [6.1] */
	target.style.marginBottom = 0; /* [7.2] */
	target.style.overflow = 'hidden'; /* [7] */

	window.setTimeout( () => {
		target.style.display = 'none'; /* [8] */
		target.style.removeProperty('height'); /* [9] */
		target.style.removeProperty('padding-top');  /* [10.1] */ 
		target.style.removeProperty('padding-bottom');  /* [10.2] */ 
		target.style.removeProperty('margin-top');  /* [11.1] */ 
		target.style.removeProperty('margin-bottom');  /* [11.2] */ 
		target.style.removeProperty('overflow');  /* [12] */ 
		target.style.removeProperty('transition-duration');  /* [13.1] */ 
		target.style.removeProperty('transition-property');  /* [13.2] */ 
	}, duration);
}

let slideDown = (target, duration) => {
	/* Sliding-down logic */
	target.style.removeProperty('display'); /* [1] */
	let display = window.getComputedStyle(target).display;
	if (display === 'none') { /* [2] */
		display = 'block';
	}
	target.style.display = display;
	let height = target.offsetHeight; /* [3] */
	target.style.height = 0; /* [4] */
	target.style.paddingTop = 0; /* [5.1] */
	target.style.paddingBottom = 0; /* [5.2] */ 
	target.style.marginTop = 0; /* [6.1] */ 
	target.style.marginBottom = 0; /* [6.2] */ 
	target.style.overflow = 'hidden'; /* [7] */ 
	target.style.boxSizing = 'border-box'; /* [8] */
	target.style.transitionProperty = "height, margin, padding";  /* [9.1] */ 
	target.style.transitionDuration = duration + 'ms'; /* [9.2] */
	target.style.height = height + 'px'; /* [10] */
	target.style.removeProperty('padding-top'); /* [11.1] */ 
	target.style.removeProperty('padding-bottom'); /* [11.2] */ 
	target.style.removeProperty('margin-top'); /* [12.1] */ 
	target.style.removeProperty('margin-bottom'); /* [12.2] */
	window.setTimeout( () => {
		target.style.removeProperty('height'); /* [13] */
		target.style.removeProperty('overflow'); /* [14] */
		target.style.removeProperty('transition-duration'); /* [15.1] */
		target.style.removeProperty('transition-property'); /* [15.2] */
	}, duration);
}

let slideToggle = (target, duration = 500) => {
	if (window.getComputedStyle(target).display === 'none') {
		return slideDown(target, duration);
	} else {
		return slideUp(target, duration);
	}
}

let setupNavbar = function() {
	// Set hamburger click
	document.getElementsByClassName('hamburger')[0].addEventListener("click", function(e) {
		slideToggle(document.getElementsByClassName("main_nav")[0], 500);
		document.getElementsByClassName('main_nav')[0].classList.toggle('active');
		e.preventDefault();
	});
	// Add active class to nav
	var path = window.location.href.slice(0,-1); 
	var pathArray = window.location.href.split('/');
	var pathLocation = pathArray[3];
	var menu = document.getElementsByClassName('main_nav')[0].getElementsByTagName('a');
	for (var i=0; i<menu.length; i++) {
		var navPathArray = menu[i].href.split('/');
		var navPathLocation = navPathArray[3];
		if (pathLocation === navPathLocation){
			menu[i].classList.toggle('active');
		}
	}
}

setupNavbar();