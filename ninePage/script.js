document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('app').style.display = 'block';
    }, 3000); // Change the duration as needed
});
