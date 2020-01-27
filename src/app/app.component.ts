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

        
        if(this.validation(data)) {
            this.items = JSON.parse(data.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": '));
            this.columns = Object.keys(this.items[0]);  
        }
    }
 
    validation(json: string): boolean {
        let correctJson: string;
        let col: string[];
        let error: boolean = false;
        let items: object[];
        try {
            correctJson = json.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
            items = JSON.parse(correctJson);
            if(items.length !== 0) {
                items.forEach((element: object) => {
                    if(typeof col === "undefined") {
                        col = Object.keys(element);   
                    }
                    if(JSON.stringify(col) !== JSON.stringify(Object.keys(element))){
                        error  = true;
                    }
                    Object.values(element).forEach(val => {
                        if(typeof val !== "string") error = true;
                    })
                });
            }
            else error = true;
        } catch {
            alert("Input uncorrect string.");
            return false;
        }
        if(error) alert("Input uncorrect JSON.");
        else return true;
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
