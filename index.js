// declaration of variables
const navbar = document.getElementById("nav");
const brandName = document.getElementById("brand");
const searchKey = document.getElementById("searchKey");
const searchBtn = document.getElementById("searchBtn");
const searchQuery = document.getElementById("searchQuery");
const column1 = document.getElementById("col-1");
const column2 = document.getElementById("col-2");
const column3 = document.getElementById("col-3");
const errorGrid = document.getElementById("errorGrid");
const modalBody = document.getElementById("modalBody");
const imageViewLink = document.getElementById("imageViewLink");

var orderByValue = '';

// APIs
API_KEY="AIbUSBXj9AR_-7FMC3-6yVTQzup5m6aiRRhwDeyK1sc";
apiUrl = "https://api.unsplash.com/photos/?client_id="+API_KEY+"&per_page=30&page=1";
searchUrl="https://api.unsplash.com/search/photos/?client_id="+API_KEY+"&per_page=30&page=1&query=";


imageURLs = [];

window.onload = (event) =>{
    fetchData();
}

const fetchData = async () =>{

    var tempUrl= apiUrl;

    if(orderByValue != ''){
        tempUrl += ("&order_by="+orderByValue);

    }
    const response = await(fetch(apiUrl).catch(handleError));
    const myJson = await response.json();

    var imageArrays = myJson;

    imageArrays.forEach(element => {
        imageURLs.push(element.urls.regular);
    });

    displayImage();

}
var handleError = function(err) {
    console.warn(err);
    errorGrid.innerHTML = "<h4>Unable to fetch data"+err+"</h5>";
    
}

function displayImage() {
    errorGrid.innerHTML = "";
    if(imageURLs.length == 0){
        errorGrid.innerHTML = "<h4>Unable to fetch data"+err+"</h5>";
        return;
    }

    column1.innerHTML= "";
    column2.innerHTML= "";
    column3.innerHTML= "";

    imageURLs.forEach((url, index) => {
        // dynamic image tag
        var image = document.createElement('img');
        image.src = url;
        image.className="mt-3";
        image.setAttribute("width", "100%");
        image.setAttribute("onclick", "displayFullImage(this.src)");

        if((index + 1)% 3==0){
            column1.appendChild(image);
        }
        if((index + 2)% 3==0){
            column2.appendChild(image);
        }
        if((index + 3)% 3==0){
            column3.appendChild(image);
        }

    });
}

function displayFullImage(src){

     // dynamic image tag
     var image = document.createElement('img');
     image.src = src;
     image.className="mt-3";
     image.setAttribute("width", "100%");

     modalBody.innerHTML = "";
     modalBody.appendChild(image);

     imageViewLink.href=src;
     var myModal = new bootstrap.Modal(document.getElementById('modal'), {});
     myModal.show();

}

searchBtn.addEventListener("click" ,function(){

    if(searchKey.value != ''){
        fetchSearchData(searchKey.value);
    }
});

const fetchSearchData = async (key) =>{


    imageURLs = [];

    var orderbyvar = orderByValue;
    var tempUrl = searchUrl + key;

    if(orderbyvar != ''){
        tempUrl += ("&order_by="+orderbyvar);
    }

    searchQuery.innerHTML = searchKey.value;

    const response = await(fetch(tempUrl).catch(handleError));
    const myJson = await response.json();
    console.log(myJson);

    var imageArrays = myJson.results;

    imageArrays.forEach(element => {
        imageURLs.push(element.urls.regular);
    });

    displayImage();

}

function orderBy() {
    orderByValue = document.getElementById("orderBy").value;
    imageURLs = [];

    if(searchKey != ''){
        fetchSearchData(searchKey.value);
    }
    else{
        fetchData();
    }

}