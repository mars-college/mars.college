---
layout: plain_html
title: Mars College teaser
---

<!-- ============ ADDITIONAL STYLE ============ -->
<style>
#teaser {
    font-size:0.4em;
    width:50%;
    color:#000;
}
#join_signup {
    position: absolute;
    left: 2%;
    top: 4%;
    font-size: 5vw;
    font-weight: bold;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 5px;
}
#euc1, #euc2, #euc3, #euc4, #euc5, #euc6, #euc7, #euc8, #euc9 {
    position:absolute;
    top:39%;
    height:43%;
    left:70%;
}
#euc1 {left:70%; top:26%; display: none;}
#euc2 {left:78%; top:28%; display: none;}
#euc3 {left:86%; top:30%; display: none;}
#euc4 {left:94%; top:32%; display: none;}
#euc5 {left:2%; top:34%; display: none;}
#euc6 {left:10%; top:36%; display: none;}
#euc7 {left:18%; top:38%; display: none;}
#euc8 {left:26%; top:40%; display: none;}
#euc9 {left:10%; top:60%; height:28%; display: none;}

#join_header{
    /* background-color:#000; */
    color:#000;
    position: absolute;
    left:17%;
    top:0%;
    font-size:1.5em;
    width:66%;
    /* padding-left:15%;
    padding-right:15%;*/
    padding-top:0.5%;
    padding-bottom: 0%;    
    margin-top:1%;
    margin-bottom:0%;
    text-align:center;
    z-index:55;
    background-color: rgba(255, 255, 255, 0.5);
}
#join_extension{
    margin:0px;
    padding:0px;
    background-color:#f0f;
}
.join_img {
    margin:0px;
    padding:0px;
    height:100%;
    display: block;
}
#join {
    margin:0px;
    padding:0px;
    background-color:#000;
}
.join_inset  {
    font-size:0.925em;
    line-height:160%;
}

#cactus1 {
    position:absolute;
    top:67%;
    height:34%;
    left:81%;
}
#cactus2 {
    position:absolute;
    top:72%;
    height:28%;
    left:15%;
}
#fire {
    position:absolute;
    top:77%;
    height:18%;
    left:4%;
}
</style>


<!-- ============ FOOTER ============ -->

<div id="join_extension">
    <img class="join_img" width="100%" src="/images/teaser/desert_extension.jpg">
    <div id="join_header">
        🌵 Live in nature ☀️<br/>
        🛠️ Build a home 🚙<br/>
        💻 Harness technology 📡<br/>
        🙌 Reclaim your autonomy 😎
        <p class="join_inset">Mars College is an experimental community for living & learning in the desert. Learn more about us and apply at <u>mars.college</u>. Launching January 2021.</p>
    </div>
</div>
<div id="join">
    <div id="join_inner">
        <img width="100%" src="/images/teaser/desert.png">
        <img class="desert_creature" id="euc1" src="/images/unicyclists/7.png" />
        <img class="desert_creature" id="euc2" src="/images/unicyclists/4.png" />    
        <img class="desert_creature" id="euc3" src="/images/unicyclists/3.png" />
        <img class="desert_creature" id="euc4" src="/images/unicyclists/6.png" />    
        <img class="desert_creature" id="euc5" src="/images/unicyclists/5.png" />
        <img class="desert_creature" id="euc6" src="/images/unicyclists/8.png" />       
        <img class="desert_creature" id="euc7" src="/images/unicyclists/1.png" />
        <img class="desert_creature" id="euc8" src="/images/unicyclists/2.png" />    
        <img class="desert_creature" id="euc9" src="/images/unicyclists/roadrunner.gif" />    
        <img class="over_desert" id="cactus1" src="/images/teaser/cactus1.png" />    
        <img class="over_desert" id="cactus2" src="/images/teaser/cactus2.png" /> 
        <img class="over_desert" id="fire" src="/images/teaser/fire.png" />    
    </div>
    <a href="/join">
    <!--
        <div id="join_signup">
            <div id="teaser">
                Mars College is an experimental community for living & learning in the desert.
                January 2021
            </div>
        </div>
        -->
    </a>
</div>


<!-- ============ JAVASCRIPT ============ -->
<script type="text/javascript">

function setupAnimation() {
    var initFrame = false;
    var minDist = 200;//480;
    var maxDist = 220;//550;
    var minVelocity = 0.5225;//0.0000425;
    var maxVelocity = 0.7455;//0.0000565;
    var startTime = new Date();
    
    var distance = [];
    var offset = [];
    var velocity = [];
    var position = []
    var order_offset = [4,8,1,3,6,0,2,7,5 ]
    for (var i=0; i<9; i++) {
        
        //offset.push(100000 * Math.random());
        //velocity.push(minVelocity + (maxVelocity-minVelocity) * Math.random());
        var v = minVelocity + (maxVelocity-minVelocity) * Math.random();
        var d = v * 240;
        position.push(order_offset[i]*15);
        
        //console.log(v, d, d/v)
        velocity.push(v);
        distance.push(d);
    }

    setInterval(function() {
        var ms = new Date() - startTime; 
        for (var i=0; i<9; i++) {
            //var t = -20 + distance[i] * ((velocity[i] * (ms + offset[i])) % 1);
            position[i] = (position[i] + 0.25*velocity[i]) % distance[i];
            var t = -32 + position[i];
            var euc = document.getElementById('euc'+(i+1));
            //if (t < 105 || !initFrame) {
                euc.style.left = t+"%";
                if (euc.style.display != "inline") {
                    euc.style.display = "inline";
                    euc.style.left = t+"%";
                }
            //}
        }
        initFrame = true;
    }, 6);
}

window.onload = function() {
    // initializeTags();
    // resizeTags();
    // zoomImages();
    setupAnimation();
}

</script>
