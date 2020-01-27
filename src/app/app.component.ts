import { Component }  from '@angular/core';
 
@Component({
    selector: 'app',
    template: `<textarea [(ngModel)]="data"></textarea>
    <br>
    <button class="btn btn-default" (click)="loading(data)">Продолжить</button>
    <redactor [items]="items" [columns]="columns"></redactor>
    <textarea id="unload"></textarea>
    <br>
    <button class="btn btn-default" (click)="unloading()">Выгрузить</button>`,
    styles: [`
        textarea {margin: 10px; width: 540px;} 
        button {margin-left: 10px;}
    `]
})

export class AppComponent { 

    items: object[];
    columns: string[];

    loading(data: string) {

        let correctJson = data.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
        try {
            let items = JSON.parse(correctJson);
            let col: string[];
                    let error: boolean;

                    items.forEach((element: any) => {
                        if(typeof col === "undefined") {
                            col = Object.keys(element);   
                        }
                        if(JSON.stringify(col) != JSON.stringify(Object.keys(element))){
                            alert("Input uncorrect JSON.");
                            error  = true;
                        }
                    });

            if(!error) {
                this.columns = col;
                this.items = items;
            }
        }
        catch(e) {
            alert(e);
        }  
    }

    unloading() {

        let unloadData: string[] = [];
        let elem: string[] = [];

        this.items.forEach(element => {
            this.columns.forEach(col => {
                elem.push(`${col}:"${element[col]}"`);
            });
            unloadData.push('{'+elem.join(',')+'}') ;
            elem = [];
        });

        document.getElementById("unload").innerText = `[${unloadData.join(",")}]`;
    }
}
