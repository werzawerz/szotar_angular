import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Forditas } from '../models/forditas';
import { Szo } from '../models/szo';
import { ResponseJson } from '../models/responseJson';
import { Observable, throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForditoService {

  private forditasObs : Observable<ResponseJson>;
  private APIKey : string;
  private szofajAngolMagyar : Map<string, string>;
  private forditasok : Szo[];

  /**
   * Konstuktor, beállítja a Yandex API használtához a kulcsot, valamint a lent látható függvényeket meghívja,
   * melyeknek a funkciójuk a kommenteknél megtalálható.
   * @param http : az HTTP-n keresztül végzett műveletek (pl. API kérés)-ért felelős objektum, ez inicializálva van itt
   */
  constructor(private http: HttpClient) {
    this.createSzofajAngolMagyar();
    this.APIKey = "dict.1.1.20200426T130216Z.61527981c0f1a22a.f958a865360ce0433ddadd516bd1fac3ee22d223";
  }

  /**
   * A szófajok angolról magyarra való fordítása.
   */
  public createSzofajAngolMagyar() {
    this.szofajAngolMagyar = new Map<string, string>();
    this.szofajAngolMagyar.set("noun", "főnév");
    this.szofajAngolMagyar.set("verb", "ige");
    this.szofajAngolMagyar.set("conjunction", "kötőszó");
    this.szofajAngolMagyar.set("adjective", "melléknév");
    this.szofajAngolMagyar.set("numeral", "számnév");
    this.szofajAngolMagyar.set("pronoun", "névmás");
    this.szofajAngolMagyar.set("adverb", "határozószó");
    this.szofajAngolMagyar.set("preposition", "névelő");
  }
 
  /**
   * A Yandex API segítségével, lekéri a paraméterben kapott párosítás fordításait.
   * @param szo Forditas típusú adat, melyben megtalálható a forrás- és célnyelv, valamint a fordítandó szó.
   */
  public createForditas(szo : Forditas) {
    this.forditasok = [];
    var forrasRovidites = szo.forrasNyelv.rovidites;
    var celRovidites = szo.celNyelv.rovidites;
    var URL = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=" +
      this.APIKey + 
      "&lang=" +
      forrasRovidites + "-" + celRovidites +
      "&text=" + szo.szo;
    this.forditasObs = this.http.get<ResponseJson>(URL);
    this.forditasObs.subscribe(data =>  {
      console.log(data)
      var id = 0;
      for(let definition of data.def) {
        for(let translation of definition.tr) {
          var szofajMagyar = this.szofajAngolMagyar.get(translation.pos);
          var leforditottSzo = {id : id, nyelv: szo.celNyelv.nev, text : translation.text, szofaj : szofajMagyar}
          id++;
          this.forditasok.push(leforditottSzo);
        }
      }
    });
  }

  /**
   * Visszaadja az API kérés által létrehozott fordításokat.
   */
  public getForditasok() {
    return this.forditasok;
  }

}
