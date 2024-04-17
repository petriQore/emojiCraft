const src = "https://emojik.vercel.app/s/";
const size = 128;

emojiQueue = [];

document.querySelector('emoji-picker')
    .addEventListener('emoji-click', event => {
        console.log(event.detail.unicode);
        emojiQueue.push(event.detail.unicode);
        if (emojiQueue.length > 2) {
            emojiQueue.shift();
        }
    });


function fetchEmojis() {
    const emoji1 = emojiQueue[0];
    const emoji2 = emojiQueue[1];
  if (emoji1 && emoji2) {
    const url = src + emoji1 + "_" + emoji2 + "/" + "?size=" + size;

    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        const img = document.createElement('img');
        img.src = imageUrl;
        document.body.appendChild(img);
      })
      .catch(error => console.error('Error:', error));
  } else {
    console.log('Please select two emojis');
  }
}