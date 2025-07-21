import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
  <h1> Todo APP</h1>
  @if(!isUpdateWorkFromActive){
 <div>
    <label>Work</label>
    <input [(ngModel)]="work">
    <button (click)="save()">Save</button>
  </div>
  }
 
@else {
  <div>
    <label>Update Work</label>
    <input [(ngModel)]="updateWork">
    <button (click)="update()">Update</button>
  </div>
}
 
  <hr>
  <div>
    <ul>
      @for(data of todos;track data){
        <li>
          {{data}}
          @if(!isUpdateWorkFromActive){
          <button (click)="get($index)">Update</button>
        <button (click)="delete($index)">Delete</button>
          }
        </li>
      }
      
    </ul>
  </div>
  `
})
export class AppComponent {
  work: string = "";
  updateWork:string="";
  updateIndex:number=0;
  todos: string[] = [];
  isUpdateWorkFromActive:boolean=false;

  readonly #http=inject(HttpClient);
  todosHttp:any[] =[];

  get2(){
  this.#http.get<any[]>("https://jsonplaceholder.typicode.com/todo/").subscribe({
    next:(res)=>{
        this.todosHttp=res;
    },
    error:(err:HttpErrorResponse)=>{
      console.log(err)
    }
  })
}  

save() {
    this.todos.push(this.work);
    this.work="";
  }

  delete(index:number){
    this.todos.splice(index,1);
  }


  get(index:number){
    this.updateIndex=index;
    this.updateWork=this.todos[index];
    this.isUpdateWorkFromActive=true;
  }
  update(){
    this.todos[this.updateIndex]=this.updateWork;
    this.isUpdateWorkFromActive=false;
  }
}
