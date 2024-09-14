document.addEventListener('DOMContentLoaded', () => {
  const videoList = document.getElementById('videoList');
  
  fetch('/videos')
    .then(response => response.json())
    .then(videos => {
      videos.forEach(video => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `/videos/${video}`;
        a.textContent = video;
        li.appendChild(a);
        videoList.appendChild(li);
      });
    });
});
