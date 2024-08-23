import { Component, EventEmitter, forwardRef, Input, Output, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements ControlValueAccessor {
  @Input()
  placeholder: string = '';

  @Input()
  name: string = 'input-ui';

  @Output()
  searchEvent = new EventEmitter<string>();

  inputText = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  onSearch() {
    this.searchEvent.emit(this.inputText);
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.onChange(inputElement.value);
  }

  writeValue(value: string): void {
    this.inputText = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
