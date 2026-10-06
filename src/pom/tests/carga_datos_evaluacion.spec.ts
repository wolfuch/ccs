

/*
de claude para trabjar
test('Descarga plantilla, la completa y la sube', async ({ page }, testInfo) => {
  const carga = new CargaDatosEvaluacionPage(page);

  const download = await carga.descargarPlantillaContratos();
  expect(download.suggestedFilename()).toBe('plantilla-contratos.xlsx');

  const ruta = testInfo.outputPath(download.suggestedFilename());   // temporary, per test
  await download.saveAs(ruta);

  // ...read/fill with exceljs, save, then:
  await carga.cargarArchivo(ruta);
});
*/