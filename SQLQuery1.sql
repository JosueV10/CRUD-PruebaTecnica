

CREATE TABLE dbo.Empleados (
    IdEmpleado     INT          NOT NULL,
    Nombre         VARCHAR(100) NOT NULL,
    Apellido       VARCHAR(100) NULL,
    Puesto         VARCHAR(100) NULL,
    CONSTRAINT PK_Empleados PRIMARY KEY (IdEmpleado)
);


CREATE TABLE dbo.Inventario (
    SKU       BIGINT        NOT NULL,
    Nombre    VARCHAR(150)  NOT NULL,
    Cantidad  INT           NOT NULL,
    CONSTRAINT PK_Inventario PRIMARY KEY (SKU)
);


CREATE TABLE dbo.Polizas (
    IdPolizas        INT           IDENTITY(1,1) NOT NULL,
    empleado_genero  INT           NOT NULL,      -- FK -> Empleados.IdEmpleado
    SKU              BIGINT        NOT NULL,      -- FK -> Inventario.SKU
    Cantidad         INT           NOT NULL,
    Fecha            DATETIME2(3)  NOT NULL CONSTRAINT DF_Polizas_Fecha DEFAULT (SYSDATETIME()),
    CONSTRAINT PK_Polizas PRIMARY KEY (IdPolizas),

    CONSTRAINT FK_Polizas_Empleados
        FOREIGN KEY (empleado_genero) REFERENCES dbo.Empleados (IdEmpleado),

    CONSTRAINT FK_Polizas_Inventario
        FOREIGN KEY (SKU) REFERENCES dbo.Inventario (SKU)
);
GO




INSERT INTO dbo.Empleados (IdEmpleado, Nombre, Apellido, Puesto) VALUES
(1, 'Juan',  'Pérez',  'Vendedor'),
(2, 'María', 'Gómez',  'Supervisor');

INSERT INTO dbo.Inventario (SKU, Nombre, Cantidad) VALUES
(1, 'Laptop 1', 10),
(2, 'Mouse óptico', 50);
GO
