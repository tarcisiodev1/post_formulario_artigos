function renderArticle(articleData) {
  const article = document.createElement("article");
  article.classList.add("article");
  article.id = `article-${articleData.id}`;

  const title = document.createElement("h3");
  title.classList.add("article-title");
  title.textContent = articleData.title;

  const content = document.createElement("div");
  content.classList.add("article-content");
  content.innerHTML = articleData.content;

  const author = document.createElement("div");
  author.classList.add("article-author");
  author.textContent = articleData.author;

  article.append(title, author, content);
  document.querySelector("#articles").appendChild(article);
}

async function fetchArticles() {
  const articles = await fetch("http://localhost:3000/articles");
  const artigos = await articles.json();
  // outra forma mais facil:
  // const articles = await fetch("http://localhost:3000/articles").then(res => res.json())
  artigos.forEach(renderArticle);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchArticles();
});

//lembresse que o vs code fica monitorando quando o liveserve está ativado,
// e quando a gente faz uma requisição post ele vai modificar o arquivo db.json e
// assim o liveserve vai atualizar a pagina e esse comportamento é oq a gente não
// quer(em uma aplicação normal, isso nao aconteceria, pois nao é utilizado o live server)
//  e para resolver isso vc vai nas preferecencias do vscode, config., pesquisar: liveserver,
//  opção: ignore files , editar em settings.json,"**/*.json", isso vai ignorar os arquivos .json,
//   isso vai fazer que ele nao atualize a pagina toda vez que a gente modificar um arquivo

// enviar o arquivo sem o comportatamento submit
const form = document.querySelector("form");

form.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  const articleData = {
    title: document.querySelector("#title").value,
    author: document.querySelector("#author").value,
    content: document.querySelector("#content").value,
  };

  const response = await fetch("http://localhost:3000/articles", {
    // por padrao ele é metodo get
    method: "POST",
    // cabeçalho muito importando para funcionar, para dizer que está enviando em formato texto obs:ver documentação
    headers: {
      "Content-Type": "application/json",
    },
    // corpo é onde vc vai colocar oq quer enviar  e é em formato de string
    body: JSON.stringify(articleData),
  });
  console.log(response);
  // pega a parte json para poder utiliza-lo
  const savedArticle = await response.json();
  form.reset();
  // renderizar o artigo na tela sem atualizar
  renderArticle(savedArticle);

  console.log(savedArticle);
});
