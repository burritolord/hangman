var has_won = false;
var hidden_word = '';
var correct_guesses = [];
var num_wrong_guess = 0;
var hang_man = [
  '      |    O',
  '      |    |',
  '      |   /|',
  '      |   /|\\',
  '      |    |',
  '      |   /',
  '      |   / \\'
];

window.onload = function() {
  // Draw dashed lines
  drawHiddenWord();

  // Handle guessing
  var guess_button = document.getElementById('guess_button');
  guess_button.addEventListener('click', main);

  // Handle entering a new word
  var new_word = document.getElementById('hidden_word_button');
  new_word.addEventListener('click', newWord)
};

/**
* Main game logic
*/
function main(){
  var guessed_value = getGuessedValue();
  var previously_guessed_list = getPreviouslyGuessed();

  // Check if guessed value is alphanumeric
  if (isAlphaNumeric(guessed_value) === false) {
    alert("Must be alphanumeric");
    return;
  }

  // Check if guessed value is in hidden word
  if(letterInWord(guessed_value)){
    correct_guesses.push(guessed_value);

    // Update the word being guessed
    drawHiddenWord();
  }
  else {
    // Check if already guessed
    if(!hasGuessedBefore(guessed_value, previously_guessed_list)) {
      previously_guessed_list.push(guessed_value);

      // Update previously guessed list
      setPreviouslyGuessed(previously_guessed_list.sort().toString());

      // Draw the hangman
      drawHangMan();
    }
  }
  // Clear out the guess box
  setGuessedValue('');
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
 * Check if the guessed value has been guessed before
 *
 * @param needle
 * @param haystack
 */
function hasGuessedBefore(needle, haystack){
  return haystack.indexOf(needle) >= 0;
}

/**
 * Retrieve the guessed value
 */
function getGuessedValue(){
 return document.getElementById('guess_box').value;
}

/**
 * Set the value of the input box
 * @param value
 */
function setGuessedValue(value){
  document.getElementById('guess_box').value = value;
}

/**
 * Check if the value guessed is alphanumeric
 */
function isAlphaNumeric(phrase){
  return phrase.match('^[a-zA-Z0-9]+$') !== null;
}

/**
 * Return the list of previously guessed values
 */
function getPreviouslyGuessed(){
  var previously_guessed = document.getElementById('guessed_list');
  if (previously_guessed.innerHTML !== "") {
    return previously_guessed.innerHTML.split(",");
  }

  return [];
}

/**
 * Set the value of the previously guessed text
 * @param list
 */
function setPreviouslyGuessed(list){
  document.getElementById('guessed_list').innerHTML = list;
}

/**
 * Draw the hangman
 */
function drawHangMan(){
  var bad_guess_indicies = [2,3,3,3,4,5,5];
  if (num_wrong_guess < hang_man.length && !has_won) {
    var game_board = document.getElementById("game_board");
    var board_array = game_board.innerHTML.split("\n");
    board_array[bad_guess_indicies[num_wrong_guess]] = hang_man[num_wrong_guess];
    game_board.innerHTML = board_array.join('\n');

    num_wrong_guess++;
  }
}

/**
 * Draw the word that is being guessed
 */
function drawHiddenWord(){
  var dash_placeholder = document.getElementById("dash_word");
  var word = [];
  for(var i = 0; i < hidden_word.length; i++){
    if((correct_guesses.indexOf(hidden_word.charAt(i))) >= 0){
      word.push(hidden_word.charAt(i));
    }
    else {
      word.push('_');
    }
  }

  dash_placeholder.innerHTML = "Word: " + word.join(' ');
}

/**
 * Set a new word
 */
function newWord(){
  var new_word = document.getElementById('hidden_word');
  // Check if guessed value is alphanumeric
  if (isAlphaNumeric(new_word.value) === false) {
    alert("Must be alphanumeric");
    return;
  }

  // Clear global variables
  has_won = false;
  hidden_word = new_word.value;
  correct_guesses = [];
  num_wrong_guess = 0;

  // Clear text box
  new_word.value = '';

  // Update screen
  drawHiddenWord();
}

/**
 *
 */
function clearHangman() {
  var post = ' ------\n|\n    |\n    |\n    |\n    |\n    |\n    |\n    |-------';
}
