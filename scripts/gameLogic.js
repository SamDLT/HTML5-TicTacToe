(function() {

    var turn = "X";

    $("td").on("click", function(event) {

        if (!event.toElement.innerHTML.trim()) {
            event.toElement.innerHTML = turn;

            var result = checkWinner();

            if (result == "X") {
                var currentValue = parseInt($(".playerX-container > div")[1].innerHTML.trim());
                $(".playerX-container > div")[1].innerHTML = "";
                $(".playerX-container > div")[1].innerHTML = currentValue + 1;
                clearBoard();
            }

            else if (result == "O") {
                var currentValue = parseInt($(".playerO-container > div")[1].innerHTML.trim());
                $(".playerO-container > div")[1].innerHTML = "";
                $(".playerO-container > div")[1].innerHTML = currentValue + 1;
                clearBoard();
            }

            changeTurn();
        }

    });

    function changeTurn() {

        if (turn == "X")
            turn = "O";

        else if (turn == "O")
            turn = "X";

    }

    function clearBoard() {

        $('#board tr').each(function() {
            $(this).find('td').each(function() {
                $(this)[0].innerHTML = "";
            })
        })

    }

    function checkWinner() {

        var board = getBoardState();

        var result = "";

        result = checkHorizontal(board);

        if (result != "")
            return result;

        result = checkDiagonal(board);

        if (result != "")
            return result;

        result = checkVertical(board);

        if (result != "")
            return result;

        var boardIsFull = checkIfBoardIsFull(board);

        if (boardIsFull)
            clearBoard();

        return result;

    }

    function checkIfBoardIsFull(board) {

        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {
                if (!board[i][j])
                    return false;
            }
        }

        return true;
    }

    function checkHorizontal(board) {

        var result = "";
        for (var i = 0; i < board.length; i++) {
            var initialRowValue = board[i][0];
            if (initialRowValue != "") {
                if (board[i][1] == initialRowValue && board[i][2] == initialRowValue)
                    result = initialRowValue;
            }
        }

        return result;

    }

    function checkVertical(board) {

        var result = "";
        for (var i = 0; i < board.length; i++) {
            var initialRowValue = board[0][i];
            if (initialRowValue != "") {
                if (board[1][i] == initialRowValue && board[2][i] == initialRowValue)
                    result = initialRowValue;
            }
        }

        return result;

    }

    function checkDiagonal(board) {
        var result = "";

        var initialRowValueTopLeft = board[0][0];
        if (initialRowValueTopLeft != "") {
            if (board[1][1] == initialRowValueTopLeft && initialRowValueTopLeft == board[2][2])
                return initialRowValueTopLeft;

        }

        var initialRowValueTopRight = board[0][2];
        if (initialRowValueTopRight != "") {
            if (board[1][1] == initialRowValueTopRight && board[2][0] == initialRowValueTopRight)
                return initialRowValueTopRight;
        }

        return result;
    }

    function getBoardState() {

        var board = [[], [], []];

        $('#board tr').each(function() {
            $(this).find('td').each(function() {

                if (board[0].length != 3)
                    board[0].push($(this)[0].innerHTML.trim());
                else if (board[1].length != 3)
                    board[1].push($(this)[0].innerHTML.trim());
                else if (board[2].length != 3)
                    board[2].push($(this)[0].innerHTML.trim());
            })
        })

        return board;

    }

})();