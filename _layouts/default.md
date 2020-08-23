<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
		<title>{{page.title}}</title>
		<link rel="stylesheet" type="text/css" href="/css/style.css">
		<link rel="icon" href="/favicon.png">
		<meta property="og:title" content="{{page.title}}">
		<meta name="twitter:card" content="summary" />
		<meta name="twitter:title" content="{{page.title}}" />
	{%if page.description %} 
		<meta property="og:description" content="{{page.description}}" />
		<meta name="twitter:description" content="{{page.description}}" />
	{% else %}
		<meta property="og:description" content="Mars College is an educational program, R&D lab, and residential community dedicated to cultivating a low-cost, high-tech lifestyle." />
		<meta name="twitter:description" content="Mars College is an educational program, R&D lab, and residential community dedicated to cultivating a low-cost, high-tech lifestyle." />
	{% endif %}
		<meta name="twitter:image" content="https://mars.college/images/mars_logo-300x300.png" />
		<meta property="og:image" content="https://mars.college/images/mars_logo-300x300.png" />
	</head>
	<body>
		<header class="main_header">
			<h1><a href="/">Mars College</a></h1>
			<a class="hamburger" href="#">&#9776;</a>
			<nav class="main_nav">
				<ul>
					<li><a href="/study">Study</a></li>
					<li><a href="/gallery">Gallery</a></li>
					<li><a href="/euc">EUC</a></li>
					<!-- <li><a href="https://www.instagram.com/brahman_ai/">Instagram</a></li> -->
					<li><a href="/join">Join</a></li>
				</ul>
			</nav>
		</header>
        {{content}}
		<script src="/js/navbar.js" type="text/javascript"></script>
    </body>
</html>
