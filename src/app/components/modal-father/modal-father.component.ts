import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  template: `
    <p>
      modal-father works!
    </p>
  `
})
export class ModalFatherComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
