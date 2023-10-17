const key = "9a8dccf18e7440f2b8c53c2f6a3ddfa6";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => {
    fetchData("pakistan");

    let logoClick = document.getElementById("logo");

    logoClick.addEventListener('click', () =>{
        window.location.reload();
    });
});

async function fetchData(query) {
    const res = await fetch(`${url}${query}&apiKey=${key}`);
    const data = await res.json();
    console.log(data);
    CollectArticles(data.articles);
}

function CollectArticles(articles) {
    let cardContainer = document.getElementById('card-container');
    let cardBody;
    let cardImageDiv;
    let cardImage;
    let cardTitle;
    let cardTitleH2;
    let cardSource;
    let cardSourceP;
    let cardDesc;
    let cardDescP;

    cardContainer.innerHTML = "";

    if (articles) {
        articles.forEach(function (article) {
            if (!article.urlToImage) return;
            cardBody = document.createElement('div');
            cardImageDiv = document.createElement('div');
            cardImage = document.createElement('img');
            cardTitle = document.createElement('div');
            cardTitleH2 = document.createElement('h2');
            cardSource = document.createElement('div');
            cardSourceP = document.createElement('p');
            cardDesc = document.createElement('div');
            cardDescP = document.createElement('p');


            cardBody.classList.add('card-body');
            cardImageDiv.classList.add('card-image');
            cardTitle.classList.add('card-title');
            cardSource.classList.add('card-source');
            cardDesc.classList.add('card-desc');


            cardContainer.appendChild(cardBody);
            cardBody.appendChild(cardImageDiv);
            cardImageDiv.appendChild(cardImage);
            cardBody.appendChild(cardTitle);
            cardTitle.appendChild(cardTitleH2);
            cardBody.appendChild(cardSource);
            cardSource.appendChild(cardSourceP);
            cardBody.appendChild(cardDesc);
            cardDesc.appendChild(cardDescP);


            cardImage.src = article.urlToImage;
            cardTitleH2.innerHTML = article.title;
            let date = new Date(article.publishedAt).toLocaleDateString("en-US", {
                timeZone: "Asia/jakarta"
            });
            cardSourceP.innerHTML = `${article.source.name} : ${date}`;
            cardDescP.innerHTML = article.description;

            cardContainer.addEventListener('click', () =>{
                window.open(article.url, '_blank');
            });
        });
    }
}
let CurNavElem = null;
function CustomNews(id) {
    fetchData(id);


    let navItem = document.getElementById(id);

    CurNavElem?.classList.remove('active');

    CurNavElem = navItem;

    CurNavElem.classList.add('active');
}


function Search(){
    let inputText = document.getElementById('input-text');
    let inputButton = document.getElementById('input-button');

    inputButton.addEventListener('click', () =>{
        if(inputText.value == "") return;
        let query = inputText.value;
        fetchData(query);
        CurNavElem.classList.remove('active');
    })
}

Search();