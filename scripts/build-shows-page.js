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
        createShowBox(showsArr[i]);
    }
};


//grab the parent <ul>
const showsList = document.querySelector(".shows__list");

function createShow(tag, className) {
    const item = document.createElement(tag);
    item.classList.add(className);
    return item;
}

function createShowBox(showsObj) {
    const showsItem = createShow("li", "shows__item");
    showsList.appendChild(showsItem);

    const showsDateWrap = createShow("div", "shows__date-wrap");
    showsItem.appendChild(showsDateWrap);
    const showsDateTitle = createShow("p", "shows__subtitle");
    showsDateTitle.innerText = "date";
    showsDateWrap.appendChild(showsDateTitle);
    const showsDate = createShow("p", "shows__date");
    showsDate.innerText = showsObj.date;
    showsDateWrap.appendChild(showsDate);


    const showsVenueWrap = createShow("div", "shows__venue-wrap");
    showsItem.appendChild(showsVenueWrap);
    const showsVenueTitle = createShow("p", "shows__subtitle");
    showsVenueTitle.innerText = "venue";
    showsVenueWrap.appendChild(showsVenueTitle);
    const showsVenue = createShow("p", "shows__venue");
    showsVenue.innerText = showsObj.venue;
    showsVenueWrap.appendChild(showsVenue);

    const showsLocationWrap = createShow("div", "shows__location-wrap");
    showsItem.appendChild(showsLocationWrap);
    const showsLocationTitle = createShow("p", "shows__subtitle");
    showsLocationTitle.innerText = "location";
    showsLocationWrap.appendChild(showsLocationTitle);
    const showsLocation = createShow("p", "shows__location");
    showsLocation.innerText = showsObj.location;
    showsLocationWrap.appendChild(showsLocation);

    const showsButton = createShow("button", "shows__button")
    showsItem.appendChild(showsButton);
    showsButton.innerText = "buy tickets";
};

displayShows(shows);


document.querySelector(".shows__item").addEventListener("mouseover", function (event) {
    document.querySelector(".shows__item").classList.toggle("shows__item-hov");
});

document.querySelector(".shows__item").addEventListener("click", function (event) {
    document.querySelector(".shows__item").classList.toggle("shows__item-selected");
})