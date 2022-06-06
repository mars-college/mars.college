{% assign path1 = include.path1 %}
{% assign caption1 = include.caption1 %}
{% assign path2 = include.path2 %}
{% assign caption2 = include.caption2 %}
{% assign path3 = include.path3 %}
{% assign caption3 = include.caption3 %}

<style>

/* figures */
.figure_outer, .figure_multi {
    text-align: center;
	margin-left: auto;
	margin-right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 10px;  
	width: 80%; 
	background-color:#f00;
}
.figure_multi {
	display: inline-block;
	margin-left: auto;
	margin-right: auto;    
}
.figure_insert {
    display: inline-block;
    margin-left: 5px;
    margin-right: 5px;
    border: 0.5px solid #ddd;
    padding: 5px;	
}
.figure_inner {
	background-color:#ff0;
	display: inline-block;
    margin-left:5px;
    margin-right:5px;
    border: 0.5px solid #ddd;
    padding:5px;
	width: 45%;
}
figure {
    display: table;
    width: 1px; 
    margin: 0px;
}
figcaption {
    display: table-row;
    line-height:150%;
    color:#666;
    background-color:#f4f4f4;
    margin-top:2px; 
    padding:0px;
}

.figure_insert img {
	width: 100%;
}
.figure_multi img {
	width:90%;
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

<div class="figure_multi">
	{% if path1 %}
	<div class="figure_inner">
		<figure>
		    <img src="{{path1}}" alt="" />
			<figcaption>{{caption1}}</figcaption>
		</figure>
	</div>
	{% endif %}
	{% if path2 %}
	<div class="figure_inner">
		<figure>
		    <img src="{{path2}}" alt="" />
			<figcaption>{{caption2}}</figcaption>
		</figure>
	</div>
	{% endif %}
	{% if path3 %}
	<div class="figure_inner">
		<figure>
		    <img src="{{path3}}" alt="" />
			<figcaption>{{caption3}}</figcaption>
		</figure>
	</div>
	{% endif %}
</div>