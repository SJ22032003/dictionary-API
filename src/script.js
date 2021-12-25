const button = document.getElementById("button");
const inputValue = document.getElementById("inputValue");

const result = document.getElementById("result");

let head = document.getElementById("head");
let definition = document.getElementById('defination');
const audio = document.getElementById('audio');
let audioSrc = document.getElementById('audioSrc');

const loader = document.getElementById('loader');

let dictArry = undefined;

// Functions-----------------------------

//Output Result
function outputResult() {
  loader.hidden = true;
  result.classList.add("result");
  result.classList.add("animate__animated", "animate__fadeInUp");
  head.innerText = `${dictArry[0].word}`;
  definition.innerText = `${dictArry[0].meanings[0].definitions[0].definition}`;
  audioSrc.setAttribute('src',`${dictArry[0].phonetics[0].audio}`);
  audio.hidden = false;
}

// Search
function handleSearch(event) {
  audio.hidden = true;
  loader.hidden = false;
  event.preventDefault();
  let value = inputValue.value.trim('');
  if (!value) {
    loader.hidden = true;
    return;
  }

  let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`;
  getDictionary(apiUrl);
}

async function getDictionary(apiUrl) {
  try {
    let response = await fetch(apiUrl);
    dictArry = await response.json();
    console.log(dictArry);

    outputResult();
  } catch (error) {
    head.innerText = ` :(`;
    definition.innerText =`${dictArry.message} ${dictArry.resolution}.`;
  }
}

// Event Listner-------------------------

// button
button.addEventListener("click", handleSearch);

window.onload = function () {
  loader.hidden = false;
  inputValue.value = "";
  setTimeout(()=>{
    loader.hidden = true;
  },2000);
};
