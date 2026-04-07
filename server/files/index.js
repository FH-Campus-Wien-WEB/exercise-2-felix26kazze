window.onload = function () {
  const xhr = new XMLHttpRequest()
  xhr.onload = function () {
    const bodyElement = document.querySelector("body")
    if (xhr.status == 200) {
      const data = JSON.parse(xhr.responseText)
      for (const movie of data) {
        bodyElement.insertAdjacentHTML("beforeend", `
                        <article>
                        <img src="${movie.Poster}">
                        <h1>${movie.Title}</h1>
                        <p>Runtime: ${Math.floor(movie.Runtime / 60)} h ${movie.Runtime % 60} m, Released: ${new Date(movie.Released).toLocaleDateString()}</p>
                        ${movie.Genres.map((genre) => {
          return `<span class="genre">${genre}</span>`
        }).join('\n')}
                        <p>${movie.Plot}</p>
                        <h2>Directors</h2>
                        <ul>${movie.Directors.map((director) => {
          return `<li>${director}</li>`
        }).join('\n')}</ul>
                                                <h2>Writers</h2>
                        <ul>${movie.Writers.map((writer) => {
          return `<li>${writer}</li>`
        }).join('\n')}</ul>
                                                <h2>Actors</h2>
                        <ul>${movie.Actors.map((actor) => {
          return `<li>${actor}</li>`
        }).join('\n')}</ul>
                        <button onclick="location.href = 'edit.html?imdbID=${movie.imdbID}'">Edit</button>
                        </article>
                        `)
      }
    } else {
      bodyElement.append("Daten konnten nicht geladen werden, Status " + xhr.status + " - " + xhr.statusText)
    }
  }
  xhr.open("GET", "/movies")
  xhr.send()
}