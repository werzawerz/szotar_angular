import { Component, OnInit } from '@angular/core';
import { ForditoService} from '../../service/fordito.service';
import { NyelvService} from '../../service/nyelv.service';
import { Nyelv } from '../../models/nyelv';
import { Forditas } from '../../models/forditas';
import { Observable, of } from 'rxjs';
import { Szo } from 'src/app/models/szo';

@Component({
  selector: 'app-fordito',
  templateUrl: './fordito.component.html',
  styleUrls: ['./fordito.component.css']
})
export class ForditoComponent implements OnInit {

  public nyelvekObs : Observable<Nyelv[]>;
  public nyelvParokObs : Observable<string[]>; 
  public forrasNyelv : Nyelv;
  public forrasNyelvStr : string;
  public celNyelvOpciok : Observable<Nyelv[]>;
  public celNyelvStr : string;
  public celNyelv : Nyelv;
  public forditandoSzo : Forditas;
  public forditasok : Observable<Szo[]>;
  public wordWithDetails : Szo;

  /**
   * Konstruktor, a paraméterben kapott Service létrehozásáért felelős
   * @param forditoService 
   */
  constructor(private forditoService: ForditoService, private nyelvService : NyelvService) { }
  
  /**
   * Inicializáló függvény, a serviceben lekért ismert nyelvpárosok lekérésért felelős.
   * Mivel a használt API stringeket ad vissza, a függvény átalakítja ezeket Nyelv objektumokká, így könnyebb dolgozni velük.
   */
  ngOnInit(): void {
    this.forditandoSzo = {szo : "", forrasNyelv: null, celNyelv : null}
    this.nyelvParokObs = this.nyelvService.getNyelvparokObs();
    this.nyelvParokObs.subscribe(
      data => {
         this.nyelvService.createNyelvek();  
         this.nyelvekObs = this.nyelvService.getNyelvek();
      }
    )
  }

  /**
   * Miután a felhasználó kiválaszotta a forrásnyelvet, a függvény beállítja ezt a forrásNyelv változóba,
   * majd lekérdezi azokat a nyelveket, amelyre lehet fordítani a kiválaszott nyelvből, és eltárolja a celNyelvOpciok váltózóba.
   */
  public createCelNyelvek() {
    this.forrasNyelv = this.nyelvService.getNyelvByNev(this.forrasNyelvStr);
    //automatikusan a legelsőt válassza
    this.celNyelv = this.forrasNyelv.ismertNyelvek[0];
    this.celNyelvOpciok = of(this.forrasNyelv.ismertNyelvek);
  }

  /**
   * A kiválasztott célnyelvet eltárolja az erre a célra kijelölt változóba.
   */
  public createCelNyelv() {
    this.celNyelv = this.nyelvService.getNyelvByNev(this.celNyelvStr);
  }

  /**
   * A forditás gomb megnyomás határására hívódik meg a függvény,
   * a service segítségével megkapjuk a kivánt fordításokat. 
   */
  public fordit() {
    this.forditandoSzo.celNyelv = this.celNyelv;
    this.forditandoSzo.forrasNyelv = this.forrasNyelv;
    this.forditoService.createForditas(this.forditandoSzo);
    var _forditasok  = this.forditoService.getForditasok();
    this.forditasok = of(_forditasok);
  }

  /**
   * Validációs célt szolgál a függvény, megnézi, hogy ki van-e választva cél- és forrásnyelv,
   * valamint, hogy nem üres-e a fordítandó szó.
   */
  public somethingEmpty() {
    return this.forrasNyelv==null || this.celNyelv==null || this.forditandoSzo.szo == "";
  }

}
