var grid = [
    ["tl", "tm", "tr"],
    ["ml", "mm", "mr"],
    ["bl", "bc", "br"],
];

var game = {
    player: "X",
    row: '',
    col: '',
    counterX: 0,
    counterO: 0,
    moveCount: 0,
    win: false,

    playerMove: function() {

            grid[game.row][game.col] = game.player;			//place X/O in grid
    	    game.checkWin();
    	    game.checkDraw();

	            if (game.player === "X") {								//change player token and colour
	                game.player = "O";
	                document.getElementById("headO").style.color = "blue";
	                document.getElementById("headX").style.color = "white";
	            } else if (game.player === "O") {
	                game.player = "X";
	                document.getElementById("headX").style.color = "blue";
	                document.getElementById("headO").style.color = "white";
	            }
    },

    checkWin: function() {

        if (grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2]) { //Row 1
            game.addAndClear();
            game.win = true;
        } else if (grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2]) { //Row 2
            game.addAndClear();
            game.win = true;
        } else if (grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2]) { //Row 3
            game.addAndClear();
            game.win = true;
        } else if (grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0]) { //Col 1
            game.addAndClear();
            game.win = true;
        } else if (grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1]) { //Col 2
            game.addAndClear();
            game.win = true;
        } else if (grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2]) { //Col 3
            game.addAndClear();
            game.win = true;
        } else if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) { //Diag TL to BR
            game.addAndClear();
            game.win = true;
        } else if (grid[2][0] === grid[1][1] && grid[1][1] === grid[0][2]) { //Diag TR to BL
            game.addAndClear();
            game.win = true;
        } else {
        	game.win = false;
        }
    },

    checkDraw: function() {
    	if (game.moveCount === 9 && game.win === false) {
    		document.getElementById("result").innerHTML = "DRAW!!!";
            setTimeout(function() {
                reset.resetAll();
                reset.resetBoard();
                document.getElementById("result").innerHTML = "";
            }, 3000);
    	}
    },

    addScore: function() {					//adds score to tally/counter and displays winner 
        if (game.player === "X") {
            document.getElementById("result").innerHTML = "X WINS!!!";
            game.counterX += 1;
            document.getElementById("scoreX").innerHTML = game.counterX;
        } else if (game.player === "O") {
            document.getElementById("result").innerHTML = "O WINS!!!";
            game.counterO += 1;
            document.getElementById("scoreO").innerHTML = game.counterO;
        }
    },

    addHighScore: function() {
        if (game.counterX > game.counterO && game.counterX > parseInt(localStorage.tttHighScore)) {
            localStorage.setItem("tttHighScore", game.counterX);
        } else if (game.counterO > game.counterX && game.counterO > parseInt(localStorage.tttHighScore)) {
            localStorage.setItem("tttHighScore", game.counterO);
        };
        document.getElementById("highScore").innerHTML = localStorage.tttHighScore;
    },

    addAndClear: function() {
        game.addScore();
        setTimeout(function() {
            document.getElementById("result").innerHTML = "";
            reset.resetBoard();
            reset.resetAll();
        }, 2000);
    },
}

var reset = {
    resetAll: function() {
        game.row = '';
        game.col = '';
        game.moveCount = 0;


    },
    resetBoard: function() {
        grid = [
            ["tl", "tm", "tr"],
            ["ml", "mm", "mr"],
            ["bl", "bc", "br"],
        ];
        $(".gameCell").html("_");
        $(".gameCell").addClass("clickable");
    },

    resetCounters: function() {
        game.counterX = 0;
        game.counterO = 0;
    },

    resetScores: function() {
        $("#scoreX").html("_");
        $("#scoreO").html("_");
    },


};


var redRound = {

};

window.onload = function() {

    $("#grid").on("click", ".clickable", function() {

        var $location = $(this).attr("id"); //take a string of the id of the clicked element
        var arrLoc = $location.split("-"); //split the string into an array
        game.row = parseInt(arrLoc[0]); //game.row is assigned the value of the value at [0] and parsed as an integer
        game.col = parseInt(arrLoc[1]); //game.col is assigned the value of the value at [1] and parsed as an integer
        document.getElementById($location).innerHTML = game.player; //the current players token is placed in the clicked element
        game.moveCount += 1;
        game.playerMove();
        game.addHighScore();
        $(this).removeClass("clickable");
    })

    $("#resetBtn").click(function() {
        reset.resetAll();
        reset.resetBoard();
        reset.resetScores();
        reset.resetCounters();
    })

    document.getElementById("highScore").innerHTML = localStorage.tttHighScore

    if (localStorage.getItem("tttHighScore") === undefined) {
        localStorage.setItem("tttHighScore", 0);
    }
}