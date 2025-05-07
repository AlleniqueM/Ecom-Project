import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-about',
  imports: [CommonModule, FormsModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'Fatima Al-Mansoori',
      role: 'Founder & Master Perfumer',
      bio: 'Third-generation scent artisan from Dubai with expertise in Middle Eastern fragrance profiles',
      image: 'team-fatima'
    },
    {
      name: 'Khalid Al-Farsi',
      role: 'Production Director',
      bio: 'Omani wax specialist with 15 years experience in sustainable production',
      image: 'team-khalid'
    },
    {
      name: 'Layla Najjar',
      role: 'Design Director',
      bio: 'Beirut-born creative bringing contemporary Arabic design aesthetics',
      image: 'team-layla'
    }

  ];
}
