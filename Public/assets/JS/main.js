// FOR SIDEBAR TOGGLE
document.addEventListener("DOMContentLoaded", function () {
  // Toggle navigation
  const toggle = document.querySelector(".toggle");
  const navigation = document.querySelector(".navigation");
  const main = document.querySelector(".main");

  if (toggle && navigation && main) {
    toggle.addEventListener("click", function () {
      navigation.classList.toggle("active");
      main.classList.toggle("active");
    });
  }
});

// CATEGORIES FILTER
const categories = document.querySelectorAll(".each-categories");
if (categories.length > 0) {
  categories.forEach((category) => {
    category.addEventListener("click", () => {
      categories.forEach((item) => item.classList.remove("active"));
      category.classList.add("active");
    });
  });
}

// EMERGENCY PAGE SWAPPING CONTAINER
const modifyButton = document.querySelector("#modify-button");
const returnButton = document.querySelector("#return-button");

if (modifyButton && returnButton) {
  modifyButton.addEventListener("click", () => {
    document.querySelector("#evacuation-cards-container").style.display =
      "none";
    document.querySelector("#evacuation-table").style.display = "block";
  });

  returnButton.addEventListener("click", () => {
    document.querySelector("#evacuation-cards-container").style.display =
      "block";
    document.querySelector("#evacuation-table").style.display = "none";
  });
}

// Swapping Container - Check if elements exist before adding event listeners
const createButton = document.querySelector("#news-change-button");
const backButton = document.querySelector("#back-button");

if (createButton && backButton) {
  createButton.addEventListener("click", () => {
    document.querySelector("#news-container").style.display = "none";
    createButton.style.display = "none";
    document.querySelector("#table-button").style.display = "flex";
    document.querySelector("#news-table").style.display = "block";
  });

  backButton.addEventListener("click", () => {
    document.querySelector("#news-container").style.display = "block";
    createButton.style.display = "block";
    document.querySelector("#table-button").style.display = "none";
    document.querySelector("#news-table").style.display = "none";
  });
}

const searchInput = document.querySelector(".search-input");
const creditText = document.querySelector(".credits");

if (searchInput && creditText) {
  searchInput.addEventListener("input", () => {
    searchInput.value.trim() !== ""
      ? (creditText.style.display = "none")
      : (creditText.style.display = "block");
  });
}

// ADD CUSTOM CSS TO THE STATUS ON EACH TABLE

const tableStatus = document.querySelectorAll(".status");

tableStatus.forEach((stats) => {
  const statusValue = stats.textContent.trim();
  switch (statusValue) {
    // FACILITY TABLE STATUS
    case "Open":
      stats.classList.add("status-open");
      break;
    case "Temporary":
      stats.classList.add("status-temporary");
      break;
    case "Repair":
      stats.classList.add("status-repair");
      break;
    case "Inactive":
      stats.classList.add("statu-inactive");
      break;
    // MISSING PERSON TABLE
    case "Found":
      stats.classList.add("status-found");
      break;
    case "Missing":
      stats.classList.add("status-missing");
      break;
    case "Dead":
      stats.classList.add("status-dead");
      break;
    case "Delivered":
      stats.classList.add("status-delivered");
      break;
    case "Preparing":
      stats.classList.add("status-preparing");
      break;
    case "Request":
      stats.classList.add("status-process");
      break;
    case "Delivering":
      stats.classList.add("status-delivery");
      break;
    case "Success":
      stats.classList.add("status-success");
      break;
    case "Pending":
      stats.classList.add("status-pending");
      break;
    case "Resolved":
      stats.classList.add("status-resolved");
      break;
    case "Closed":
      stats.classList.add("status-closed");
      break;
    case "In Progress":
      stats.classList.add("status-progress");
      break;
    case "Available":
      stats.classList.add("status-available");
      break;
    case "In Use":
      stats.classList.add("status-use");
      break;
    case "Under Repair":
      stats.classList.add("status-repair");
      break;
    case "Out of Stock":
      stats.classList.add("status-out-of-stock");
      break;
    case "Decommissioned":
      stats.classList.add("status-decomissioned");
      break;
    case "Temporary":
      stats.classList.add("status-temporary");
      break;
    case "Completed":
      stats.classList.add("status-completed");
      break;
    case "Abandoned":
      stats.classList.add("status-abandoned");
      break;
    case "High":
      stats.classList.add("status-high");
      break;
    case "Medium":
      stats.classList.add("status-medium");
      break;
    case "Low":
      stats.classList.add("status-low");
      break;
    case "Verified":
      stats.classList.add("status-verified");
      break;
    case "Unverified":
      stats.classList.add("status-unverified");
      break;
    case "Chairman":
      stats.classList.add("status-chairman");
      break;
    case "Secretary":
      stats.classList.add("status-secretary");
      break;
    case "Treasurer":
      stats.classList.add("status-treasurer");
      break;
    case "Kagawad":
      stats.classList.add("status-kagawad");
      break;
    case "Tanod":
      stats.classList.add("status-tanod");
      break;
    case "Volunteers":
      stats.classList.add("status-volunteers");
      break;
    case "Resident":
      stats.classList.add("status-resident");
      break;
    default:
      stats.classList.add("default-status");
      break;
  }
});

