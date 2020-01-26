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

    addItem(): void {

        let newItem: object = {};
         
        this.columns.forEach(col => {
            let newData = prompt(`Input ${col}`);
            newItem[col] = newData;
        });

        this.items.push(newItem);
    }

    deleteItem(item: object): void {

        let index;

        this.items.forEach(element => {
            if(JSON.stringify(element)===JSON.stringify(item)) {
                index = this.items.indexOf(element);
            }
        });

        this.items.splice(index, 1);
    }

    changeItem(item: object, col: string): void {
        
        this.items.forEach(element => {
            if(JSON.stringify(element)===JSON.stringify(item)) {
                let newData = prompt(`Input new ${col}.`);
                if(newData !=="" || newData.trim() !=="") {
                    element[col] = newData;
                }
                else {
                    alert("Error. Input data again.");
                }
            }
        });
    }

    loading(data: string) {

        let correctJson = data.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
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