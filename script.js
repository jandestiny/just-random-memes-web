var nextMemeUrls = [];
var nextMemePosts = [];
var loadingScreen = "images/placeholder.jpg";
var cacheSize = 10;


async function loadMeme(level){
    if(nextMemeUrls.length > 0){
        setScreen(nextMemeUrls[0], nextMemePosts[0]);
        nextMemeUrls.shift();
        nextMemePosts.shift();
        if(nextMemeUrls.length < cacheSize){
            await newMeme();
            await newMeme();
        }
    }else{
        setScreen(loadingScreen, "loading");
        await newMeme();
        loadMeme();
    }
}

function setScreen(screen, post){
    document.querySelector('.theMeme').setAttribute("src", screen);
    document.querySelector('.sourceLink').innerHTML = "source: (" + post + ")";
    document.querySelector('.sourceLink').setAttribute("href", post);
}

async function newMeme(){
    const response = await fetch('https://meme-api.herokuapp.com/gimme');
    const myJson = await response.json();
    console.log("new Meme loaded : " + myJson["url"] + " " + myJson["postLink"]);
    nextMemeUrls.push(myJson["url"]);
    nextMemePosts.push(myJson["postLink"]);
}

document.querySelector('.shareBtn').addEventListener('click', event => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location,
        text: "Get a random meme at your convenience!"
      }).then(() => {
        console.log('Thanks for sharing!');
      })
      .catch(err => {
        console.log('Error: ', err);
      });
    } else {
      // fallback
      console.log('Sharing is not supported by this browser.');
      share();
    }
  });

  function share() {
    /* Get the text field */
    var copyText = document.querySelector('.weblink');
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  
    /* Alert the copied text */
    alert("Link was successfully copied!\n\n" + copyText.value);

    /* Reset selection */
    copyText.setSelectionRange(0,0);
  }