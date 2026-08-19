//cookie functions for cookie banner and theme preference




function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

$(document).ready(function () {
 
    //box shadow for cookie banner
    if (!getCookie("siteConsent")) {
        $("#cookie-banner").css("display", "flex").hide().fadeIn(400);
    }

    $(document).on("click", "#accept-cookies", function (e) {
        e.preventDefault();
        setCookie("siteConsent", "accepted", 30);
        $("#cookie-banner").fadeOut(300);
    });

   //cookie for theme preference
    const themeToggleBtn = $("#theme-toggle");
    const body = $("body");

    if (getCookie("themePref") === "dark") {
        body.addClass("dark-mode");
        themeToggleBtn.html('<i class="bi bi-sun-fill me-1 text-warning"></i> Light Mode');
    }

    themeToggleBtn.on("click", function () {
        body.toggleClass("dark-mode");
        if (body.hasClass("dark-mode")) {
            setCookie("themePref", "dark", 30);
            themeToggleBtn.html('<i class="bi bi-sun-fill me-1 text-warning"></i> Light Mode');
        } else {
            setCookie("themePref", "light", 30);
            themeToggleBtn.html('<i class="bi bi-moon-stars-fill me-1"></i> Theme');
        }
    });

  //session storage for form draft
    if (sessionStorage.getItem('draft_name')) $('#fullName').val(sessionStorage.getItem('draft_name'));
    if (sessionStorage.getItem('draft_email')) $('#userEmail').val(sessionStorage.getItem('draft_email'));
    if (sessionStorage.getItem('draft_interest')) $('#primaryInterest').val(sessionStorage.getItem('draft_interest'));

    $('#fullName, #userEmail, #primaryInterest').on('input change', function () {
        sessionStorage.setItem('draft_name', $('#fullName').val());
        sessionStorage.setItem('draft_email', $('#userEmail').val());
        sessionStorage.setItem('draft_interest', $('#primaryInterest').val());
        $('#save-status').stop(true, true).fadeIn(200).fadeOut(1500);
    });

    
    $('#registrationForm').on('submit', function (event) {
        if (!this.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            alert("✅ Application Submitted Successfully!");
            sessionStorage.clear();
            this.reset();
            $(this).removeClass('was-validated');
            return;
        }
        $(this).addClass('was-validated');
    });

/* api of Kuala Lumpur current weather */
    const weatherApiUrl = "https://api.open-meteo.com/v1/forecast?latitude=3.1390&longitude=101.6869&current_weather=true";

    $.ajax({
        url: weatherApiUrl,
        method: "GET",
        success: function (response) {
            let temp = response.current_weather.temperature;
            $('#api-weather-badge')
                .removeClass('bg-info text-dark')
                .addClass('bg-primary text-white')
                .html(`<i class="bi bi-thermometer-half"></i> KL Temp: ${temp}°C`);
        },
        error: function () {
            $('#api-weather-badge')
                .removeClass('bg-info')
                .addClass('bg-secondary')
                .html(`<i class="bi bi-cloud-slash"></i> Weather Unavailable`);
        }
    });
});