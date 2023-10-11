const id = window.location.search.slice(4)

console.log(id);

const searchBlogs = async () => {
	const val = await fetch('./data.json').then(res => res.json()).then(
		data => data.filter(blog => blog.id == id)
	)
	console.log(val);
	const blog = document.getElementById("blog");

	// Author's Part
	const author = document.createElement("a");
	author.href = '/profile.html';
	author.className = "author";

	const author_img = document.createElement("img");
	author_img.src = val[0].img_author;
	author_img.loading = "lazy";
	author_img.className = "author-img";

	const author_div = document.createElement("div");
	const author_name = document.createElement("div");
	const author_post = document.createElement("div");
	author_name.innerHTML = val[0].author;
	author_name.className = "name";
	author_post.innerHTML = val[0].time;
	author_post.className = "author-text";
	author_div.appendChild(author_name);
	author_div.appendChild(author_post);

	author.appendChild(author_img);
	author.appendChild(author_div);

	// Blog's Part
	const title = document.createElement("h1");
	title.innerHTML = val[0].title;
	title.className = "header";

	blog.appendChild(author);
	blog.appendChild(title);

	val[0].content.map((content, index) => {
		if(content[0] == "img") {
			const divImg = document.createElement("div");
			divImg.className = "center";
			const img_class = Math.random() > 0.5 ? "blog-img" : "blog-img-hori";
			const img = document.createElement("img");
			img.loading = "lazy";
			img.className = img_class;
			img.src = content[1];
			divImg.appendChild(img);
			blog.appendChild(divImg);
		} else {
			const text = document.createElement("div");
			text.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + content[1];
			text.className = "blog-text";
			blog.appendChild(text);
		}
	})
}

searchBlogs();