// Automatic Computing
const quantity = document.querySelector("#quantity");
const unitCost = document.querySelector("#unit-cost");
const totalCost = document.querySelector("#total-cost");

function calculateTotal() {
  const quantityValue = parseFloat(quantity.value) || 0;
  const unitCostValue = parseFloat(unitCost.value) || 0;

  const total = quantityValue * unitCostValue;
  totalCost.value = total.toFixed(2);
}

if (quantity && unitCost && totalCost) {
  quantity.addEventListener("input", calculateTotal);
  unitCost.addEventListener("input", calculateTotal);
}

// ADD MEMBER BUTTON
document.addEventListener("DOMContentLoaded", function () {
  const addMemberBtn = document.getElementById("add-member-btn");

  if (addMemberBtn) {
    addMemberBtn.addEventListener("click", function () {
      // Get team members container
      const teamMembersContainer = document.getElementById("team-members-container");
      const childCount = teamMembersContainer.children.length - 1;
      if (childCount >= 4) {
        alert('Reached maximum member count');
        return;
      }

      // Create a new row that contains both the member name input and the profile picture input
      const newMemberRow = document.createElement("div");
      newMemberRow.classList.add("row", "mt-3");
      
      //Get the available tanods
      const tanods = JSON.parse(document.getElementById('tanods').value);
      console.log(tanods);

      // Use the tanods variable in the forEach loop
      let teamMembersHtml = '';
      tanods.forEach((tanod) => {
        teamMembersHtml += `
          <option value="${tanod.residentFullName}">${tanod.residentFullName}</option>
        `;
      });

      //onchange="updateProfilePicture(this)"

      newMemberRow.innerHTML = `
        <div class="col-lg-4 col-sm-12">
          <div class="form-group">
            <label>Team Member:</label>
              <div class="input-group mb-2">
                <button class="btn btn-outline-danger bg-danger text-white" type="button" onclick="this.closest('.row').remove()">Remove</button>
                <select class="form-select" name="team-members[]">
                  <option value="" disabled selected>Select a team member</option>
                  ${teamMembersHtml}
                </select>
              </div>
          </div>
        </div>
            
        <div class="col-lg-4 col-sm-12">
          <div class="form-group">
            <label for="">Contact Number:</label>
              <input type="text" id="contact-number-member" name="contact-number-member" class="form-control" required placeholder="Enter member contact number">
          </div>
        </div>
      `;

      // <div class="col-lg-4 col-sm-12">
      // <div class="form-group">
      //   <label for="team-leader-picture">Profile Picture:</label>
      //     <input type="file" id="team-member-picture" name="team-member-picture" class="form-control" disabled>
      //     <img id="profile-picture-preview" src="" alt="Profile Picture Preview" style="max-width: 100%; margin-top: 10px;display:none;"  />
      // </div>
      // </div>

      function updateProfilePicture(selectElement) {
        const profilePictures = {
          john_doe: "path/to/john_doe.jpg",
          jane_smith: "path/to/jane_smith.jpg",
          alice_johnson: "path/to/alice_johnson.jpg",
          bob_brown: "path/to/bob_brown.jpg",
        };

        const selectedValue = selectElement.value;
        const imagePreview = selectElement
          .closest(".row")
          .querySelector("#profile-picture-preview");

        // Update the image preview based on the selected team member
        if (selectedValue && profilePictures[selectedValue]) {
          imagePreview.src = profilePictures[selectedValue];
          imagePreview.style.display = "block";
        } else {
          imagePreview.src = "";
          imagePreview.style.display = "none";
        }
      }

      // Append the newly created member row into the team members container
      if (teamMembersContainer) {
        teamMembersContainer.appendChild(newMemberRow);
      }
    });
  }
});

