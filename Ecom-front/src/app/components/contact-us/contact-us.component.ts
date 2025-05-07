import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactInfo = {
    phone: '+971 4 123 4567',
    email: 'info@noorshama.com',
    address: 'Al Fahidi District, Dubai, UAE',
    hours: 'Sunday-Thursday: 9AM - 6PM (GST)'
  };

  socialMedia = [
    { name: 'Instagram', icon: 'logo-instagram', url: '#' },
    { name: 'Facebook', icon: 'logo-facebook', url: '#' },
    { name: 'Twitter', icon: 'logo-twitter', url: '#' }
  ];

  submitContactForm(formData: any) {
    console.log('Form submitted:', formData);
    // In a real app, you would call a service here
    alert('Thank you for your message! We will respond within 24 hours.');
  }
}
