-- CreateTable
CREATE TABLE "DatosGenerales" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "autoridadSolicitante" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "institucion" TEXT NOT NULL,
    "oficio" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "tipoDocumento" TEXT NOT NULL,
    "numeroDocumento" TEXT NOT NULL,
    "funcionario" TEXT NOT NULL,
    "areaFuncionario" TEXT NOT NULL,
    "especialidadFuncionario" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "vigencia" TEXT NOT NULL,
    "antecedentes" TEXT NOT NULL
);
