import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Reporte{
  numLinea: number;
  quantBus: number;
  horaryDone: number;
  horaryNoDone: number;
  velPromBuses: number;
}

export interface Comment{
  userNameAutor: string;
  comment: string;
}

@Component({
  selector: 'app-ver-reporte',
  templateUrl: './ver-reporte.page.html',
  styleUrls: ['./ver-reporte.page.scss'],
})
export class VerReportePage implements OnInit {
  topComments: Comment[] = [
    { userNameAutor: 'NoTomoMicro123', comment: 'Los buses de esta linea tienden a exceder los limites de velocidad.' },
    { userNameAutor: 'AbajoHigiene54', comment: 'Las micros estan muy limpias.' },
    { userNameAutor: 'CortesiaMostImportant213', comment: 'Los choferes son groseros.' }
  ];
  comments: Comment[] = [];
  report!: Reporte;
  loadedComments: number = 0;
  commentsPerPage: number = 10;
  allCommentsLoaded: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.report = {
      horaryDone: 120,
      horaryNoDone: 80,
      numLinea: 611,
      quantBus: 200,
      velPromBuses: 70
    };

    this.loadComments();
  }

  loadComments(event?: any) {
    const newComments = this.topComments.slice(this.loadedComments, this.loadedComments + this.commentsPerPage);
    this.comments = [...this.comments, ...newComments];
    this.loadedComments += newComments.length;

    if (newComments.length < this.commentsPerPage) {
      this.allCommentsLoaded = true;
    }

    if (event) {
      event.target.complete();
    }
  }

  loadMoreComments(event: any) {
    this.loadComments(event);
  }

  goToUser(){
    this.redirigirUsuario();
  }

  // Método para dirigirse a la página de inicio de sesión
  private redirigirUsuario() {
    this.router.navigate(['inicio-sesion/sesion-usuario']);
  }

}
