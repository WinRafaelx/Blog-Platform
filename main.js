const count = 140;
const search = window.location.search;
let tag, searchInput;
let appearTag = "All"

if (search.slice(1,4) == "tag") {
  tag = window.location.search.slice(5);
  appearTag = tag;
}
if (search.slice(1,7) == "search") {
  searchInput = window.location.search.slice(8);
  appearTag = `Search`
}

const blogs_vol = document.getElementById("blogs-vol");
const views_vol = document.getElementById("views-vol");

fetch('./statistic.json').then((res) => res.json()).then((data) => {
  blogs_vol.innerHTML = `Blogs: ${data.statistics.totalBlogs}`;
  views_vol.innerHTML = `Views: ${data.statistics.totalViews}`;
});

const tagAppear = document.getElementById("tag-detail");
tagAppear.innerHTML = appearTag;

function  changeTheme() {
  const checkbox = document.getElementById("changeTheme");
  
  if(checkbox.checked) {
    document.body.style.setProperty('background-color', '#CBF3F9');
  } else {
    document.body.style.setProperty('background-color', '#EFEFEF');
  }
}

function test() {
  const input = document.getElementById("search-val").value;
  window.location.href = `?search=${input}`;
}

function filterSearch(val) {
  if(val)
    window.location.href = `?tag=${val}`;
  else
    window.location.href = `/`;
}

function backHome() {
  window.location.href = "index.html"
}

const addBlogs = async () => {
  await fetch('./data.json').then((res) => res.json()).then((data) => {
    data.push({ id: 3, title: 'Third Blog' });
    console.log(data);
  });
}

if(tag) {
  const tagLi = document.getElementById(tag);
  if(tag == "top10") tagLi.classList.remove("special-color")
  else {
    tagLi.style.color = "#CC0000";
    tagLi.style.fontWeight = "bold";}
} else {
  const tagLi = document.getElementById("All");
  tagLi.style.color = "#CC0000";
}


const showBlogs = async () => {
  await fetch('./data.json').then((res) => res.json()).then((data) => {
    const StoryBoard = document.getElementById("StoryBoard");
    if(tag == "top10") {
      data.sort((a, b) => b.views - a.views)
    }
    data.forEach((blog, index) => {
      if(tag && blog.category.includes(tag) != 1 && tag != "top10") return;
      if(searchInput && !blog.title.toLowerCase().includes(searchInput.toLowerCase())&& !blog.author.toLowerCase().includes(searchInput.toLowerCase()) && !blog.content[1][1].slice(0, 500).toLowerCase().includes(searchInput.toLowerCase())) return;
      if(tag == "top10" && index > 9) return;

      const whiteBoard = document.createElement("div");
      whiteBoard.className = "white-bg";

      const aTag = document.createElement("a");
      aTag.href = `/blog.html?id=${index +1}`;
      aTag.className = "card";

      const img = document.createElement("img");
      img.src = blog.content[0][1];
      img.loading = "lazy";
      img.className = "card-img";

      const header = document.createElement("div");
      header.className = "card-header";
      header.innerHTML = blog.title;

      const views = document.createElement("div");
      views.className = "card-views";
      views.innerHTML = blog.views + " views";

      const content = document.createElement("div");
      content.className = "card-detail";
      content.innerHTML = blog.content[1][1].slice(0, count) + (blog.content[1][1].length > count ? "..." : "") + ` <a href="/blog.html?id=${index +1}" class="read-more">Read more</a>`;
      

      aTag.appendChild(img);
      whiteBoard.appendChild(aTag);
      whiteBoard.appendChild(header);
      whiteBoard.appendChild(views);
      whiteBoard.appendChild(content);

      StoryBoard.appendChild(whiteBoard);
    });
  });
}

showBlogs();
