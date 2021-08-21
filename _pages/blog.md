---
layout: default
title: Mars College blog
---



<style>
  #container {
    width: 95%;
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 40px;
  }
  .blogpost {
    background-color:#ddd;
    padding: 20px;
    font-size: 1.2em;
    margin: 20px;
    width: 40%;
    vertical-align: top;
    display: inline-block;
    
  }
  .blogpost a {
    text-decoration: none;
  }
  .blogpost_date {
    color: #222;
    font-size: 1.2em;
    padding-bottom: 6px;
  }
  .blogpost_title { 
    color: #000;
    font-size: 1.7em;
    padding-bottom: 8px;
  }
  .blogpost_author {   
    color: #666;
    font-size: 1.3em;
    padding-bottom: 5px;
  }
  .blogpost_excerpt {   
    color: #222;
    font-size: 1.0em;
    padding-bottom: 5px;
  }

</style>


<div id="container">

{% for post in site.posts %}
  <div class="blogpost">
    <div class="blogpost_date">{{ post.date | date_to_string }}</div>
    <div class="blogpost_title"><a href="{{ post.url }}">{{ post.title }}</a></div>
    <div class="blogpost_author">by {{ post.author }}</div>
    <div class="blogpost_excerpt">{{ post.description }}<p><a href="{{ post.url }}">[read more]</a></p></div>
  </div>
{% endfor %}

</div>