// FOR CALENDAR DISPLAY
$(document).ready(function () {
  const daysTag = $(".days"),
    currentDate = $(".current-date"),
    prevNextIcon = $(".icons span");

  let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
      lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
      lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
      lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
      liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      let isToday =
        i === date.getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear()
          ? "active"
          : "";
      liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }
    currentDate.text(`${months[currMonth]} ${currYear}`);
    daysTag.html(liTag);
  };

  renderCalendar();

  prevNextIcon.on("click", function () {
    currMonth = $(this).attr("id") === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const barChartElement = document.querySelector("#bar-chart-delivery");
  if (barChartElement) {
    var options = {
      chart: {
        type: "bar",
        height: "100%",
        width: "100%",
        parentHeightOffset: 0,
        toolbar: {
          show: false,
        },
        responsive: [
          {
            breakpoint: 1000,
            options: {
              chart: {
                width: "100%",
                height: "100%",
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                },
              },
            },
          },
        ],
      },
      series: [
        {
          name: "Deliveries",
          data: [45, 38, 50, 60, 55, 70, 65, 80, 85, 90, 75, 100],
        },
      ],
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            colors: "#fff",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#fff",
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#fff"],
        },
      },
      tooltip: {
        theme: "dark",
      },
      plotOptions: {
        bar: {
          distributed: false,
          colors: {
            ranges: [
              {
                from: 0,
                to: 100,
                color: "#FFA500",
              },
            ],
          },
        },
      },
      legend: {
        show: false,
      },
    };

    // Render the bar chart
    var chart = new ApexCharts(barChartElement, options);
    chart.render();
  }

  // Check if the column chart element exists before initializing
  const columnChartElement = document.querySelector("#column-chart-missing");
  if (columnChartElement) {
    var columnChartOptions = {
      chart: {
        type: "bar",
        height: "100%",
        width: "100%",
        stacked: true,
        parentHeightOffset: 0,
        toolbar: {
          show: false,
        },
        responsive: [
          {
            breakpoint: 1000,
            options: {
              chart: {
                width: "100%",
                height: "100%",
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                },
              },
            },
          },
        ],
      },
      series: [
        {
          name: "Missing",
          data: [35, 45, 25, 30, 40, 35, 20, 55, 30, 45, 40, 50],
        },
        {
          name: "Found",
          data: [50, 60, 40, 55, 60, 45, 65, 70, 75, 60, 70, 85],
        },
        {
          name: "Deceased",
          data: [15, 20, 10, 15, 10, 20, 10, 5, 15, 10, 20, 10],
        },
      ],
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            colors: "#fff",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#fff",
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#fff"],
        },
      },
      tooltip: {
        theme: "dark",
      },
      plotOptions: {
        bar: {
          distributed: false,
          columnWidth: "50%",
        },
      },
      colors: ["#f39c12", "#2ecc71", "#e74c3c"], // Orange, Green, Red for the series
      legend: {
        show: false,
        labels: {
          colors: "#fff",
        },
      },
    };

    // Render the column chart
    var columnChart = new ApexCharts(columnChartElement, columnChartOptions);
    columnChart.render();
  }
});


document.querySelectorAll(".category-item").forEach((item) => {
  item.addEventListener("click", function () {
  
    document.querySelectorAll(".container-fluid[id]").forEach((table) => {
      table.style.display = "none";
    });
   
    const target = this.getAttribute("data-target");
    document.getElementById(target).style.display = "block";
  });
});


document.querySelectorAll(".category-item").forEach((item) => {
  item.addEventListener("click", function () {
    document.querySelectorAll(".category-item").forEach((cat) => {
      cat.classList.remove("active"); 
    });
    this.classList.add("active"); 
  });
});

// TEAM ASSIGN
const teamAssign = document.querySelector("#team-assign");
const teamLeader = document.querySelector("#team-leader");

// Mapping of teams to their respective leaders
const teamLeaders = {
  "Team Alpha": "Alice",
  "Team Bravo": "Bob",
  "Team Charlie": "Charlie",
  "Team Delta": "Diana",
  Others: "",
};

if (teamAssign && teamLeader) {
  // Event listener for team selection change
  teamAssign.addEventListener("change", function () {
    const selectedTeam = this.value;
    teamLeader.value = teamLeaders[selectedTeam] || "";
  });
}