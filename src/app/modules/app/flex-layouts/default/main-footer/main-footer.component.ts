import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-main-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="py-20 text-center w-full revelar-scale">With 💖 for branjesusdev 🚀</footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainFooterComponent {}
