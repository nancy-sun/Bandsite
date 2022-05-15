//shows
const shows = [
    {
        date: "Mon Sept 06 2021",
        venue: "Ronald Lane",
        location: "San Francisco, CA"
    },
    {
        date: "Tue Sept 21 2021",
        venue: "Pier 3 East",
        location: "San Francisco, CA"
    },
    {
        date: "Fri Oct 15 2021",
        venue: "View Lounge",
        location: "San Francisco, CA"
    },
    {
        date: "Sat Nov 06 2021",
        venue: "Hyatt Agency",
        location: "San Francisco, CA"
    },
    {
        date: "Fri Nov 26 2021",
        venue: "Moscow Center",
        location: "San Francisco, CA"
    },
    {
        date: "Wed Dec 15 2021",
        venue: "Press Club",
        location: "San Francisco, CA"
    }
];

function displayShows(showsArr) {
    for (let i = 0; i < showsArr.length; i++) {
        createShow(showsArr[i]);
    }
};


//grab the parent <ul>
const showsList = document.querySelector(".shows__list");

function createShowElement(tag, className, text = "") {
    const item = document.createElement(tag);
    item.classList.add(className);
    item.innerText = text;
    return item;
}

function createShow(showsObj) {
    const showsItem = createShowElement("li", "shows__item");
    showsList.appendChild(showsItem);

    const showsDateWrap = createShowElement("div", "shows__date-wrap");
    showsItem.appendChild(showsDateWrap);

    const showsDateTitle = createShowElement("p", "shows__subtitle", "date");
    showsDateWrap.appendChild(showsDateTitle);

    const showsDate = createShowElement("p", "shows__date", showsObj.date);
    showsDateWrap.appendChild(showsDate);

    const showsVenueWrap = createShowElement("div", "shows__venue-wrap");
    showsItem.appendChild(showsVenueWrap);

    const showsVenueTitle = createShowElement("p", "shows__subtitle", "venue");
    showsVenueWrap.appendChild(showsVenueTitle);

    const showsVenue = createShowElement("p", "shows__venue", showsObj.venue);
    showsVenueWrap.appendChild(showsVenue);

    const showsLocationWrap = createShowElement("div", "shows__location-wrap");
    showsItem.appendChild(showsLocationWrap);

    const showsLocationTitle = createShowElement("p", "shows__subtitle", "location");
    showsLocationWrap.appendChild(showsLocationTitle);

    const showsLocation = createShowElement("p", "shows__location", showsObj.location);
    showsLocationWrap.appendChild(showsLocation);

    const showsButton = createShowElement("button", "shows__button", "buy tickets");
    showsButton.setAttribute("type", "button");
    showsItem.appendChild(showsButton);
};

displayShows(shows);

//grab all the shows <li> in a node list
const showsItems = document.querySelectorAll(".shows__item");

showsItems.forEach((item) => {
    item.addEventListener("click", () => {
        showsItems.forEach((item) => {
            item.classList.remove("shows__item--active");
        })
        item.classList.add("shows__item--active");
    })
})
