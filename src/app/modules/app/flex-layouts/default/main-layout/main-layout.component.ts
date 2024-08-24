import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// COMPONENTS

import { MainHeaderComponent } from '@fxLayouts/default/main-header/main-header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [MainHeaderComponent, RouterModule],
  template: `
    <main class="min-h-screen relative h-full w-full bg-black">
      <div
        class="absolute z-0 inset-0 pointer-events-none bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
      ></div>
      <div
        class="absolute left-0 right-0 top-[-10%] hidden h-[1000px] w-[1000px] md:block md:w-[700px] md:h-[700px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"
      ></div>

      <app-main-header></app-main-header>
      <div class="relative">
        <router-outlet></router-outlet>
      </div>

      <footer class="py-20 text-center w-full text-sm">With 💖 for branjesusdev 🚀</footer>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {}
