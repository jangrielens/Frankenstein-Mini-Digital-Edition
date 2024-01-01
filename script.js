
  var currentMiradorInstance = null;

  function loadMirador(page) {
    if (currentMiradorInstance) {
      // Code to properly destroy the previous instance, if needed
      // e.g., currentMiradorInstance.destroy();
    }

    currentMiradorInstance = Mirador.viewer({
      id: 'my-mirador',
      themes: {
        light: {
          palette: {
            type: 'light',
            primary: {
              main: '#fce097',
            },
          },
        },
      },
      windows: [{
        loadedManifest: 'https://iiif.bodleian.ox.ac.uk/iiif/manifest/53fd0f29-d482-46e1-aa9d-37829b49987d.json',
        canvasIndex: page,
        thumbnailNavigationPosition: 'off',
        allowClose: false,
        allowFullscreen: false,
        allowMaximize: true,
        allowTopMenuButton: true,
        allowWindowSideBar: false,
        authNewWindowCenter: 'parent',
        defaultView: 'single',
        forceDrawAnnotations: false,
        hideWindowTitle: true,
        highlightAllAnnotations: false,
        sideBarOpen: false,
        switchCanvasOnSearch: true,
        views: [
          { key: 'single', behaviors: ['individuals', 'paged'] },
          { key: 'book', behaviors: ['individuals'] },
          { key: 'scroll', behaviors: ['continuous'] },
          { key: 'gallery' }
        ]
      }],
      window: {
        hideSearchPanel: false,
        hideWindowTitle: true,
        hideAnnotationsPanel: true,
        allowClose: false,
        allowMaximize: false,
        allowFullscreen: true,
      },
      workspace: {
        showZoomControls: true,
      },
      workspaceControlPanel: {
        enabled: false,
      }
    });
  }

  function documentLoader(folio_xml) {
    Promise.all([
	  fetch("xml_pages/" + folio_xml).then(response => response.text()),    
      fetch("xml_pages/Frankenstein_text.xsl").then(response => response.text())
    ])
    .then(function ([xmlString, xslString]) {
      var parser = new DOMParser();
      var xml_doc = parser.parseFromString(xmlString, "text/xml");
      var xsl_doc = parser.parseFromString(xslString, "text/xml");

      var xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xsl_doc);
      var resultDocument = xsltProcessor.transformToFragment(xml_doc, document);

      var criticalElement = document.getElementById("text");
      criticalElement.innerHTML = ''; // Clear existing content
      criticalElement.appendChild(resultDocument);
    })
    .catch(function (error) {
      console.error("Error loading documents:", error);
    });
  }
  
  function statsLoader(folio_xml) {
      Promise.all([
        fetch("xml_pages/" + folio_xml).then(response => response.text()),
        fetch("xml_pages/Frankenstein_meta.xsl").then(response => response.text())
      ])
      .then(function ([xmlString, xslString]) {
        var parser = new DOMParser();
        var xml_doc = parser.parseFromString(xmlString, "text/xml");
        var xsl_doc = parser.parseFromString(xslString, "text/xml");

        var xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl_doc);
        var resultDocument = xsltProcessor.transformToFragment(xml_doc, document);

        var statsElement = document.getElementById("stats");
        statsElement.innerHTML = ''; // Clear existing content
        statsElement.appendChild(resultDocument);
      })
      .catch(function (error) {
        console.error("Error loading documents:", error);
      });
    }
	
	
 

//  $(document).ready(function() {
//    function updateContent() {
//      var selectedValue = $('#dropdown').val();
//      var selectedPageAttribute = $('#dropdown').find('option:selected').attr('page');
//      var selectedNumber = parseInt(selectedPageAttribute);
//      
//      $('#selected-value').text(selectedValue);
//      $('#selected-number').text(selectedNumber);
//
//      loadMirador(selectedNumber);
//      documentLoader(selectedValue + ".xml");
//	  statsLoader(selectedValue + ".xml")
//	  
//    }
//
//    // Set up the change event listener for the dropdown
//    $('#dropdown').on('change', updateContent);
//
//    // Load Mirador and XML content for the default selection
//    updateContent();
//  });
  
  
 function selectHand(event) {
  var visibleMary = document.getElementsByClassName('#MWS');
  var visiblePercy = document.getElementsByClassName('#PBS');
  
  // Convert the HTMLCollection to an array for forEach compatibility
  var MaryArray = Array.from(visibleMary);
  var PercyArray = Array.from(visiblePercy);

  if (event.target.value == 'both') {
    // Show all text written and modified by both hands in black
    MaryArray.forEach(function(element) {
      element.style.color = 'black';
    });
    PercyArray.forEach(function(element) {
      element.style.color = 'black';
    });
  } else if (event.target.value == 'Mary') {
    // Show Mary's text in a different color and Percy's text in black
    MaryArray.forEach(function(element) {
      element.style.color = 'red'; // Change color as needed
    });
    PercyArray.forEach(function(element) {
      element.style.color = 'black';
    });
  } else {
    // Show Percy's text in a different color and Mary's text in black
    PercyArray.forEach(function(element) {
      element.style.color = 'red'; // Change color as needed
    });
    MaryArray.forEach(function(element) {
      element.style.color = 'black';
    });
  }
}




