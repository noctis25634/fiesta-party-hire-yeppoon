const controls = document.getElementById("controls");
const printButton = document.getElementById("printButton");
const toggleControls = document.getElementById("toggleControls");
const allGalleryImages = [
  "733443011_1399880695536006_6680311752568557163_n.jpg",
  "738395988_1773032303689777_2856028005893033296_n.jpg",
  "Baby Shower Set up.png",
  "Baby Shower theme 2.png",
  "Baby Shower theme1.png",
  "Birthday theme1.png",
  "Birthday theme2.png",
  "Birthday theme3.png",
  "Bridal Shower Set up.png",
  "ChatGPT Image Jul 6, 2026, 09_55_16 PM.png",
  "ChatGPT Image Jun 14, 2026, 11_04_33 PM (1).png",
  "ChatGPT Image Jun 14, 2026, 11_04_33 PM (2).png",
  "ChatGPT Image Jun 14, 2026, 11_04_33 PM (3).png",
  "ChatGPT Image Jun 14, 2026, 11_04_34 PM (4).png",
  "ChatGPT Image Jun 14, 2026, 11_04_34 PM (5).png",
  "ChatGPT Image Jun 14, 2026, 11_04_35 PM (6).png",
  "ChatGPT Image Jun 14, 2026, 11_04_35 PM (7).png",
  "ChatGPT Image Jun 14, 2026, 11_04_36 PM (8).png",
  "ChatGPT Image Jun 14, 2026, 11_04_36 PM (9).png",
  "ChatGPT Image Jun 14, 2026, 11_17_36 PM (1).png",
  "ChatGPT Image Jun 14, 2026, 11_17_36 PM (10).png",
  "ChatGPT Image Jun 14, 2026, 11_17_36 PM (2).png",
  "ChatGPT Image Jun 14, 2026, 11_17_36 PM (3).png",
  "ChatGPT Image Jun 14, 2026, 11_17_36 PM (4).png",
  "ChatGPT Image Jun 14, 2026, 11_17_36 PM (5).png",
  "ChatGPT Image Jun 14, 2026, 11_17_36 PM (6).png",
  "ChatGPT Image Jun 14, 2026, 11_17_36 PM (7).png",
  "ChatGPT Image Jun 14, 2026, 11_17_36 PM (8).png",
  "ChatGPT Image Jun 14, 2026, 11_17_36 PM (9).png",
  "ChatGPT Image Jun 14, 2026, 11_54_44 PM (1).png",
  "ChatGPT Image Jun 14, 2026, 11_54_45 PM (2).png",
  "ChatGPT Image Jun 14, 2026, 11_54_45 PM (3).png",
  "ChatGPT Image Jun 14, 2026, 11_54_46 PM (4).png",
  "ChatGPT Image Jun 14, 2026, 11_54_46 PM (5).png",
  "ChatGPT Image Jun 14, 2026, 11_54_46 PM (6).png",
  "ChatGPT Image Jun 14, 2026, 11_54_47 PM (7).png",
  "ChatGPT Image Jun 14, 2026, 11_54_47 PM (8).png",
  "ChatGPT Image Jun 14, 2026, 11_54_48 PM (10).png",
  "ChatGPT Image Jun 14, 2026, 11_54_48 PM (9).png",
  "ChatGPT Image Jun 15, 2026, 02_22_56 AM (1).png",
  "ChatGPT Image Jun 15, 2026, 02_22_56 AM (2).png",
  "ChatGPT Image Jun 15, 2026, 02_22_56 AM (3).png",
  "ChatGPT Image Jun 15, 2026, 02_22_56 AM (4).png",
  "ChatGPT Image Jun 15, 2026, 02_22_57 AM (5).png",
  "ChatGPT Image Jun 15, 2026, 02_22_57 AM (6).png",
  "ChatGPT Image Jun 15, 2026, 02_22_58 AM (7).png",
  "ChatGPT Image Jun 15, 2026, 02_22_58 AM (8).png",
  "ChatGPT Image Jun 15, 2026, 02_23_00 AM (9).png",
  "ChatGPT Image Jun 15, 2026, 02_23_01 AM (10).png",
  "ChatGPT Image Jun 15, 2026, 02_27_41 AM (1).png",
  "ChatGPT Image Jun 15, 2026, 02_27_42 AM (2).png",
  "ChatGPT Image Jun 15, 2026, 02_27_42 AM (3).png",
  "ChatGPT Image Jun 15, 2026, 02_27_43 AM (4).png",
  "ChatGPT Image Jun 15, 2026, 02_27_43 AM (5).png",
  "ChatGPT Image Jun 15, 2026, 02_27_43 AM (6).png",
  "ChatGPT Image Jun 15, 2026, 02_27_44 AM (7).png",
  "ChatGPT Image Jun 15, 2026, 02_27_44 AM (8).png",
  "ChatGPT Image Jun 15, 2026, 02_51_00 AM (1).png",
  "ChatGPT Image Jun 15, 2026, 02_51_00 AM (2).png",
  "ChatGPT Image Jun 15, 2026, 02_51_01 AM (3).png",
  "ChatGPT Image Jun 15, 2026, 02_51_01 AM (4).png",
  "ChatGPT Image Jun 15, 2026, 02_51_01 AM (5).png",
  "ChatGPT Image Jun 15, 2026, 02_51_02 AM (6).png",
  "ChatGPT Image Jun 15, 2026, 02_51_02 AM (7).png",
  "ChatGPT Image Jun 15, 2026, 02_51_02 AM (8).png",
  "ChatGPT Image Jun 15, 2026, 02_51_03 AM (10).png",
  "ChatGPT Image Jun 15, 2026, 02_51_03 AM (9).png",
  "ChatGPT Image Jun 15, 2026, 02_57_04 AM (1).png",
  "ChatGPT Image Jun 15, 2026, 02_57_04 AM (2).png",
  "ChatGPT Image Jun 15, 2026, 02_57_05 AM (3).png",
  "ChatGPT Image Jun 15, 2026, 02_57_05 AM (4).png",
  "ChatGPT Image Jun 15, 2026, 02_57_05 AM (5).png",
  "ChatGPT Image Jun 15, 2026, 02_57_06 AM (7).png",
  "ChatGPT Image Jun 15, 2026, 02_57_07 AM (8).png",
  "ChatGPT Image Jun 15, 2026, 02_57_15 AM (1).png",
  "ChatGPT Image Jun 15, 2026, 02_57_15 AM (2).png",
  "ChatGPT Image Jun 15, 2026, 02_57_15 AM (3).png",
  "ChatGPT Image Jun 15, 2026, 02_57_16 AM (4).png",
  "ChatGPT Image Jun 15, 2026, 02_57_16 AM (5).png",
  "ChatGPT Image Jun 15, 2026, 02_57_17 AM (7).png",
  "ChatGPT Image Jun 15, 2026, 02_57_18 AM (8).png",
  "ChatGPT Image Jun 15, 2026, 03_09_52 AM (1).png",
  "ChatGPT Image Jun 15, 2026, 03_09_53 AM (2).png",
  "ChatGPT Image Jun 15, 2026, 03_09_54 AM (3).png",
  "ChatGPT Image Jun 15, 2026, 03_09_54 AM (4).png",
  "ChatGPT Image Jun 15, 2026, 03_09_54 AM (5).png",
  "ChatGPT Image Jun 15, 2026, 03_09_54 AM (6).png",
  "ChatGPT Image Jun 15, 2026, 03_09_55 AM (7).png",
  "ChatGPT Image Jun 15, 2026, 03_09_55 AM (8).png",
  "ChatGPT Image Jun 15, 2026, 03_09_56 AM (10).png",
  "ChatGPT Image Jun 15, 2026, 03_09_56 AM (9).png",
  "ChatGPT Image Jun 15, 2026, 03_16_15 AM (1).png",
  "ChatGPT Image Jun 15, 2026, 03_16_15 AM (2).png",
  "ChatGPT Image Jun 15, 2026, 03_16_16 AM (3).png",
  "ChatGPT Image Jun 15, 2026, 03_16_16 AM (4).png",
  "ChatGPT Image Jun 15, 2026, 03_16_16 AM (5).png",
  "ChatGPT Image Jun 15, 2026, 03_16_17 AM (6).png",
  "ChatGPT Image Jun 15, 2026, 10_34_45 AM (1).png",
  "ChatGPT Image Jun 15, 2026, 10_34_47 AM (2).png",
  "ChatGPT Image Jun 15, 2026, 10_34_47 AM (3).png",
  "ChatGPT Image Jun 15, 2026, 10_34_47 AM (4).png",
  "ChatGPT Image Jun 15, 2026, 10_34_48 AM (5).png",
  "ChatGPT Image Jun 15, 2026, 10_34_49 AM (6).png",
  "ChatGPT Image Jun 15, 2026, 10_34_49 AM (7).png",
  "ChatGPT Image Jun 15, 2026, 10_34_50 AM (10).png",
  "ChatGPT Image Jun 15, 2026, 10_34_50 AM (8).png",
  "ChatGPT Image Jun 15, 2026, 10_34_50 AM (9).png",
  "ChatGPT Image Jun 15, 2026, 10_34_56 AM (5).png",
  "Christmas Theme1.png",
  "Gatsby themed Party.png",
  "Valentine Theme 1.png"
];

