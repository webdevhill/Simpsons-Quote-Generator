const loader = document.getElementById('loader');
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const simpsonsQuoteBtn = document.getElementById('simpson-quote');
const imgSimpsonCharacter = document.getElementById('simpson-character');
const simpsonsQuoteUrl = 'https://thesimpsonsquoteapi.glitch.me/quotes';
let quote = "";
let author = "";
let errorTimeOut = 0;

// Show Loading
function loading()  {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Get Quote 
async function getQuote(quoteType) {
    loading();
    try {
        let url = simpsonsQuoteUrl;
        const response = await fetch(url);
        const data = await response.json();
        quote = data[0].quote;
        author = data[0].character;
        imgSimpsonCharacter.src = (data[0].image);
        authorText.innerText = author;
        quoteText.innerText = quote;

        //Dynamically Reduce quote font size for long quote
        const maxQuoteLength = 80;
        if (quote.length > maxQuoteLength) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }

    } catch (error) {
        //counter to avoid infinite recursive function call - threshhold set to 50
        const errorThreshhold = 50;
        if (errorTimeOut <= errorThreshhold) {
            getQuote();
        } else {
            quoteText.innerText = "Oops...Sorry. There was an error. Please try again later."
        }
        errorTimeOut += 1;
        console.log(" Error fetching quote: " + error);
    }
    complete();
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Add Event Listeners to New Quote and Tweet buttons
simpsonsQuoteBtn.addEventListener('click', () => {
    getQuote('simpsons quote')
});
twitterBtn.addEventListener('click', tweetQuote);

//call getQuote on document Load 
getQuote('simpsons quote');