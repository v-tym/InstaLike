let start = document.getElementById("start");
let stop = document.getElementById("stop");
let triger1 = true;
let triger0 = false;


start.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: main,
  });
});

function main () {   
  let button = document.createElement('button');
  button.className = "wizbutstop";
  button.innerHTML = "Stop";
  button.style.position = 'fixed';
  button.style.left = "0px";
  button.style.top = "54px";
  button.style.background = "red";
  button.style.width = "100px";
  button.style.height = "100px";
  
  document.body.append(button);

  let timeCall = 0;
  let likes = document.getElementsByClassName('fr66n');
  
  like(likes);
  scroling();

  // Select the node that will be observed for mutations
  const targetNode = document.getElementsByTagName('main');
  console.log(targetNode[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0]);

   
  
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
              
          }        
      }
      scroling();
  };
  
  // Create an observer instance linked to the callback function
  let observer = new MutationObserver(callback);
  
  // Start observing the target node for configured mutations
  observer.observe(targetNode[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0], config);
  
  let timerId = setInterval(() => {
    console.log(Date.now()-timeCall);
    if ((Date.now()-timeCall) > 8000) {
      scroling();
    }
    if ((Date.now()-timeCall) > 60000) {
      console.log('Error parsing');
      clear();
    }
  }, 1000);

   // Later, you can stop observing   
   button.onclick = () => {
     clear();
    }

    function clear(){
      observer.disconnect();
      button.remove();
      clearInterval(timerId);
    }

  function scroling () { 
    let articleHeight = document.getElementsByTagName('main')[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].clientHeight;  
    let height = document.documentElement.clientHeight;
    setTimeout(() => {
      window.scroll(0, window.scrollY + articleHeight); 
    }, 5000); 
    timeCall = Date.now();
    console.log("scril", timeCall)
  }

  function like (likes) {
    let toLike = Object.values(likes).filter(el => el.childNodes[0].childNodes[0].childNodes[0].childNodes[0].ariaLabel == 'Like'); 
  
    toLike.forEach(el => {
      el.childNodes[0].click();
    })
  }
}