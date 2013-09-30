var start = new Date;
var thresh = 10; // SECONDS before new photo
var numPhotos = 50;

setInterval(function() {
	thresh = $("#duration").val();
	if (!thresh) thresh = 0;
	var secElapsed = Math.floor((new Date - start) / 1000)
	// update timer bar
  $('#timer').text(secElapsed + " Seconds");
  if (secElapsed > thresh) {
		$("#btnGo").click();
  }
  var w = $("#disp").width();
  var fraction = secElapsed / thresh;
  console.log(thresh);
  w = w - w*fraction;
  $("#timeStatus").width(w);
}, 1000);

placeNewPhoto = function(photoId, numPhotos, tag) {
	function flickrCallback (rsp) {
		if (rsp.stat != "ok") { // If this executes, something broke!
		  return;
		}
		//should only have 1 photo, should do better error checking here
		photo = rsp.photos.photo[0];
	  t_url = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "z.jpg";
	  p_url = "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
		
		$("#" + photoId).attr("src", t_url);
		// wait for image to load
		$(".loading").show();
		$("#" + photoId).attr('onload', function() { 
			console.log('loaded new photo');
			$(".loading").hide();
		});
		var title = "Untitled";
		if (photo.title !== "") {title = photo.title;}
		$("p.title").html("<a class='caption' target='_blank' href='" + p_url + "'>" + title + "</a>");
	}
	var randIndex = Math.floor((Math.random()*numPhotos));
	if (tag === "") {
		$(".display-tag").text("random");
		// show most interesting photos from flickr
		$.getJSON("http://api.flickr.com/services/rest/?",
	  {
	  	nojsoncallback: "1",
	  	method: "flickr.interestingness.getList",
	  	api_key: "3e45e1a7bb4219c06295fd0a6f451fc0",
	    format: "json",
	    per_page: "1",
	    page: randIndex + ""
	  },
	  flickrCallback);
	} else {
		$(".display-tag").text(tag);
		$.getJSON("http://api.flickr.com/services/rest/?",
	  {
	  	nojsoncallback: "1",
	  	method: "flickr.photos.search",
	  	api_key: "3e45e1a7bb4219c06295fd0a6f451fc0",
	    tags: tag,
	    tagmode: "any",
	    format: "json",
	    per_page: "1",
	    page: randIndex + "", 
	    sort: "interestingness-desc"
	  },
	  flickrCallback);
	}
};

$(document).ready(function() {

$(".trigger").click(function() {
	// $(".panel").toggle("fast");
	$("#btnGo").click();
	$(this).toggleClass("active");
	return false;
});

$("span.display-tag").click(function() {
	$(".panel").toggle();
	$(this).toggleClass("active");
	$("#tagLabel").focus();
	return false;
});

$("body").bind('keyup', function(e) {
	var code = (e.keyCode ? e.keyCode : e.which);
	if(code == 27) { //escape keycode
		$(".panel").toggle();
		$(this).toggleClass("active");
		$("#tagLabel").focus();
	}
});

$("#tagLabel").keyup(function(event){
	if (event.keyCode == 13){ 
		$("#btnGo").click();
		$(".panel").toggle();
	}
});

$("#timeStatus").click(function() {
	$(".panel2").toggle("fast");
	$("#duration").focus();
});

// make flickr API request and replace contents of img with response
$("#btnGo").click(function() {
	start = new Date;
	console.log("Handler for .click() called.");
	//"http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"
	placeNewPhoto("disp", numPhotos, $("#tagLabel").val());
});


$("#btnGo").click();
});
