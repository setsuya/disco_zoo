$(document).ready(function(){
	var area = "";

	$("#area button").click(function(){
		area = $(this).attr("id");

		$.get("animals/" + area + ".json?nocache=" + (new Date()).getTime(), function(json){
			for(i = 0; i < json["animals"].length; i++){
				$(".animal:eq(" + i + ") input").val(json["animals"][i]["strategy"]);
				$(".animal:eq(" + i + ") img").attr("src", "img/animals/" + json["animals"][i]["name"] + ".png");
				$(".animal:eq(" + i + ") p").text(json["animals"][i]["name"]);

				pattern_html = "<div class=\"overlay\"></div><div class=\"pattern\">";

				for(j = 0; j < json["animals"][i]["pattern"].length; j++){
					if(json["animals"][i]["pattern"][j] == 0){
						pattern_html += "<div class=\"empty\"></div>";
					}

					if(json["animals"][i]["pattern"][j] == 1){
						pattern_html += "<div class=\"full\"></div>";
					}

					if(json["animals"][i]["pattern"][j] == 2){
						pattern_html += "<br />";
					}
				}

				pattern_html += "</div>"

				$(".animal:eq(" + i + ") > div:eq(0)").html("<img src=\"img/star_off.png\" class=\"star\" />" + pattern_html);
			}

			if(localStorage.getItem(area)){
				animals = JSON.parse(localStorage.getItem(area));

				stars = animals.split("");

				for(i = 0; i < 6; i++){
					if(stars[i] == 1){
						$(".animal:eq(" + i + ") > div:eq(0)").find(".star").attr("src", "img/star.gif");
					}
				}
			}
		});

		$("#clear").click();
	});

	$(".check").click(function(){
		for(i = 0; i < 5; i++){
			for(j = 0; j < 5; j++){
				if(($(this).siblings("input").val()[(5 * i) + j]) == 1){
					$("#result > div:eq(" + i + ")").find("div:eq(" + j + ")").addClass("selected");
				}
			}
		}

		$(this).addClass("selected");
	});

	$("#clear").click(function(){
		$("#result > div div, .check").removeClass("selected");
	});

	$(".animal").each(function(){
		$(this).on("click", ".star", function(){
			pos = $(this).index(".star");
			$(".star:eq(" + pos + ")").attr("src", "img/star.gif");

			if(localStorage.getItem(area)){
				animalsObj = JSON.parse(localStorage.getItem(area));

				animals = animalsObj;
				animals = animals.substr(0, pos) + 1 + animals.substr(pos + 1);
				
				animalsObj = animals;
			}else{
				animals = "000000";
				animals = animals.substr(0, pos) + 1 + animals.substr(pos + 1);
				animalsObj = animals;
			}

			localStorage.setItem(area, JSON.stringify(animalsObj));
		});
	});

	$("#start_disco").click(function(){
		if(!($("#party").is(":visible"))){
			$("#start_disco").html("STOP! <span class=\"kbd\">P</span>");

			$("audio")[0].play();
			$("#party").fadeIn().delay(60000).fadeOut();

			var blink = function(){
				$("#party_overlay").fadeToggle("fast");
			};
			setInterval(blink, 10);

			var move = function(){
				$(".dance_animal:even").animate({"left": "-=20px"}, 450).animate({"left": "+=20px"}, 450).animate({"left": "+=20px"}, 450).animate({"left": "-=20px"}, 450);
				$(".dance_animal:odd").animate({"left": "+=20px"}, 450).animate({"left": "-=20px"}, 450).animate({"left": "-=20px"}, 450).animate({"left": "+=20px"}, 450);
			};
			setInterval(move, 0);
		}else{
			$("#start_disco").html("PARTY! <span class=\"kbd\">P</span>");

			$("audio")[0].pause()
			$("audio")[0].load();
			$("#party").finish();
		}
	});

	Mousetrap.bind("1", function(){
		$("#farm").click();
	});

	Mousetrap.bind("2", function(){
		$("#outback").click();
	});

	Mousetrap.bind("3", function(){
		$("#savanna").click();
	});

	Mousetrap.bind("4", function(){
		$("#northern").click();
	});

	Mousetrap.bind("5", function(){
		$("#polar").click();
	});

	Mousetrap.bind("6", function(){
		$("#jungle").click();
	});

	Mousetrap.bind("7", function(){
		$("#jurassic").click();
	});

	Mousetrap.bind("8", function(){
		$("#ice_age").click();
	});

	Mousetrap.bind("9", function(){
		$("#city").click();
	});

	Mousetrap.bind("0", function(){
		$("#mountain").click();
	});

	Mousetrap.bind("-", function(){
		$("#moon").click();
	});

	Mousetrap.bind("=", function(){
		$("#mars").click();
	});

	Mousetrap.bind("q", function(){
		$(".animal:eq(0) > .check").click();
	});

	Mousetrap.bind("w", function(){
		$(".animal:eq(1) > .check").click();
	});

	Mousetrap.bind("e", function(){
		$(".animal:eq(2) > .check").click();
	});

	Mousetrap.bind("r", function(){
		$(".animal:eq(3) > .check").click();
	});

	Mousetrap.bind("t", function(){
		$(".animal:eq(4) > .check").click();
	});

	Mousetrap.bind("y", function(){
		$(".animal:eq(5) > .check").click();
	});

	Mousetrap.bind("c", function(){
		$("#clear").click();
	});

	Mousetrap.bind("p", function(){
		$("#start_disco").click();
	});
});