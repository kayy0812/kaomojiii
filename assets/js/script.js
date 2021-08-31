const kaomojiList = document.querySelector('.kaomoji-list')
const search = document.querySelector('#search-input');

loadApi();
search.onkeyup = function() {
    kaomojiList.innerHTML = ``;
    loadApi();
}

function loadApi() {
    var req = new XMLHttpRequest();
    req.open("GET", `http://kaomoji.n-at.me/kaomoji.json?filter=${search.value}`);
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                var kaomojiJson = JSON.parse(req.responseText).records;
                for (object of kaomojiJson) {
                    var kaomoji = object.text;
                    const itemKao = document.createElement('span');
                    itemKao.setAttribute('title', 'Click to copy!');
                    itemKao.setAttribute('class', 'kaomoji-item');
                    itemKao.innerHTML = `${kaomoji}`;
                    kaomojiList.appendChild(itemKao);
                }
                const kaomojiItems = document.querySelectorAll('.kaomoji-item');
                for (const kaomojiItem of kaomojiItems) {
                    kaomojiItem.onclick = function () {
                        navigator.clipboard.writeText(this.outerText);
                        setTimeout(function () {
                            alert('Copied!');
                        }, 100)
                    }
                }
            }
        }
    };
    req.send();
}
