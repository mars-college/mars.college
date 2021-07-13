---
layout: default
title: Blog
---
<h1>Latest Posts</h1>

<ul>
  {% for post in site.posts %}
    <li>
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>

<!-- https://docs.google.com/document/d/1R-SBdIl8mxUnz7RJXdRRCDXqIb22VdG4kFVAKZWWQZQ/edit?ts=60d90b88
-->