/*
 * Carrega publicações de src/data/publications.json.
 *
 * Uso no HTML:
 *   <div id="publications-container" data-limit="5"></div>
 *
 * - data-limit limita quantas entradas aparecem (sem o atributo, mostra todas).
 * - data-base ajusta o caminho quando a página está numa subpasta
 *   (ex.: páginas em /publications/ usam data-base="../").
 */

async function loadPublications() {
    const container = document.getElementById("publications-container");
    if (!container) return;

    const base = container.dataset.base || "";
    const limit = container.dataset.limit
        ? parseInt(container.dataset.limit, 10)
        : null;

    try {
        const response = await fetch(base + "src/data/publications.json");
        const publications = await response.json();

        let list = publications;
        if (limit) list = publications.slice(0, limit);

        container.innerHTML = "";

        if (list.length === 0) {
            container.innerHTML =
                '<p class="pub-meta">Nenhuma publicação registrada ainda.</p>';
            return;
        }

        list.forEach(pub => {
            const item = document.createElement("div");
            item.className = "pub-item";

            item.innerHTML = `
                <h3 class="pub-title">${pub.title}</h3>
                <p class="pub-meta">
                    <strong>${pub.authors}</strong> (${pub.year}).
                    <em>${pub.venue || ""}</em>
                    <span class="pub-type">${pub.type}</span>
                </p>
                ${pub.description ? `<p>${pub.description}</p>` : ""}
                ${pub.url
                    ? `<a class="pub-link" href="${pub.url}" target="_blank" rel="noopener">Acessar &rarr;</a>`
                    : ""}
            `;

            container.appendChild(item);
        });

    } catch (error) {
        console.error("Erro ao carregar publicações:", error);
        container.innerHTML =
            '<p class="pub-meta">Não foi possível carregar as publicações.</p>';
    }
}

document.addEventListener("DOMContentLoaded", loadPublications);
