import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const defaultBaseUrl = "https://adamix.net/defensa_civil/def";

interface DataInterface<T> {
  exito: boolean;
  mensaje: string;
  datos: T[];
}

type Service = {
  id: string;
  nombre: string;
  descripcion: string;
};

type News = {
  id: string;
  fecha: Date;
  titulo: string;
  contenido: string;
  foto: string;
};

type Video = {
  id: string;
  fecha: Date;
  titulo: string;
  descripcion: string;
  link: string;
};

type Hostel = {
  ciudad: string;
  codigo: string;
  edificio: string;
  coordinador: string;
  telefono: string;
  capacidad: string;
  lat: string;
  lng: string;
};

type PreventiveMeasure = {
  id: string;
  titulo: string;
  descripcion: string;
  foto: string;
};

type Member = {
  id: string;
  nombre: string;
  cargo: string;
  foto: string;
};

type Volunteer = {
  cedula: string;
  nombre: string;
  apellido: string;
  clave: string;
  correo: string;
  telefono: string;
};

type Login = {
  cedula: string;
  clave: string;
  correo?: string;
};

type Incident = {
  titulo: string;
  descripcion: string;
  foto: string;
  latitud: string;
  longitud: string;
  token: string;
};

type PaswordChange = {
  token: string;
  clave_anterior: string;
  clave_nueva: string;
};

async function get<T = unknown>(
  baseUrl: string,
  path: string,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  try {
    return await axios.get(`${baseUrl}${path}`, options);
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.isAxiosError) {
      console.error("[HttpClientService][GET] Outbound request failed (axios exception)", {
        requestUrl: axiosError.response?.config?.url,
        response: {
          code: axiosError.response?.status,
          body: axiosError.response?.data,
        },
      });
    }

    throw error;
  }
}

async function post<T = unknown>(
  baseUrl: string,
  path: string,
  body: unknown,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  try {
    return await axios.post(`${baseUrl}${path}`, body, options);
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.isAxiosError) {
      console.error("[HttpClientService][POST] Outbound request failed (axios exception)", {
        requestUrl: axiosError.response?.config?.url,
        response: {
          code: axiosError.response?.status,
          body: axiosError.response?.data,
        },
      });
    }

    throw error;
  }
}

async function getServices(): Promise<DataInterface<Service>> {
  const services = await get<DataInterface<Service>>(defaultBaseUrl, "/servicios.php");

  return services.data;
}

async function getNews(): Promise<DataInterface<News>> {
  const services = await get<DataInterface<News>>(defaultBaseUrl, "/noticias.php");

  return services.data;
}

async function getVideos(): Promise<DataInterface<Video>> {
  const services = await get<DataInterface<Video>>(defaultBaseUrl, "/videos.php");

  return services.data;
}

async function getHostels(): Promise<DataInterface<Hostel>> {
  const services = await get<DataInterface<Hostel>>(defaultBaseUrl, "/albergues.php");

  return services.data;
}

async function getPreventiveMeasures(): Promise<DataInterface<PreventiveMeasure>> {
  const services = await get<DataInterface<PreventiveMeasure>>(defaultBaseUrl, "/medidas_preventivas.php");

  return services.data;
}

async function getMembers(): Promise<DataInterface<Member>> {
  const services = await get<DataInterface<Member>>(defaultBaseUrl, "/miembros.php");

  return services.data;
}

async function signUpVolunteers(volunteer: Volunteer) {
  const formData = new FormData();

  Object.keys(volunteer).forEach((key) => {
    formData.append(key, volunteer[key]);
  });

  // En el tecer parametros pueden pasar las opciones por ejemplo { "Content-Type": "multipart/form-data" }
  const services = await post(defaultBaseUrl, "/registro.php", formData);

  return services.data;
}

async function handleLogin(login: Login) {
  const formData = new FormData();

  Object.keys(login).forEach((key) => {
    formData.append(key, login[key]);
  });

  // En el tecer parametros pueden pasar las opciones por ejemplo { "Content-Type": "multipart/form-data" }
  const services = await post(defaultBaseUrl, "/iniciar_sesion.php", formData);

  return services.data;
}

async function handleRecoverPassword(login: Login) {
  const formData = new FormData();

  Object.keys(login).forEach((key) => {
    formData.append(key, login[key]);
  });

  // En el tecer parametros pueden pasar las opciones por ejemplo { "Content-Type": "multipart/form-data" }
  const services = await post(defaultBaseUrl, "/recuperar_clave.php", formData);

  return services.data;
}

async function getMyIncidents(token: string) {
  const formData = new FormData();
  formData.append("token", token);

  // En el tecer parametros pueden pasar las opciones por ejemplo { "Content-Type": "multipart/form-data" }
  const services = await post(defaultBaseUrl, "/situaciones.php", formData);

  return services.data;
}

async function reportIncident(issue: Incident) {
  const formData = new FormData();

  Object.keys(issue).forEach((key) => {
    formData.append(key, issue[key]);
  });

  // En el tecer parametros pueden pasar las opciones por ejemplo { "Content-Type": "multipart/form-data" }
  const services = await post(defaultBaseUrl, "/nueva_situacion.php", formData);

  return services.data;
}

async function handlePasswordChange(passwordInfo: PaswordChange) {
  const formData = new FormData();

  Object.keys(passwordInfo).forEach((key) => {
    formData.append(key, passwordInfo[key]);
  });

  // En el tecer parametro pueden pasar las opciones con el header en caso de que se quede atascado
  // { headers: { "Content-Type": "multipart/form-data" } }

  const services = await post(defaultBaseUrl, "/cambiar_clave.php", formData);

  return services.data;
}

export {
  get,
  post,
  getServices,
  getNews,
  getVideos,
  getHostels,
  getPreventiveMeasures,
  getMembers,
  signUpVolunteers,
  handleLogin,
  getMyIncidents,
  reportIncident,
  handlePasswordChange,
  handleRecoverPassword,
};
