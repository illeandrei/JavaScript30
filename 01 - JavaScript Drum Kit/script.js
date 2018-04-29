fetch('mocks/music.json').then(function (response) {
    return response.json();
}).then(function (keys) {
    console.warn('data:', keys);
    createKeys(keys);
    window.addEventListener('keydown', playSound);
});

function removeTransition (e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}

function createKeys(keys) {
    keys.forEach(function (key) {
        var kbd = document.createElement('kbd');
        kbd.innerText = key.label;

        var span = document.createElement('span');
        span.classList.add('sound');
        span.innerText = key.sound;

        var audio = document.createElement('audio');
        audio.setAttribute('src', 'sounds/' + key.audio);

        var div = document.createElement('div');
        div.classList.add('key');
        div.setAttribute('data-key', key.code);

        div.appendChild(kbd);
        div.appendChild(span);
        div.appendChild(audio);

        div.addEventListener('transitionend', removeTransition);

        document.querySelector('.keys').appendChild(div);
    });
}

function playSound(e) {
    var key = document.querySelector('div[data-key="' + e.keyCode + '"]');
    var audio = key ? key.querySelector('audio') : null;
    if (!audio) return;

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
}