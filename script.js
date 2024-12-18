const data = [
  {
    name: "Human Booster",
    slug: "human_booster",
    promos: [
      {
        name: "FT10",
        slug: "FT_10",
        classes: [
          {
            slug: "web_statique",
            name: "Web Statique",
          },
        ],
      },
    ],
  },
];

// Sélection des éléments HTML
const schoolSelect = document.getElementById("school");
const promoSelect = document.getElementById("promo");
const subjectSelect = document.getElementById("subject");

// Initialisation de l'école
function populateSchools() {
  data.forEach((school) => {
    const option = document.createElement("option");
    option.value = school.slug;
    option.textContent = school.name;
    schoolSelect.appendChild(option);
  });
}

// Met à jour les promotions en fonction de l'école sélectionnée
schoolSelect.addEventListener("change", function () {
  const selectedSchool = data.find(
    (element) => schoolSelect.value == element.slug
  );
  promoSelect.innerHTML =
    '<option value="">Sélectionnez une promotion</option>'; // Reset
  subjectSelect.innerHTML =
    '<option value="">Sélectionnez une matière</option>'; // Reset
  subjectSelect.disabled = true;

  if (selectedSchool) {
    promoSelect.disabled = false;

    selectedSchool.promos.forEach((promo) => {
      const option = document.createElement("option");
      option.value = promo.slug;
      option.textContent = promo.name;
      promoSelect.appendChild(option);
    });
  } else {
    promoSelect.disabled = true;
  }
});

// Met à jour les matières en fonction de la promotion sélectionnée
promoSelect.addEventListener("change", function () {
  const selectedSchool = data.find(
    (element) => schoolSelect.value == element.slug
  );
  const selectedPromo = selectedSchool.promos.find(
    (element) => promoSelect.value == element.slug
  );
  subjectSelect.innerHTML =
    '<option value="">Sélectionnez une matière</option>'; // Reset

  if (selectedPromo) {
    subjectSelect.disabled = false;

    selectedPromo.classes.forEach((subject) => {
      const option = document.createElement("option");
      option.value = subject.slug;
      option.textContent = subject.name;
      subjectSelect.appendChild(option);
    });
  } else {
    subjectSelect.disabled = true;
  }
});

// Initialisation du formulaire
populateSchools();

document
  .getElementById("downloadForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const school = document.getElementById("school").value;
    const promo = document.getElementById("promo").value;
    const subject = document.getElementById("subject").value;
    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();

    if (!school || !promo || !subject || !firstname || !lastname) {
      displayMessage("Veuillez remplir tous les champs.", "error");
      return;
    }

    // Construire le chemin du fichier
    const filePath = `docs/${school}/${promo}/${subject}/${lastname}_${firstname}.xlsx`;
    downloadFile(filePath);
  });

function downloadFile(filePath) {
  // Vérifie si le fichier existe avant de tenter le téléchargement
  fetch(filePath, { method: "GET" })
    .then((response) => {
      if (response.ok) {
        // Le fichier existe, on lance le téléchargement
        const a = document.createElement("a");
        a.href = filePath;
        a.download = filePath.split("/").pop();
        a.click();
        displayMessage("Fichier trouvé !", "success");
      } else {
        // Gérer les erreurs si le fichier n'existe pas
        displayMessage(
          "Fichier introuvable. Veuillez vérifier vos informations.",
          "error"
        );
      }
    })
    .catch((error) => {
      // Gérer les autres erreurs réseau
      console.error("Erreur réseau :", error);
      displayMessage("Erreur réseau.", "error");
    });
}

function displayMessage(message, type) {
  const messageDiv = document.getElementById("message");
  messageDiv.textContent = message;
  messageDiv.className =
    type === "error" ? "text-red-500 font-bold" : "text-green-500 font-bold";
}
