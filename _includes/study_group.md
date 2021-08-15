{% assign name = include.name %}
{% assign topics = include.topics %}
{% assign links = include.links %}

<div class="group">
	<div class="group_name">
		{{name}}
	</div>
	<div class="group_description">
		<b>Topics:</b> {{topics}}
		{% if links %}
			<br/>
			<b>Links:</b> {{links}}
		{% endif %}
	</div>
</div>
