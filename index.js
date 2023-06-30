import Drawing from 'dxf-writer';
import { Color, LineBasicMaterial, MeshBasicMaterial } from 'three';
import { IfcViewerAPI } from 'web-ifc-viewer';


let container;

fetch("FamilesInfo.json")
  .then((response) => response.json())
  .then((data) => {
    var jsonData = data;
    container = document.getElementById("card-container");
    var categorySelect = document.getElementById("category-select");
    var versionSelect = document.getElementById("version-select");

    // Function to filter cards by category and Revit version
    function filterCards(category, version) {
      // Clear the container
      container.innerHTML = "";

      jsonData.forEach((family) => {

        createPage(family);

        if ((family.Category === category || category === "All") && (family.Version === version || version === "All")) {
          const cardDiv = document.createElement("a");
          cardDiv.className = "card";
          cardDiv.setAttribute("data-category", family.Category);
          cardDiv.href = createPage(family);

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

    // Populate the dropdown lists with unique categories and Revit versions
    var categories = ["All"]; // Start with "All" option
    var versions = ["All"]; // Start with "All" option

    jsonData.forEach((family) => {
      if (!categories.includes(family.Category)) {
        categories.push(family.Category);
      }
      if (!versions.includes(family.Version)) {
        versions.push(family.Version);
      }
    });

    categories.forEach((category) => {
      var option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });

    versions.forEach((version) => {
      var option = document.createElement("option");
      option.value = version;
      option.textContent = version;
      versionSelect.appendChild(option);
    });

    // Event listener for category changes
    categorySelect.addEventListener("change", function () {
      var selectedCategory = this.value;
      var selectedVersion = versionSelect.value;
      filterCards(selectedCategory, selectedVersion);
    });

    // Event listener for Revit version changes
    versionSelect.addEventListener("change", function () {
      var selectedCategory = categorySelect.value;
      var selectedVersion = this.value;
      filterCards(selectedCategory, selectedVersion);
    });

    // Initially, show all cards
    filterCards("All", "All");
  })
  .catch((error) => {
    console.error("Error fetching FamilesInfo.json:", error);
  });

  function createPage(family) {
    // Create a new HTML document
    var pageDoc = document.implementation.createHTMLDocument();

    const viewerContainer = pageDoc.createElement("div");

    //const viewer = new IfcViewerAPI({ viewerContainer, backgroundColor: new Color(0xffafff) });

    //viewer.grid.setGrid();
    //viewer.axes.setAxes();

    //pageDoc.body.appendChild(viewer);

  

    // Set the content of the document using the element.html template
    //pageDoc.documentElement.innerHTML = document.getElementById("card-container").innerHTML;
  
    // Save the generated page as a separate HTML file
    var htmlContent = pageDoc.documentElement.outerHTML;
    var elementPageBlob = new Blob([htmlContent], { type: "text/html" });
    var elementPageUrl = URL.createObjectURL(elementPageBlob);
  
    // Create a link to the generated page
    var pageLink = document.createElement("a");
    pageLink.href = elementPageUrl;
    
    //place to create web-viewer
    //const viewer = createViewer();

    //loadIfc(viewer, './02.ifc'); 
    // Append the link to the container
    return pageLink;
  }
  
  let allPlans;
  let model;
  
  async function loadIfc(viewer, url) {
    // Load the model
    model = await viewer.IFC.loadIfcUrl(url);
  
    // Add dropped shadow and post-processing effect
    await viewer.shadowDropper.renderShadow(model.modelID);
  
    viewer.dimensions.active = true;
    viewer.dimensions.previewActive = true;
  
    window.ondblclick = () => {
      viewer.dimensions.create();
    };
  
    window.onkeydown = (event) => {
      if (event.code == 'Delete') {
        viewer.dimensions.delete();
      }
    };
  }
