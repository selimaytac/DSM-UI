import { $axios } from "@/plugins/axios";
import { authHeader } from "../../helper";
const controllerName = "/FTPFiles/";
export const staticInventoryService = {
    getAllFiles,
    downloadFile,
    getFile,
    uploadFile,
    deleteFile,
    // getExportList,
    // getExportSearchList,
};
async function getAllFiles() {
    const result = await $axios.get(
        controllerName ,
        {
            headers:
            {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Authorization': authHeader()
            }
        }
    );
    return result.data;
}
async function downloadFile(data) {
    const result = await $axios.get(
        "/FTPDownloadFileWithFileName/" + data,
        {
            responseType: 'blob',
            headers:
            {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Authorization': authHeader()
            }
        }
    ).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', data);
        document.body.appendChild(fileLink);
        fileLink.click();
    });
    return result.data;
}
async function getFile(data) {
    const result = await $axios.get(
        controllerName + data,
        {
            headers:
            {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Authorization': authHeader()
            }
        }
    );
    return result.data;
}
async function uploadFile(data) {
    const formData = new FormData()
    formData.append('file', data.file)

    const result = await $axios.post(
        "/FTPUploadFile?FileDescription=" + data.FileDescription +"&FileTitle=" + data.FileTitle , formData,
        {
            headers:
            {
                "Content-Type": "application/octet-stream",
                'Access-Control-Allow-Origin': '*',
                'Authorization': authHeader()
            }
        }
    ).catch((e) => {
        console.log(e)
    });
    return result.data;
}

async function deleteFile(data) {
    const result = await $axios.get(
        "/FTPDeleteFile/" + data,
        {
            headers:
            {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Authorization': authHeader()
            }
        }
    );
    return result.data;
}
//  async function getExportList() {
//      const result = await $axios.get(
//          controllerName + "export/",
//          {
//              responseType: 'blob',
//              headers:
//              {
//                  "Content-Type": "application/octet-stream",
//                  'Access-Control-Allow-Origin': '*',
//                  'Authorization': authHeader()
//              }
//          }
//      ).then((response) => {
//          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
//          var fileLink = document.createElement('a');
//          fileLink.href = fileURL;
//          fileLink.setAttribute('download', 'dsm_export.xlsx');
//          document.body.appendChild(fileLink);
//          fileLink.click();
//      })
//  }
// async function getExportSearchList(data) {
//     const result = await $axios.get(
//         controllerName + "export/" + data,
//         {
//             responseType: 'blob',
//             headers:
//             {
//                 "Content-Type": "application/octet-stream",
//                 'Access-Control-Allow-Origin': '*',
//                 'Authorization': authHeader()
//             }
//         }
//     ).then((response) => {
//         var fileURL = window.URL.createObjectURL(new Blob([response.data]));
//         var fileLink = document.createElement('a');

//         fileLink.href = fileURL;
//         fileLink.setAttribute('download', 'dsm_export.xlsx');
//         document.body.appendChild(fileLink);

//         fileLink.click();
//     })
// }
