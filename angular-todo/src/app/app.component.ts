import {Component, OnInit} from '@angular/core';
import {Item} from "./model/item";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";

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

  constructor(private messageService: MessageService){}

  ngOnInit(): void {
    this.title = 'TodoList';
    this.subTitle = 'Welcome to my TodoList application';
    this.todoForm = new FormGroup({
      requiredControl: new FormControl('', [Validators.required])
    });
    let itemsSaved = localStorage.getItem('items');
    itemsSaved && itemsSaved.length != 0 ? this.listItem = JSON.parse(itemsSaved) : '';
  }

  confirmItem(): void {
    this.itemInserted.id = Math.random().toString(36).substr(2, 9); //Random id
    this.itemInserted.description = this.requiredControl.value;
    this.itemInserted.checked = false;
    this.listItem.push(Object.assign({}, this.itemInserted));
    localStorage.setItem('items', JSON.stringify(this.listItem));
    this.todoForm.reset();
  }

  isError(): boolean {
    if (this.requiredControl.invalid && (this.requiredControl.dirty || this.requiredControl.touched) && this.requiredControl.errors.required)
      return true;

    return false;
  }

  managementCheckbox(item: Item) {
    item.checked = !item.checked;
    localStorage.setItem('items', JSON.stringify(this.listItem));
  }

  deleteItem(item: Item) {
    this.listItem = this.listItem.filter(element => element.id !== item.id);
    localStorage.setItem('items', JSON.stringify(this.listItem));
  }

  resetAll(): void {
    this.listItem = [];
    localStorage.removeItem('items');
  }

  showError(): void {
    this.messageService.add({severity:'error', summary: 'Errore!', detail:'Inserire un dato valido!'});
  }

  get requiredControl() {
    return this.todoForm.get('requiredControl');
  }
}
