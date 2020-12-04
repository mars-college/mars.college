---
layout: default

---

<style>

#blog_title {
    color: #111;
    font-size: 2.4em;
    font-weight: 900;
    padding-bottom:10px;
}
#blog_subtitle { 
    color: #444;
    font-size: 1.6em;
    font-weight: 400;
    padding-bottom:30px;
}
#blog_date {   
    color: #000;
    font-size: 1.2em;
    padding-bottom:10px;
    padding-top:10px;
}
#blog_post {   
    color:#000;
    font-size:1.0em;  
    padding-bottom:60px;
}

</style>

<!-- ============ CONTENT ============ -->
<div id="container">
	<div id="blog_date" class="post">
		{{ page.date | date_to_long_string }}
	</div>
	<div id="blog_title" class="post">
		{{ page.title }}
	</div>
	<div id="blog_subtitle" class="post">
		{{ page.subtitle }}
	</div>
	<hr/>
	<div id="blog_post" class="post">
		{{ content }}
	</div>
</div>