

To [get the share link for all files in a Google Drive folder](https://webapps.stackexchange.com/questions/88769/get-share-link-of-multiple-files-in-google-drive-to-put-in-spreadsheet), open a new Google Spreadsheet, then go to Tools > Script Editor, and run the following, replacing the <id> token with the shared folder ID.

function myFunction() {
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var s=ss.getActiveSheet();
  var c=s.getActiveCell();
  var fldr=DriveApp.getFolderById("<id>");
  var files=fldr.getFiles();
  var names=[],f,str;
  var links=[];
  var filenames=[];
  while (files.hasNext()) {
    f=files.next();
    str1='=hyperlink("' + f.getUrl() + '","' + f.getName() + '")';
    str2='="'+f.getUrl()+'"';
    str3='="'+f.getName()+'"';
    names.push([str1]);
    links.push([str2])    
    filenames.push([str3]);
  }
  s.getRange(c.getRow(),c.getColumn(),names.length).setFormulas(names);
  s.getRange(c.getRow(),2, links.length).setFormulas(links);
  s.getRange(c.getRow(),3, filenames.length).setFormulas(filenames);
}

For Dropbox, just share the folder and get the links manually.