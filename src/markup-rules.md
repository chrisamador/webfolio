# Markup Standards
---

#### HTML

```html

<!--

  RULES:

  * Blocks start with "block name"--block
  * Keep layout and styling separate
  * Think of blocks of sections

-->
<!-- Use as many HTML5 tags as possible  -->
<section class="homenewsevents--block">
	<div class="container">
		<div class=" homenewsevents--header">
      <!-- Do not go too deep -->
			<h3 class=" header--title">News & Events</h3>
			<a href="#" class="header--readmore">View All</a>
		</div>
    <!-- Keep layout and styling separated -->
		<div class="row">
			<div class="col-sm-6">
				<div class="homeevents--block">
					<ul class="homeevents--listing">
						<li class="events--block">
							<div class="row">
								<div class="col-xs-4">
									<div class="calendar--block">
										<div class="calendar--month">Jan</div>
										<div class="calendar--day">31</div>
									</div>
								</div>
								<div class="col-xs-8">
									<h5 class="event--title">Event Title</h5>
									<div class="event--date"><small>Jan 31, 2016 - Feb 2, 2016</small></div>
									<a href="#" class="bttn event--viewmore">View</a>
								</div>
							</div>
						</li>										
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>

```

#### LESS / SCSS

```css

/**
 *
 *	Table of contents
 *
 *	_mixins
 *		_section_mixins
 *		_text_style_mixins
 *		_newsevent_mixins
 *	_home_
 *		_homenewsevents
 *		_planvisit
 *	_master_template
 *		_page
 *		_maincontent
 *		_sidebar_
 *			_sidebarnews
 *			_sidebarevents
 */

 /*------------------------------------------
             _home_            
 ------------------------------------------*/

 /*----------  _homenewsevents  ----------*/

 .homenewsevents--block{
 	.section-block();
 }

 // News

 .homenews--block{
 	padding: 0 2em;

 	margin-bottom: 3em;

 	@media @min-sm{
 		margin-bottom: 0;
 	}
 }
 .homenews--listing{
 	.newsevent-listing();
 }

 .news--block{
 	padding: 1em 0;
 }
 .news--title{
 	margin: 0;
 	text-transform: none;
 	font-weight: initial;
 }
 .news--meta{
 	color: @gray-light;
 	margin-bottom: .75em;
 }

 // Events
 .homeevents--block{
 	padding: 0 2em;
 }
 .homeevents--listing{
 	.newsevent-listing();
 }

 .events--block{
 	padding: 1em 0;
 }

```
## Module example

### Calendar
<style>
.calendar--block{
	width: 80px;
	height: 80px;
	text-align: center;
}
.calendar--month{
	background-color: red;
	color: white;
	text-transform: uppercase;
}
.calendar--day{
	background-color: #F6F2F2;
	font-size: 2.75em;
	font-weight: bold;
	border: 1px solid #DFDFDF;
	border-top: none;
}
</style>
<div class="calendar--block">
  <div class="calendar--month">Jan</div>
  <div class="calendar--day">31</div>
</div>

```css
<!-- Style -->

.calendar--block{
	width: 80px;
	height: 80px;
	text-align: center;
}
.calendar--month{
	background-color: red;
	color: white;
	text-transform: uppercase;
}
.calendar--day{
	background-color: #F6F2F2;
	font-size: 2.75em;
	font-weight: bold;
	border: 1px solid #DFDFDF;
	border-top: none;
}

<!-- Markup -->

<div class="calendar--block">
  <div class="calendar--month">Jan</div>
  <div class="calendar--day">31</div>
</div>

```



<small>
Copyright (c) 2016 Chris Amador All Rights Reserved.
</small>
