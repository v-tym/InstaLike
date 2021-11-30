let start = document.getElementById("startLikeMain");
let startLikeAcaunt = document.getElementById("startLikeAcaunt");

start.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: likeMain,
  });
});

startLikeAcaunt.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: likeAcaunt,
  });
});

function likeMain () {   
  let button = document.createElement('button');
  buttonStyles();
  
  let timeCall = Date.now();
  let likes = document.getElementsByClassName('fr66n');
  like(likes);
  scroling();

  // Select the node that will be observed for mutations
  const targetNode = document.getElementsByTagName('main');  
  
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
              like(mutation.addedNodes[0].getElementsByClassName('fr66n'));
              timeCall = Date.now(); 
          }        
      }
  };
  
  // Create an observer instance linked to the callback function
  let observer = new MutationObserver(callback);
  
  // Start observing the target node for configured mutations
  observer.observe(targetNode[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0], config);
  
  let timerId = setInterval(() => {   
    if ((Date.now()-timeCall) > 3000) {
      scroling();
    }
    if ((Date.now()-timeCall) > 30000) {
      alert('Some wrong, parsing and liking stop')
      console.log('Some wrong, parsing and liking stop');
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
    window.scroll(0, window.scrollY + articleHeight); 
  }

  function like (likes) {
    for (const like of likes) {
      if (like.childNodes[0].childNodes[1] !== undefined) {
        if(like.childNodes[0].childNodes[1].childNodes[0].childNodes[0].ariaLabel == 'Like'){
          like.childNodes[0].click();
        }        
      }
    }    
  }

  function buttonStyles() {
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

  let arrowClick = document.getElementsByClassName('l8mY4');
  let button = document.createElement('button');
  let firstClick = document.getElementsByClassName('ySN3v');

  buttonStyles();

  if (arrowClick.length === 0) {   
    firstClick[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].click();
  }  
  
  let intevalId = setInterval(() => {
    like();
    clickArrow();    
  }, 6500);
  
  
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
    if (likes[0].childNodes[0].childNodes[1] !== undefined) {
      if(likes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].ariaLabel == 'Like'){
        likes[0].childNodes[0].click();
      }        
    }
    else return;
  }

  function clickArrow () {    
    if (arrowClick.length === 0)
    {
      clear();
      alert("End");
    }
    else {      
      arrowClick[0].childNodes[0].click();
    }    
  }

  function clear(){    
    button.remove();
    clearInterval(intevalId);
  }
}