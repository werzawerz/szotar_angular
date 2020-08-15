import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Nyelv } from '../models/nyelv';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NyelvService {

  private nyelvParok : string[];
  private APIKey : string;
  private nyelvek : Nyelv[];
  private roviditesNyelvOsszerendeles : Map<string, string>;

   /**
   * Konstuktor, beállítja a Yandex API használtához a kulcsot, valamint a lent látható függvényeket meghívja,
   * melyeknek a funkciójuk a kommenteknél megtalálható.
   * @param http : az HTTP-n keresztül végzett műveletek (pl. API kérés)-ért felelős objektum, ez inicializálva van itt
   */
  constructor(private http: HttpClient) {
    this.createOsszerendelesMap();
    this.APIKey = "dict.1.1.20200426T130216Z.61527981c0f1a22a.f958a865360ce0433ddadd516bd1fac3ee22d223";
    this.load();
  }

  /**
   * Mivel az API rövidítítésekben adja meg a lehetséges nyelveket (pl. hu), annak érdekében, hogy a felhasználók
   * kényelmesebben tudják használni a szótárt, hozzárendeljük a nyelv magyar nevét.
   */
  public createOsszerendelesMap() {
      this.roviditesNyelvOsszerendeles = new Map<string, string>();
      this.roviditesNyelvOsszerendeles.set("be", "Fehérorosz");
      this.roviditesNyelvOsszerendeles.set("bg", "Bolgár");
      this.roviditesNyelvOsszerendeles.set("cs", "Cseh");
      this.roviditesNyelvOsszerendeles.set("da", "Dán");
      this.roviditesNyelvOsszerendeles.set("de", "Német");
      this.roviditesNyelvOsszerendeles.set("el", "Görög");
      this.roviditesNyelvOsszerendeles.set("en", "Angol");
      this.roviditesNyelvOsszerendeles.set("es", "Spanyol");
      this.roviditesNyelvOsszerendeles.set("et", "Észt");
      this.roviditesNyelvOsszerendeles.set("fi", "Finn");
      this.roviditesNyelvOsszerendeles.set("fr", "Francia");
      this.roviditesNyelvOsszerendeles.set("hu", "Magyar");
      this.roviditesNyelvOsszerendeles.set("it", "Olasz");
      this.roviditesNyelvOsszerendeles.set("lt", "Litván");
      this.roviditesNyelvOsszerendeles.set("lv", "Lett");
      this.roviditesNyelvOsszerendeles.set("mhr", "Mari");
      this.roviditesNyelvOsszerendeles.set("mrj", "Kelet-Mari");
      this.roviditesNyelvOsszerendeles.set("nl", "Holland");
      this.roviditesNyelvOsszerendeles.set("no", "Norvég");
      this.roviditesNyelvOsszerendeles.set("pl", "Lengyel");
      this.roviditesNyelvOsszerendeles.set("pt", "Portugál");
      this.roviditesNyelvOsszerendeles.set("ru", "Orosz");
      this.roviditesNyelvOsszerendeles.set("sk", "Szlovák");
      this.roviditesNyelvOsszerendeles.set("sv", "Szlovén");
      this.roviditesNyelvOsszerendeles.set("tr", "Török");
      this.roviditesNyelvOsszerendeles.set("tt", "Tatár");
      this.roviditesNyelvOsszerendeles.set("uk", "Ukrán");
      this.roviditesNyelvOsszerendeles.set("zh", "Kínai");
  }

  /**
   * @returns Observable<string[]> típusú objektum, melyben a ismert nyelvpárosítások találhatók,
   * az API által visszaadott formában (pl. hu-ru, amelyek jelentése, hogy tud magyarról oroszra fordítani)
   */
  public getNyelvparokObs() {
    return of(this.nyelvParok);
  }

  /**
   * @returns Observable<Nyelv[]> típusú objektum, melyben az összes ismert nyelv található.
   */
  public getNyelvek() {
    return of(this.nyelvek);
  }

  /**
   * Lekéri az összes ismert nyelvpároísást.
   * Ha ez megtalálható a localstorage-bana akkor onnan, ellenkező esetben API kérés által.
   */
  private load() {
    if(JSON.parse(localStorage.getItem('nyelvParok'))) {
      this.nyelvParok = JSON.parse(localStorage.getItem('nyelvParok'))
    }
    else {
      var URL = "https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key=" + this.APIKey;
      this.http.get<string[]>(URL).subscribe(
        data => {
          this.nyelvParok = data
          this.save()
        })     
    }
  }

  /**
   * Lementi az ismert nyelvpárosításokat a localstorageba.
   */
  private save() {
    localStorage.setItem('nyelvParok', JSON.stringify(this.nyelvParok));
  }

  /**
   * Az API kérés által visszaadott Stringek létrehozza a Nyelv modelleket,
   * melyben megtalálható, a nyelv rövidítése és teljes neve, valamint az általa ismert nyelvek.
   */
  public createNyelvek() {
    this.nyelvek = []
    this.roviditesNyelvOsszerendeles.forEach((value : string, key : string) => {
      var ujNyelv = {nev : value,
        rovidites : key,
        ismertNyelvek : []}
      this.nyelvek.push(ujNyelv);
    })

    this.nyelvParok.forEach((par) => {
      var forrasNyelvStr = par.split('-')[0];
      var celNyelvStr = par.split('-')[1];
      if(this.roviditesNyelvOsszerendeles.get(forrasNyelvStr)==null || this.roviditesNyelvOsszerendeles.get(celNyelvStr)==null) {
        console.log("Ez a nyelv nincs benne a mapben " + forrasNyelvStr + " " + celNyelvStr);
      }
      else {
        var forrasNyelv = this.getNyelvByRovidites(forrasNyelvStr);
        var celNyelv = this.getNyelvByRovidites(celNyelvStr);
        forrasNyelv.ismertNyelvek.push(celNyelv);
      }
    })
  }

  /**
   * Ha létezik a rövidítés, visszaadja a hozzá tartozó Nyelv objektumot.
   * @param rovidites a rövidités
   * @return a röviditéshez tartozó nyelv
   */
  public getNyelvByRovidites(rovidites : string) {
    for(let nyelv of this.nyelvek) {
      if(nyelv.rovidites==rovidites) {
        return nyelv;
      }
    }
    return {nev : "",
      rovidites : "",
      ismertNyelvek : []}
  }

  /**
   * Ha létezik ilyen nevű nyelv, visszaadja a hozzá tartozó Nyelv objektumot.
   * @param nev a nyelv neve
   * @return a névhez tartozó nyelv
   */
  public getNyelvByNev(nev: string) {
    for(let nyelv of this.nyelvek) {
      if(nyelv.nev==nev) {
        return nyelv;
      }
    }
    return {nev : "",
      rovidites : "",
      ismertNyelvek : []}
  }
}
