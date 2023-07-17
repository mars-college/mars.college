<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
		<title>{{page.title}}</title>
		<link rel="stylesheet" type="text/css" href="/css/style.css">
		<link rel="icon" href="/favicon.png">
	{%if page.share_type %} 
		<meta name="twitter:card" content="{{page.share_type}}" />
	{% else %}
		<meta name="twitter:card" content="summary" />
	{% endif %}
		<meta name="twitter:title" content="{{page.title}}" />
		<meta property="og:title" content="{{page.title}}">
	{%if page.description %} 
		<meta name="twitter:description" content="{{page.description}}" />
		<meta property="og:description" content="{{page.description}}" />
	{% else %}
		<meta name="twitter:description" content="Mars College is a three-month educational program, R&D lab, and off-grid residential community dedicated to cultivating a low-cost, high-tech lifestyle." />
		<meta property="og:description" content="Mars College is a three-month educational program, R&D lab, and off-grid residential community dedicated to cultivating a low-cost, high-tech lifestyle." />
	{% endif %}
	{%if page.image %} 
		<meta name="twitter:image" content="{{page.image}}" />
		<meta property="og:image" content="{{page.image}}" />
	{% else %}
		<meta name="twitter:image" content="https://mars.college/images/mars_logo-300x300.png" />
		<meta property="og:image" content="https://mars.college/images/mars_logo-300x300.png" />
	{% endif %}
	</head>
	<body>
		<header class="main_header">
			<h1><a href="/">Mars College</a></h1>
			<a class="hamburger" href="#">&#9776;</a>
			<nav class="main_nav">
				<ul>
					<!-- <li><a href="/live">Live</a></li>
					<li><a href="/work">Work</a></li>
					<li><a href="/study">Study</a></li> -->
					<li><a href="/blog">Blog</a></li>
					<li><a href="/gallery">Gallery</a></li>
					<li><a href="/join">Join</a></li>
					<!-- <li><a href="/euc">Unicycle</a></li> -->
					<li><a href="https://www.instagram.com/mars.college/"><img src="/images/instagram.png"></a></li>
					<li><a href="https://www.twitter.com/mars_college/"><img src="/images/twitter.png"></a></li>
					<li><a href="https://www.github.com/mars-college/"><img src="/images/github.png"></a></li>
				</ul>
			</nav>
		</header>
        {{content}}
		<script src="/js/navbar.js" type="text/javascript"></script>
    </body>
</html>
