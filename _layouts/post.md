---
layout: default
---

<style>

#blog_title {
    color: #111;
    font-size: 2.2em;
    font-weight: 900;
    padding-bottom: 10px;
    padding-top: 20px;
}
#blog_subtitle { 
    padding-bottom: 10px;
    padding-top: 10px;
    font-size: 1.2em;
}
#blog_date {   
    color: #666;
    font-size: 1.2em;
}
#blog_author {   
    color: #333;
    font-size: 1.2em;
}
#blog_post {   
    color:#000;
    font-size:1.0em;  
    line-height: 180%;
    padding-bottom: 60px;
}

</style>

<!-- ============ CONTENT ============ -->
<div id="container">
	<div id="blog_title" class="post">
		{{ page.title }}
	</div>
    <div id="blog_subtitle" class="post">
		<span id="blog_date">{{ page.date | date_to_string }}</span>
        <span style="float:right"><a href="/blog">back to blog</a></span>
	</div>
    <hr/>	
    <div id="blog_post" class="post">
		{{ content }}
	</div>
    <hr/>
    <div id="blog_subtitle" class="post">
        posted by: <span id="blog_author">{{ page.author }}</span>
	</div>
</div>