const galleryCaptionMap = {
  "733443011_1399880695536006_6680311752568557163_n.jpg": "Red Carpet Balloon Setup",
  "738395988_1773032303689777_2856028005893033296_n.jpg": "Pink Balloon Floral Backdrop",
  "Baby Shower Set up.png": "Baby Shower Setup",
  "Baby Shower theme 2.png": "Baby Shower Theme",
  "Baby Shower theme1.png": "Baby Shower Theme",
  "Birthday theme1.png": "Birthday Theme Setup",
  "Birthday theme2.png": "Birthday Theme Setup",
  "Birthday theme3.png": "Birthday Theme Setup",
  "Bridal Shower Set up.png": "Bridal Shower Setup",
  "ChatGPT Image Jul 6, 2026, 09_55_16 PM.png": "Outdoor Ceremony Setup",
  "ChatGPT Image Jun 14, 2026, 11_04_33 PM (1).png": "Butterfly Balloon Backdrop",
  "ChatGPT Image Jun 14, 2026, 11_04_33 PM (2).png": "Balloon Draping Backdrop",
  "ChatGPT Image Jun 14, 2026, 11_04_33 PM (3).png": "Children's Birthday Setup",
  "ChatGPT Image Jun 14, 2026, 11_04_34 PM (4).png": "Tropical Birthday Display",
  "ChatGPT Image Jun 14, 2026, 11_04_34 PM (5).png": "Baby Shower Backdrop",
  "ChatGPT Image Jun 14, 2026, 11_04_35 PM (6).png": "Floral Backdrop Setup",
  "ChatGPT Image Jun 14, 2026, 11_04_35 PM (7).png": "Birthday Dessert Table",
  "ChatGPT Image Jun 14, 2026, 11_04_36 PM (8).png": "Balloon Character Column",
  "ChatGPT Image Jun 14, 2026, 11_04_36 PM (9).png": "Outdoor Table Setup",
  "ChatGPT Image Jun 14, 2026, 11_17_36 PM (1).png": "Formal Table Setup",
  "ChatGPT Image Jun 14, 2026, 11_17_36 PM (10).png": "Balloon Column Display",
  "ChatGPT Image Jun 14, 2026, 11_17_36 PM (2).png": "Marquee Seating Setup",
  "ChatGPT Image Jun 14, 2026, 11_17_36 PM (3).png": "Indoor Table Setup",
  "ChatGPT Image Jun 14, 2026, 11_17_36 PM (4).png": "Outdoor Marquee Setup",
  "ChatGPT Image Jun 14, 2026, 11_17_36 PM (5).png": "70th Birthday Backdrop",
  "ChatGPT Image Jun 14, 2026, 11_17_36 PM (6).png": "Pink Balloon Backdrop",
  "ChatGPT Image Jun 14, 2026, 11_17_36 PM (7).png": "Balloon Arch Backdrop",
  "ChatGPT Image Jun 14, 2026, 11_17_36 PM (8).png": "White Table Setup",
  "ChatGPT Image Jun 14, 2026, 11_17_36 PM (9).png": "Marquee Chair Setup",
  "ChatGPT Image Jun 14, 2026, 11_54_44 PM (1).png": "White Balloon Arch",
  "ChatGPT Image Jun 14, 2026, 11_54_45 PM (2).png": "40th Birthday Backdrop",
  "ChatGPT Image Jun 14, 2026, 11_54_45 PM (3).png": "Outdoor Marquee Chairs",
  "ChatGPT Image Jun 14, 2026, 11_54_46 PM (4).png": "Indoor Balloon Arch",
  "ChatGPT Image Jun 14, 2026, 11_54_46 PM (5).png": "Outdoor Birthday Setup",
  "ChatGPT Image Jun 14, 2026, 11_54_46 PM (6).png": "Balloon Column Draping",
  "ChatGPT Image Jun 14, 2026, 11_54_47 PM (7).png": "Birthday Balloon Backdrop",
  "ChatGPT Image Jun 14, 2026, 11_54_47 PM (8).png": "Round Table Setup",
  "ChatGPT Image Jun 14, 2026, 11_54_48 PM (10).png": "Display Table Setup",
  "ChatGPT Image Jun 14, 2026, 11_54_48 PM (9).png": "Purple Balloon Arch",
  "ChatGPT Image Jun 15, 2026, 02_22_56 AM (1).png": "Round Table and Chairs",
  "ChatGPT Image Jun 15, 2026, 02_22_56 AM (2).png": "Floral Ceremony Backdrop",
  "ChatGPT Image Jun 15, 2026, 02_22_56 AM (3).png": "Floral Display Table",
  "ChatGPT Image Jun 15, 2026, 02_22_56 AM (4).png": "Reception Table Setup",
  "ChatGPT Image Jun 15, 2026, 02_22_57 AM (5).png": "Wedding Style Backdrop",
  "ChatGPT Image Jun 15, 2026, 02_22_57 AM (6).png": "Hanging Decor Detail",
  "ChatGPT Image Jun 15, 2026, 02_22_58 AM (7).png": "Reception Room Setup",
  "ChatGPT Image Jun 15, 2026, 02_22_58 AM (8).png": "Green Balloon Column",
  "ChatGPT Image Jun 15, 2026, 02_23_00 AM (9).png": "Poolside Marquee Setup",
  "ChatGPT Image Jun 15, 2026, 02_23_01 AM (10).png": "Poolside Event Setup",
  "ChatGPT Image Jun 15, 2026, 02_27_41 AM (1).png": "Poolside Table Setup",
  "ChatGPT Image Jun 15, 2026, 02_27_42 AM (2).png": "Red and White Backdrop",
  "ChatGPT Image Jun 15, 2026, 02_27_42 AM (3).png": "Buffet Display Table",
  "ChatGPT Image Jun 15, 2026, 02_27_43 AM (4).png": "Poolside Marquee Setup",
  "ChatGPT Image Jun 15, 2026, 02_27_43 AM (5).png": "Marquee Table Setup",
  "ChatGPT Image Jun 15, 2026, 02_27_43 AM (6).png": "Pink Balloon Photo Area",
  "ChatGPT Image Jun 15, 2026, 02_27_44 AM (7).png": "Tropical Birthday Table",
  "ChatGPT Image Jun 15, 2026, 02_27_44 AM (8).png": "Red and White Table Setup",
  "ChatGPT Image Jun 15, 2026, 02_51_00 AM (1).png": "Indoor Table Rows",
  "ChatGPT Image Jun 15, 2026, 02_51_00 AM (2).png": "Indoor Table and Arch",
  "ChatGPT Image Jun 15, 2026, 02_51_01 AM (3).png": "Feather Centrepiece Detail",
  "ChatGPT Image Jun 15, 2026, 02_51_01 AM (4).png": "Tropical Birthday Display",
  "ChatGPT Image Jun 15, 2026, 02_51_01 AM (5).png": "Outdoor Table Setup",
  "ChatGPT Image Jun 15, 2026, 02_51_02 AM (6).png": "Tropical Table Detail",
  "ChatGPT Image Jun 15, 2026, 02_51_02 AM (7).png": "Marquee Table Setup",
  "ChatGPT Image Jun 15, 2026, 02_51_02 AM (8).png": "Marquee Aisle Setup",
  "ChatGPT Image Jun 15, 2026, 02_51_03 AM (10).png": "Tropical Birthday Setup",
  "ChatGPT Image Jun 15, 2026, 02_51_03 AM (9).png": "Tropical Table Setup",
  "ChatGPT Image Jun 15, 2026, 02_57_04 AM (1).png": "Teepee Party Setup",
  "ChatGPT Image Jun 15, 2026, 02_57_04 AM (2).png": "Angel Birthday Backdrop",
  "ChatGPT Image Jun 15, 2026, 02_57_05 AM (3).png": "Lighted Teepee Prop",
  "ChatGPT Image Jun 15, 2026, 02_57_05 AM (4).png": "Teepee Marquee Setup",
  "ChatGPT Image Jun 15, 2026, 02_57_05 AM (5).png": "Teepee Low Table Setup",
  "ChatGPT Image Jun 15, 2026, 02_57_06 AM (7).png": "Angel Birthday Display",
  "ChatGPT Image Jun 15, 2026, 02_57_07 AM (8).png": "Outdoor Teepee Prop",
  "ChatGPT Image Jun 15, 2026, 02_57_15 AM (1).png": "Teepee Party Setup",
  "ChatGPT Image Jun 15, 2026, 02_57_15 AM (2).png": "Angel Birthday Backdrop",
  "ChatGPT Image Jun 15, 2026, 02_57_15 AM (3).png": "Lighted Teepee Prop",
  "ChatGPT Image Jun 15, 2026, 02_57_16 AM (4).png": "Teepee Marquee Setup",
  "ChatGPT Image Jun 15, 2026, 02_57_16 AM (5).png": "Teepee Low Table Setup",
  "ChatGPT Image Jun 15, 2026, 02_57_17 AM (7).png": "Angel Birthday Display",
  "ChatGPT Image Jun 15, 2026, 02_57_18 AM (8).png": "Outdoor Teepee Prop",
  "ChatGPT Image Jun 15, 2026, 03_09_52 AM (1).png": "Green Table Setup",
  "ChatGPT Image Jun 15, 2026, 03_09_53 AM (2).png": "Balcony Table Setup",
  "ChatGPT Image Jun 15, 2026, 03_09_54 AM (3).png": "Green Birthday Backdrop",
  "ChatGPT Image Jun 15, 2026, 03_09_54 AM (4).png": "Green and White Table Setup",
  "ChatGPT Image Jun 15, 2026, 03_09_54 AM (5).png": "Green Balloon Birthday Setup",
  "ChatGPT Image Jun 15, 2026, 03_09_54 AM (6).png": "Blue Marquee Table Setup",
  "ChatGPT Image Jun 15, 2026, 03_09_55 AM (7).png": "Blue Table Setup",
  "ChatGPT Image Jun 15, 2026, 03_09_55 AM (8).png": "Blue Birthday Backdrop",
  "ChatGPT Image Jun 15, 2026, 03_09_56 AM (10).png": "Red Floral Table Detail",
  "ChatGPT Image Jun 15, 2026, 03_09_56 AM (9).png": "Red and White Backdrop",
  "ChatGPT Image Jun 15, 2026, 03_16_15 AM (1).png": "Red and White Marquee",
  "ChatGPT Image Jun 15, 2026, 03_16_15 AM (2).png": "Marquee Display Table",
  "ChatGPT Image Jun 15, 2026, 03_16_16 AM (3).png": "Draped Ceremony Backdrop",
  "ChatGPT Image Jun 15, 2026, 03_16_16 AM (4).png": "Ceremony Table Setup",
  "ChatGPT Image Jun 15, 2026, 03_16_16 AM (5).png": "Marquee Long Table Setup",
  "ChatGPT Image Jun 15, 2026, 03_16_17 AM (6).png": "Long Table Setup",
  "ChatGPT Image Jun 15, 2026, 10_34_45 AM (1).png": "Lighted Centrepiece Detail",
  "ChatGPT Image Jun 15, 2026, 10_34_47 AM (2).png": "Black and Gold Table Setup",
  "ChatGPT Image Jun 15, 2026, 10_34_47 AM (3).png": "Black and Gold Event Setup",
  "ChatGPT Image Jun 15, 2026, 10_34_47 AM (4).png": "Red Carpet Table Setup",
  "ChatGPT Image Jun 15, 2026, 10_34_48 AM (5).png": "Black and Gold Long Table",
  "ChatGPT Image Jun 15, 2026, 10_34_49 AM (6).png": "50th Birthday Backdrop",
  "ChatGPT Image Jun 15, 2026, 10_34_49 AM (7).png": "Black and Gold Draping",
  "ChatGPT Image Jun 15, 2026, 10_34_50 AM (10).png": "Tuxedo Style Backdrop",
  "ChatGPT Image Jun 15, 2026, 10_34_50 AM (8).png": "Pink Birthday Backdrop",
  "ChatGPT Image Jun 15, 2026, 10_34_50 AM (9).png": "Balloon Centrepiece Detail",
  "ChatGPT Image Jun 15, 2026, 10_34_56 AM (5).png": "Black and Gold Long Table",
  "Christmas Theme1.png": "Christmas Theme",
  "Gatsby themed Party.png": "Gatsby Theme",
  "Valentine Theme 1.png": "Valentine Theme"
};

