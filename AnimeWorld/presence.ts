let presence = new Presence({
  clientId: "678265146883178519"
});

let browsingStamp = Math.floor(Date.now() / 1000);
let iFrameVideo, currentTime, duration, paused, playback;

presence.on("iFrameData", data => {
  playback = data.iframe_video.duration !== null ? true : false;
  if (playback) {
    iFrameVideo = data.iframe_video.iFrameVideo;
    currentTime = data.iframe_video.currTime;
    duration = data.iframe_video.duration;
    paused = data.iframe_video.paused;
  }
});

presence.on("UpdateData", async () => {
  let presenceData: presenceData = {
    largeImageKey: "pokemonlogo" // Bas has been here
  };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.pathname == "/") {
    // Homepage
    presenceData.smallImageKey = "home";
    presenceData.smallImageText = "Homepage";
    presenceData.details = "Nella homepage";
  } else if (document.location.pathname.startsWith("/contact")) {
    // Contact
    presenceData.smallImageKey = "info";
    presenceData.smallImageText = "Contatti";
    presenceData.details = "Sta guardando informazioni";
    presenceData.state = "su AnimeWorld";
  } else if (document.location.pathname.startsWith("/user/")) {
    // User Settings
    if (document.location.pathname.startsWith("/user/settings")) {
      // General Settings
      presenceData.smallImageKey = "settings";
      presenceData.smallImageText = "Impostazioni";
      presenceData.details = "Nelle sue impostazioni";
    } else if (document.location.href.includes("watchlist")) {
      // WatchList
      presenceData.smallImageKey = "wlsettings";
      presenceData.smallImageText = "Imposta la WatchList";
      presenceData.details = "Sta modificando la";
      presenceData.state = "sua WatchList";
    } else if (document.location.pathname.startsWith("/user/import")) {
      // Import WL
      presenceData.smallImageKey = "import";
      presenceData.smallImageText = "Importa la WatchList";
      presenceData.details = "Sta importando la sua";
      presenceData.state = "WatchList da MAL";
    } else if (document.location.pathname.startsWith("/user/notifications")) {
      // Notifications
      presenceData.smallImageKey = "notifications";
      presenceData.smallImageText = "Notifiche";
      presenceData.details = "Sfoglia le notifiche";
    } else {
      presenceData.smallImageKey = "settings";
      presenceData.smallImageText = "Impostazioni";
      presenceData.details = "Nelle impostazioni";
    }
  } else if (document.location.pathname.startsWith("/profile")) {
    // Profile
    if (document.location.href.includes("watchlist")) {
      let usernamewl = document.title.split("Watchlist di ")[1];
      presenceData.smallImageKey = "userwl";
      presenceData.smallImageText = "WatchList di " + usernamewl;
      presenceData.details = "Guarda la WatchList di:";
      presenceData.state = usernamewl;
    } else {
      let username = document.title.split("Profilo di ")[1];
      presenceData.smallImageKey = "user";
      presenceData.smallImageText = "Profilo di " + username;
      presenceData.details = "Guarda il profilo di:";
      presenceData.state = username;
    }
  } else if (document.location.pathname.startsWith("/genre")) {
    // Genre
    if (document.location.href.includes("?page=")) {
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Genere: " + document.title.split('"')[1];
      presenceData.details = "Nel genere: " + document.title.split('"')[1];
      presenceData.state = "Pagina: " + document.location.href.split("=")[1];
    } else {
      presenceData.smallImageKey = "search";
      presenceData.smallImageText =
        "Nel genere: " + document.title.split('"')[1];
      presenceData.details = "Nel genere: " + document.title.split('"')[1];
      presenceData.state = "Pagina: 1";
    }
  } else if (document.location.pathname.startsWith("/newest")) {
    // Newest
    if (document.location.href.includes("newest?page=")) {
      presenceData.smallImageKey = "new";
      presenceData.smallImageText = "Nuove aggiunte";
      presenceData.details = "Sfoglia le nuove aggiunte";
      presenceData.state =
        "Pagina: " + document.location.href.split("newest?page=")[1];
    } else {
      presenceData.smallImageKey = "new";
      presenceData.smallImageText = "Nuove aggiunte";
      presenceData.details = "Sfoglia le nuove aggiunte";
      presenceData.state = "Pagina: 1";
    }
  } else if (document.location.pathname.startsWith("/updated")) {
    // Updated
    if (document.location.href.includes("updated?page=")) {
      presenceData.smallImageKey = "new";
      presenceData.smallImageText = "Nuovi episodi";
      presenceData.details = "Sfoglia i nuovi episodi";
      presenceData.state =
        "Pagina: " + document.location.href.split("updated?page=")[1];
    } else {
      presenceData.smallImageKey = "new";
      presenceData.smallImageText = "Nuovi episodi";
      presenceData.details = "Sfoglia i nuovi episodi";
      presenceData.state = "Pagina: 1";
    }
  } else if (document.location.pathname.startsWith("/ongoing")) {
    // On Going
    if (document.location.href.includes("ongoing?page=")) {
      presenceData.smallImageKey = "schedule";
      presenceData.smallImageText = "Anime in corso";
      presenceData.details = "Sfoglia gli anime in";
      presenceData.state =
        "corso. Pagina: " + document.location.href.split("ongoing?page=")[1];
    } else {
      presenceData.smallImageKey = "schedule";
      presenceData.smallImageText = "Anime in corso";
      presenceData.details = "Sfoglia gli anime in";
      presenceData.state = "corso. Pagina: 1";
    }
  } else if (document.location.pathname.startsWith("/upcoming")) {
    // Upcoming
    presenceData.smallImageKey = "clock";
    presenceData.smallImageText = "Prossime uscite";
    presenceData.details = "Sfoglia le prossime";
    presenceData.state = "uscite";
  } else if (document.location.pathname.startsWith("/az-list")) {
    // A-Z List
    if (document.location.href.includes("?page=")) {
      presenceData.smallImageKey = "archive";
      presenceData.smallImageText = "Archivio";
      presenceData.details = "Sfoglia tutti gli anime";
      presenceData.state = "Pagina: " + document.location.href.split("=")[1];
    } else {
      presenceData.smallImageKey = "archive";
      presenceData.smallImageText = "Archivio";
      presenceData.details = "Sfoglia tutti gli anime";
      presenceData.state = "Pagina: 1";
    }
  } else if (document.location.pathname.startsWith("/schedule")) {
    // On Going
    presenceData.smallImageKey = "schedule";
    presenceData.smallImageText = "Calendario";
    presenceData.details = "Consulta il calendario degli";
    presenceData.state = "anime";
  } else if (document.location.pathname.startsWith("/search")) {
    // Search
    presenceData.smallImageKey = "search";
    presenceData.smallImageText =
      "Cerca : " + document.title.replace("AnimeWorld: ", "");
    presenceData.details = "Sta cercando:";
    presenceData.state = document.title.replace("AnimeWorld: ", "");
  } else if (document.location.pathname.startsWith("/news")) {
    // News
    if (
      document.location.pathname == "/news" ||
      document.location.pathname == "/news/"
    ) {
      if (document.location.href.includes("?page=")) {
        presenceData.smallImageKey = "paper";
        presenceData.smallImageText = "Notizie";
        presenceData.details = "Legge le notizie";
        presenceData.state = "Pagina: " + document.location.href.split("=")[1];
      } else {
        presenceData.smallImageKey = "paper";
        presenceData.smallImageText = "Notizie";
        presenceData.details = "Legge le notizie";
        presenceData.state = "Pagina: 1";
      }
    } else {
      let newsName = document.title.split("~ ")[1];
      presenceData.smallImageKey = "paper";
      presenceData.smallImageText = newsName;
      presenceData.details = "Legge la notizia:";
      presenceData.state = newsName;
    }
  } else if (document.location.href.includes("filter")) {
    // Accurate Research
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Ricerca avanzata";
    presenceData.details = "Sta facendo una ricerca";
    presenceData.state = "avanzata";
  } // Categories
  else if (document.location.pathname.startsWith("/tv-series")) {
    // TV-Series
    if (document.location.href.includes("tv-series?page=")) {
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Categoria: Anime";
      presenceData.details = "Nella categoria: Anime";
      presenceData.state =
        "Pagina: " + document.location.href.split("tv-series?page=")[1];
    } else {
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Categoria: Anime";
      presenceData.details = "Nella categoria: Anime";
      presenceData.state = "Pagina: 1";
    }
  } else if (document.location.pathname.startsWith("/movies")) {
    // Movies
    if (document.location.href.includes("movies?page=")) {
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Categoria: Film";
      presenceData.details = "Nella categoria: Film";
      presenceData.state =
        "Pagina: " + document.location.href.split("movies?page=")[1];
    } else {
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Categoria: Film";
      presenceData.details = "Nella categoria: Film";
      presenceData.state = "Pagina: 1";
    }
  } else if (document.location.pathname.startsWith("/ova")) {
    // OVA
    if (document.location.href.includes("ova?page=")) {
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Categoria: OVA";
      presenceData.details = "Nella categoria: OVA";
      presenceData.state =
        "Pagina: " + document.location.href.split("ova?page=")[1];
    } else {
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Categoria: OVA";
      presenceData.details = "Nella categoria: OVA";
      presenceData.state = "Pagina: 1";
    }
  } else if (document.location.pathname.startsWith("/ona")) {
    // ONA
    if (document.location.href.includes("ona?page=")) {
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Categoria: ONA";
      presenceData.details = "Nella categoria: ONA";
      presenceData.state =
        "Pagina: " + document.location.href.split("ona?page=")[1];
    } else {
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Categoria: ONA";
      presenceData.details = "Nella categoria: ONA";
      presenceData.state = "Pagina: 1";
    }
  } else if (document.location.pathname.startsWith("/specials")) {
    // Specials
    if (document.location.href.includes("specials?page=")) {
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Categoria: Specials";
      presenceData.details = "Nella categoria: Specials";
      presenceData.state =
        "Pagina: " + document.location.href.split("specials?page=")[1];
    } else {
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Categoria: Specials";
      presenceData.details = "Nella categoria: Specials";
      presenceData.state = "Pagina: 1";
    }
  } else if (document.location.pathname.startsWith("/preview")) {
    // Preview
    if (document.location.href.includes("preview?page=")) {
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Categoria: Preview";
      presenceData.details = "Nella categoria: Preview";
      presenceData.state =
        "Pagina: " + document.location.href.split("preview?page=")[1];
    } else {
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Categoria: Preview";
      presenceData.details = "Nella categoria: Preview";
      presenceData.state = "Pagina: 1";
    }
  } // End Categories
  else if (document.location.pathname.startsWith("/watch")) {
    // Anime Episode
    let releaseDate = document.querySelector(
      "#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(1) > dd:nth-child(4)"
    ).textContent;
    let author = document.querySelector(
      "#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(1) > dd:nth-child(8)"
    ).textContent;
    let episode = document.querySelector(
      "#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(2) > dd:nth-child(8) > font"
    ).textContent;
    let vote = document.querySelector(
      "#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(2) > dd.rating > span:nth-child(1)"
    ).textContent;
    let visual = document.querySelector(
      "#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(2) > dd:nth-child(10)"
    ).textContent;
    if (document.querySelector("#animeId > div > img") != null) {
      let newname = document.title
        .split("AnimeWorld: ")[1]
        .split(" Streaming & ")[0];
      if (newname.includes("(ITA)")) {
        newname = newname.split(" (ITA)")[0];
      }
      presenceData.smallImageKey = "new";
      presenceData.smallImageText = newname;
      presenceData.details = "Guarda l'annunciato:\n" + newname;
      presenceData.state =
        "Per più informazioni 🎦\n" +
        "Uscirà il: " +
        releaseDate +
        "\n" +
        "Episodi: " +
        episode +
        "\n" +
        "Autore: " +
        author +
        "\n" +
        "Voto: " +
        vote +
        "\n" +
        "Visualizzazioni: " +
        visual;
    } else {
      if (
        document
          .querySelector(
            "#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(1) > dd:nth-child(2)"
          )
          .textContent.includes("Anime")
      ) {
        let animename = document.title
          .replace("AnimeWorld: ", "")
          .split(" Episodio")[0];
        if (animename.includes("(ITA)")) {
          animename = animename.split(" (ITA)")[0];
        }
        let animenumber = document
          .querySelector("#episode-comment")
          .textContent.replace("Episodio ", "");
        let timestamps = getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        );
        if (iFrameVideo == true && !isNaN(duration)) {
          if (currentTime == duration) {
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText =
              animename + "｜Episodio: " + animenumber;
            presenceData.details = "Guardando: " + animename;
            presenceData.state = "Ep. " + animenumber + "｜Finito";
          } else if (currentTime != duration) {
            presenceData.smallImageKey = paused ? "pause" : "play";
            presenceData.smallImageText =
              animename + "｜Episodio: " + animenumber;
            presenceData.details = "Guardando: " + animename;
            presenceData.startTimestamp = paused ? null : timestamps[0];
            presenceData.state = paused
              ? "Ep. " + animenumber + "｜In pausa"
              : "Ep. " + animenumber + "｜In riproduzione";
            presenceData.endTimestamp = paused ? null : timestamps[1];
          }
        } else {
          presenceData.smallImageKey = "watching";
          presenceData.smallImageText =
            animename + "｜Episodio: " + animenumber;
          presenceData.details = "Sta per guardare:\n" + animename;
          presenceData.state =
            "Per più informazioni 🎦\n" +
            "\nUscito il: " +
            releaseDate +
            "\n" +
            "Episodio: " +
            animenumber +
            "\n" +
            "Autore: " +
            author +
            "\n" +
            "Voto: " +
            vote +
            "\n" +
            "Visualizzazioni: " +
            visual;
        } // Movie
      } else if (
        document
          .querySelector(
            "#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(1) > dd:nth-child(2)"
          )
          .textContent.includes("Movie")
      ) {
        let moviename = document.title
          .replace("AnimeWorld: ", "")
          .split(" Episodio")[0];
        if (moviename.includes("(ITA)")) {
          moviename = moviename.split(" (ITA)")[0];
        }
        let timestamps = getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        );
        if (iFrameVideo == true && !isNaN(duration)) {
          if (currentTime == duration) {
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = moviename;
            presenceData.details = "Guardando: " + moviename;
            presenceData.state = "Film ｜Finito";
          } else if (currentTime != duration) {
            presenceData.smallImageKey = paused ? "pause" : "play";
            presenceData.smallImageText = moviename;
            presenceData.details = "Guardando: " + moviename;
            presenceData.state = paused
              ? "Film｜In pausa"
              : "Film｜In riproduzione";
            presenceData.startTimestamp = paused ? null : timestamps[0];
            presenceData.endTimestamp = paused ? null : timestamps[1];
          }
        } else {
          presenceData.smallImageKey = "watching";
          presenceData.smallImageText = moviename;
          presenceData.details = "Sta per guardare il film:\n" + moviename;
          presenceData.state =
            "Per più informazioni 🎦\n\n" +
            "Uscito il: " +
            releaseDate +
            "\n" +
            "Autore: " +
            author +
            "\n" +
            "Voto: " +
            vote +
            "\n" +
            "Visualizzazioni: " +
            visual;
          presenceData.startTimestamp = browsingStamp;
        } // OAV
      } else if (
        document
          .querySelector(
            "#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(1) > dd:nth-child(2)"
          )
          .textContent.includes("OVA")
      ) {
        let oavname = document.title
          .replace("AnimeWorld: ", "")
          .split(" Episodio")[0];
        if (oavname.includes("(ITA)")) {
          oavname = oavname.split(" (ITA)")[0];
        }
        let oavnumber = document
          .querySelector("#episode-comment")
          .textContent.replace("Episodio ", "");
        let timestamps = getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        );
        if (iFrameVideo == true && !isNaN(duration)) {
          if (currentTime == duration) {
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = oavname + "｜" + oavnumber + "° OAV";
            presenceData.details = "Guardando: " + oavname;
            presenceData.state = oavnumber + "° OAV｜Finito";
          } else if (currentTime != duration) {
            presenceData.smallImageKey = paused ? "pause" : "play";
            presenceData.smallImageText = oavname + "｜" + oavnumber + "° OAV";
            presenceData.details = "Guardando: " + oavname;
            presenceData.startTimestamp = paused ? null : timestamps[0];
            presenceData.state = paused
              ? oavnumber + "° OAV｜In pausa"
              : oavnumber + "° OAV｜In riproduzione";
            presenceData.endTimestamp = paused ? null : timestamps[1];
          }
        } else {
          presenceData.smallImageKey = "watching";
          presenceData.smallImageText = oavname + "｜" + oavnumber + "° OAV";
          presenceData.details = "Sta per guardare:\n" + oavname;
          presenceData.state =
            "Per più informazioni 🎦\n\n" +
            "Uscito il: " +
            releaseDate +
            "\n" +
            oavnumber +
            "° OAV\n" +
            "Autore: " +
            author +
            "\n" +
            "Voto: " +
            vote +
            "\n" +
            "Visualizzazioni: " +
            visual;
        } // ONA
      } else if (
        document
          .querySelector(
            "#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(1) > dd:nth-child(2)"
          )
          .textContent.includes("ONA")
      ) {
        let onaname = document.title
          .replace("AnimeWorld: ", "")
          .split(" Episodio")[0];
        if (onaname.includes("(ITA)")) {
          onaname = onaname.split(" (ITA)")[0];
        }
        let onanumber = document
          .querySelector("#episode-comment")
          .textContent.replace("Episodio ", "");
        let timestamps = getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        );
        if (iFrameVideo == true && !isNaN(duration)) {
          if (currentTime == duration) {
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = onaname + "｜" + onanumber + "° ONA";
            presenceData.details = "Guardando: " + onaname;
            presenceData.state = onanumber + "° ONA｜Finito";
          } else if (currentTime != duration) {
            presenceData.smallImageKey = paused ? "pause" : "play";
            presenceData.smallImageText = onaname + "｜" + onanumber + "° ONA";
            presenceData.details = "Guardando: " + onaname;
            presenceData.state = paused
              ? onanumber + "° ONA｜In pausa"
              : onanumber + "° ONA｜In riproduzione";
            presenceData.startTimestamp = paused ? null : timestamps[0];
            presenceData.endTimestamp = paused ? null : timestamps[1];
          }
        } else {
          presenceData.smallImageKey = "watching";
          presenceData.smallImageText = onaname + "｜" + onanumber + "° ONA";
          presenceData.details = "Sta per guardare:\n" + onaname;
          presenceData.state =
            "Per più informazioni 🎦\n\n" +
            "Uscito il: " +
            releaseDate +
            "\n" +
            onanumber +
            "° ONA\n" +
            "Autore: " +
            author +
            "\n" +
            "Voto: " +
            vote +
            "\n" +
            "Visualizzazioni: " +
            visual;
        }
      } else if (
        document
          .querySelector(
            "#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(1) > dd:nth-child(2)"
          )
          .textContent.includes("Special")
      ) {
        let specialname = document.title
          .replace("AnimeWorld: ", "")
          .split(" Episodio")[0];
        if (specialname.includes("(ITA)")) {
          specialname = specialname.split(" (ITA)")[0];
        }
        let specialnumber = document
          .querySelector("#episode-comment")
          .textContent.replace("Episodio ", "");
        let timestamps = getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        );
        if (iFrameVideo == true && !isNaN(duration)) {
          if (currentTime == duration) {
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText =
              specialname + "｜" + specialnumber + "° Special";
            presenceData.details = "Guardando: " + specialname;
            presenceData.state = specialnumber + "° Special｜Finito";
          } else if (currentTime != duration) {
            presenceData.smallImageKey = paused ? "pause" : "play";
            presenceData.smallImageText =
              specialname + "｜" + specialnumber + "° Special";
            presenceData.details = "Guardando: " + specialname;
            presenceData.state = paused
              ? specialnumber + "° Special｜In pausa"
              : specialnumber + "° Special｜In riproduzione";
            presenceData.startTimestamp = paused ? null : timestamps[0];
            presenceData.endTimestamp = paused ? null : timestamps[1];
          }
        } else {
          presenceData.smallImageKey = "watching";
          presenceData.smallImageText =
            specialname + "｜" + specialnumber + "° Special";
          presenceData.details = "Sta per guardare:\n" + specialname;
          presenceData.state =
            "Per più informazioni 🎦\n\n" +
            "Uscito il: " +
            releaseDate +
            "\n" +
            "° Special\n" +
            "Autore: " +
            author +
            "\n" +
            "Voto: " +
            vote +
            "\n" +
            "Visualizzazioni: " +
            visual;
        } // Preview
      } else if (
        document
          .querySelector(
            "#main > div > div.widget.info > div > div:nth-child(1) > div.info.col-md-19 > div.row > dl:nth-child(1) > dd:nth-child(2)"
          )
          .textContent.includes("Preview")
      ) {
        let previewname = document.title
          .replace("AnimeWorld: ", "")
          .split(" Episodio")[0];
        if (previewname.includes("(ITA)")) {
          previewname = previewname.split(" (ITA)")[0];
        }
        let timestamps = getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        );
        if (iFrameVideo == true && !isNaN(duration)) {
          if (currentTime == duration) {
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = previewname;
            presenceData.details = "Guardando: " + previewname;
            presenceData.state = "Preview｜Finito";
          } else if (currentTime != duration) {
            presenceData.smallImageKey = paused ? "pause" : "play";
            presenceData.smallImageText = previewname;
            presenceData.details = "Guardando: " + previewname;
            presenceData.state = paused
              ? "Preview｜In pausa"
              : "Preview｜In riproduzione";
            presenceData.startTimestamp = paused ? null : timestamps[0];
            presenceData.endTimestamp = paused ? null : timestamps[1];
          }
        } else {
          presenceData.smallImageKey = "watching";
          presenceData.smallImageText = previewname;
          presenceData.details = "Sta per guardare la preview:\n" + previewname;
          presenceData.state =
            "Per più informazioni 🎦\n\n" +
            "Uscito il: " +
            releaseDate +
            "\n" +
            "Autore: " +
            author +
            "\n" +
            "Voto: " +
            vote +
            "\n" +
            "Visualizzazioni: " +
            visual;
        }
      }
    }
  } else if (document.location.pathname.startsWith("/admin")) {
    presenceData.largeImageKey = "yuriko";
    presenceData.smallImageKey = "working";
    presenceData.smallImageText = "AnimeWorld Lover";
    presenceData.details = "Sta lavorando su";
    presenceData.state = "AnimeWorld";
  } else {
    presenceData.largeImageKey = "pokemonlogo";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Navigando...";
    presenceData.details = "Navigando...";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(videoTime: number, videoDuration: number) {
  let startTime = Date.now();
  let endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
