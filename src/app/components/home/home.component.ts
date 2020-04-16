import { Component, OnInit } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { TodoService } from 'src/app/services/todo.service';
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  job;

  data = {
   inProgress:[],
   pendings:[],
   done:[]

    //  pendings: ["Get to work", "Pick up groceries", "Go home", "Fall asleep"],

    // inProgress: [
    //   "Get up",
    //   "Brush teeth",
    //   "Take a shower",
    //   "Check e-mail",
    //   "Walk dog"
    // ],

    // done: ["wolfteam", "teen wolf", "heidi", "merve", "kitap"]
  };
  constructor(private todoService:TodoService) {}

  ngOnInit() {
    // this.setItems();
    this.getAllTodos();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // Object.keys(this.data).forEach(element => {
      //   localStorage.setItem(element, JSON.stringify(this.data[element]));
      // });

    }
    this.updateTodos();
  }
  addToDo() {

    // this.data.pendings.push(this.job);
    // this.job = "";
    // localStorage.setItem("pendings", JSON.stringify(this.data.pendings));
    const obj = {todo:this.job};
    this.todoService.addToDo(obj).subscribe((res)=>{
console.log(res);
console.log("hi");
this.getAllTodos();
this.job="";
    },
    (err)=>{
console.log(err);
    }
    );

}

getAllTodos(){
  this.todoService.getAllTodos().subscribe((res)=>{
  Object.keys(res).forEach(element => {
    console.log(element);
    this.data[element] = res[element];
  });
  },
  (err)=>{
console.log(err);
  });
}

updateTodos(){
  this.todoService.updateTodos(this.data).subscribe((res)=>{
console.log(res);
this.getAllTodos();
  },(err)=>{
    console.log(err);
  });
}

removeTodo(id){
  if(confirm("Madde siliniyor")){
 this.todoService.removeTodo(id).subscribe((res)=>{
   console.log(res);
   this.getAllTodos();
 },(err)=>{
    console.log(err);
 });
}}




  // setItems() {
  //   Object.keys(this.data).forEach(element => {
  //     if (!localStorage.getItem(element)) {
  //       localStorage.setItem(element, JSON.stringify(this.data[element]));
  //     } else {
  //       this.data[element] = JSON.parse(localStorage.getItem(element));
  //     }
  //   });

  //    if(!localStorage.getItem('done')) {
  //     localStorage.setItem('done',JSON.stringify(this.data.done));
  //    }
  //    else {
  //      this.data.done=JSON.parse(localStorage.getItem('done'));
  //    }

  //    if(!localStorage.getItem('pendings')) {
  //     localStorage.setItem('pendings',JSON.stringify(this.data.pendings));
  //    }
  //    else{
  //      this.data.pendings=JSON.parse(localStorage.getItem('pendings'));
  //    }

  //   localStorage.setItem('pendings',JSON.stringify(this.data.pendings));
  //   localStorage.setItem('done',JSON.stringify(this.data.done));
  //   localStorage.setItem('inProgress',JSON.stringify(this.data.inProgress));
  // }
}
