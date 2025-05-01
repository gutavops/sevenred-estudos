const toggle = document.getElementById('toggle')

// Verifica se já existe uma preferência salva
const savedTheme = localStorage.getItem('theme')

if (savedTheme === 'dark') {
  document.body.classList.add('dark')
}

// Evento de clique no botão
toggle.addEventListener("click", () => {
  document.body.classList.toggle('dark') // Alterna o tema

  const isDark = document.body.classList.contains('dark') // Verifica se o tema atual é dark
  localStorage.setItem('theme', isDark ? 'dark' : 'light') // Salva no localStorage
})
