import { TestBed } from '@angular/core/testing';

import { Compiler } from './compiler.service';

describe('CompilerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Compiler = TestBed.get(Compiler);
    expect(service).toBeTruthy();
  });
});
