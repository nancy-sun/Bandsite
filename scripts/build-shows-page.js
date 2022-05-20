const API_URL = "https://project-1-api.herokuapp.com/showdates/?api_key=17b7e77b-c637-4191-8a2d-0901beeff1c3";

const showsUlElem = document.querySelector(".shows__list");

getShowList();

function displayShows(showsArr) {
    showsArr.forEach((show) => {
        createShowDom(show);
    })
};

function createShowElement(tag, className, text = "") {
    const item = document.createElement(tag);
    item.classList.add(className);
    item.innerText = text;
    return item;
}

function createShowDom(showsObj) {
    const showsItem = createShowElement("li", "shows__item");
    showsUlElem.appendChild(showsItem);

    const showsDateWrap = createShowElement("div", "shows__date-wrap");
    showsItem.appendChild(showsDateWrap);

    const showsDateTitle = createShowElement("p", "shows__subtitle", "date");
    showsDateWrap.appendChild(showsDateTitle);

    const date = new Date(JSON.parse(showsObj.date));
    const showsDate = createShowElement("p", "shows__date", date.toDateString());
    showsDateWrap.appendChild(showsDate);

    const showsVenueWrap = createShowElement("div", "shows__venue-wrap");
    showsItem.appendChild(showsVenueWrap);

    const showsVenueTitle = createShowElement("p", "shows__subtitle", "venue");
    showsVenueWrap.appendChild(showsVenueTitle);

    const showsVenue = createShowElement("p", "shows__venue", showsObj.place);
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


function getShowList() {
    axios.get(API_URL).then((response) => {
        displayShows(response.data);
        const showsItems = document.querySelectorAll(".shows__item");

        showsItems.forEach((item) => {
            item.addEventListener("click", () => {
                showsItems.forEach((item) => {
                    item.classList.remove("shows__item--active");
                })
                item.classList.add("shows__item--active");
            })
        })
    }).catch((error) => {
        alert(error);
    });
}