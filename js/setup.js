var tags=[
    {"text":"Body", "href":"/gallery/fitness", "position":[25, 10], "scale":1.35},
    {"text":"Yoga", "href":"/gallery/yoga", "position":[45.5, 12], "scale":1.25},
    {"text":"Life", "href":"/gallery/cyberpunk", "position":[66, 10], "scale":1.35},
    {"text":"Physical<br/>computing", "href":"/gallery/physical_computing", "position":[14, 30], "scale":1.05},
    {"text":"Drones", "href":"/gallery/drone", "position":[34, 27], "scale":1.0},
    {"text":"Electric<br/>unicycle", "href":"/gallery/electric_unicycle", "position":[45, 33], "scale":0.85},
    {"text":"Vanlife", "href":"/gallery/vanlife", "position":[57, 27], "scale":1.0},
    {"text":"Self-reliance", "href":"/gallery/", "position":[69, 33], "scale":1.05},
    {"text":"Compute", "href":"/gallery/", "position":[1, 46], "scale":1.3},
    {"text":"Robotics", "href":"/gallery/", "position":[22, 47], "scale":1.05},
    {"text":"Tele-<br/>presence", "href":"/gallery/", "position":[33, 39], "scale":0.8},
    {"text":"Autonomy", "href":"/gallery/", "position":[32, 55], "scale":0.825},
    {"text":"Brahman", "href":"https://brahman.ai", "position":[43, 47], "scale":1.1},
    {"text":"Pallet<br/>racks", "href":"/gallery/pallet_racks", "position":[58, 39], "scale":0.85},
    {"text":"Work<br/>remote", "href":"/gallery/workshops", "position":[57, 52], "scale":0.85},
    {"text":"Off-grid", "href":"/gallery/off_grid", "position":[67, 47], "scale":1.05},
    {"text":"Desert", "href":"/gallery/desert", "position":[85, 46], "scale":1.35},
    {"text":"Machine<br/>Intelligence", "href":"/gallery/machine_learning", "position":[14, 60], "scale":1.05},
    {"text":"Extended<br/>Reality", "href":"/gallery/extended_reality", "position":[33, 64], "scale":1.0},
    {"text":"DAOs", "href":"https://abraham.ai", "position":[46, 60], "scale":0.9},
    {"text":"Decentralization", "href":"/gallery/off_grid", "position":[52, 67], "scale":0.8},
    {"text":"Solar<br/>energy", "href":"/gallery/solar", "position":[74, 60], "scale":1.1},
    {"text":"Consciousness", "href":"/gallery/performance", "position":[16, 83], "scale":1.3},
    {"text":"Networks", "href":"/gallery/installation", "position":[43, 77], "scale":1.1},
    {"text":"Infrastructure", "href":"/gallery/carpentry", "position":[62, 83], "scale":1.3}
]

function initializeTags() {
    var parent = document.getElementById('activities');
    for (var i=0; i<tags.length; i++) {
        var tagDiv = document.createElement('div');
        var tagLink = document.createElement('a');
        tagLink.setAttribute('href', tags[i].href);
        tagLink.innerHTML = tags[i].text;
        tagDiv.id = tags[i].text;
        tagDiv.className = 'gallery_link';
        tagDiv.appendChild(tagLink);
        parent.appendChild(tagDiv);
    }
}

function resizeTags() {
    var baseFontScale = 0.03;
    var diagramWidth = document.getElementById('activities').clientWidth;
    for (var i=0; i<tags.length; i++) {
        var e = document.getElementById(tags[i].text);
        e.style.left = tags[i].position[0]+"%";
        e.style.top = tags[i].position[1]+"%";
        e.style.fontSize = (tags[i].scale * baseFontScale * diagramWidth) + "px";
    }
    var headerDiv = document.getElementById('header_inner');
    var footerDiv = document.getElementById('footer_inner');
    var pageWidth = footerDiv.clientWidth;
    var headerScale = 1.15 - 0.00025 * Math.max(0, pageWidth-450);
    var footerScale = 1.75 - 0.00175 * Math.max(0, pageWidth-500);
    headerScale = Math.min(Math.max(1.0, headerScale), 1.25);
    footerScale = Math.min(Math.max(1.0, footerScale), 1.75);
    headerDiv.style.transform = "scale("+headerScale+")";
    footerDiv.style.transform = "scale("+footerScale+")";
}

function setupAnimation() {
    var initFrame = false;
    var minDist = 480;
    var maxDist = 550;
    var minVelocity = 0.0000425;
    var maxVelocity = 0.0000565;
    var startTime = new Date();
    
    var distance = [];
    var offset = [];
    var velocity = [];

    for (var i=0; i<9; i++) {
        distance.push(minDist + (maxDist-minDist) * Math.random());
        offset.push(100000 * Math.random());
        velocity.push(minVelocity + (maxVelocity-minVelocity) * Math.random());
    }

    setInterval(function() {
        var ms = new Date() - startTime; 
        for (var i=0; i<9; i++) {
            var t = -10 + distance[i] * ((velocity[i] * (ms + offset[i])) % 1);
            if (t < 105 || !initFrame) {
                document.getElementById('euc'+(i+1)).style.left = t+"%";
            }
        }
        initFrame = true;
    }, 30);
}


window.onresize = resizeTags;
window.onorientationchange = resizeTags; 

initializeTags();
resizeTags();
setupAnimation();

/*
window.onload = function() {
    initializeTags();
    resizeTags();
    setupAnimation();
}
*/