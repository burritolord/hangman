var has_won = false;
var has_lost = false;
var hidden_word = '';
var correct_guesses = [];
var num_wrong_guess = 0;
var hang_man = [
  '       |    O',
  '       |    |',
  '       |   /|',
  '       |   /|\\',
  '       |    |',
  '       |   /',
  '       |   / \\'
];

window.onload = function() {
  // Draw dashed lines
  drawHiddenWord();

  // Draw letter buttons
  addGuessingButtons();

  // Handle entering a new word
  var new_word = document.getElementById('new_word');
  new_word.addEventListener('click', newWord)
};

/**
* Main game logic
*/
function main(){

}

/**
* Check if letter in word
 *
 * @return true if the letter is in the word, false otherwise
*/
function letterInWord(letter){
  return hidden_word.indexOf(letter) >= 0;
}

/**
 * Check if the value guessed is alphanumeric
 */
function isAlphaNumeric(phrase){
  return phrase.match('^[a-zA-Z0-9]+$') !== null;
}

/**
 * Draw the hangman
 */
function drawHangMan(){
  var bad_guess_indicies = [2,3,3,3,4,5,5];
  if (num_wrong_guess < hang_man.length && !has_won && !has_lost) {
    var game_board = document.getElementById("game_board");
    var board_array = game_board.innerHTML.split("\n");
    board_array[bad_guess_indicies[num_wrong_guess]] = hang_man[num_wrong_guess];
    game_board.innerHTML = board_array.join('\n');
  }
}

/**
 * Draw the word that is being guessed
 */
function drawHiddenWord(){
  var $dash_placeholder = $("#dash_word");
  var word = [];
  for(var i = 0; i < hidden_word.length; i++){
    if((correct_guesses.indexOf(hidden_word.charAt(i))) >= 0){
      word.push(hidden_word.charAt(i));
    }
    else {
      word.push('_');
    }
  }

  $dash_placeholder.html("Word: " + word.join(' '));
}

/**
 * Set a new word
 */
function newWord(){
  var new_word = prompt('Enter new word');
  if(new_word != null){
    // Check if guessed value is alphanumeric
    if (isAlphaNumeric(new_word) === false) {
      alert("Must be alphanumeric");
      return;
    }

    // Clear global variables
    has_won = false;
    hidden_word = new_word;
    correct_guesses = [];
    num_wrong_guess = 0;

    // Update screen
    drawHiddenWord();
    clearHangman();
  }
}

/**
 * Clear the hang man pic
 */
function clearHangman() {
  var post = ['       ------\n',
              '       |\n    |',
              '       |\n',
              '       |\n',
              '       |\n',
              '       |\n',
              '\n    |\n    |\n    |\n    |\n    |\n    |-------'];
  var bad_guess_indicies = [2,3,3,3,4,5,5];
  var $game_board = $("#game_board");
  var board_array = $game_board.html().split("\n");
  for(var i; i < bad_guess_indicies.length; i++){
    board_array[bad_guess_indicies[i]] = hang_man[num_wrong_guess];
  }

  game_board.innerHTML = board_array.join('\n');
}

/**
 * Draw guessing buttons
 */
function addGuessingButtons() {
  var i, tmp, guessed_val, alpha = "abcdefghijklmnopqrstuvwxyz";
  var $row, $div = $('#letters');

  $div.append("<div id='row1' class='center'></div>");
  $div.append("<div id='row2' class='center'></div>");
  $row = $("#row1");
  for(i = 0, length = alpha.length/2; i < length; i++){
    tmp = alpha.charAt(i);
    $row.append("<button value='" + tmp + "'>" + tmp.toUpperCase() + "</button>");
  }

  $row = $("#row2");
  for(i = alpha.length/2; i < alpha.length; i++){
    tmp = alpha.charAt(i);
    $row.append("<button value='" + tmp + "'>" + tmp.toUpperCase() + "</button>");
  }

  // Add handler
  $('#letters button').click( function(){
    guessed_val = $(this).val();
    // Check if guessed value is in hidden word
    if(letterInWord(guessed_val)){
      correct_guesses.push(guessed_val);

      // Update the word being guessed
      drawHiddenWord();
    }
    else {
      // Draw the hangman
      drawHangMan();
      num_wrong_guess++;
    }
    $(this).prop('disabled', true);

    // disable buttons if lost
    if(num_wrong_guess === hang_man.length) {
      $('#letters button').prop('disabled', true);
      has_won = false;
      has_lost = true;
    }
  });
}
