---
layout: default
title: Mars College
---

{% assign target_tag = page.target_tag %}
{% assign target_tag_txt = target_tag|replace:' ','_' %} 

<script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css" />
<script src="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js"></script>

<div class="container">
    <div id="tags">
    {% assign tags = site.data.gallery.tags %} 
    {% for tag in tags %}
        {%if tag.name == target_tag_txt %}
            {% assign tag_class = "tag active" %}
        {% else %}
            {% assign tag_class = "tag" %}
        {% endif %}
        <a href="/gallery/{{tag.name|replace:' ','_'}}" class="{{tag_class}}" id="tag_{{tag.name|replace:' ','_'}}">{{tag.displayName}}</a> 
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

<div id="container">
    {{content}}
</div>