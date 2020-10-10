// https://www.codexworld.com/export-html-table-data-to-excel-using-javascript/


function exportarExcel(tableID, filename = ''){

    stadoLoaging(true);

    var downloadLink;
    var dataType = 'data:application/vnd.ms-excel;charset=UTF-8;';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML;
    
    // Specify file name
    filename = filename ? filename+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
        stadoLoaging(false);
    }else{
        // Create a link to the file and formated
        downloadLink.href = 'data:' + dataType + ', ' + escape(tableHTML); 
        //encodeURIComponent(tableHTML);
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();

        stadoLoaging(false);
    }
}