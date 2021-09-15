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
/*
stop.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: stop,    
  });
});
*/

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
  //let article = document.getElementsByClassName('_8Rm4L');
  let likes = document.getElementsByClassName('fr66n');

  like(likes);
  scroling();
  

  /*object.addEventListener("load", myScript);
  function me (){
    let likes = document.getElementsByClassName('fr66n');

    let heightArticles = 0;
    let scrolTo = 0;
    let article = document.getElementsByClassName('_8Rm4L');
    //let loadingStatus = document.getElementsByClassName('Id0Rh');
   
    Object.values(article).forEach(element => {
      heightArticles += element.offsetHeight;
    });
  
    console.log(article);
  }*/

  
///////////////////////////////////////////////////////////
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
              //console.log(mutation.addedNodes[0].getElementsByClassName('fr66n'));
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
    if ((Date.now()-timeCall) > 5000) {
      scroling();
    }
    if ((Date.now()-timeCall) > 60000) {
      console.log('Error parsing');
      clear();
    }
  }, 1000);

  //timerId();
  // Later, you can stop observing
   // observer.disconnect();
   button.onclick = () => {
     clear();
    }

    function clear(){
      observer.disconnect();
      button.remove();
      clearInterval(timerId);
    }

  ////////////////////////////////////////////////////////////////////\

  //console.log(heightArticles);
  /*
  chrome.storage.local.set({"heightArticles": heightArticles}, function() {
    console.log('heightArticles is set to ' + heightArticles);
  });*/

  /*setTimeout(function() {
    window.scroll(0, scroling(heightArticles));
  }, 3000);*/

 /* setInterval(() => {
    console.log(loadingStatus); //.childNodes[0].attributes[1].value
  }, 3000);*/
  

  function scroling () {  
    let height = document.documentElement.clientHeight;
    window.scroll(0, window.scrollY + height); 
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
/*
main.stop = function() {
  console.log('stop is working');
  main.observer.disconnect();
};

main.observer = new MutationObserver(callback);
*/

/*
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
