let start = document.getElementById("startLikeMain");
let startLikeAcaunt = document.getElementById("startLikeAcaunt");

start.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: main,
  });
});

startLikeAcaunt.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: likeAcaunt,
  });
});

function main () {   
  let button = document.createElement('button');
  buttonStyles();

  let timeCall = Date.now();
  let likes = document.getElementsByClassName('fr66n');
  
  like(likes);
  scroling();

  // Select the node that will be observed for mutations
  const targetNode = document.getElementsByTagName('main');
  //console.log(targetNode[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0]);  
  
  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true};
  
  // Callback function to execute when mutations are observed
  const callback = function(mutationsList, observer) {
      // Use traditional 'for loops' for IE 11
      for(const mutation of mutationsList) {
          if (mutation.type == 'childList' 
              && mutation.addedNodes.length != 0
              && mutation.addedNodes[0].nodeName == 'ARTICLE'
              && mutation.previousSibling != null) {
              like(mutation.addedNodes[0].getElementsByClassName('fr66n'))
              timeCall = Date.now(); 
          }        
      }
  };
  
  // Create an observer instance linked to the callback function
  let observer = new MutationObserver(callback);
  
  // Start observing the target node for configured mutations
  observer.observe(targetNode[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0], config);
  
  let timerId = setInterval(() => {
    console.log(Date.now()-timeCall);
    if ((Date.now()-timeCall) > 3000) {
      scroling();
    }
    if ((Date.now()-timeCall) > 30000) {
      console.log('Error parsing');
      clear();
    }
  }, 1000);

  // Later, you can stop observing   
  button.onclick = () => clear();

  function clear(){
    observer.disconnect();
    button.remove();
    clearInterval(timerId);
  }

  function scroling () { 
    let articleHeight = document.getElementsByTagName('main')[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].clientHeight;  
    //let height = document.documentElement.clientHeight;
   
      window.scroll(0, window.scrollY + articleHeight); 
    
    
    //console.log("scrol: ", timeCall)
  }

  function like (likes) {
    let toLike = Object.values(likes).filter(el => el.childNodes[0].childNodes[0].childNodes[0].childNodes[0].ariaLabel == 'Like'); 
  
    toLike.forEach(el => {
      el.childNodes[0].click();
    })
  }

  function buttonStyles() {
    //button.className = "wizbutstop";
    button.innerHTML = "Stop";
    button.style.position = 'fixed';
    button.style.left = "0px";
    button.style.top = "54px";
    button.style.background = "red";
    button.style.width = "100px";
    button.style.height = "100px";
    button.style.type = "button";
    
    document.body.append(button);
  }
}

///////////////////////////////////
function likeAcaunt () {

  let arrowClick = document.getElementsByClassName('coreSpriteRightPaginationArrow');
  let button = document.createElement('button');
  let firstClick = document.getElementsByClassName('ySN3v');

  buttonStyles();

  if (arrowClick.length === 0) {   
    firstClick[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].click();
  }  
  
  let intevalId = setInterval(() => {
    like();
    clickArrow();    
  }, 1500);
  
  
  button.onclick = () => clear();

  function buttonStyles() {    
    button.innerHTML = "Stop";
    button.style.position = 'fixed';
    button.style.left = "0px";
    button.style.top = "54px";
    button.style.background = "red";
    button.style.width = "100px";
    button.style.height = "100px";
    button.style.type = "button";
    button.style.zIndex = 2;
        
    document.body.append(button);
  }

  function like () {
    let likes = document.getElementsByClassName('fr66n');    
    if (likes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].ariaLabel == 'Like') {
      likes[0].childNodes[0].click();
      console.log('like');
    } 
    else return;
  }

  function clickArrow () {    
    if (arrowClick.length === 0)
    {
      clear();
    }
    else {      
      arrowClick[0].click();
    }    
  }

  function clear(){    
    button.remove();
    clearInterval(intevalId);
  }
}