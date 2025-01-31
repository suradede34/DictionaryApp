import { useState, useEffect } from 'react';
import { Navigation, Definition, ErrorMessage } from './Components';

function App() {
  const [word, setWord] = useState([]);
  const [input, setInput] = useState("");
  const [searchInput, setSearchInput] = useState("keyboard");
  const [notFound, setNotFound] = useState(false);
  const [fontType, setFontType] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getWord() {
      if (searchInput) {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput}`);
        if (response.ok) {
          const data = await response.json();
          setWord(data);
          setNotFound(false);
        } else {
          setWord(null);
          setNotFound(true);
        }
      }
    }
    getWord();
  }, [searchInput]);

  function handleSubmit(e) {
    e.preventDefault();
    if (e.target.searchInput.value === "") {
      setError(true);
      return;
    }
    setSearchInput(input);
    setError(false);
  }

  function getSystemThemePref() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-mode' : 'light';
  }

  const [theme, setTheme] = useState(localStorage.theme || getSystemThemePref());

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  function handleChangeTheme(e) {
    const changedTheme = e.target.checked ? 'dark-mode' : 'light';
    setTheme(changedTheme);
    localStorage.theme = changedTheme;
  }

  return (
    <>
      <div className="app-container">
        <Navigation
          input={input}
          word={word}
          handleSubmit={handleSubmit}
          setInput={setInput}
          theme={theme}
          handleChangeTheme={handleChangeTheme}
          fontType={fontType}
          setFontType={setFontType}
          error={error}
        />
        {notFound ? <ErrorMessage /> : <Definition word={word} />}
      </div>
    </>
  );
}

export default App;
