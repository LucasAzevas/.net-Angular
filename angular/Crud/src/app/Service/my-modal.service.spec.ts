import { TestBed } from '@angular/core/testing';

import { MyModalService } from './my-modal.service';

describe('MyModalService', () => {
  let service: MyModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
