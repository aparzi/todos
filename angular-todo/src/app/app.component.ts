import {Component, OnInit} from '@angular/core';
import {Item} from "./model/item";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.title = 'TodoList';
    this.subTitle = 'Welcome to my TodoList application';
    // this.todoForm = new FormGroup({
    //   description: new FormControl('')
    // });
    this.todoForm = this.fb.group({
      description: ['', Validators.required]
    });
  }

  confirmItem(): void {
    console.log(this.todoForm);
    if (!this.todoForm.value['description']) {
      console.log("ERRORE");
      return;
      //TODO: Aggiungere il popup d'errore di PrimeNg!
    }
    this.itemInserted.description = this.todoForm.value['description'];
    this.listItem.push(Object.assign({}, this.itemInserted));
    this.todoForm.reset();
  }
}
