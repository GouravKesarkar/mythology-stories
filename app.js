// Get story name from URL
const params = new URLSearchParams(window.location.search);
const storyName = params.get("story");

// Language & content loader
const langSelect = document.getElementById("language");
const sectionList = document.getElementById("section-list");
const storyContent = document.getElementById("story-content");
const storyTitle = document.getElementById("story-title");

if (storyName && langSelect) {
  storyTitle.textContent = storyName.toUpperCase();

  async function loadStory(lang) {
    const res = await fetch(`stories/stories_${lang}.json`);
    const data = await res.json();
    const story = data[storyName];

    sectionList.innerHTML = "";
    story.sections.forEach((sec, i) => {
      const btn = document.createElement("button");
      btn.textContent = sec.title;
      btn.onclick = () => {
        storyContent.textContent = sec.content;
      };
      sectionList.appendChild(btn);
    });
  }

  langSelect.addEventListener("change", () => loadStory(langSelect.value));
  loadStory("en"); // default English
}
