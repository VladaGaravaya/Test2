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
        if(this.validation(correctJson)) {
            this.items = JSON.parse(correctJson);
            this.columns = Object.keys(this.items[0]);  
        }
    }
 
    validation(json: string): boolean {
        let col: string[];
        let error: boolean;
        let items: object[];
        try {
            items = JSON.parse(json);
            
            items.forEach((element: any) => {
                if(typeof col === "undefined") {
                    col = Object.keys(element);   
                }
                if(JSON.stringify(col) != JSON.stringify(Object.keys(element))){
                    error  = true;
                }
                Object.values(element).forEach(val => {
                    if(typeof val !== "string") error = true;
                })
            });
            if(error) {
                alert("Input uncorrect JSON.");
            } 
            else {
                return true;
            }
        }
        catch {
            alert("Input uncorrect string.");
            return false;
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
