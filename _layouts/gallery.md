---
layout: default
title: Mars College
---

{% assign target_tag = page.target_tag %}

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css" />
<script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js"></script>




<style>

    .tag {
        cursor: pointer;
        background-color: #f00;
        display: inline-block;
        padding:3px;
        margin:5px;
    }
    .tag.active {
        background-color:#ff0;
    }

    #images { 
        margin: 5px 5px;
        text-align: center;
    } 
        
    #images img, #images video { 
        transition: 0.2s;
        padding: 5px; 
    } 
        
    img:hover, video:hover { 
        /* filter: drop-shadow(2px 2px 2px green);  */
        /* transform: scale(1.05);  */
        background-color:#0f0; 
    } 

    img.thumbnail1, video.thumbnail1, img.thumbnail2, video.thumbnail2 {
        display: inline-block;
        margin: 5px;
        vertical-align: middle;
    }
    img.thumbnail1, video.thumbnail1  {
        max-height: 300px;
        height: auto;
        width: auto;
        max-width: 96%;
        
    }
    img.thumbnail2, video.thumbnail2  {
        max-height: 400px;
        height: auto;
        width: auto;
        max-width:96%;
    }
        
</style>


<div class="container">
    <div id="tags">
    {% assign tags = site.data.gallery.tags %} 
    {% for tag in tags %}
        {%if tag == target_tag %}
            {% assign tag_class = "tag active" %}
        {% else %}
            {% assign tag_class = "tag" %}
        {% endif %}
        <a href="/gallery/{{tag|replace:' ','_'}}" class="{{tag_class}}" id="tag_{{tag|replace:' ','_'}}">{{tag}}</a>
    {% endfor %}
    </div>
    <div id="images">
        {% assign n = site.data.gallery.images | size %}
        {% assign images = site.data.gallery.images | sample: n %}
        {% for img in images %}
            {% assign found_tag = 0 %}
            {% for tag in img.tags %} 
                {% if tag == target_tag %}
                    {% assign found_tag = 1 %}
                {% endif %}
            {% endfor %}
            {% if found_tag == 1 %}  
                {% if img.size[0] > img.size[1] %}
                    {% assign class_name = "thumbnail1" %}
                {% else %}
                    {% assign class_name = "thumbnail2" %}
                {% endif %}
                {% if img.type == 'video' %}
                <!--
                <a data-fancybox data-type="iframe" data-src="https://drive.google.com/file/d/{{img.gdrive}}/preview" sandbox="allow-same-origin allow-scripts allow-popups allow-forms" href="javascript:;">
                    <video class="{{class_name}}" autoplay playsinline muted loop>
                        <source src="/images/gallery/thumb/{{img.name}}" type="video/mp4">                    
                        Your browser does not support playing this video
                    </video>
                </a>
                -->
                <a href="https://dl.dropboxusercontent.com/sh/jr8gbitumdjw6dj/{{img.dropbox}}/{{img.name}}?dl=0" data-fancybox="gallery" > 
                    <video class="{{class_name}}" autoplay playsinline muted loop>
                        <source src="/images/gallery/thumb/{{img.name}}" type="video/mp4">                    
                        Your browser does not support playing this video
                    </video>
                </a>
                {% elsif img.type == 'photo' %}
                <a href="https://drive.google.com/uc?export=view&id={{img.gdrive}}" data-fancybox="gallery" > 
                    <img class="{{class_name}}" src="/images/gallery/thumb/{{img.name}}">
                </a>
                {% endif %}
            {% endif %}
        {% endfor %}
    </div>
</div>

go down to the end
<script>
    console.log("lets script it");
    jQuery.support.cors = true;
    console.log("lets script it end");
</script>

<!-- 
<p>
<iframe src="https://dl.dropboxusercontent.com/s/6l2u2834v7u85dq/A3-130%2BE6-27_n14_o08_r1.30_cr3_b0.05_1.00%2C1.00%2C1.00.mp4?dl=0" width="640" height="480"></iframe>
</p> -->