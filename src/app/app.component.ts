import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TranslationService} from '@setrass-hn/i18n';
// language list
import {enLang} from '@setrass-hn/i18n';
import {chLang} from '@setrass-hn/i18n';
import {esLang} from '@setrass-hn/i18n';
import {jpLang} from '@setrass-hn/i18n';
import {deLang} from '@setrass-hn/i18n';
import {frLang} from '@setrass-hn/i18n';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private translationService: TranslationService) {
    // register translations
    this.translationService.loadTranslations(
      enLang,
      chLang,
      esLang,
      jpLang,
      deLang,
      frLang
    );
  }

  ngOnInit() {}
}