printButton.addEventListener("click", () => window.print());

toggleControls.addEventListener("click", () => {
  controls.classList.toggle("hidden");
  toggleControls.textContent = controls.classList.contains("hidden")
    ? "Show Controls"
    : "Hide Controls";
});

function attachImageUploadControls(root = document) {
  root.querySelectorAll(".editable-image input[type='file']").forEach((input) => {
    if (input.dataset.uploadReady === "true") return;
    input.dataset.uploadReady = "true";
    input.addEventListener("change", (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;

      const frame = event.target.closest(".editable-image");
      let image = frame.querySelector("img");

      if (!image) {
        image = document.createElement("img");
        image.alt = "Uploaded catalogue image";
        frame.prepend(image);
      }

      image.src = URL.createObjectURL(file);
    });
  });
}

function createGalleryImage(fileName) {
  const frame = document.createElement("div");
  frame.className = "image-frame editable-image";

  const image = document.createElement("img");
  image.src = `assets/gallery/${encodeURIComponent(fileName)}`;
  image.alt = "Gallery image";

  const label = document.createElement("span");
  label.textContent = makeCaptionFromFileName(fileName);
  label.contentEditable = "true";

  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.setAttribute("aria-label", "Replace gallery image");

  frame.append(image, label, input);
  return frame;
}

