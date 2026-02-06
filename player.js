const audio = document.getElementById('main-audio') || document.createElement('audio');
if (!audio.id) {
    audio.id = 'main-audio';
    document.body.appendChild(audio);
}

const playIcon = document.getElementById('play-icon');
const footerTitle = document.getElementById('footer-title');
const footerArtist = document.getElementById('footer-artist');
const footerThumb = document.getElementById('footer-thumb');
const progressBar = document.querySelector('.progress-bar-inner');

function playPodcast(title, artist, thumb, src) {
    if (footerTitle) footerTitle.textContent = title;
    if (footerArtist) footerArtist.textContent = artist;
    if (footerThumb) footerThumb.src = thumb;
    
    if (audio.src !== src) {
        audio.src = src;
        audio.play().catch(err => console.log("Play failed:", err));
    } else {
        togglePlayback();
    }
}

function togglePlayback() {
    if (audio.paused) {
        audio.play().catch(err => console.log("Play failed:", err));
    } else {
        audio.pause();
    }
}

audio.onplay = () => {
    if (playIcon) playIcon.className = 'fa-solid fa-pause fa-xs';
};

audio.onpause = () => {
    if (playIcon) playIcon.className = 'fa-solid fa-play fa-xs';
};

audio.ontimeupdate = () => {
    if (progressBar) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = progress + '%';
    }
};

function goToPlayer(title, artist, img, cat, src) {
    const params = new URLSearchParams({
        title: title,
        artist: artist,
        img: img,
        cat: cat,
        src: src || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    });
    window.location.href = `player.html?${params.toString()}`;
}

// Auto-init for player.html
if (window.location.pathname.includes('player.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const pTitle = urlParams.get('title');
    const pArtist = urlParams.get('artist');
    const pImg = urlParams.get('img');
    const pCat = urlParams.get('cat');
    const pSrc = urlParams.get('src');

    if (pTitle) {
        if (document.querySelector('.podcast-header h1')) document.querySelector('.podcast-header h1').textContent = pTitle;
        if (document.querySelector('.podcast-header p')) document.querySelector('.podcast-header p').textContent = pArtist;
        if (document.querySelector('.podcast-header img')) document.querySelector('.podcast-header img').src = pImg;
        if (document.querySelector('.podcast-header .badge')) document.querySelector('.podcast-header .badge').textContent = pCat;
        
        if (footerTitle) footerTitle.textContent = pTitle;
        if (footerArtist) footerArtist.textContent = pArtist;
        if (footerThumb) footerThumb.src = pImg;

        if (pSrc) {
            audio.src = pSrc;
            audio.play().catch(e => console.log('Auto-play blocked:', e));
        }
    }
}
