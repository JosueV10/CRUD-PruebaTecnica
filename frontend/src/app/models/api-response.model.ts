export interface ApiMeta {
  Status: string;
}

export interface ApiMensaje {
  IDMensaje: string;
}

export interface ApiData<T> {
  Mensaje: ApiMensaje;
  Resultado: T;
}

export interface ApiResponse<T> {
  Meta: ApiMeta;
  Data: ApiData<T>;
}