function cleanCaptionText(text) {
  return text
    .replace(/\bplaceholder\b/gi, "")
    .replace(/\bimage\b/gi, "")
    .replace(/\bexample\b/gi, "")
    .replace(/\bsetup\b/gi, "Setup")
    .replace(/\s+/g, " ")
    .trim();
}

function makeCaptionFromFileName(fileName) {
  const decodedFileName = decodeURIComponent(fileName);
  if (galleryCaptionMap[decodedFileName]) return galleryCaptionMap[decodedFileName];

  const name = decodeURIComponent(fileName)
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/^ChatGPT Image /i, "")
    .replace(/_/g, " ")
    .replace(/\s*\(\d+\)$/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/i.test(name)) return "Event Setup";
  if (/^\d/.test(name)) return "Event Setup";
  return name || "Event Setup";
}

function getImageCaption(frame) {
  const articleTitle = frame.closest("article")?.querySelector("h3")?.textContent.trim();
  if (articleTitle && !/^Item Name$/i.test(articleTitle) && !/^Editable Package Example$/i.test(articleTitle)) {
    return articleTitle;
  }

  const sectionTitle = frame.closest(".page-inner")?.querySelector(".section-title h2, .page-header h2")?.textContent.trim();
  const image = frame.querySelector("img");
  const source = image?.getAttribute("src") || "";
  const alt = image?.getAttribute("alt") || "";
  const fileName = source.split("/").pop() || "";
  const decodedFileName = decodeURIComponent(fileName);

  if (galleryCaptionMap[decodedFileName]) return galleryCaptionMap[decodedFileName];

  if (/Birthday%20theme1|Birthday theme1/i.test(source)) return "Birthday Theme";
  if (/Baby%20Shower%20theme1|Baby Shower theme1/i.test(source)) return "Baby Shower Theme";
  if (/Gatsby/i.test(source)) return "Gatsby Theme";
  if (/Bridal%20Shower|Bridal Shower/i.test(source)) return "Bridal Shower Setup";
  if (/Baby%20Shower%20Set|Baby Shower Set/i.test(source)) return "Baby Shower Setup";

  const cleanedAlt = cleanCaptionText(alt);
  if (cleanedAlt && !/^gallery$/i.test(cleanedAlt)) return cleanedAlt;
  if (sectionTitle && !/^Gallery$/i.test(sectionTitle)) return sectionTitle;
  return makeCaptionFromFileName(fileName);
}

