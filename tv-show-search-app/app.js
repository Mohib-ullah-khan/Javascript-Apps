// Getting elements from HTML
let input = document.querySelector("#show-input");
let container = document.querySelector('.container');

async function getData(show) {
    let response = await axios.get(`https://api.tvmaze.com/search/shows?q=${show}`);
    return response.data;
}

function parseData(data) {
    let imageUrls = [];
    
    // The data contains multiple objects
    for (let i=0; i<data.length; i++) {
        // Check if image is available
        if (data[i].show.image) {
            imageUrls.push(data[i].show.image.original)
        }
    }
    return imageUrls;
}




function displayImages(imageUrls) {
    for (let i=0; i<imageUrls.length; i++) {
        // Create a div
        newDiv = document.createElement('div');
        newDiv.innerHTML = `<img src="${imageUrls[i]}">`;
        container.append(newDiv);
    }
}

async function searchShow(show) {
    // get data
    let data = await getData(show);

    // Parse Data: Get the URLs of images of shows
    let imageUrls = parseData(data);

    // display images
    displayImages(imageUrls);
}

function callServerScript() {
    // When not yet searching
    if(!input.value) {
        container.innerHTML = "";
    } else{
        // remove already present images on new search
        container.innerHTML = "";
        searchShow(input.value);
    }
}

// Debounce
let searchTimeout;
input.onkeydown = function () {
    if (searchTimeout != undefined) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(callServerScript, 250);
};