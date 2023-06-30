import Drawing from "dxf-writer";
import { Color, LineBasicMaterial, MeshBasicMaterial } from "three";
import { IfcViewerAPI } from "web-ifc-viewer";

const container = document.getElementById("viewer-container");
const viewer = new IfcViewerAPI({
  container,
  backgroundColor: new Color(0xffffff),
});

// Create grid and axes
viewer.grid.setGrid();
viewer.axes.setAxes();

let allPlans;
let model;

async function loadIfc(url) {
  // Load the model
  model = await viewer.IFC.loadIfcUrl(url);
  // Add dropped shadow and post-processing efect
  await viewer.shadowDropper.renderShadow(model.modelID);

  viewer.dimensions.active = true;
  viewer.dimensions.previewActive = true;

  window.ondblclick = () => {
    viewer.dimensions.create();
  };

  window.onkeydown = (event) => {
    if (event.code == "Delete") {
      viewer.dimensions.delete();
    }
  };
}

//loadIfc("./02.ifc");

// Fetch the families.json file
fetch("FamilesInfo.json")
  .then((response) => response.json())
  .then((data) => {
    // The JSON data is available here
    var jsonData = data;

    var container = document.getElementById("card-container");

    // Iterate over the JSON data
    for (var i = 0; i < jsonData.length; i++) {
      var family = jsonData[i];

      const cardDiv = document.createElement("div");
      cardDiv.className = "card";

      // Create the card image div
      const cardImageDiv = document.createElement("div");
      cardImageDiv.className = "card-image";

      // Create the image element
      const imageElement = document.createElement("img");
      imageElement.className = "image";
      imageElement.src = family.ImagePath;
      imageElement.alt = "";

      // Append the image to the card image div
      cardImageDiv.appendChild(imageElement);

      // Create the category div
      const categoryDiv = document.createElement("div");
      categoryDiv.className = "category";
      categoryDiv.textContent = family.Category;

      // Create the heading div
      const headingDiv = document.createElement("div");
      headingDiv.className = "heading";
      headingDiv.textContent = family.Name;

      // Create the version span
      const versionSpan = document.createElement("span");
      versionSpan.className = "name";
      versionSpan.textContent = "Revit " + family.Version;

      // Append the version span to the heading div
      headingDiv.appendChild(versionSpan);

      // Append all the elements to the card div
      cardDiv.appendChild(cardImageDiv);
      cardDiv.appendChild(categoryDiv);
      cardDiv.appendChild(headingDiv);

      // Append the card div to the container
      container.appendChild(cardDiv);
    }
  })
  .catch((error) => {
    console.error("Error fetching families.json:", error);
  });
