---
layout: default
title: Mars College
---

<style>

    .tag {
        cursor: pointer;
        background-color:#f00;
        display: inline-block;
        padding:3px;
        margin:5px;
    }
    .tag.active {
        background-color:#ff0;
    }
    #images {
    
    }
    img.thumbnail, video.thumbnail  {
        /* width:25%; */
        height: 300px;
        display: inline-block;
        margin: 5px;
        vertical-align: middle;
    }
    img.thumbnail2, video.thumbnail2  {
        /* width:25%; */
        vertical-align: middle;
        height: 400px;
        display: inline-block;
        margin: 5px;
    }
        
</style>



<div class="container">
    <div id="tags"></div>
    <div id="images"></div>
</div>


<script>

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            if (success) {
                success(JSON.parse(xhr.responseText));
            }
        } else {
            if (error) {
                error(xhr);
            }
        }
    }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function addVideo(path, parent_div, vert) {
    console.log("GO!")
    var html_str = '\
    <video class="thumbnail" autoplay playsinline muted loop>\
        <source src="'+path+'" type="video/mp4">\
    </video>'            
/*if (vert){
        html_str = '\
            <video class="thumbnail2" autoplay playsinline muted loop>\
                <source src="'+path+'" type="video/mp4">\
            </video>'
    }*/
    parent_div.innerHTML += html_str;
}

function addImage(path, parent_div, vert) {
    var html_str = '<img class="thumbnail" src="'+path+'">';
    if (vert){
        html_str = '<img class="thumbnail2" src="'+path+'">';
    }
    parent_div.innerHTML += html_str;
}

function selectTag(tag_idx) {
    // toggle buttons
    for (var t in tags) {
        var element = document.getElementById('tag_'+t)
        element.className = t == tag_idx ? 'tag active' : 'tag';
    }
    // add images to page
    var active_images = images[tags[tag_idx]];
    shuffle(active_images);
    var parent_div = document.getElementById("images");
    parent_div.innerHTML = '';
    var zz=0;
    var yy=0;
    for (var i in active_images) {
        var img = active_images[i];
        var path = '/images/gallery/thumb/'+img.name;
        
        if (img.type == 'photo') {
            //addImage(path, parent_div, img['vert'])
            //console.log("photo",path)
            zz = zz+1;
        } else {
            addVideo(path, parent_div, img['vert'])
            console.log("video",path)
            yy = yy+1;
        }
    }
    console.log("foundd", yy, zz);
}

function dataLoaded(data) {
    // organize images by tags
    for (var d in data) {
        var img = data[d];
        var aspect = img.size[0] / img.size[1];
        img['vert'] = aspect < 0.95 ? true : false;
        for (var t in img.tags) {
            var tag = img.tags[t]
            if (!(tag in images)) {
                images[tag] = []
                tags.push(tag);
            }
            images[tag].push(img)
        }
    }
    // setup tags
    var parent_div = document.getElementById("tags");
    parent_div.innerHTML = ''
    for (var t in tags) {
        html_str = '<span onclick="selectTag('+t+')" class="tag" id="tag_'+t+'">'+tags[t]+'</span>'
        parent_div.innerHTML += html_str;
    }
}

var tags = []
var images = new Map();
loadJSON("/images/data2.json", dataLoaded);

</script>

