import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import htmlToPdfmake from 'html-to-pdfmake';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { SwalService } from 'src/app/shared/services/swal.service';
import { Client } from '../../models/clients.model';
import { Propostas } from '../../models/propostas.model';
import { GenericService } from '../../services/generic.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css'],
})
export class RelatoriosComponent {
  @ViewChild('pdfTable') pdfTable: ElementRef;

  client: Client;
  clientId: number;
  propostas: Propostas[];
  perm = localStorage.getItem('perm');

  constructor(
    private genericService: GenericService,
    public dialog: MatDialog,
    private swalService: SwalService
  ) {}

  getPropostas(): void {
    const me = this;
    this.genericService.getCliente(this.clientId).subscribe((data) => {
      me.client = data;
    });

    this.genericService.getPropostasByClientId(this.clientId).subscribe(
      (data) => {
        me.propostas = data;
      },
      (err) => {
        this.swalService.error(
          'Cliente não encontrado',
          err.error.message,
          'Ok'
        );
      }
    );
  }

  downloadAsPDF() {
    const doc = new jsPDF();

    const pdfTable = this.pdfTable.nativeElement;

    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }
}
