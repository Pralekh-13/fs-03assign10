const searchEmoji = (emo) => {
  emo.preventDefault();
  const value = document.getElementById("search").value;
  displaySearchResults(value);
  return false;
};

const autoSearch = (emo) => {
  const value = emo.target.value;
  displaySearchResults(value);
};

const displaySearchResults = (searchQuery = "") => {
  const filtered = emojiList.filter((emo) => {
    if (emo.description.indexOf(searchQuery) !== -1) {
      return true;
    }
    if (emo.aliases.some((ele) => ele.startsWith(searchQuery))) {
      return true;
    }
    if (emo.tags.some((ele) => ele.startsWith(searchQuery))) {
      return true;
    }
  });

  const parent = document.getElementById("search_result");
  parent.innerHTML = "";
  filtered.forEach((emo) => {
    const new_row = document.createElement("tr");
    const new_emoji = document.createElement("td");
    const new_aliases = document.createElement("td");
    const new_description = document.createElement("td");

    new_emoji.innerText = emo.emoji;
    new_aliases.innerText = emo.aliases.join(", ");
    new_description.innerText = emo.description;

    new_aliases.innerText = new_aliases.innerText.replaceAll("_", " ");

    new_emoji.classList.add("emoji");
    new_aliases.classList.add("aliases");
    new_description.classList.add("desc");

    new_row.appendChild(new_emoji);
    new_row.appendChild(new_aliases);
    new_row.appendChild(new_description);
    parent.appendChild(new_row);
  });
};

document.getElementById("search_form").addEventListener("submit", searchEmoji);
document.getElementById("search").addEventListener("keyup", autoSearch);

window.onload = (_) => displaySearchResults();
