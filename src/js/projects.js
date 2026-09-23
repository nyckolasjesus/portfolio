/*
 * Carrega projetos de src/data/projects.json.
 *
 * Uso no HTML:
 *   <div id="projects-container" data-limit="3"></div>
 */

async function loadProjects() {
    const container = document.getElementById("projects-container");
    if (!container) return;

    const base = container.dataset.base || "";
    const limit = container.dataset.limit
        ? parseInt(container.dataset.limit, 10)
        : null;

    try {
        const response = await fetch(base + "src/data/projects.json");
        const projects = await response.json();

        let list = projects;
        if (limit) list = projects.slice(0, limit);

        container.innerHTML = "";

        if (list.length === 0) {
            container.innerHTML =
                '<p>Nenhum projeto registrado ainda.</p>';
            return;
        }

        list.forEach(project => {
            const card = document.createElement("a");
            card.className = "card";
            card.href = base + project.url;

            const tags = (project.tags || [])
                .map(tag => `<span class="card-tag">${tag}</span>`)
                .join(" ");

            card.innerHTML = `
                <span class="card-status">${project.status} · ${project.year}</span>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div>${tags}</div>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Erro ao carregar projetos:", error);
        container.innerHTML =
            '<p>Não foi possível carregar os projetos.</p>';
    }
}

document.addEventListener("DOMContentLoaded", loadProjects);
