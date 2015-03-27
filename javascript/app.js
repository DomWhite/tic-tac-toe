var grid = [                        //array for game board
    ["tl", "tm", "tr"],
    ["ml", "mm", "mr"],
    ["bl", "bc", "br"],
];

var game = {                        //object of playing game functions
    player: "X",                    //starting player
    row: '',
    col: '',
    counterX: 0,
    counterO: 0,
    moveCount: 0,
    win: false,

    playerMove: function() {

            grid[game.row][game.col] = game.player;			//place X/O in grid array
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

        if (grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2]) { //Row 1               search for winning combo and if found,
            game.addAndClear();                                                           //adds
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

    checkDraw: function() {                                             //checks for draw and resets board a
    	if (game.moveCount === 9 && game.win === false) {
    		document.getElementById("result").innerHTML = "DRAW!!!";
            setTimeout(function() {
                reset.resetValues();
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

    addHighScore: function() {      //for realtime checking/adding of highscore
        if (game.counterX > game.counterO && game.counterX > parseInt(localStorage.tttHighScore)) {
            localStorage.setItem("tttHighScore", game.counterX);
        } else if (game.counterO > game.counterX && game.counterO > parseInt(localStorage.tttHighScore)) {
            localStorage.setItem("tttHighScore", game.counterO);
        };
        document.getElementById("highScore").innerHTML = localStorage.tttHighScore;
    },

    addAndClear: function() {      //runs addScore and after 2 seconds clears board and resets game
        game.addScore();     
        setTimeout(function() {
            document.getElementById("result").innerHTML = "";
            reset.resetBoard();
            reset.resetValues();
        }, 2000);
    },
}

var reset = {
    resetValues: function() {
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
        $(".gameCell").html("_");                   //clears cells back to blank and returns clickable class
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

window.onload = function() {

    $("#grid").on("click", ".clickable", function() {   //listens for click

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
        reset.resetValues();                       //sets reset button
        reset.resetBoard();
        reset.resetScores();
        reset.resetCounters();
    })

    if (localStorage.getItem("tttHighScore") === null) {        //sets local storage if none exists
        localStorage.setItem("tttHighScore", 0);
    }

    document.getElementById("highScore").innerHTML = localStorage.tttHighScore
}