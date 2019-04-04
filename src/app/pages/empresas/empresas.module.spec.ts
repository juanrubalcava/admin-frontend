import { EmpresasModule } from './empresas.module';

describe('EmpresasModule', () => {
  let empresasModule: EmpresasModule;

  beforeEach(() => {
    empresasModule = new EmpresasModule();
  });

  it('should create an instance', () => {
    expect(empresasModule).toBeTruthy();
  });
});
