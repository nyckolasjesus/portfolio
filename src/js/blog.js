/*
 * Carrega a lista de posts de src/data/posts.json.
 *
 * Uso no HTML:
 *   <div id="blog-container" data-base="../" data-limit="3"></div>
 *
 * - data-base ajusta o caminho quando a página está numa subpasta.
 * - data-limit limita quantos posts aparecem (sem o atributo, mostra todos).
 */

async function loadPosts() {
    const container = document.getElementById("blog-container");
    if (!container) return;

    const base = container.dataset.base || "";
    const limit = container.dataset.limit
        ? parseInt(container.dataset.limit, 10)
        : null;

    try {
        const response = await fetch(base + "src/data/posts.json");
        const posts = await response.json();

        let list = posts;
        if (limit) list = posts.slice(0, limit);

        container.innerHTML = "";

        if (list.length === 0) {
            container.innerHTML =
                '<p class="post-entry-subtitle">Nenhum post publicado ainda.</p>';
            return;
        }

        list.forEach(post => {
            const entry = document.createElement("a");
            entry.className = "post-entry";
            entry.href = base + post.url;

            const date = new Date(post.date + "T00:00:00");
            const dateFormatted = date.toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });

            const categories = (post.categories || [])
                .map(cat => `<span class="post-category">${cat}</span>`)
                .join(" ");

            entry.innerHTML = `
                <p class="post-entry-date">${dateFormatted}</p>
                <h2 class="post-entry-title">${post.title}</h2>
                ${post.subtitle
                    ? `<p class="post-entry-subtitle">${post.subtitle}</p>`
                    : ""}
                <div class="post-categories" style="margin-top: 0.75rem;">
                    ${categories}
                </div>
            `;

            container.appendChild(entry);
        });

    } catch (error) {
        console.error("Erro ao carregar posts:", error);
        container.innerHTML =
            '<p class="post-entry-subtitle">Não foi possível carregar os posts.</p>';
    }
}

document.addEventListener("DOMContentLoaded", loadPosts);
