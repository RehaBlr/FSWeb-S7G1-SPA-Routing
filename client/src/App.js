import React, { useState, useEffect } from "react";
import axios from "axios";

import Film from "./Filmler/Film";
import FilmListesi from "./Filmler/FilmListesi";

import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get("http://localhost:5001/api/filmler") // Burayı Postman'le çalışın
        .then((response) => {
          console.log("Filmler :", response.data);
          // Bu kısmı log statementlarıyla çalışın
          setMovieList(response.data);
          // ve burdan gelen response'u 'movieList' e aktarın
        })
        .catch((error) => {
          console.error("Sunucu Hatası", error);
        });
    };
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (movObj) => {
    console.log("app.js: KaydedilernlerListesineEkle : ", movObj);
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
    const findSaved = saved.filter((m) => m.id === movObj.id);
    if (findSaved.length > 0) {
      console.log("Zaten Kaydedilmiş");
    } else {
      setSaved([...saved, movObj]);
    }
    // saved.includes(id)
    //   ? console.log("Zaten kaydedilmiş.")
    //   : setSaved([...saved, id]);
  };

  return (
    <BrowserRouter>
      <div>
        <KaydedilenlerListesi list={saved} />

        {/* <div>Bu Div'i kendi Routelarınızla değiştirin</div> */}

        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/filmler/:id">
              <Film save={KaydedilenlerListesineEkle} />
            </Route>
            <Route path="/">
              <FilmListesi movies={movieList} />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
