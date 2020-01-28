import { Input, Component }  from '@angular/core';
 
@Component({
    selector: 'redactor',
    templateUrl: './redactor.component.html',
    styleUrls: ['./redactor.component.css']
})

export class Redactor { 

    @Input() items: object[];
    @Input() columns: string[];

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
                while(newData.replace(/\s/g, '') === "") {

                    alert("Error. Input data again.");
                    newData = prompt(`Input new ${col}.`);
                    
                }
                if(newData !== null) element[col] = newData;
            }
        });
    }
}
