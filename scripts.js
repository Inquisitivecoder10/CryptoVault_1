window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};
document.documentElement.scrollTop = 0; // For most browsers
document.body.scrollTop = 0; // For some older browsers
history.scrollRestoration = "manual";
document.documentElement.scrollTop = 0; // Or document.body.scrollTop = 0;

document.addEventListener('scroll', function() {
    const aboutSection = document.getElementById('about');
    const aboutSectionPosition = aboutSection.getBoundingClientRect().top;

    if (aboutSectionPosition <= window.innerHeight / 2) {
        // The "About Us" section is halfway into view
        // Trigger animations here
        aboutSection.classList.add('animate');
    }
});

/* CONTACT US */
document.addEventListener('DOMContentLoaded', function() {
    var contactSection = document.getElementById('contact');
    var contactHeading = document.querySelector('.contact-heading');

    function checkScroll() {
        var rect = contactSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            contactHeading.classList.add('zoomed-in');
        } else {
            contactHeading.classList.remove('zoomed-in');
        }
    }

    window.addEventListener('scroll', checkScroll);
});

/* LOG IN PAGE */
document.addEventListener('DOMContentLoaded', function() {
    var loginButton = document.getElementById('loginButton');

    loginButton.addEventListener('click', function() {
        var username = prompt("Enter your username:");
        var password = prompt("Enter your password:");

        if (username && password) {
            window.location.href = 'login.html';
        } else {
            alert("Invalid username or password. Please try again.");
        }
    });
});

/* ---------------------DYNAMIC GRAPHS --------------------------*/
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    const data = google.visualization.arrayToDataTable([
        ['Contry', 'Mhl'],
        ['Italy', 55],
        ['France', 49],
        ['Spain', 44],
        ['USA', 24],
        ['Argentina', 15]
    ]);

    const options = {
        title:'World Wide Wine Production'
    };

    const chart = new google.visualization.BarChart(document.getElementById('myChart'));
    chart.draw(data, options);
}

/* PORTFOLIO SECTION */
document.addEventListener('DOMContentLoaded', function() {
    var addButtons = document.querySelectorAll('.add-investment');

    addButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var amount = prompt("Enter the amount:");
            if (amount) {
                var totalInvested = 0;
                var investmentRows = document.querySelectorAll('.investments-table tbody tr');
                investmentRows.forEach(function(row) {
                    var amountCell = row.querySelector('td:nth-child(2)');
                    var amountValue = parseFloat(amountCell.textContent.replace('$', ''));
                    totalInvested += amountValue;
                });

                document.querySelector('.user-details .user-text p:nth-child(4)').textContent = `Invested Value: $${totalInvested}`;

                document.getElementById('popup').style.display = 'flex';
                setTimeout(function() {
                    document.getElementById('popup').style.display = 'none';
                }, 3000);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var addButtons = document.querySelectorAll('.add-button');

    addButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var amount = prompt("Enter the amount:");
            if (amount) {
                document.getElementById('popup').style.display = 'flex';
                setTimeout(function() {
                    document.getElementById('popup').style.display = 'none';
                }, 3000);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var depositButton = document.getElementById('depositButton');

    depositButton.addEventListener('click', function() {
        var amount = prompt("Enter the deposit amount:");
        if (amount) {
            document.getElementById('depositPopup').style.display = 'flex';
            setTimeout(function() {
                document.getElementById('depositPopup').style.display = 'none';
            }, 3000);
        }
    });
});

// Logout button redirection to index.html
document.addEventListener('DOMContentLoaded', function() {
    var logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function() {
        window.location.href = 'index.html'; // Redirect to index.html on logout
    });
});


/* REGISTRATION POPUP */
document.addEventListener('DOMContentLoaded', function() {
    var registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var email = document.getElementById('email').value;

        // Use fetch instead of XMLHttpRequest to simulate Flask endpoint
        fetch(`/check_user_existence?email=${email}`)
            .then(response => response.text())
            .then(data => {
                if (data.includes('User exists')) {
                    document.getElementById('depositPopup').style.display = 'flex';
                    document.getElementById('message').innerHTML = 'User already registered';
                } else {
                    registerForm.submit();
                }
            })
            .catch(error => console.error('Error:', error));
    });
});

/* ---------------------------- GRAPH ------------------------------------- */
document.addEventListener('DOMContentLoaded', function() {
    fetch('/get_chart_data')
        .then(response => response.json())
        .then(data => {
            var ctx = document.getElementById("linechart").getContext("2d");
            var linechart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: data.labels,
                    datasets: [{
                        label: "Data Points",
                        data: data.values,
                        fill: false,
                        borderColor: "Whitesmoke",
                        lineTension: 0.1
                    }]
                },
                options: {
                    responsive: false
                }
            });
        })
        .catch(error => console.error('Error:', error));
});