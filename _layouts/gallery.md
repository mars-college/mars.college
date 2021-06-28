---
layout: default
title: Mars College
---

{% assign target_tag = page.target_tag %}
{% assign target_year = page.target_year %}
{% assign target_tag_txt = target_tag|replace:' ','_' %} 

<script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css" />
<script src="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js"></script>

<div class="container">
    <div id="years">   
        {% assign tag_has2020 = 0 %} 
        {% assign tag_has2021 = 0 %} 
        {% for tag in site.data.gallery.tags.y2020 %}
            {% if tag.name == target_tag %}
                {% assign tag_has2020 = 1 %} 
            {% endif %}
        {% endfor %}    
        {% for tag in site.data.gallery.tags.y2021 %}
            {% if tag.name == target_tag %}
                {% assign tag_has2021 = 1 %} 
            {% endif %}
        {% endfor %}    
        <a href="/gallery/{% if target_tag != "" %}{{target_tag|replace:' ','_'}}{% endif %}" class="year{% if target_year %}{%else %} active{% endif %}" id="year_all">All</a>
        <a href="/gallery/2020/{% if target_tag != "" and tag_has2020 == 1 %}{{target_tag|replace:' ','_'}}{% endif %}" class="year{% if target_year==2020 %} active{% endif %}" id="year_2020">2020</a>
        <a href="/gallery/2021/{% if target_tag != "" and tag_has2021 == 1  %}{{target_tag|replace:' ','_'}}{% endif %}" class="year{% if target_year==2021 %} active{% endif %}" id="year_2021">2021</a>
    </div>
    <div id="tags">
    {% assign tags = site.data.gallery.tags.all %} 
    {% if target_year == 2020 %}
        {% assign tags = site.data.gallery.tags.y2020 %} 
    {% else if target_year == 2021 %}
        {% assign tags = site.data.gallery.tags.y2021 %} 
    {% endif %}
    {% for tag in tags %}
        {% assign tags_name = tag.name|replace:' ','_' %} 
        {%if tags_name == target_tag_txt %}
            {% assign tag_class = "tag active" %}
        {% else %}
            {% assign tag_class = "tag" %}
        {% endif %}
        <a href="/gallery/{% if target_year != "" %}{{ target_year }}/{% endif %}{{tag.name|replace:' ','_'}}" class="{{tag_class}}" id="tag_{{tag.name|replace:' ','_'}}">{{tag.displayName}}</a> 
    {% endfor %}
    </div>
    <div id="images">
        {% assign n = site.data.gallery.images | size %}
        {% assign images = site.data.gallery.images | sample: n %}
        {% for img in images %}  
            {% if target_tag != "" %}
                {% assign found_tag = 0 %}
                {% for tag in img.tags %} 
                    {% if tag == target_tag %}
                        {% assign found_tag = 1 %}
                    {% endif %}
                {% endfor %}
            {% else %}
                {% assign found_tag = 1 %}
            {% endif %}
            {% assign found_year = 1 %} 
            {% if target_year %}
                {% if img.year contains target_year %}
                    {% assign found_year = 1 %} 
                {% else %}
                    {% assign found_year = 0 %} 
                {% endif %}
            {% endif %}
            {% if found_year == 1 and found_tag == 1 %}
                {% if img.size[0] > img.size[1] %}
                    {% assign class_name = "thumbnail1" %}
                {% else %}
                    {% assign class_name = "thumbnail2" %}
                {% endif %}
                {% if img.type == 'video' %}
                    {% assign dropbox_folder = "jr8gbitumdjw6dj" %}
                    {% if img.year == '2020' %}
                        {% assign dropbox_folder = "jr8gbitumdjw6dj" %}
                    {% elsif img.year == '2021' %}
                        {% assign dropbox_folder = "vv4xaf9cmw7lemm" %}
                    {% endif %}
                    <a href="https://dl.dropboxusercontent.com/sh/{{dropbox_folder}}/{{img.dropbox_link}}/{{img.filename}}?dl=0" data-fancybox="gallery" > 
                        <video class="{{class_name}}" autoplay playsinline muted loop>
                            <source src="/images/gallery/thumb/{{img.filename}}" type="video/mp4">                    
                            Your browser does not support playing this video
                        </video>
                    </a>
                {% elsif img.type == 'photo' %}
                    <a href="https://drive.google.com/uc?export=view&id={{img.drive_link}}" data-fancybox="gallery" > 
                        <img class="{{class_name}}" src="/images/gallery/thumb/{{img.filename}}">
                    </a>
                {% endif %}
            {% endif %}
        {% endfor %}
    </div>
</div>

<div id="container">
    {{content}}
</div>