function addImageOverlayCaptions(root = document) {
  root.querySelectorAll(".image-frame").forEach((frame) => {
    if (!frame.querySelector("img")) return;
    let label = frame.querySelector(":scope > span");
    if (!label) {
      label = document.createElement("span");
      frame.appendChild(label);
    }
    label.textContent = getImageCaption(frame);
    label.contentEditable = "true";
  });
}

function createGalleryPage(files, pageNumber) {
  const page = document.createElement("section");
  page.className = "page all-gallery-page";
  page.dataset.pageLabel = "Gallery";
  page.innerHTML = `
    <div class="decor bunting"></div>
    <div class="decor confetti"></div>
    <div class="decor wave"></div>
    <div class="page-inner">
      <header class="section-title">
        <h2 contenteditable="true">Gallery</h2>
        <p contenteditable="true">Additional Fiesta Party Hire Yeppoon gallery images.</p>
      </header>
      <div class="all-gallery-grid" aria-label="Gallery page ${pageNumber}"></div>
    </div>
  `;

  const grid = page.querySelector(".all-gallery-grid");
  files.forEach((fileName) => grid.appendChild(createGalleryImage(fileName)));
  return page;
}

function addAllGalleryImages() {
  const catalogue = document.querySelector(".catalogue");
  const contactPage = document.querySelector(".contact-page");
  const filesPerPage = 12;

  for (let index = 0; index < allGalleryImages.length; index += filesPerPage) {
    const pageFiles = allGalleryImages.slice(index, index + filesPerPage);
    const pageNumber = Math.floor(index / filesPerPage) + 2;
    catalogue.insertBefore(createGalleryPage(pageFiles, pageNumber), contactPage);
  }
}

