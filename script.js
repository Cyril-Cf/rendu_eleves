document.getElementById("downloadForm").addEventListener("submit", function (event) {
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
  
    // Simuler la vérification et le téléchargement
    checkFileExists(filePath)
      .then((exists) => {
        if (exists) {
          downloadFile(filePath);
          displayMessage("Téléchargement en cours...", "success");
        } else {
          displayMessage("Fichier introuvable. Veuillez vérifier vos informations.", "error");
        }
      })
      .catch(() => {
        displayMessage("Une erreur est survenue.", "error");
      });
  });
  
  function checkFileExists(filePath) {
    return new Promise((resolve) => {
      // Simuler une vérification de fichier (à adapter selon ton serveur)
      setTimeout(() => {
        const mockFiles = [
          "docs/ecole1/2024/maths/dupond_pierre.xlsx",
          "docs/ecole2/2025/physique/durand_julie.xlsx",
        ];
        resolve(mockFiles.includes(filePath));
      }, 1000);
    });
  }
  
  function downloadFile(filePath) {
    const a = document.createElement("a");
    a.href = filePath;
    a.download = filePath.split("/").pop();
    a.click();
  }
  
  function displayMessage(message, type) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.className = type === "error" ? "text-red-500 font-bold" : "text-green-500 font-bold";
  }
  