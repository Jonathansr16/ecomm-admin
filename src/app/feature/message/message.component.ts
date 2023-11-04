import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  @Input() titleError: string | undefined;
  @Input() DetailError: string | undefined;
  @Input() cssClasses: 'p-message-info' | 'p-message-warn' | 'p-message-error' | undefined;
  @Input() icon: 'pi-close' | 'pi-info' | 'pi-exclamation-triangle' | undefined;

}
