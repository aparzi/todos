import {Component, OnInit} from '@angular/core';
import {Item} from "./model/item";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  todoForm: FormGroup;
  title: string;
  subTitle: string;
  listItem: Array<Item> = [];
  itemInserted: Item = new Item();

  ngOnInit(): void {
    this.title = 'TodoList';
    this.subTitle = 'Welcome to my TodoList application';
    this.todoForm = new FormGroup({
      description: new FormControl('')
    });
  }

  confirmItem(): void {
    if (!this.todoForm.value['description']) {
      console.log("ERRORE");
      return;
      //TODO: Aggiungere il popup d'errore di PrimeNg!
    }
    this.itemInserted.description = this.todoForm.value['description'];
    this.listItem.push(Object.assign({}, this.itemInserted));
  }
}
