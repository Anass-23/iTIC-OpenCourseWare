export interface Assignatura {
    year: string;
    name: string;
    acro: string;
    email: string;
    photo: string;
}

export interface Quadrimestre {
    name: string;
    courses: { year: string; yearCourses: Assignatura[] }[];
}

const photo: string = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Integral_example.svg/300px-Integral_example.svg.png"
const email: string = "professor@upc.edu"

export const courses: Assignatura[] = [
    // Q1
    { year: "Quadrimestre 1", name: "Informàtica", email: email, acro: "INF", photo: photo },
    { year: "Quadrimestre 1", name: "Física", email: email, acro: "FIS", photo: photo },
    { year: "Quadrimestre 1", name: "Intro. Sistemes Digitals", email: email, acro: "ISD", photo: photo },
    { year: "Quadrimestre 1", name: "Fonaments Matemàtics TIC", email: email, acro: "FMT", photo: photo },

    // Q2
    { year: "Quadrimestre 2", name: "Estadística", email: email, acro: "EST", photo: photo },
    { year: "Quadrimestre 2", name: "Tec. Complementàries 1", email: email, acro: "TC1", photo: photo },
    { year: "Quadrimestre 2", name: "Tecnologia Programació", email: email, acro: "TPR", photo: photo },
    { year: "Quadrimestre 2", name: "Teoria de Circuits", email: email, acro: "TC", photo: photo },
    { year: "Quadrimestre 2", name: "Sistemes Digitals", email: email, acro: "SD", photo: photo },

    // Q3
    { year: "Quadrimestre 3", name: "Matemàtiques Avançades", email: email, acro: "MAE", photo: photo },
    { year: "Quadrimestre 3", name: "Tec. Complementàries 2", email: email, acro: "TC2", photo: photo },
    { year: "Quadrimestre 3", name: "Dispositius Programables", email: email, acro: "DP", photo: photo },
    { year: "Quadrimestre 3", name: "Empresa", email: email, acro: "EMP", photo: photo },
    { year: "Quadrimestre 3", name: "Circuits i Sist. Lineals", email: email, acro: "CSL", photo: photo },

    // Q4
    { year: "Quadrimestre 4", name: "Sistemes Analògics", email: email, acro: "SA", photo: photo },
    { year: "Quadrimestre 4", name: "Programació a Baix Nivell", email: email, acro: "PBN", photo: photo },
    { year: "Quadrimestre 4", name: "Arquitectura de Computadors", email: email, acro: "ARC", photo: photo },
    { year: "Quadrimestre 4", name: "Circ. i Sist. de Radiofreqüència", email: email, acro: "CSR", photo: photo },
    { year: "Quadrimestre 4", name: "Senyals i Sistemes", email: email, acro: "SS", photo: photo },

    // Q5
    { year: "Quadrimestre 5", name: "Prog. Concurrent i en Temps Real", email: email, acro: "PCTR", photo: photo },
    { year: "Quadrimestre 5", name: "Sistemes Operatius", email: email, acro: "SO", photo: photo },
    { year: "Quadrimestre 5", name: "Xarxes de Comunicacions", email: email, acro: "XC", photo: photo },
    { year: "Quadrimestre 5", name: "Gestió i Orientació de Projectes", email: email, acro: "GOP", photo: photo },
    { year: "Quadrimestre 5", name: "Processament Digital del Senyal", email: email, acro: "PDS", photo: photo },
  
    // Q6
    { year: "Quadrimestre 6", name: "Sistemes Encastats", email: email, acro: "SE", photo: photo },
    { year: "Quadrimestre 6", name: "Enginyeria de Sistemes", email: email, acro: "ES", photo: photo },
    { year: "Quadrimestre 6", name: "App. i Serveis a Internet", email: email, acro: "ASI", photo: photo },
    { year: "Quadrimestre 6", name: "Sist. Electrònics de Control", email: email, acro: "SEC", photo: photo },
    { year: "Quadrimestre 6", name: "Processament Digital del Senyal", email: email, acro: "PDS", photo: photo },
  
    // Q7
    { year: "Quadrimestre 7", name: "Integració de Sistemes", email: email, acro: "IS", photo: photo },
    { year: "Quadrimestre 7", name: "Sistemes Automàtics i Robòtica", email: email, acro: "SAR", photo: photo },
  
    // Q8
    { year: "Quadrimestre 8", name: "Treball fi de grau", email: email, acro: "TFG", photo: photo },
];

export const optatives: Assignatura[] = [
    { year: '', name: "Bases de Dades", email: email, acro: "BD", photo: photo },
    { year: '', name: "Microelectrònica", email: email, acro: "MIC", photo: photo },
    { year: '', name: "Xarxes de Comunicacions ", email: email, acro: "XC", photo: photo },
    { year: '', name: "Interfícies d'Usuari", email: email, acro: "IU", photo: photo },
];