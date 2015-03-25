var grid = [
			["tl", "tm", "tr"],
    		["ml", "mm", "mr"],
    		["bl", "bc", "br"],
]

var game = {
	player: "X",
	row:'',
	col:'',
	counterX: 0,
	counterO: 0,
	moveCount: 0,


	playerMove: function() {
		if (game.moveCount < 10) {
			grid[game.row][game.col] = game.player;
			game.checkWin()
			if (game.player === "X") {
				game.player = "O";
			} else if (game.player === "O") {
				game.player = "X";
			}
		} else {
			reset.resetAll();
			reset.resetBoard();
		}
	},

	checkWin: function() {
		if (grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2]) {			//Row 1
			game.addAndClear();
		} else if (grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2]) {	//Row 2
			game.addAndClear();
		} else if (grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2]) {	//Row 3
			game.addAndClear();
		} else if (grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0]) {	//Col 1
			game.addAndClear();
		} else if (grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1]) {	//Col 2
			game.addAndClear();
		} else if (grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2]) {	//Col 3
			game.addAndClear();
		} else if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {	//Diag TL to BR
			game.addAndClear();
		} else if (grid[2][0] === grid[1][1] && grid[1][1] === grid[0][2]) {	//Diag TR to BL
			game.addAndClear();
		}
	},

	addScore: function() {
			if (game.player = "X") {
				game.counterX += 1;
				document.getElementById("scoreX").innerHTML = game.counterX;
			} else if (game.player = "O") {
				game.counterO += 1;
				document.getElementById("scoreO").innerHTML = game.counterO;
			}
	},

	addAndClear: function() {
			game.addScore();
			setTimeout(function() {
				reset.resetBoard();
				reset.resetAll();
			}, 1000);
	},
}

var reset = {
	resetAll: function() {
		game.row = '';
		game.col = '';
		game.counterX = 0;
		game.counterY = 0;
		game.moveCount = 0;


	},
	resetBoard: function() {
		grid = [
				["tl", "tm", "tr"],
    			["ml", "mm", "mr"],
    			["bl", "bc", "br"],
    			];
    	$(".gameCell").html("_");
	},

	resetScores: function() {
		$("#scoreX").html("_")
		$("#scoreO").html("_")
	},


}


var redRound = {

}

window.onload = function() {

	$(".gameCell").click(function() {
		var $location = $(this).attr("id");
		var arrLoc = $location.split("-");
		game.row = parseInt(arrLoc[0]); 
		game.col = parseInt(arrLoc[1]);
		console.log(game.row, game.col);
		document.getElementById($location).innerHTML = game.player;
		game.moveCount += 1
		game.playerMove();
	})

	$("#resetBtn").click(function(){
		reset.resetAll();
		reset.resetBoard();
		reset.resetScores();
	})

}






