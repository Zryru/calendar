import { Component } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private fileOpener: FileOpener) {}

  async saveAndOpenICSFile() {
    const icsData = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//hacksw/handcal//NONSGML v1.0//EN\nBEGIN:VEVENT\nUID:uid1@example.com\nDTSTAMP:20230711T120000Z\nORGANIZER;CN=John Doe:MAILTO:john.doe@example.com\nDTSTART:20230711T120000Z\nDTEND:20230711T130000Z\nSUMMARY:Test Event\nEND:VEVENT\nEND:VCALENDAR';
    const fileName = 'event.ics';

    try {
      const result = await Filesystem.writeFile({
        path: fileName,
        data: icsData,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      });
      console.log('File written', result);

      const filePath = result.uri;

      this.fileOpener.open(filePath, 'text/calendar')
        .then(() => console.log('File is opened'))
        .catch(e => console.error('Error opening file', e));
    } catch (e) {
      console.error('Unable to write file', e);
    }
  }

}
