import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
// import { TablesComponent } from '../../pages/tables/tables.component';
import { CalendarComponent } from '../../pages/calendar/calendar.component';
import { EmployeesComponent } from '../../pages/employees/employees.component';
import { EventsComponent } from '../../pages/events/events.component';
import { ChangepassComponent } from '../../pages/changepass/changepass.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    // { path: 'tables',         component: TablesComponent },
    { path: 'employees',         component: EmployeesComponent },
    { path: 'events',         component: EventsComponent },
    { path: 'calendar',         component: CalendarComponent },
    { path: 'changepass',         component: ChangepassComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent }
];