function updateContentsPageNumbers() {
  const pages = [...document.querySelectorAll(".page")];
  const pageRanges = new Map();

  pages.forEach((page, index) => {
    const label = page.dataset.pageLabel;
    if (!label) return;

    const pageNumber = index + 1;
    const range = pageRanges.get(label) || { first: pageNumber, last: pageNumber };
    range.last = pageNumber;
    pageRanges.set(label, range);
  });

  document.querySelectorAll("[data-toc-target]").forEach((item) => {
    const range = pageRanges.get(item.dataset.tocTarget);
    if (!range) return;
    item.textContent = range.first === range.last
      ? String(range.first)
      : `${range.first}-${range.last}`;
  });
}

function addPageNumbers() {
  const pages = [...document.querySelectorAll(".page")];
  const totalPages = pages.length;

  pages.forEach((page, index) => {
    let pageNumber = page.querySelector(".page-number");
    if (!pageNumber) {
      pageNumber = document.createElement("div");
      pageNumber.className = "page-number";
      page.appendChild(pageNumber);
    }
    pageNumber.textContent = `Page ${index + 1} of ${totalPages}`;
  });
}

addAllGalleryImages();
attachImageUploadControls();
updateContentsPageNumbers();
addPageNumbers();
addImageOverlayCaptions();
