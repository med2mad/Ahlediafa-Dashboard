import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { eventsService } from 'src/app/services/events.service';
import axios from 'axios';
import { utils } from 'src/app/services/utils';
interface Event{"id":number, "title":string, "description":string, "start":string, "end":string, "completion":number, "domain":string, "profit":number, "employees":Employee[]}
interface Employee{"id":number, "name"?:string, "role"?:string, "phone"?:string, "photo"?:string, "eventId"?:number}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
})
export class EventsComponent implements OnInit {

  events:Event[]=[];
  employees:Employee[]=[];
  domains={"blue":'Nettoyage',"orange":'Livraison',"green":'Restauration',"gray":'Autres'};
  addMixinHtml:string;
  employeesElement:HTMLTableElement;
  checkElement:HTMLDivElement;
  templatecolor = 'bg-gradient-info';
  addMixin = Swal.mixin({
    confirmButtonText:'OK',
    showCloseButton:true,
    animation:false,
  });

  pagination:any;
  currentPage:number;
  title:string='';
  month:string='';
  focus:boolean=false;
  pages:any;
  totalPages:number;

  ngOnInit() {
    this.get();

    axios.get('http://localhost:5000/employee?skip=0&limit=1000&name=')
    .then((response)=>{
      response.data.rows.forEach((item:Employee)=>{
        this.employees.push({"id":item.id, "eventId":item.eventId, "name":item.name, "photo":item.photo, "phone":item.phone, "role":item.role});
      });
    })

    fetch('../assets/swal.html')
    .then(response => response.text())
    .then((html)=>{
      const div = document.createElement('div');
      div.innerHTML = html;

      this.addMixinHtml = div.querySelector('#add').innerHTML;
      this.employeesElement = div.querySelector('#table');
      this.checkElement = div.querySelector('#check');
    });

    this.templatecolor = localStorage.getItem('templatecolor');
  }

  get(page=1){
    eventsService.get(this.title, this.month, page)
    .then((response)=>{
      this.events = response.data.rows
      const pagination = utils.paginate(response.data.total);
      this.totalPages = pagination.totalPages;
      this.pages = pagination.pages;
      this.currentPage = page;

      document.getElementById('bluecardvalue').textContent = '0 DH'
      document.getElementById('greencardvalue').textContent = '0 DH'
      document.getElementById('orangecardvalue').textContent = '0 DH'
      document.getElementById('graycardvalue').textContent = '0 DH'
      let sum:number = 0
      response.data.profits.forEach(element => {
        if(element){
          document.getElementById(element.domain+'cardvalue').textContent = element.sum+' DH'
          sum += element.sum as number
        }
      });
      document.getElementById('profitsum').textContent = 'Somme du mois '+this.month+': '+sum+' DH'
    })
  }

  showNewSwal(arg:Event, i){
    this.addMixin.fire({
      html: this.addMixinHtml,
      didOpen: () => {
        const popup = Swal.getPopup()
        const titleInput = popup.querySelector<HTMLInputElement>('#title')
        titleInput.focus(); titleInput.onkeyup = (event)=>event.key === 'Enter' && Swal.clickConfirm()
        const completionInput = popup.querySelector<HTMLInputElement>('#completion')
        completionInput.onchange = ()=>this.range(event)
        if(arg){
          titleInput.value = arg.title
          popup.querySelector<HTMLTextAreaElement>('#description').value = arg.description
          popup.querySelector<HTMLInputElement>('#profit').value = arg.profit as any
          popup.querySelector<HTMLLabelElement>('#completionlabel').textContent = arg.completion + '%'
          popup.querySelector<HTMLInputElement>('#completion').value = arg.completion as unknown as string
          popup.querySelector<HTMLInputElement>('input[name="domain"][value="'+arg.domain+'"]').checked = true
          popup.querySelector<HTMLInputElement>('#start').value = utils.formatDate(new Date(arg.start))
        }else{
          popup.querySelector<HTMLInputElement>('input[name="domain"][value="gray"]').checked = true
          popup.querySelector<HTMLInputElement>('#start').value = utils.formatDate(new Date())
          completionInput.value = '0';
        }
      },
      preConfirm: () => {
        const popup = Swal.getPopup()
        const title = popup.querySelector<HTMLInputElement>('#title').value.trim()
        const description = popup.querySelector<HTMLTextAreaElement>('#description').value
        let profit:any = popup.querySelector<HTMLInputElement>('#profit').value.trim(); profit = (profit?profit:0);
        const completion = (popup.querySelector<HTMLInputElement>('#completion').value as unknown) as number
        const domain = popup.querySelector<HTMLInputElement>('input[name="domain"]:checked').value
        const date = utils.formatDate(popup.querySelector<HTMLInputElement>('#start').value)
        if (title && arg) {
          axios.put('http://localhost:5000/event/'+arg.id, {"title":title, "description":description, "start":date, "end":date, "domain":domain, "completion":completion, "profit":profit, "token":localStorage.getItem('token')})
          .then(()=>{
            this.events[i]={"id":arg.id, "title":title, "description":description, "domain":domain, "completion":completion, "profit":profit, "start":date, "end":date, "employees":this.events[i].employees}
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
            this.get()
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

  delete(id, i){
    Swal.fire({title:"Supprimer cette tâche ?", showCancelButton:true, confirmButtonText:"OUI", cancelButtonText:"NON", showCloseButton:true, animation:false, icon:"error"})
    .then((result)=>{
      if (result.isConfirmed) {
        axios.delete('http://localhost:5000/event/'+id, { data:{"token":localStorage.getItem('token')} } )
        .then(()=>{
          this.get()
        })
        .catch((err)=>{
          if(err.response && err.response.status == 401){
            utils.logOut()
          }
        })
      }
    });
  }

  showAssociationSwal(associations, i){
    let idList = [];
    associations.forEach((association)=>{
      idList.push(association.id)
    })
    Swal.fire({
      title: 'Employés',
      html: this.employeesSwalHtml(idList) ,
      confirmButtonText: 'OK',
      showCloseButton: true,
      animation: false,
      didOpen: () => {
        document.getElementById('swal2-html-container').style.maxHeight = '400px';
      },
      preConfirm: () => {
        let idList2 = [];
        const popup = Swal.getPopup()
        this.employees.forEach((employee)=>{
          if(popup.querySelector<HTMLInputElement>('#check'+employee.id).checked)
            idList2.push(employee.id)
        })

        axios.put('http://localhost:5000/event/associations/'+this.events[i].id, {"associations":idList2, "token":localStorage.getItem('token')})
        .then(()=>{
          this.get()
        })
        .catch((err)=>{
          if(err.response && err.response.status == 401){
            utils.logOut()
          }
        })
      },
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
                <td><input id="check`+employee.id+`" type="checkbox"`+(idList.includes(employee.id)?' checked':'')+` /></td>
              </tr>`;      
    });
    
    this.employeesElement.querySelector('#tbody').innerHTML = list;
    return this.employeesElement;
  }

  range(event){
    document.getElementById('completionlabel').textContent=event.target.value + '%';
  }
  
}