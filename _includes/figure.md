{% assign path = include.path %}
{% assign mp4 = include.mp4 %}
{% assign caption = include.caption %}


<style>

/* figures */
.figure_outer {
    text-align: center;
	margin-left: auto;
	margin-right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 10px;  
	width: 80%; 
}
.figure_insert {
    display: inline-block;
    margin-left: 5px;
    margin-right: 5px;
    border: 0.5px solid #ddd;
    padding: 5px;	
	
}
.figure_insert img {
	width: 100%;
}
.figure_caption {
    line-height: 150%;
	text-align: center;
	margin-left: auto;
	margin-right: auto; 
    margin-top: 2px; 
    padding: 0px;
	font-size: 1.25em;
}
</style>

<div class="figure_outer">
	<div class="figure_insert">
		{% if path %}
		<img src="{{path}}" alt="" />
		{% endif %}
		{% if mp4 %}
		<video>
			<source src="{{mp4}}" type="video/mp4">
		</video>
		{% endif %}
		{% if caption %}
		<div class="figure_caption">
			{{caption}}
		</div>
		{% endif %}
	</div>	
</div>
