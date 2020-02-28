import { Injectable, Inject } from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    @Inject ('apiUrl') private apiUrl,
    private http:HttpClient ){}

addToDo(obj){
return this.http.post(this.apiUrl,obj);

}
getAllTodos(){
  return this.http.get(this.apiUrl);

}
updateTodos(obj){
  return this.http.put(this.apiUrl,obj);
}
removeTodo(id){
  console.log("id",id);
  return this.http.delete(this.apiUrl+"/"+id);
}
}
