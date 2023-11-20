// List of names to choose from
const names = [
  "James",
  "Daniel",
  "Elizabeth",
  "David",
  "Thomas",
  "Emma",
  "Samuel",
  "Anthony",
  "Jack",
  "Benjamin",
  "Andrew",
  "Sarah",
  "Charles",
  "Robert",
  "Charlotte",
  "Evelyn",
  "Theodore",
  "Leo",
  "Arthur",
  "Olivia",
  "Richard",
  "Mary",
  "Grace",
  "Edward",
  "Nathan",
];

// Function to generate a random name
function getRandomName() {
  return names[Math.floor(Math.random() * names.length)];
}

// Function to generate a random phone number with the area codes 219 or 312
function getRandomPhoneNumber() {
  const areaCode = Math.random() < 0.5 ? "219" : "312";
  const phoneNumber = Math.floor(Math.random() * 9000000) + 1000000; // 7 digit number
  return areaCode + phoneNumber;
}

// Function to create a VCF card
function createVcfCard(name, phoneNumber) {
  // Create VCF content
  var vcfContent = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL;TYPE=HOME,VOICE:${phoneNumber}\nEND:VCARD`;

  // Create a Blob from the VCF content
  var blob = new Blob([vcfContent], { type: "text/vcard" });

  // Create the link for the VCF
  var vcfLink = document.createElement("a");
  vcfLink.href = window.URL.createObjectURL(blob);
  vcfLink.download = name.replace(/\s+/g, "_") + ".vcf";

  // Randomize the image dimensions between 175 and 225
  var imageSize = Math.floor(Math.random() * (295 - 150 + 1)) + 175;

  // Create the image element wrapped in a link
  var imgLink = document.createElement("a");
  imgLink.href = vcfLink.href;
  imgLink.download = vcfLink.download;
  var img = document.createElement("img");
  img.src = `https://placekitten.com/${imageSize}/${imageSize}`;
  imgLink.appendChild(img);

  // Create the card container
  var card = document.createElement("div");
  card.className = "vcfCard";

  // Append the image link to the card
  card.appendChild(imgLink);

  // Create a label for the name
  var nameLabel = document.createElement("label");
  nameLabel.textContent = name;

  // Append the name label to the card
  card.appendChild(nameLabel);

  // Append the card to the container
  var container = document.getElementById("vcfContainer");
  container.appendChild(card);
}

// Event listener for the Add VCF button
document.getElementById("addVcf").addEventListener("click", function () {
  var name = document.getElementById("nameInput").value;
  var phoneNumber = document.getElementById("phoneInput").value;

  if (!name || !phoneNumber) {
    alert("Please enter both name and phone number.");
    return;
  }

  createVcfCard(name, phoneNumber);
});

// Function to pre-populate the page with random VCF cards
function populateRandomVcfCards() {
  for (let i = 0; i < 6; i++) {
    createVcfCard(getRandomName(), getRandomPhoneNumber());
  }
}

// Call this function when the window loads
window.onload = populateRandomVcfCards;
