$(document).ready(function () {
  const x = "x";
  const o = "o";
  let count = 0;
  let o_win = 0;
  let x_win = 0;
  let isGameOver = false;
  let winner;
  const possible_correct_answers = [
    ["#one", "#two", "#three"],
    ["#four", "#five", "#six"],
    ["#seven", "#eight", "#nine"],
    ["#one", "#four", "#seven"],
    ["#two", "#five", "#eight"],
    ["#three", "#six", "#nine"],
    ["#one", "#five", "#nine"],
    ["#three", "#five", "#seven"],
  ];

  $(".game li").click(function (e) {
    const current_cell_id = e.target.id;
    let player = count % 2 == 0 ? o : x;
    let color_class = player == o ? "btn-primary" : "btn-info";
    const isCellSelected = $(this).hasClass("disable");

    if (isGameOver) gameAlredayWon(winner);
    else if (count === 9) showTie();
    else if (isCellSelected) alert("Already selected");
    else {
      count++;
      $(this).text(player).addClass(`disable ${player} ${color_class}`);
      const isGameWon = checkGameWon(player, current_cell_id);
      if (isGameWon) {
        winner = player.toUpperCase();
        isGameOver = true;
        alert(`${winner} wins`);
        incrementPlayerWins(player);
      }
    }
  });

  $("#reset").click(function () {
    resetBoard();
  });

  // Increment a given player wins
  const incrementPlayerWins = (player) => {
    player === x
      ? (x_win++, $("#x_win").text(x_win))
      : (o_win++, $("#o_win").text(o_win));
  };

  // Reset the game board UI and initial vars
  const resetBoard = () => {
    isGameOver = false;
    count = 0;
    $(".game li").removeClass("disable o x btn-primary btn-info").text("+");
  };

  // Check only cells that are related to the current move
  const getCheckList = (cell_id) => {
    return possible_correct_answers.filter((answer) =>
      answer.includes(`#${cell_id}`)
    );
  };

  // Returns true once a correct answer found in the checklist
  const checkGameWon = (player, cell_id) => {
    const answers_to_check = getCheckList(cell_id);
    return answers_to_check.some((answer) => {
      return answer.every((cell) => $(cell).hasClass(player));
    });
  };

  const gameAlredayWon = (winner) => {
    alert(`${winner} has won the game. Start a new game`);
    resetBoard();
  };

  const showTie = () => {
    alert("Its a tie. It will restart.");
    resetBoard();
  };
});
