const url = "https://rel.ink/api/links/";



const formContainer = document.querySelector(".search-form");
const linkPrefix = "https://rel.ink/";


// creation of card container
const cardContainer = document.createElement("div");
cardContainer.classList.add("card-container");
formContainer.after(cardContainer);
const linkStorage = JSON.parse(localStorage.getItem("items")) || [] ;

async function addItem (event){
    event.preventDefault();
    const item = (this.querySelector(".type-form")).value
    let link = { "url":item }
    let fetchData = {
        method: "POST",
        body: JSON.stringify(link),
        headers: {
            'Content-Type': 'application/json'
          }
    }
    const response = await fetch(url,fetchData);
    const data  = await response.json();
    let shortenedlink = linkPrefix + data.hashid;
    const cardInformation = {};
    cardInformation.link = item;
    cardInformation.shortenLink = shortenedlink;
    const stringDatabase = linkStorage.map(e => JSON.stringify(e));
    if (!stringDatabase.includes(JSON.stringify(cardInformation))) {
        linkStorage.push(cardInformation);
        renderLinks(cardInformation);
        localStorage.setItem("items", JSON.stringify(linkStorage));
        // previousCardInformation.push(JSON.stringify(cardInformation));
        
        // console.log(typeof(JSON.stringify(cardInformation)))
        console.log(JSON.stringify(cardInformation))
        //console.log(linkStorage.includes(JSON.stringify(cardInformation)))
    }
    
    // if (JSON.stringify(cardInformation)  JSON.parse(localStorage.getItem("items")
    
    this.reset();
} 



function renderLinks (element) {
    const article = document.createElement("article");
    article.classList.add("card-article");
    const cardParagraph = document.createElement("p");
    cardParagraph.classList.add("article-paragraph")
    cardParagraph.textContent = element.link;
    const textButtonWrapper = document.createElement("div");
    textButtonWrapper.classList.add("text-button-wrapper")

    const textarea = document.createElement("textarea");
    textarea.classList.add("card-textarea");
    textarea.textContent = element.shortenLink;
    const button = document.createElement("button");
    button.classList.add("btn","btn-average")
    button.textContent = "Copy"
    button.addEventListener("click", function() {
        button.style.backgroundColor = "hsl(257, 27%, 26%)";
        button.textContent = "Copied!";
        textarea.select();
        document.execCommand('copy'); 
    })

    cardContainer.appendChild(article);
    article.appendChild(cardParagraph);
    article.appendChild(textButtonWrapper);
    textButtonWrapper.appendChild(textarea);
    textButtonWrapper.appendChild(button);
}
formContainer.addEventListener("submit", addItem);
//console.log(JSON.parse(localStorage.getItem("items")))
linkStorage.forEach(e => renderLinks(e));
