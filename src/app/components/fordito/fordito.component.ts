import { Component, OnInit } from '@angular/core';
import { ForditoService} from '../../service/fordito.service';
import { Nyelv } from '../../models/nyelv';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-fordito',
  templateUrl: './fordito.component.html',
  styleUrls: ['./fordito.component.css']
})
export class ForditoComponent implements OnInit {

  public nyelvek : Nyelv[];
  public nyelvekObs : Observable<Nyelv[]>;
  public nyelvParokObs : Observable<string[]>; 
  private nyelvParosok : string[];
  private roviditesNyelvOsszerendeles : Map<string, string>;

  constructor(private forditoService: ForditoService) { }
  
  ngOnInit(): void {
    this.createOsszerendelesMap();
    this.nyelvParokObs = this.forditoService.getNyelvparokObs();
    this.nyelvParokObs.subscribe(
      data => { this.nyelvParosok = data;
         this.createNyelvek();
         this.nyelvekObs = of(this.nyelvek).pipe(delay(200));
         console.log(this.nyelvek);
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
