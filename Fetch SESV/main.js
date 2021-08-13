const button = document.querySelector("button");
const proxy = 'https://api.allorigins.win/raw?url=';
const url = 'https://www.sesvtutorial.com/tutorials';

// Display style
const displayStyle = (tutorialsStyle) => {
    const startIndex = tutorialsStyle.search('<style');
    const endIndex = tutorialsStyle.search('</style>');
    let style = tutorialsStyle.slice(startIndex, endIndex + 8);
    return style;
}

// Display html
const displayHTMLStr = (tutorials) => {
    const startIndex = tutorials.search('<section class="posts ">');
    const endIndex = tutorials.search('</section>');
    tutorials = tutorials.slice(startIndex, endIndex + 10);
    tutorials = tutorials.replace('href="/', 'href="https://www.sesvtutorial.com/');
    return tutorials;
}

// Fetch the latest tutorials
const fetchLatestTutorials = async () => {
    try {
        const res = await fetch(proxy + url);
        let display = await res.text();
        let style = displayStyle(display);
        display = displayHTMLStr(display);
        display += style;
        console.log(display);
        document.getElementById("sesv-tutorials-fetch").innerHTML = display;
    } catch (err) {
        console.log(err);
    }
} 

button.addEventListener("click", () => {
    confirm("You want to fetch the latest tutorials?") && fetchLatestTutorials();
})

