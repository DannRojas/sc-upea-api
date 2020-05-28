import { CapacitationInterface } from 'src/app/models/capacitation';
import { Injectable } from '@angular/core';
import { PdfMakeWrapper, Txt, Img, Table, Cell, Columns, Ul } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { PeopleInterface } from '../models/people';

PdfMakeWrapper.setFonts(pdfFonts);

@Injectable({
    providedIn: 'root'
})
export class GeneratorPDF {

    private total: number;

    constructor() { }

    getCurrentDate() {
        let date = new Date();
        let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        let fecha = `${date.getDate()} de ${meses[date.getMonth()]}, ${date.getFullYear()}`;
        // Ej. fecha = 9 de Abril, 2020
        return fecha
    }
    getDateInit(fechaInicio: Date) {;
        let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        let fecha = `${fechaInicio.getDate()} de ${meses[fechaInicio.getMonth()]}, ${fechaInicio.getFullYear()}`;
        // Ej. fecha = 9 de Abril, 2020
        return fecha
    }

    async generateTicket(capacitation: CapacitationInterface, people: PeopleInterface) {
        const pdf = new PdfMakeWrapper();
        pdf.pageSize('Letter');
        pdf.pageMargins([60, 40]);

        pdf.info({
            title: 'Boleta de Inscripción',
            author: 'SIE',
            subject: 'Válida por 72Hrs.'
        });

        pdf.styles({
            title: {
                fontSize: 18,
                bold: true
            }
        })

        pdf.add(
            await new Img('assets/png/header.png').height(100).width(550).alignment("left").margin([0, 0, 30, 0]).build()
        );

        pdf.add([
            new Txt('BOLETA DE INSCRIPCIÓN').style('title').bold().alignment('center').end,
            pdf.ln(1),
            new Columns([new Txt(`FECHA: ${this.getCurrentDate()}`).alignment('left').bold().end, new Txt(`No. C.I: ${people.ci}`).alignment('right').bold().end]).end,
            new Columns([new Txt(`NOMBRE: ${people.nombres} ${people.apellidos}`).alignment('left').bold().end, new Txt(`OCUPACIÓN: ${people.tipo}`).alignment('right').bold().end]).end,
            pdf.ln(1)
        ])

        pdf.add([
            new Table([
                [
                    new Cell(new Txt('Nombre').bold().end).fillColor('#dbd9d9').end,
                    new Cell(new Txt('Expositor').bold().end).fillColor('#dbd9d9').end,
                    new Cell(new Txt('Lugar').bold().end).fillColor('#dbd9d9').end,
                    new Cell(new Txt('Inicio').bold().end).fillColor('#dbd9d9').end,
                    new Cell(new Txt('Hora').bold().end).fillColor('#dbd9d9').end,
                    new Cell(new Txt('Costo').bold().end).fillColor('#dbd9d9').end
                ],
                [`${capacitation.nombre}`, `${capacitation.expositor}`, `${capacitation.lugar}`, `${this.getDateInit(capacitation.fecha_inicio)}`, `${capacitation.hora}`, `Bs. ${capacitation.costo}`]
            ]).widths(['*', '*', '*', '*', '*', '*']).dontBreakRows(true).end
        ])


        pdf.create().download(`Boleta Inscripción ${this.getCurrentDate()}`);
    }
}