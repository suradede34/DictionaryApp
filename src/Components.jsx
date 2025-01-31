import React, { useEffect } from 'react';

export function Navigation({ error, fontType, setFontType, theme, handleChangeTheme, input, handleSubmit, setInput }) {
  useEffect(() => {
    document.body.style.fontFamily = fontType;
  }, [fontType]);

  return (
    <>
      <div className="header">
        <div className="dictionaryIcon">
          <img src="/img/dictionary-book-icon.svg" alt="Dictionary Book Icon" />
        </div>
        <div className="headerLeftSide">
          <div className="fontChoice">
            <div className="fontStyle">
              <div className="dropdown">
                <button className="dropdown-btn">
                  {fontType === "Inter" ? "Sans Serif" :
                    fontType === "Lora" ? "Serif" :
                      fontType === "Inconsolata" ? "Mono" : "Sans Serif"
                  }
                  <img src="/img/menu-arrow-icon.svg" alt="Arrow Icon" />
                </button>
                <div className="dropdown-menu">
                  <div className="dropdown-item" onClick={() => setFontType('Inter')}>Sans Serif</div>
                  <div className="dropdown-item" onClick={() => setFontType('Lora')}>Serif</div>
                  <div className="dropdown-item" onClick={() => setFontType('Inconsolata')}>Mono</div>
                </div>
              </div>
            </div>
          </div>
          <div className="themeOptions">
            <label className="lightDark">
              <input onChange={handleChangeTheme} className="switch" type="checkbox" defaultChecked={theme === "dark-mode"} />
              <span><img src={theme === "light" ? "/img/icon-half-moon.svg" : "/img/icon-half-moon-dark.svg"} alt="Dark Mode Icon" /></span>
            </label>
          </div>
        </div>
      </div>
      <div className="searchArea">
        <form onSubmit={handleSubmit} autoComplete="off">
          <input type="text" name='searchInput' className={error ? "searchInput searchInputError" : "searchInput"} placeholder="Search for any word..." value={input} onChange={(e) => setInput(e.target.value)} />
          {error && <p className='error-text'>Whoops, can’t be empty…</p>}
        </form>
      </div>
    </>
  );
}

export function ErrorMessage() {
  return (
    <div className="notFound">
      <h1>😕</h1>
      <h2>No Definitions Found</h2>
      <p>Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.</p>
    </div>
  );
}

export function Definition({ word }) {
  return (
    <>
      {word?.length > 0 && (
        <div className="word-description-section">
          <div className="word-pronunciation">
            <div className="word-pronun-text">
              <h3>{word[0]?.word}</h3>
              <p>{word[0]?.phonetics[1]?.text}</p>
            </div>
            <button className='playBtn'>
              <img onClick={() => {
                const audioUrl = word[0]?.phonetics?.find(phonetic => phonetic.audio)?.audio;
                const fullAudioUrl = audioUrl?.startsWith("//") ? `https:${audioUrl}` : audioUrl;
                if (fullAudioUrl) {
                  const audio = new Audio(fullAudioUrl);
                  audio.play();
                }
              }} src="/img/audio-play-btn.svg" alt="Play Icon" />
            </button>
          </div>

          {word[0]?.meanings.map((meaning, index) => (
            <div className={`word-type-${index + 1}`} key={index}>
              <div className="word-type">
                <h3>{meaning?.partOfSpeech}</h3>
                <span></span>
              </div>
              <h5>Meaning</h5>
              <ul>
                {meaning?.definitions.map((def, i) => (
                  <li key={i}>
                    {def.definition}
                    {def.example && <p className='example-text'>"{def.example}"</p>}
                  </li>
                ))}
              </ul>
              {meaning?.synonyms?.length > 0 && (
                <div className="synonyms">
                  <h5>Synonyms</h5>
                  <p>{meaning?.synonyms.join(", ")}</p>
                </div>
              )}
            </div>
          ))}

          <div className="sourceUrl">
            <h5>Source</h5>
            <a href={word[0]?.sourceUrls} target='_blank'>
              {word[0]?.sourceUrls}
              <img src="/img/source-link-icon.svg" alt="Source Link Icon" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
