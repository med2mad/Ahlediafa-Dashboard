import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { employeesService } from 'src/app/services/employees.service';
import { utils } from 'src/app/services/utils';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
})
export class EmployeesComponent implements OnInit {

  employees:any[]=[];
  pagination:any;
  currentPage:number;
  name:string='';
  focus:boolean=false;
  pages:any;
  totalPages:number;
  templatecolor = 'bg-gradient-info';
  mod = Swal.mixin({
    html: `<form id="formid"><table>
            <tr><td style="text-align:right;">Nom</td><td style="text-align:left;"><input type="text" id="name" name="name" class="swal2-input" autofocus/></td></tr>
            <tr><td style="text-align:right;">Telephone</td><td style="text-align:left;"><input type="text" id="phone" name="phone" class="swal2-input"/></td></tr>
            <tr><td style="text-align:right;">Role</td><td style="text-align:left;"><input type="text" id="role" name="role" class="swal2-input"/><br/></td></tr>
            <tr>
              <td style="text-align:right;">
                <label for="check">Photo </label>
                <input id="check" type="checkbox" checked>
              </td>
              <td style="margin:auto"><input #photoinput id="photo" name="photo" class="form-control" type="file" data-browse="Avatar" style="width:75%;margin:10px auto;"></td>
            </tr>
          </table></form>`,
    confirmButtonText: 'Ok',
    showCloseButton: true,
    focusConfirm: false,
    animation:false,
  });

  ngOnInit() {
    this.get();

    this.templatecolor = localStorage.getItem('templatecolor');
  }

  get(page=1){
    employeesService.get(page, this.name)
    .then((response)=>{
      this.employees = response.data.rows
      const pagination = utils.paginate(response.data.total)
      this.totalPages = pagination.totalPages
      this.pages = pagination.pages
    })
    this.currentPage = page;
  }

  post(){
    this.mod.fire({
      title: 'Nouvel Employé',
      didOpen: () => {
        const popup = Swal.getPopup()
        const nameInput = popup.querySelector('#name') as HTMLInputElement
        nameInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
      },
      preConfirm: () => {
        const popup = Swal.getPopup()
        const payload = new FormData(popup.querySelector<HTMLFormElement>('#formid'))
        employeesService.post(payload, this.employees)
      },
    });
  }

  put(id, name, phone, role, photo, i){
    this.mod.fire({
      title: "Modifer cet Employé",
      didOpen: () => {
        const popup = Swal.getPopup()
        const nameInput = popup.querySelector('#name') as HTMLInputElement
        nameInput.value = name
        nameInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
        const phoneInput = popup.querySelector('#phone') as HTMLInputElement
        phoneInput.value = phone
        phoneInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
        const roleInput = popup.querySelector('#role') as HTMLInputElement
        roleInput.value = role
        roleInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
        const photoCheck = popup.querySelector('#check') as HTMLInputElement
        photoCheck.checked = (photo==''||photo=='profile.jpg')?false:true
      },
      preConfirm: () => {
        const popup = Swal.getPopup()
        const payload = new FormData(popup.querySelector<HTMLFormElement>('#formid'))
        if(payload.get('name')) {
          if(!popup.querySelector<HTMLInputElement>('#check').checked){
            payload.set('photo', null);
            payload.append('selectedPhotoName', 'profile.jpg');
          }else
          {payload.append('selectedPhotoName', photo);}
          
          employeesService.put(id, payload, this.employees, i)
        }
      },
    });
  }

  delete(id, i){
    Swal.fire({title:"Supprimer cet Employé ?", showCancelButton:true, confirmButtonText:"OUI", cancelButtonText:"NON", showCloseButton:true, animation:false, icon:"error"})
    .then((result)=>{
      if (result.isConfirmed) {
        employeesService.delete(id, this.employees, i)
      }
    });
  }

}
