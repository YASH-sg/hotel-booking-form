document.addEventListener("DOMContentLoaded", function () {

    const checkin = document.getElementById("checkin");
    const checkout = document.getElementById("checkout");
    const form = document.getElementById("bookingForm");

    const checkinError = document.getElementById("checkinError");
    const checkoutError = document.getElementById("checkoutError");

    const today = new Date().toISOString().split("T")[0];
    checkin.setAttribute("min", today);
    checkout.setAttribute("min", today);

    checkin.addEventListener("change", function () {
        checkout.value = "";
        checkout.setAttribute("min", checkin.value);
        checkinError.textContent = "";
    });

    form.addEventListener("submit", function (e) {
        let isValid = true;

        const checkinDate = new Date(checkin.value);
        const checkoutDate = new Date(checkout.value);

        checkinError.textContent = "";
        checkoutError.textContent = "";

        if (!checkin.value) {
            checkinError.textContent = "Please select a check-in date.";
            isValid = false;
        }

        if (!checkout.value) {
            checkoutError.textContent = "Please select a check-out date.";
            isValid = false;
        }

        if (checkoutDate <= checkinDate) {
            checkoutError.textContent = "Check-out must be after check-in.";
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
        }
    });


    form.addEventListener("submit", function (e) {

        const checkinDate = new Date(checkin.value);
        const checkoutDate = new Date(checkout.value);

        if (checkoutDate <= checkinDate) {
            e.preventDefault();
            alert("Check-out date must be after check-in date.");
            return;
        }

        alert("Booking Successful!");
    });

});