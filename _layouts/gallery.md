---
layout: default
title: Mars College
---

{% assign target_tag = page.target_tag %}

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
    <div id="tags">
    {% assign tags = site.data.gallery.tags %} 
    {% for tag in tags %}
        <a href="/gallery/{{tag|replace:' ','_'}}" class="tag" id="tag_{{tag|replace:' ','_'}}">{{tag}}</a>
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
                {% if img.type == 'video' %}
                <video class="thumbnail" autoplay playsinline muted loop>
                    <source src="/images/gallery/thumb/{{img.name}}" type="video/mp4">
                    Your browser does not support playing this video
                </video>
                {% elsif img.type == 'photo' %}
                    <img class="thumbnail" src="/images/gallery/thumb/{{img.name}}">
                {% endif %}
            {% endif %}
        {% endfor %}
    </div>
</div>


