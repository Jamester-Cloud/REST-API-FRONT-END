import $ from 'jquery';

export default function refreshFunction() {    
    $("#producto").DataTable().destroy(); // Destruccion de las dataTables
}
