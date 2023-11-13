const http = new coreHTTP;

// Block Variables
let theList = [];

// setup selectors
const result = document.querySelector(".result");
const input =  document.querySelector("#listitem");
const addButton =  document.querySelector(".add-btn");
const delButton =  document.querySelector(".del-btn");

// Listeners
addButton.addEventListener("click", httpPost);
delButton.addEventListener("click", httpDelete);

/* Helper Functions */
function ShowList() {
  let output = "<ul>";
  for (const itm of theList) {
    output += `<li>${itm}</li>`;
  }
  output += "</ul>";
  result.innerHTML = output;
}

//todo get and write
async function GetList() {
  try {
    const response = await http.get("http://localhost:5500/api");
    theList = await response;
    ShowList();
  } catch (error) {
    console.log(error);
  } 
}

//writes data to the server
async function WriteList() {
  try {
    const response = await http.post("http://localhost:5500/api", theList);
  } catch (error) {
    console.log(error);
  }
    
}

//todo post and delete
/* Listener Functions */
async function httpPost(e) {
  e.preventDefault();
  theList.push(input.value);
  ShowList();
  await WriteList();
}

function httpDelete(e) {
  let index = theList.indexOf(input.value);
  if(index !== -1) {
    theList.splice(index, 1);
    ShowList();
    WriteList();
    return;
  }
  else {
    console.log("Item not found");
  }
}

// Loading functions
function showLoading() {
  result.innerHTML = "Loading...";
}

async function main() {
  addButton.disabled = true;
  delButton.disabled = true;
  showLoading();

  await GetList();

  addButton.disabled = false;
  delButton.disabled = false;
}

main();