function previewImages(event) {
    const imgDiv = document.querySelector('#imageFiles');
    imgDiv.innerHTML = "";
    const images = document.getElementById("image");
    const number = images.files.length;
    for (i = 0; i < number; i++) {
        const urls = URL.createObjectURL(event.target.files[i]);
        imgDiv.innerHTML += '<img src="' + urls + '">';
    }
};