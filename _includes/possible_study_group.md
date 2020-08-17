{% assign name = include.name %}
{% assign topics = include.topics %}
{% assign prior_work = include.prior_work %}

<div class="group">
	<div class="group_name">
		{{name}}
	</div>
	<div class="group_description">
		<b>Topics:</b> {{topics}}
		{% if prior_work %}
			<br/>
			<b>Prior work:</b> {{prior_work}}
		{% endif %}
	</div>
</div>
