import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class eventsService  {

  profits:number[] = []

  ngOnInit() {
    this.name()
  }

  static async get(title:string, month:string='', page:number=1, perpage=5):Promise<any>{
    return axios.get('http://localhost:5000/event?limit='+perpage+'&title='+title+'&month='+month+'&skip='+((page-1)*perpage))
  }

  async name() {
    const response = await axios.get('http://localhost:5000/event/chart?limit=1000&title=&month=&skip=0')
    const events = response.data
    this.profits = []
    events.forEach((event)=>{
      this.profits.push(event.totalSum)
    })
    return this.profits;
  }

}