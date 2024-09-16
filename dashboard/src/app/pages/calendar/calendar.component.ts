import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, DatesSetArg } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr';
import { eventsService } from 'src/app/services/events.service';
import axios from 'axios';
import { utils } from 'src/app/services/utils';
import Swal from 'sweetalert2';
interface employee{"id":number, "name":string, "role":string, "phone":string, "photo":string, "eventId":number}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit {
  @ViewChild('ref') calendarComponent: FullCalendarComponent;
  events:any[]=[];
  employees:employee[]=[];
  colors={"blue":'',"green":'bg-green',"orange":'bg-orange',"gray":'bg-gray'};
  addMixinHtml:string;
  employeesElement:HTMLTableElement;
  checkEventElement:HTMLDivElement;

  addMixin = Swal.mixin({
    confirmButtonText: 'OK',
    showCloseButton: true,
    animation:false,
  });
  templatecolor = 'bg-gradient-info';

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    displayEventTime:false,
    dayMaxEvents: 2,
    locale: frLocale, 
    editable: true,
    firstDay: 1,
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventDrop: this.handleEventDrag,
  };

  ngOnInit() {
    this.get();

    axios.get('http://localhost:5000/employee?skip=0&limit=1000&name=')
    .then((response)=>{
      response.data.rows.forEach((employee:employee)=>{
        this.employees.push({"id":employee.id, "eventId":employee.eventId, "name":employee.name, "photo":employee.photo, "phone":employee.phone, "role":employee.role});
      });
    })

    fetch('../assets/swal.html')
    .then(response => response.text())
    .then((html)=>{
      const div = document.createElement('div');
      div.innerHTML = html;

      this.addMixinHtml = div.querySelector('#add').innerHTML;
      this.employeesElement = div.querySelector('#table');
      this.checkEventElement = div.querySelector('#checkEvent');
    });

    this.templatecolor = localStorage.getItem('templatecolor');
  }

  get(page=1){
    eventsService.get('', '', page, 100)
    .then((response)=>{
      response.data.rows.forEach(event => {
        let associations:number[]=[];
        event.employees.forEach((employee)=>{associations.push(employee.id)});

        this.events.push({"id":event.id, "title":event.title, "start":event.start, "description":event.description, "display":'block',
                          "classNames":this.colors[event.domain],"domain":event.domain, "completion":event.completion, "profit":event.profit, "employees":associations});
      });
      this.calendarOptions.events = this.events;
    });
  }

  employeesSwalHtml(idList:number[]):HTMLTableElement {
    let list:string = '';
    this.employees.forEach((employee)=>{
      list += `<tr id="tr`+employee.id+`">
                <th id="Photo`+employee.id+`" scope="row"><div class="media align-items-center">
                  <a class="avatar rounded-circle mr-3">
                    <img src="http://localhost:5000/staticRoute/`+employee.photo+`">
                  </a>
                  <div class="media-body">
                    <span class="mb-0 text-sm">`+employee.name+`</span>
                  </div>
                </div></th>
                <td id="name`+employee.id+`" style="display:none">`+employee.name+`</td>
                <td id="td`+employee.id+`" style="display:none">`+employee.id+`</td>
                <td><input id="check`+employee.id+`" type="checkbox" ` +(idList.includes(employee.id)?'checked':'')+ `/></td>
              </tr>`
    });
    this.employeesElement.querySelector('#tbody').innerHTML = list;
    return this.employeesElement;
  }

  handleDateClick(dateInfo){
    this.showNewSwal(dateInfo, null)
  }

  handleEventClick(eventInfo){
    Swal.fire({
      title: eventInfo.event.title,
      html: this.checkEventElement,
      showConfirmButton:false,
      showCloseButton: true,
      animation:false,
      didOpen: () => {
        const popup = Swal.getPopup()
        popup.querySelector<HTMLPreElement>('#description').textContent = eventInfo.event.extendedProps.description
        popup.querySelector<HTMLButtonElement>('#edit').onclick = ()=>this.showNewSwal(null, eventInfo)
        popup.querySelector<HTMLButtonElement>('#employees').onclick = ()=>this.showAssociationSwal(eventInfo.event.extendedProps.employees, eventInfo.event)
        popup.querySelector<HTMLButtonElement>('#delete').onclick = ()=>this.showDeleteSwal(eventInfo)
      }
    })
  }

  handleEventDrag(eventInfo){
    axios.put('http://localhost:5000/event/'+eventInfo.event.id, {"title":eventInfo.event.title, "description":eventInfo.event.extendedProps.description, "start":eventInfo.event.start, "end":eventInfo.event.end, "domain":eventInfo.event.extendedProps.domain, "profit":eventInfo.event.extendedProps.profit, "completion":eventInfo.event.extendedProps.completion, "token":localStorage.getItem('token')})
    .catch((err)=>{
      if(err.response && err.response.status == 401){
        utils.logOut()
      }
    })
  }

  showNewSwal(dateInfo, eventInfo){
    this.addMixin.fire({
      title: (eventInfo?'Modifier l\'Evénement':'Nouvel Evénement'),
      html: this.addMixinHtml,
      didOpen: () => {
        const popup = Swal.getPopup()
        const titleInput = popup.querySelector<HTMLInputElement>('#title')
        titleInput.focus(); titleInput.onkeyup = (event)=>event.key === 'Enter' && Swal.clickConfirm()
        const completionInput = popup.querySelector<HTMLInputElement>('#completion')
        completionInput.onchange = ()=>this.range(event)
        if(eventInfo){
          titleInput.value = eventInfo.event.title;
          popup.querySelector<HTMLTextAreaElement>('#description').value = eventInfo.event.extendedProps.description
          popup.querySelector<HTMLInputElement>('#profit').value = eventInfo.event.extendedProps.profit
          popup.querySelector<HTMLLabelElement>('#completionlabel').textContent = eventInfo.event.extendedProps.completion + '%'
          popup.querySelector<HTMLInputElement>('#completion').value = eventInfo.event.extendedProps.completion
          popup.querySelector<HTMLInputElement>('input[name="domain"][value="'+eventInfo.event.extendedProps.domain+'"]').checked = true
          popup.querySelector<HTMLInputElement>('#start').value = utils.formatDate(new Date(eventInfo.event.start))
        }else{
          popup.querySelector<HTMLInputElement>('input[name="domain"][value="gray"]').checked = true
          popup.querySelector<HTMLInputElement>('#start').value = utils.formatDate(new Date(dateInfo.dateStr))
          completionInput.value = '0';
        }
      },
      preConfirm: () => {
        const popup = Swal.getPopup()
        const title = popup.querySelector<HTMLInputElement>('#title').value.trim()
        const description = popup.querySelector<HTMLTextAreaElement>('#description').value
        let profit:any = popup.querySelector<HTMLInputElement>('#profit').value.trim(); profit = (profit?profit:0);
        const completion = popup.querySelector<HTMLInputElement>('#completion').value
        const domain = popup.querySelector<HTMLInputElement>('input[name="domain"]:checked').value
        const date = utils.formatDate(popup.querySelector<HTMLInputElement>('#start').value)
        if (title && eventInfo) {
          axios.put('http://localhost:5000/event/'+eventInfo.event.id, {"title":title, "description":description, "start":date, "end":date, "domain":domain, "completion":completion, "profit":profit, "token":localStorage.getItem('token')})
          .then(()=>{
            eventInfo.event.setProp("title",title); eventInfo.event.setDates(date, date); eventInfo.event.setExtendedProp("description",description); eventInfo.event.setProp("classNames", this.colors[domain]); eventInfo.event.setExtendedProp("domain", domain); eventInfo.event.setExtendedProp("completion", completion); eventInfo.event.setExtendedProp("profit", profit);
          })
          .catch((err)=>{
            if(err.response && err.response.status == 401){
              utils.logOut()
            }
          })
        }
        else if (title){
          axios.post('http://localhost:5000/event', {"title":title, "description":description, "start":date, "end":date, "domain":domain, "completion":completion, "profit":profit, "token":localStorage.getItem('token')})
          .then((response) => { 
            dateInfo.view.calendar.addEvent({"id":response.data.newId, "title":title, "description":description, "start":date, "end":date, "classNames":this.colors[domain], "domain":domain, "completion":completion, "profit":profit})
          })
          .catch((err)=>{
            if(err.response && err.response.status == 401){
              utils.logOut()
            }
          })
        }
      }
    });
  }

  showAssociationSwal(employees:number[], event){
    Swal.fire({
      title: 'Employés',
      html:this.employeesSwalHtml(employees) ,
      confirmButtonText: 'OK',
      showCloseButton: true,
      animation: false,
      didOpen: () => {
        document.getElementById('swal2-html-container').style.maxHeight = '400px';
      },
      preConfirm: () => {
        let associations:number[] = [];
        const popup = Swal.getPopup()
        this.employees.forEach((employee)=>{
          if(popup.querySelector<HTMLInputElement>('#check'+employee.id).checked)
            associations.push(employee.id)
        })
        
        axios.put('http://localhost:5000/event/associations/'+event.id, {"associations":associations, "token":localStorage.getItem('token')})
        .then(()=>{
          event.setExtendedProp("employees", associations);
        })
        .catch((err)=>{
          if(err.response && err.response.status == 401){
            utils.logOut()
          }
        })
      },
    });
  }

  showDeleteSwal(info){
    Swal.fire({title:"Supprimer l'Evénement ?", showCancelButton:true, confirmButtonText:"OUI", cancelButtonText:"NON", showCloseButton: true, animation:false, icon:"error"})
    .then((result)=>{
      if (result.isConfirmed) {
        axios.delete('http://localhost:5000/event/'+info.event.id, {data:{"token":localStorage.getItem('token')}})
        .then(()=>{info.event.remove()})
        .catch((err)=>{
          if(err.response && err.response.status == 401){
            utils.logOut()
          }
        })
      }
    });
  }

  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const selectedDate = input.value + '-01';
    if(selectedDate && new Date(selectedDate) instanceof Date){
      this.calendarComponent.getApi().gotoDate(selectedDate);
      input.value=''
    }
  }

  range(event){
    document.getElementById('completionlabel').textContent=event.target.value + '%';
  }
  
}