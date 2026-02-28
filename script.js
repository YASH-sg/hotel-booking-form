document.addEventListener("DOMContentLoaded", function () {

    const checkin = document.getElementById("checkin");
    const checkout = document.getElementById("checkout");
    const form = document.getElementById("bookingForm");

    const today = new Date().toISOString().split("T")[0];
    checkin.setAttribute("min", today);
    checkout.setAttribute("min", today);

    checkin.addEventListener("change", function () {
        checkout.value = "";
        checkout.setAttribute("min", checkin.value);
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