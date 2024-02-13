// Alert Box display Success or failure using the url parameters
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search)


    if(urlParams.has('success')) {
        alert('Reservation successful')
    } else if (urlParams.has('error')) {
        alert('There was an error in making the reservation')
    }
}







// Tabbed Menu

function openMenu(event, menuName) {
    let menuArray = document.getElementsByClassName("menu");
    for (let i = 0; i < menuArray.length; i++) {
        menuArray[i].style.display = "none";
    }

    let tablinks = document.getElementsByClassName("tablink");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active-tab")
    }

    document.getElementById(menuName).style.display = "block";
    event.currentTarget.classList.add("active-tab");
}

document.getElementById("mainLink").click();

document.getElementById("currentYear").innerHTML = new Date().getFullYear();
