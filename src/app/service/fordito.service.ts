import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Szo } from '../models/szo';
import { Nyelv } from '../models/nyelv'
import { Observable, throwError, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForditoService {

  private nyelvParokObs : Observable<string[]>;
  private APIKey : string;
  private URL : string;
  private nyelvParosok : string[];
  private nyelvek : Nyelv[];
  private roviditesNyelvOsszerendeles : Map<string, string>;

  constructor(private http: HttpClient) {
    this.createOsszerendelesMap();
    this.load();
    this.nyelvParokObs.subscribe(
      data => { this.nyelvParosok = data;
         this.createNyelvek()
      }
    )
  }

  private createOsszerendelesMap() {
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

  public getNyelvparokObs() {
    return this.nyelvParokObs.pipe(delay(200));
  }

  public getNyelvek() {
    return of(this.nyelvek).pipe(delay(200));
  }

  private load() {
    this.APIKey = "dict.1.1.20200426T130216Z.61527981c0f1a22a.f958a865360ce0433ddadd516bd1fac3ee22d223";
    this.URL = "https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key=" + this.APIKey;
    this.nyelvParokObs = this.http.get<string[]>(this.URL);
  }  

  private createNyelvek() {
    this.nyelvek = [];
    this.roviditesNyelvOsszerendeles.forEach((value : string, key : string) => {
      var ujNyelv = {nev : value,
        rovidites : key,
        ismertNyelvek : []}
      this.nyelvek.push(ujNyelv);
    })

    this.nyelvParosok.forEach((par) => {
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

  private getNyelvByRovidites(rovidites : string) {
    for(let nyelv of this.nyelvek) {
      if(nyelv.rovidites==rovidites) {
        return nyelv;
      }
    }
    return {nev : "",
      rovidites : "",
      ismertNyelvek : []}
  }

  
}
