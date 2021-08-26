let start = document.getElementById("start");

start.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: main,
  });
});


function main() {
  let likes = document.getElementsByClassName('fr66n');

  like(likes);
  


  function like (likes) {
    let toLike = Object.values(likes).filter(el => el.childNodes[0].childNodes[0].childNodes[0].childNodes[0].ariaLabel == 'Like'); 
  
    toLike.forEach(el => {
      el.childNodes[0].click();
    })
  }
}







//------------------------------------------
/*
// Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
*/