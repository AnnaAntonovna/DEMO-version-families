fetch("FamilesInfo.json")
  .then((response) => response.json())
  .then((data) => {
    var jsonData = data;
    var container = document.getElementById("card-container");
    var selectElement = document.getElementById("category-select");

    // Function to filter cards by category
    function filterCardsByCategory(category) {
      // Clear the container
      container.innerHTML = "";

      jsonData.forEach((family) => {
        if (family.Category === category || category === "All") {
          const cardDiv = document.createElement("div");
          cardDiv.className = "card";
          cardDiv.setAttribute("data-category", family.Category);

          const cardImageDiv = document.createElement("div");
          cardImageDiv.className = "card-image";

          const imageElement = document.createElement("img");
          imageElement.className = "image";
          imageElement.src = family.ImagePath;
          imageElement.alt = "";

          const categoryDiv = document.createElement("div");
          categoryDiv.className = "category";
          categoryDiv.textContent = family.Category;

          const headingDiv = document.createElement("div");
          headingDiv.className = "heading";
          headingDiv.textContent = family.Name;

          const versionDiv = document.createElement("div");
          versionDiv.className = "version";
          versionDiv.textContent = "Revit " + family.Version;

          cardImageDiv.appendChild(imageElement);
          cardDiv.appendChild(cardImageDiv);
          cardDiv.appendChild(categoryDiv);
          cardDiv.appendChild(headingDiv);
          cardDiv.appendChild(versionDiv);

          container.appendChild(cardDiv);
        }
      });
    }

    // Populate the dropdown list with unique categories
    var categories = ["All"]; // Start with "All" option
    jsonData.forEach((family) => {
      if (!categories.includes(family.Category)) {
        categories.push(family.Category);
      }
    });

    categories.forEach((category) => {
      var option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      selectElement.appendChild(option);
    });

    // Event listener for category changes
    selectElement.addEventListener("change", function () {
      var selectedCategory = this.value;
      filterCardsByCategory(selectedCategory);
    });

    // Initially, show all cards
    filterCardsByCategory("All");
  })
  .catch((error) => {
    console.error("Error fetching families.json:", error);
  });