function toggleDeletions() {
  var textFeaturesCheckbox = document.getElementById('toggleTextFeaturesCheckbox');
  var deletionCheckbox = document.getElementById('toggleDeletionsCheckbox');

    if (textFeaturesCheckbox && deletionCheckbox) {
        // Enable or disable the deletion checkbox based on the text features checkbox state
        textFeaturesCheckbox.disabled = deletionCheckbox.checked;
    }

  var deletions = document.querySelectorAll('del');
  deletions.forEach(del => {
    if (del.style.display === 'none') {
      del.style.display = ''; // Show deletion
    } else {
      del.style.display = 'none'; // Hide deletion
    }
  });
}


function toggleTextFeatures() {
    var textFeaturesCheckbox = document.getElementById('toggleTextFeaturesCheckbox');
    var deletionCheckbox = document.getElementById('toggleDeletionsCheckbox');

    if (textFeaturesCheckbox && deletionCheckbox) {
        // Enable or disable the deletion checkbox based on the text features checkbox state
        deletionCheckbox.disabled = textFeaturesCheckbox.checked;
    }


    // Toggle visibility of <del> elements
    var deletions = document.querySelectorAll('del');
    deletions.forEach(function(del) {
        del.style.display = del.style.display === 'none' ? '' : 'none';
    });

    // Toggle visibility of <add> elements with 'supraAdd' class
    var supraAdds = document.querySelectorAll('.supraAdd');
    supraAdds.forEach(function(add) {
        add.classList.toggle('reading-mode-style'); // Assuming 'reading-mode-style' is the class for toggling
    });

    // Toggle visibility of elements with 'metamark' class inside <add>
    var metamarks = document.querySelectorAll('.metamark');
    metamarks.forEach(function(metamark) {
        metamark.style.display = metamark.style.display === 'none' ? '' : 'none';
    });
};

// Add event listener to the select element
//document.getElementById('sel-hand').addEventListener('change', selectHand);
//
//document.getElementById('toggleDeletionsCheckbox').addEventListener('change', function() {
//  toggleDeletions();
//});
//
//document.getElementById('toggleTextFeaturesCheckbox').addEventListener('change', function() {
//  toggleTextFeatures();
//});
//
//document.addEventListener('DOMContentLoaded', function() {
//    var deletionCheckbox = document.getElementById('toggleDeletionsCheckbox');
//    if (deletionCheckbox) {
//        deletionCheckbox.addEventListener('change', toggleDeletions);
//    }
//
//    var textFeaturesCheckbox = document.getElementById('toggleTextFeaturesCheckbox');
//    if (textFeaturesCheckbox) {
//        textFeaturesCheckbox.addEventListener('change', toggleTextFeatures);
//    }
//});
//
//$(document).ready(function() {
//    function updateContent() {
//      var selectedValue = $('#dropdown').val();
//      var selectedPageAttribute = $('#dropdown').find('option:selected').attr('page');
//      var selectedNumber = parseInt(selectedPageAttribute);
//      
//      $('#selected-value').text(selectedValue);
//      $('#selected-number').text(selectedNumber);
//
//      loadMirador(selectedNumber);
//      documentLoader(selectedValue + ".xml");
//	  statsLoader(selectedValue + ".xml")
//	  
//    }
//
//    // Set up the change event listener for the dropdown
//    $('#dropdown').on('change', updateContent);
//
//    // Load Mirador and XML content for the default selection
//    updateContent();
//  });


document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the hand selection
    var handSelection = document.getElementById('sel-hand');
    if (handSelection) {
        handSelection.addEventListener('change', selectHand);
    }

    // Event listeners for the checkboxes
    var deletionCheckbox = document.getElementById('toggleDeletionsCheckbox');
    if (deletionCheckbox) {
        deletionCheckbox.addEventListener('change', toggleDeletions);
    }

    var textFeaturesCheckbox = document.getElementById('toggleTextFeaturesCheckbox');
    if (textFeaturesCheckbox) {
        textFeaturesCheckbox.addEventListener('change', toggleTextFeatures);
    }

    // Initialize the default content
    var dropdown = document.getElementById('dropdown');
    if (dropdown) {
        dropdown.addEventListener('change', updateContent);
    }
	
	// Initialize the default content on page load
    updateContent();
});




function updateContent() {
    var dropdown = document.getElementById('dropdown');
    var selectedValue = dropdown.value;
    var selectedPageAttribute = dropdown.querySelector('option:checked').getAttribute('page');
    var selectedNumber = parseInt(selectedPageAttribute);

    // Update the display elements
    document.getElementById('selected-value').textContent = selectedValue;
    document.getElementById('selected-number').textContent = selectedNumber;

    // Call functions to update content based on the selection
    loadMirador(selectedNumber);
    documentLoader(selectedValue + ".xml");
    statsLoader(selectedValue + ".xml");
}

document.getElementById('nextPage').addEventListener('click', function() {
    var select = document.getElementById('dropdown');
    if (select.selectedIndex < select.options.length - 1) {
        select.selectedIndex++;
        select.dispatchEvent(new Event('change')); // Trigger change event
    }
});

document.getElementById('prevPage').addEventListener('click', function() {
    var select = document.getElementById('dropdown');
    if (select.selectedIndex > 0) {
        select.selectedIndex--;
        select.dispatchEvent(new Event('change')); // Trigger change event
    }
});

